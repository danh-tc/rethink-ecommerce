package com.rethinkneverends.ecommerce_backend.authentication.exception;

public class AttemptLoginException extends AuthenticationException {
    public AttemptLoginException(String message) {
        super(message);
    }
}
