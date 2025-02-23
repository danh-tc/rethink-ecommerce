package com.rethinkneverends.ecommerce_backend.authentication.exception;

public class DuplicateEmailException extends AuthenticationException {

    public DuplicateEmailException(String message) {
        super(message);
    }
}
