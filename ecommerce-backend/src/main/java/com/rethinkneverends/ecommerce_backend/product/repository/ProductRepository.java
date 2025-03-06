package com.rethinkneverends.ecommerce_backend.product.repository;

import com.rethinkneverends.ecommerce_backend.product.enitity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
}
