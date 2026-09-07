package com.vishnu.devintel.github.dto;

import java.util.List;

import lombok.Data;

@Data
public class GithubAnalytics {

    private Integer totalContributions;
    private Integer followers;
    private Integer following;
    private Integer repositoriesCount;

    private List<GithubOrganization> organizations;
    private List<GithubRepository> repositoriesList;
}