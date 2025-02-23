package com.rethinkneverends.ecommerce_backend.common.handler;

import com.rethinkneverends.ecommerce_backend.authentication.exception.*;
import com.rethinkneverends.ecommerce_backend.common.constant.ErrorCodes;
import com.rethinkneverends.ecommerce_backend.common.dto.ExceptionResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(DuplicateEmailException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.USED_EMAIL.getCode())
                                .errorDescription(ErrorCodes.USED_EMAIL.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MailSendingException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(MailSendingException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.MAIL_SENDING_FAILED.getCode())
                                .errorDescription(ErrorCodes.MAIL_SENDING_FAILED.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(MethodArgumentNotValidException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.BAD_REQUEST.getCode())
                                .errorDescription(ErrorCodes.BAD_REQUEST.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(VerifyTokenException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(VerifyTokenException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.BAD_REQUEST.getCode())
                                .errorDescription("Your verification token is in valid.")
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(BadCredentialsException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.BAD_CREDENTIALS.getCode())
                                .errorDescription(ErrorCodes.BAD_CREDENTIALS.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(AccountActivatedException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(AccountActivatedException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.BAD_CREDENTIALS.getCode())
                                .errorDescription(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(AttemptLoginException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(AttemptLoginException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.ACCOUNT_LOCKED.getCode())
                                .errorDescription(ErrorCodes.ACCOUNT_LOCKED.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponseDTO> handleException(UserNotFoundException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                        ExceptionResponseDTO.builder()
                                .errorCode(ErrorCodes.USER_NOT_FOUND.getCode())
                                .errorDescription(ErrorCodes.USER_NOT_FOUND.getDescription())
                                .error(exception.getMessage())
                                .build()
                );
    }
}
