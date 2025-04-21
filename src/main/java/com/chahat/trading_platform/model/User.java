package com.chahat.trading_platform.model;

import com.chahat.trading_platform.domain.USER_ROLE;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String fullName;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String dob;
    private String nationality;
    private String address;
    private String city;
    private String postcode;
    private String country;

    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    private USER_ROLE userRole = USER_ROLE.ROLE_CUSTOMER;
}
