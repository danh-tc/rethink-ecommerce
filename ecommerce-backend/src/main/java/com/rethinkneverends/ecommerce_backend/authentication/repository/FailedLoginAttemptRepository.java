package com.rethinkneverends.ecommerce_backend.authentication.repository;

import com.rethinkneverends.ecommerce_backend.authentication.entity.FailedLoginAttempt;
import com.rethinkneverends.ecommerce_backend.authentication.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FailedLoginAttemptRepository extends JpaRepository<FailedLoginAttempt, Integer> {
    Optional<FailedLoginAttempt> findByUser(User user);
}
