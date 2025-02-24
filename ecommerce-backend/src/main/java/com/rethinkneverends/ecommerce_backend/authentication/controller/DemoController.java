package com.rethinkneverends.ecommerce_backend.authentication.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DemoController {
    @GetMapping("secure-endpoint")
    public String hello() {
        return "Hello world from a secure endpoint!";
    }
}
