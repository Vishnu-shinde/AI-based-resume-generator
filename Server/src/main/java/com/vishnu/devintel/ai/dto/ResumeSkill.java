package com.vishnu.devintel.ai.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ResumeSkill {

    private String name;

    private String proficiency;
}