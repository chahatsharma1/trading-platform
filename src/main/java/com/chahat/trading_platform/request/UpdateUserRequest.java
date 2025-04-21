package com.chahat.trading_platform.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String dob;
    private String nationality;
    private String address;
    private String city;
    private String postcode;
    private String country;
}
