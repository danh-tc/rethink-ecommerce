package com.rethinkneverends.ecommerce_backend.authentication.exception;

public class UserNotFoundException extends AuthenticationException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
