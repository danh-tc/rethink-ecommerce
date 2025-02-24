package com.rethinkneverends.ecommerce_backend.authentication.service;


import com.rethinkneverends.ecommerce_backend.authentication.repository.TokenRepository;
import com.rethinkneverends.ecommerce_backend.authentication.util.TokenUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final TokenRepository tokenRepository;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) {
        final String jwt = TokenUtils.extractJWTTokenFromCookies(request, "a_t");
        final String refreshToken = TokenUtils.extractJWTTokenFromCookies(request, "f_t");
        if (TokenUtils.INVALID_ACCESS_TOKEN.equals(jwt)
                || TokenUtils.INVALID_ACCESS_TOKEN.equals(refreshToken)) {
            return;
        }
        var storedToken = tokenRepository.findByToken(jwt)
                .orElse(null);

        var storedRefreshToken = tokenRepository.findByToken(refreshToken)
                .orElse(null);

        if (null != storedToken) {
            storedToken.setRevoked(true);
            storedToken.setExpired(true);
            tokenRepository.save(storedToken);
        }

        if (null != storedRefreshToken) {
            storedRefreshToken.setRevoked(true);
            storedRefreshToken.setExpired(true);
            tokenRepository.save(storedRefreshToken);
        }
    }
}
