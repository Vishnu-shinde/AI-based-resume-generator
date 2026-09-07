package com.vishnu.devintel.profile.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Education {

    private String institute;
    private String degree;
    private String startYear;
    private String endYear;

}
