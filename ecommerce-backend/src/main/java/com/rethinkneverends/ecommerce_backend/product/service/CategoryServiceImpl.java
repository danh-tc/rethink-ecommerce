package com.rethinkneverends.ecommerce_backend.product.service;

import com.rethinkneverends.ecommerce_backend.product.dto.CategoryResponseDTO;
import com.rethinkneverends.ecommerce_backend.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(category ->
                        CategoryResponseDTO.builder()
                                .categoryName(category.getName())
                                .publicId(category.getPublicId())
                                .build()).toList();
    }
}
