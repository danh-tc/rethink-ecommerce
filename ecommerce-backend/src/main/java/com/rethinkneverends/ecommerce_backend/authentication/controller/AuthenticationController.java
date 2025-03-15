package com.rethinkneverends.ecommerce_backend.authentication.controller;

import com.rethinkneverends.ecommerce_backend.authentication.dto.*;
import com.rethinkneverends.ecommerce_backend.authentication.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    /**
     * Says hello to the user.
     *
     * @return a friendly greeting
     */
    @GetMapping("hello")
    public String hello() {
        return "Hello world!";
    }

    @PostMapping("register")
    public RegisterResponseDTO register(@RequestBody @Valid RegistrationRequestDTO request,
                                        HttpServletResponse response) throws Exception {
        RegisterResponseDTO responseDTO = authenticationService.register(request);
        response.setStatus(HttpStatus.OK.value());
        return responseDTO;
    }

    @GetMapping("activate-account")
    public ActivationResponseDTO confirm(@RequestParam String token) throws Exception {
        return authenticationService.activateAccount(token);
    }

    @PostMapping("login")
    public ResponseEntity<AuthenticationResponseDTO> login(@RequestBody @Valid AuthenticationRequestDTO request,
                                                           HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.login(request, response));
    }

    @PostMapping("request-reset-account")
    public GeneralAuthenticationResponseDTO requestResetAccount(
            @RequestBody @Valid PasswordResetRequestDTO request,
            HttpServletResponse response) throws Exception {
        return authenticationService.requestPasswordReset(request, response);
    }

    @PostMapping("reset-account")
    public ResponseEntity<?> resetAccount(
            @RequestBody @Valid PasswordResetRequestDTO request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.resetPassword(request, response));
    }

    @PostMapping("refresh-token")
    public ResponseEntity<UserProfileDTO> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.refreshToken(request, response));
    }
}
