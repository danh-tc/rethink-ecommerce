package com.rethinkneverends.ecommerce_backend.product.repository;

import com.rethinkneverends.ecommerce_backend.product.enitity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String categoryName);
}
