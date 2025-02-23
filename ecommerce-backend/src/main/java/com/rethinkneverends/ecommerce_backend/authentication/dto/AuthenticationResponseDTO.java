package com.rethinkneverends.ecommerce_backend.authentication.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationResponseDTO {
    private String accessToken;
    private String refreshToken;
    private UserProfileDTO userProfileDTO;
}
