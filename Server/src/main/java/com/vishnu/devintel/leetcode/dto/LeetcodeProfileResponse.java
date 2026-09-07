package com.vishnu.devintel.leetcode.dto;

import java.util.List;

import lombok.Data;

@Data
public class LeetcodeProfileResponse {

    private String username;

    private String name;

    private String avatarUrl;

    private String country;

    private String school;

    private Integer reputation;

    private LeetcodeAnalytics leetcodeAnalytics;

    private List<LeetcodeSkill> leetcodeSkills;
}
