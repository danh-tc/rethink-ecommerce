package com.rethinkneverends.ecommerce_backend;

import com.rethinkneverends.ecommerce_backend.authentication.entity.Role;
import com.rethinkneverends.ecommerce_backend.authentication.repository.RoleRepository;
import com.rethinkneverends.ecommerce_backend.product.enitity.Category;
import com.rethinkneverends.ecommerce_backend.product.enitity.Product;
import com.rethinkneverends.ecommerce_backend.product.repository.CategoryRepository;
import com.rethinkneverends.ecommerce_backend.product.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import java.util.UUID;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class EcommerceBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner runner(RoleRepository roleRepository,
                                    CategoryRepository categoryRepository,
                                    ProductRepository productRepository) {
        return args -> {
            if (roleRepository.findByName("USER").isEmpty()) {
                roleRepository.save(Role.builder().name("USER").build());
            }
            if (categoryRepository.findByName("TOP").isEmpty()) {
                categoryRepository.save(Category.builder()
                        .publicId(UUID.randomUUID())
                        .name("TOP")
                        .build());
            }
            if (productRepository.findByName("TOP-TEST-04").isEmpty()) {
                productRepository.save(Product.builder()
                        .brand("Rethink Official")
                        .name("TOP-TEST-04")
                        .category(null)
                        .build());

            }
        };
    }

}
