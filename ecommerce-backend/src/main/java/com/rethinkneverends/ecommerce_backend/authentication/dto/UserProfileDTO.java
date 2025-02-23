package com.rethinkneverends.ecommerce_backend.authentication.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
public class UserProfileDTO {

    private String firstName;

    private String lastName;

    private LocalDate dateOfBirth;

    private List<String> roles;

}
