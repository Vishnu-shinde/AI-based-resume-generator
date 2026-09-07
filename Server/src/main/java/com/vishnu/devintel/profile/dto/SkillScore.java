package com.vishnu.devintel.profile.dto;

import lombok.Data;

@Data
public class SkillScore {

    private String name;

    private Integer githubRepoCount;

    private Integer codechefSubmissionCount;

    private Integer codeforcesSubmissionCount;

    private Integer leetcodeSolvedCount;

    private Double finalScore;
}
