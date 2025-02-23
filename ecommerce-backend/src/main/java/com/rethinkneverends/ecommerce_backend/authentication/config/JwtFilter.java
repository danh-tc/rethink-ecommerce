package com.rethinkneverends.ecommerce_backend.authentication.config;


import com.rethinkneverends.ecommerce_backend.authentication.repository.TokenRepository;
import com.rethinkneverends.ecommerce_backend.authentication.util.TokenUtils;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import com.rethinkneverends.ecommerce_backend.authentication.service.JwtService;

import java.io.IOException;

import static com.rethinkneverends.ecommerce_backend.authentication.util.TokenUtils.INVALID_ACCESS_TOKEN;


@Service
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull FilterChain filterChain)
            throws ServletException, IOException {
        if (request.getServletPath().contains("/auth")) {
            filterChain.doFilter(request, response);
            return;
        }
        final String jwt = TokenUtils.extractJWTTokenFromCookies(request, "a_t");
        if (INVALID_ACCESS_TOKEN.equals(jwt)) {
            filterChain.doFilter(request, response);
            return;
        }
        try {
            final String userEmail = jwtService.extractUsername(jwt);
            if (null != userEmail && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                boolean isValidToken = tokenRepository.findByToken(jwt)
                        .map(token -> !token.getExpired() && !token.getRevoked())
                        .orElse(false);
                if (jwtService.isTokenValid(jwt, userDetails) && Boolean.TRUE.equals(isValidToken)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userEmail,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication((authToken));
                }
            }
        } catch (ExpiredJwtException exception) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token has expired");
            return;
        }
        filterChain.doFilter(request, response);
    }
}
