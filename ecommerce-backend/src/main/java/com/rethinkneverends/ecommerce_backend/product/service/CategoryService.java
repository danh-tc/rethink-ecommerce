package com.rethinkneverends.ecommerce_backend.product.service;

import com.rethinkneverends.ecommerce_backend.product.dto.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDTO> getAllCategories();
}
