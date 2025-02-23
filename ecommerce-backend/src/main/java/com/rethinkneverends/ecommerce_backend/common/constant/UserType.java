package com.rethinkneverends.ecommerce_backend.common.constant;

import lombok.Getter;

@Getter
public enum UserType {
    NORMAL_USER("USER");
    private final String type;

    UserType(String type) {
        this.type = type;
    }
}
