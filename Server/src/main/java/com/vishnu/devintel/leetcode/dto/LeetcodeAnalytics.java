package com.vishnu.devintel.leetcode.dto;

import lombok.Data;

@Data
public class LeetcodeAnalytics {

    private Integer ranking;

    private Integer reputation;

    private Integer totalSolved;

    private Integer easySolved;

    private Integer mediumSolved;

    private Integer hardSolved;

    private Integer contestRating;

    private Integer contestsAttended;

    private Integer globalContestRank;

    private Double topPercentage;
}
