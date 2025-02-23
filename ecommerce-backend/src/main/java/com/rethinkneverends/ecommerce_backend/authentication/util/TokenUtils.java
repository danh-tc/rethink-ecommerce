package com.rethinkneverends.ecommerce_backend.authentication.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class TokenUtils {
    public static final String INVALID_ACCESS_TOKEN = "InvalidAccessToken";

    public static String extractJWTTokenFromCookies(HttpServletRequest request, String tokenName) {
        Cookie[] cookies = request.getCookies();
        if (null != cookies) {
            for (Cookie cookie : cookies) {
                if (tokenName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return INVALID_ACCESS_TOKEN;
    }
}
