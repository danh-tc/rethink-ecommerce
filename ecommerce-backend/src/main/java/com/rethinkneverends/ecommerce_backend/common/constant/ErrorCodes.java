package com.rethinkneverends.ecommerce_backend.common.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum ErrorCodes {

    BAD_REQUEST(301, HttpStatus.BAD_REQUEST, "Please pre-check your input data to make sure they are valid."),
    ACCOUNT_LOCKED(302, UNAUTHORIZED, "Your account is locked. Please click on forget password to reset your account."),
    ACCOUNT_DISABLED(303, UNAUTHORIZED, "Your account is disabled."),
    BAD_CREDENTIALS(304, UNAUTHORIZED, "Sorry, looks like that’s the wrong email or password."),
    USED_EMAIL(305, NOT_ACCEPTABLE, "Sorry, this email has been used."),
    USER_NOT_FOUND(306, NOT_ACCEPTABLE, "Sorry, this email is not exist. Please try again."),
    GENERAL_ERROR(500, INTERNAL_SERVER_ERROR, "Something went wrong."),
    MAIL_SENDING_FAILED(307, INTERNAL_SERVER_ERROR, "The mail service is down.");

    @Getter
    private final int code;

    @Getter
    private final String description;

    @Getter
    private final HttpStatus httpStatus;

    ErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
