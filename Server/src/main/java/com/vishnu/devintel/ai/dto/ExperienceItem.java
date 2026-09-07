package com.vishnu.devintel.ai.dto;

import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExperienceItem {

    private String company;
    private String role;
    private String startDate;
    private String endDate;
    private List<String> responsibilities;
}