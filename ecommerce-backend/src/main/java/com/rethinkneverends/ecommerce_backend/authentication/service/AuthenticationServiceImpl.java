package com.rethinkneverends.ecommerce_backend.authentication.service;


import com.rethinkneverends.ecommerce_backend.authentication.dto.*;
import com.rethinkneverends.ecommerce_backend.authentication.entity.*;
import com.rethinkneverends.ecommerce_backend.authentication.exception.*;
import com.rethinkneverends.ecommerce_backend.authentication.repository.*;
import com.rethinkneverends.ecommerce_backend.authentication.util.TokenUtils;
import com.rethinkneverends.ecommerce_backend.common.constant.EmailTemplateName;
import com.rethinkneverends.ecommerce_backend.common.constant.TokenType;
import com.rethinkneverends.ecommerce_backend.common.constant.UserType;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Integer MAX_LOGIN_ATTEMPTS = 3;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final FailedLoginAttemptRepository failedLoginAttemptRepository;

    private final NotificationService notificationService;
    private final JwtService jwtService;

    @Value("${spring.application.security.mailling.frontend.activation-url}")
    private String activationUrl;

    @Override
    @Transactional
    public RegisterResponseDTO register(RegistrationRequestDTO request) throws Exception {
        var foundedUser = userRepository.findByEmail(request.getEmail());

        if (foundedUser.isPresent()) {
            throw new DuplicateEmailException("This email has been used.");
        }

        // Default will be a normal user
        Role userRole = roleRepository.findByName(UserType.NORMAL_USER.getType())
                .orElseThrow(() -> new IllegalStateException("ROLE USER was not found in the Database."));

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enable(false)
                .roles(List.of(userRole))
                .build();
        userRepository.save(user);
        sendValidationTokenEmail(user, EmailTemplateName.ACTIVATE_ACCOUNT, "Activation Email");
        return RegisterResponseDTO.builder()
                .status(200)
                .message("Register successfully.").build();
    }

    @Override
    public ActivationResponseDTO activateAccount(String token) throws Exception {
        VerificationToken savedActivationCode = verificationTokenRepository.findByCode(token)
                .orElseThrow(() -> new RuntimeException("Verification token is invalid."));

        if (savedActivationCode.getValidatedAt() != null) {
            throw new VerifyTokenException("Verification token is validated.");
        }

        if (LocalDateTime.now().isAfter(savedActivationCode.getExpiresAt())) {
            // Automatically resend a new token if the previous one is expired
            sendValidationTokenEmail(savedActivationCode.getUser(),
                    EmailTemplateName.ACTIVATE_ACCOUNT,
                    "Activation Email");
            throw new VerifyTokenException("Activation code has expired. A new token has been sent to the same email address");
        }

        var user = userRepository.findById(savedActivationCode.getUser().getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setEnable(true);

        userRepository.save(user);

        savedActivationCode.setValidatedAt(LocalDateTime.now());

        verificationTokenRepository.save(savedActivationCode);

        return ActivationResponseDTO.builder()
                .status(200)
                .message("Activate successfully. Please login and enjoy with us.")
                .build();
    }

    @Override
    public AuthenticationResponseDTO login(@Valid AuthenticationRequestDTO request, HttpServletResponse response) {
        var foundUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User was not found."));

        if (!foundUser.isEnabled()) {
            throw new AccountActivatedException("Please activate your account.");
        }

        var foundFailedLoginAttempt = failedLoginAttemptRepository.findByUser(foundUser)
                .orElse(FailedLoginAttempt.builder()
                        .user(foundUser)
                        .attempts(0)
                        .build());

        if (null != foundFailedLoginAttempt.getLockedUntil()) {
            if (LocalDateTime.now().isBefore(foundFailedLoginAttempt.getLockedUntil())) {
                throw new AttemptLoginException
                        ("Your account was locked because of entering an incorrect password too many times.");
            } else {
                foundFailedLoginAttempt.setLockedUntil(null);
                foundFailedLoginAttempt.setAttempts(0);
            }
        }

        Authentication auth;
        try {
            auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception exception) {
            // Add one count if there is a wrong password.
            int numOfAttempts = foundFailedLoginAttempt.getAttempts() + 1;
            if (numOfAttempts >= MAX_LOGIN_ATTEMPTS) {
                foundFailedLoginAttempt.setLockedUntil(LocalDateTime.now().plusMinutes(180));
            }
            foundFailedLoginAttempt.setAttempts(numOfAttempts);
            foundFailedLoginAttempt.setLastAttempt(LocalDateTime.now());

            failedLoginAttemptRepository.save(foundFailedLoginAttempt);
            throw new BadCredentialsException(exception.getMessage());
        }
        // Reset if login successfully
        foundFailedLoginAttempt.setAttempts(0);
        foundFailedLoginAttempt.setLockedUntil(null);
        failedLoginAttemptRepository.save(foundFailedLoginAttempt);
        var claims = new HashMap<String, Object>();
        var user = ((User) auth.getPrincipal());
        claims.put("fullName", user.fullName());
        var jwtToken = jwtService.generateToken(claims, user);
        var jwtRefreshToken = jwtService.generateRefreshToken(user);

        revokedAllUserTokens(user, true);

        saveUserToken(user, jwtToken, TokenType.ACCESS_TOKEN);
        saveUserToken(user, jwtRefreshToken, TokenType.REFRESH_TOKEN);

        response.addCookie(generateCookie("a_t", jwtToken, 3600));
        response.addCookie(generateCookie("f_t", jwtRefreshToken, 604800));

        return AuthenticationResponseDTO.builder()
                .accessToken(jwtToken)
                .refreshToken(jwtRefreshToken)
                .userProfileDTO(
                        UserProfileDTO.builder()
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .dateOfBirth(user.getDateOfBirth())
                                .roles(user.getRoles().stream().map(Role::getName).toList())
                                .build()
                )
                .build();
    }

    @Override
    @Transactional
    public GeneralAuthenticationResponseDTO requestPasswordReset(@Valid PasswordResetRequestDTO request, HttpServletResponse response) throws Exception {
        var foundedUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found."));
        sendValidationTokenEmail(foundedUser, EmailTemplateName.RESET_PASSWORD, "Reset Password Email");
        return GeneralAuthenticationResponseDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Please check your email to reset your account.")
                .build();
    }

    @Transactional
    @Override
    public GeneralAuthenticationResponseDTO resetPassword(@Valid PasswordResetRequestDTO request,
                                                          HttpServletResponse response) {
        var foundToken = verificationTokenRepository.findByCode(request.getToken())
                .orElseThrow(() -> new VerifyTokenException("Invalid reset password token."));

        if (LocalDateTime.now().isAfter(foundToken.getExpiresAt())) {
            throw new VerifyTokenException("Token was expired. Please process forget password again.");
        }

        var foundUser = foundToken.getUser();
        if (null != foundUser) {
            foundUser.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(foundUser);
            //Invalidate the token
            foundToken.setValidatedAt(LocalDateTime.now());
            verificationTokenRepository.save(foundToken);
            // Reset login attempts
            var foundLoginAttempt = failedLoginAttemptRepository.findByUser(foundUser);
            foundLoginAttempt.ifPresent(failedLoginAttempt -> {
                failedLoginAttempt.setAttempts(0);
                failedLoginAttempt.setLastAttempt(LocalDateTime.now());
                failedLoginAttempt.setLockedUntil(null);
            });
        } else {
            throw new VerifyTokenException("Token was tempered.");
        }
        return GeneralAuthenticationResponseDTO.builder()
                .status(HttpStatus.OK.value())
                .message("Reset your account successfully.")
                .build();
    }

    @Override
    public UserProfileDTO refreshToken(HttpServletRequest request, HttpServletResponse response) {
        final String refreshToken = TokenUtils.extractJWTTokenFromCookies(request, "f_t");
        // Validate token if it is expired or revoked
        var foundedToken = tokenRepository.findByToken(refreshToken);
        if (TokenUtils.INVALID_ACCESS_TOKEN.equals(refreshToken)
                || foundedToken.isEmpty()
                || Boolean.TRUE.equals(foundedToken.get().getExpired())
                || Boolean.TRUE.equals(foundedToken.get().getRevoked())
        ) {
            throw new VerifyTokenException("Refresh token is invalid");
        } else {
            final String userEmail;
            userEmail = jwtService.extractUsername(refreshToken);

            if (null != userEmail) {
                var user = this.userRepository.findByEmail(userEmail).orElse(null);
                if (null == user) return null;
                if (jwtService.isTokenValid(refreshToken, user)) {
                    var accessToken = jwtService.generateToken(user);

                    // Only Access Token
                    revokedAllUserTokens(user, false);
                    saveUserToken(user, accessToken, TokenType.ACCESS_TOKEN);
                    response.addCookie(generateCookie("a_t", accessToken, 3600));
                }
                return UserProfileDTO.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .roles(user.getRoles().stream().map(Role::getName).toList())
                        .build();
            }
        }
        throw new VerifyTokenException("Refresh token is invalid");
    }

    private void sendValidationTokenEmail(User user, EmailTemplateName templateName, String subject) throws Exception {
        var verificationToken = generateAndSaveActivationCode(user);

        Map<String, Object> config = new HashMap<>();
        config.put("emailTemplate", templateName);
        config.put("recipient", user.getEmail());
        config.put("username", user.fullName());
        config.put("subject", subject);
        config.put("verificationToken", verificationToken);
        config.put("confirmationUrl", activationUrl);

        notificationService.sendNotification(config);
    }

    private String generateAndSaveActivationCode(User user) {
        String generatedCode = generateActivationCode(6);
        var code = VerificationToken.builder()
                .code(generatedCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(LocalDateTime.now().plusMinutes(15))
                .user(user)
                .build();
        verificationTokenRepository.save(code);
        return generatedCode;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    private void revokedAllUserTokens(User user, boolean revokeAll) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (!validUserTokens.isEmpty()) {
            validUserTokens.forEach(token -> {
                if (revokeAll) {
                    token.setExpired(true);
                    token.setRevoked(true);
                } else {
                    if (token.getTokenType() == TokenType.ACCESS_TOKEN) {
                        token.setExpired(true);
                        token.setRevoked(true);
                    }
                }
            });
        }
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(User user, String jwtToken, TokenType tokenType) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(tokenType)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private Cookie generateCookie(String cName, String cValue, int maxAge) {
        Cookie cookie = new Cookie(cName, cValue);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAge);
        return cookie;
    }
}
