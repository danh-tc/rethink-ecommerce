package com.rethinkneverends.ecommerce_backend.product.enitity;

import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Name("category_id")
    private Long id;

    private UUID publicId;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private Set<Product> products;
}
