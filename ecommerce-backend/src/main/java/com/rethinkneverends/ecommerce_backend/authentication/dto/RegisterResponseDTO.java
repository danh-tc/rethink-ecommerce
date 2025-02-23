package com.rethinkneverends.ecommerce_backend.authentication.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegisterResponseDTO {
    private Integer status;
    private String message;
}
