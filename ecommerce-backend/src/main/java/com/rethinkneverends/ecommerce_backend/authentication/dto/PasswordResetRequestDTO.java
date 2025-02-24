package com.rethinkneverends.ecommerce_backend.authentication.dto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PasswordResetRequestDTO {
    private String email;
    private String password;
    private String token;
}
