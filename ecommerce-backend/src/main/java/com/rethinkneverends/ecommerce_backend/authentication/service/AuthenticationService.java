package com.rethinkneverends.ecommerce_backend.authentication.service;

import com.rethinkneverends.ecommerce_backend.authentication.dto.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

public interface AuthenticationService {
    RegisterResponseDTO register(RegistrationRequestDTO request) throws Exception;

    ActivationResponseDTO activateAccount(String token) throws Exception;

    AuthenticationResponseDTO login(@Valid AuthenticationRequestDTO request, HttpServletResponse response);

    GeneralAuthenticationResponseDTO requestPasswordReset(@Valid PasswordResetRequestDTO request, HttpServletResponse response) throws Exception;

    GeneralAuthenticationResponseDTO resetPassword(@Valid PasswordResetRequestDTO request, HttpServletResponse response);
}
