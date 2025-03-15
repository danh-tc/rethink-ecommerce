package com.rethinkneverends.ecommerce_backend.product.controller;

import com.rethinkneverends.ecommerce_backend.product.dto.CategoryResponseDTO;
import com.rethinkneverends.ecommerce_backend.product.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("admin")
@RestController
@RequiredArgsConstructor
public class AdminController {
    private final CategoryService categoryService;

    @GetMapping("categories")
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
