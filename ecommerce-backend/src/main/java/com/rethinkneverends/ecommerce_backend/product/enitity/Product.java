package com.rethinkneverends.ecommerce_backend.product.enitity;

import com.rethinkneverends.ecommerce_backend.product.constant.ProductSize;
import jakarta.persistence.*;
import jdk.jfr.Name;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Name("product_id")
    private Long id;

    private UUID publicId;

    private String name;

    private String brand;

    private String color;

    private String description;

    private Double price;

    private Boolean featured;

    @Enumerated(EnumType.STRING)
    private ProductSize size;

    private int numberInStock;

    @OneToMany(mappedBy = "product")
    private Set<Picture> pictures = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToMany
    @JoinTable(
            name = "product_tags",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
}
