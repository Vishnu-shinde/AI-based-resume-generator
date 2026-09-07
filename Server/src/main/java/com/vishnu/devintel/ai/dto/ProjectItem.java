package com.vishnu.devintel.ai.dto;

import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectItem {

    private String name;
    private String description;
    private List<String> technologies;
    private String url;
}