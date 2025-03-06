package com.rethinkneverends.ecommerce_backend.product.enitity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] file;

    private String mimeType;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
