package com.rethinkneverends.ecommerce_backend.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class CategoryResponseDTO {
    private String categoryName;
    private UUID publicId;
}
