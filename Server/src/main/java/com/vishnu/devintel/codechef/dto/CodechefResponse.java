package com.vishnu.devintel.codechef.dto;

import java.util.List;

import lombok.Data;

@Data
public class CodechefResponse {

    private String codechefUsername;
    private String name;
    private String country;
    private String institution;
    private String professionType;
    private String imageUrl;
    private List<CodechefSkill> codechefSkills;

    private CodechefAnalytics codechefAnalytics;
}