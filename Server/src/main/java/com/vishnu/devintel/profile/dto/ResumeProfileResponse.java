package com.vishnu.devintel.profile.dto;

import java.util.List;

import com.vishnu.devintel.codechef.dto.CodechefAnalytics;
import com.vishnu.devintel.codeforces.dto.CodeforcesAnalytics;
import com.vishnu.devintel.github.dto.GithubAnalytics;
import com.vishnu.devintel.leetcode.dto.LeetcodeAnalytics;

import lombok.Data;

@Data
public class ResumeProfileResponse {

    private UserData userData;

    private List<SkillScore> skills;

    private GithubAnalytics githubAnalytics;

    private CodechefAnalytics codechefAnalytics;

    private CodeforcesAnalytics codeforcesAnalytics;

    private LeetcodeAnalytics leetcodeAnalytics;
}
