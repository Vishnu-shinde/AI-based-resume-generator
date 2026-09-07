package com.vishnu.devintel.codeforces.dto;

import java.util.List;

import lombok.Data;

@Data
public class CodeforcesResponse {

    private String handle;
    private String firstName;
    private String lastName;
    private String country;
    private String city;

    private String rank;
    private String maxRank;

    private Integer rating;
    private Integer maxRating;

    private String avatarUrl;

    private List<CodeforcesSkill> codeforcesSkills;

    private CodeforcesAnalytics codeforcesAnalytics;
}