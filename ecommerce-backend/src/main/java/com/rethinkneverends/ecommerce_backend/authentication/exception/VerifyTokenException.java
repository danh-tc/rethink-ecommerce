package com.rethinkneverends.ecommerce_backend.authentication.exception;

public class VerifyTokenException extends AuthenticationException {
    public VerifyTokenException(String message) {
        super(message);
    }
}
