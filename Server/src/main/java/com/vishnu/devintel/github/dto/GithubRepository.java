package com.vishnu.devintel.github.dto;

import java.util.List;

public class GithubRepository {

    private String name;
    private String description;
    private Integer stargazerCount;
    private Integer forkCount;
    private String url;
    private String updatedAt;
    private List<String> languages;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStargazerCount() {
        return stargazerCount;
    }

    public void setStargazerCount(Integer stargazerCount) {
        this.stargazerCount = stargazerCount;
    }

    public Integer getForkCount() {
        return forkCount;
    }

    public void setForkCount(Integer forkCount) {
        this.forkCount = forkCount;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }
}