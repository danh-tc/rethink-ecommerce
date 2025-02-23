package com.rethinkneverends.ecommerce_backend.authentication.repository;

import com.rethinkneverends.ecommerce_backend.authentication.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String role);
}
