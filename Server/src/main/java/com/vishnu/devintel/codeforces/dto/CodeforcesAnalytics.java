package com.vishnu.devintel.codeforces.dto;

import lombok.Data;

@Data
public class CodeforcesAnalytics {

    private Integer rating;
    
    private Integer maxRating;

    private Integer problemsSolved;

    private Integer contestsParticipated;

    private Integer bestContestRank;

    private Integer ratingGrowth;
}