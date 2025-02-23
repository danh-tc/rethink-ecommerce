package com.rethinkneverends.ecommerce_backend.authentication.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class GeneralAuthenticationResponseDTO {
    private Integer status;
    private String message;
}
