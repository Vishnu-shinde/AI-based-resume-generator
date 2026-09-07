package com.vishnu.devintel.github.dto;

import java.util.List;

import lombok.Data;

@Data
public class GithubProfileResponse {

    private String username;
    private String name;
    private String bio;
    private String avatarUrl;
    private String location;
    private String company;

    private GithubAnalytics analytics;
    private List<GithubSkill> githubSkills;
}