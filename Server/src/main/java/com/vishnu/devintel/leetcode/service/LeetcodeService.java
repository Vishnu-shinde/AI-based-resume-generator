package com.vishnu.devintel.leetcode.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.vishnu.devintel.leetcode.dto.LeetcodeAnalytics;
import com.vishnu.devintel.leetcode.dto.LeetcodeProfileResponse;
import com.vishnu.devintel.leetcode.dto.LeetcodeSkill;
import com.vishnu.devintel.utils.ApiServices;

@Service
public class LeetcodeService {

    private final RestClient restClient = RestClient.create();

    @SuppressWarnings("unchecked")
    public LeetcodeProfileResponse fetchCompleteProfile(String username) {

        String query = """
            query getUser($username: String!) {
              matchedUser(username: $username) {
                username
                profile {
                  realName
                  userAvatar
                  reputation
                  ranking
                  school
                  countryName
                }
                submitStats {
                  acSubmissionNum {
                    difficulty
                    count
                  }
                }
                tagProblemCounts {
                  advanced {
                    tagName
                    problemsSolved
                  }
                  intermediate {
                    tagName
                    problemsSolved
                  }
                  fundamental {
                    tagName
                    problemsSolved
                  }
                }
              }
              userContestRanking(username: $username) {
                rating
                attendedContestsCount
                globalRanking
                topPercentage
              }
            }
            """;

        Map<String, Object> body = Map.of(
                "query", query,
                "variables", Map.of("username", username));

        Map<String, Object> response = restClient.post()
                .uri(ApiServices.LEETCODE_PROFILE_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(Map.class);

        System.out.println("response" + response);

        Map<String, Object> data =
                (Map<String, Object>) response.get("data");

        Map<String, Object> matchedUser =
                (Map<String, Object>) data.get("matchedUser");

        if (matchedUser == null) {
            throw new RuntimeException("LeetCode user not found");
        }

        Map<String, Object> profile =
                (Map<String, Object>) matchedUser.get("profile");

        LeetcodeProfileResponse result = new LeetcodeProfileResponse();

        result.setUsername((String) matchedUser.get("username"));
        result.setName((String) profile.get("realName"));
        result.setAvatarUrl((String) profile.get("userAvatar"));
        result.setCountry((String) profile.get("countryName"));
        result.setSchool((String) profile.get("school"));
        result.setReputation((Integer) profile.get("reputation"));

        LeetcodeAnalytics analytics = new LeetcodeAnalytics();

        analytics.setRanking((Integer) profile.get("ranking"));
        analytics.setReputation((Integer) profile.get("reputation"));

        List<Map<String, Object>> submissionStats =
                (List<Map<String, Object>>)
                        ((Map<String, Object>) matchedUser.get("submitStats"))
                                .get("acSubmissionNum");

        for (Map<String, Object> stat : submissionStats) {

            String difficulty = (String) stat.get("difficulty");
            Integer count = (Integer) stat.get("count");

            switch (difficulty) {

                case "All" -> analytics.setTotalSolved(count);
                case "Easy" -> analytics.setEasySolved(count);
                case "Medium" -> analytics.setMediumSolved(count);
                case "Hard" -> analytics.setHardSolved(count);
            }
        }

        Map<String, Object> contest =
                (Map<String, Object>) data.get("userContestRanking");

        if (contest != null) {

            Number rating = (Number) contest.get("rating");
            Number contests = (Number) contest.get("attendedContestsCount");
            Number globalRank = (Number) contest.get("globalRanking");
            Number topPercentage = (Number) contest.get("topPercentage");

            analytics.setContestRating(
                    rating == null ? null : rating.intValue());

            analytics.setContestsAttended(
                    contests == null ? null : contests.intValue());

            analytics.setGlobalContestRank(
                    globalRank == null ? null : globalRank.intValue());

            analytics.setTopPercentage(
                    topPercentage == null ? null : topPercentage.doubleValue());
        }

        result.setLeetcodeAnalytics(analytics);

        Map<String, Object> tagCounts =
                (Map<String, Object>) matchedUser.get("tagProblemCounts");

        List<LeetcodeSkill> skills = List.of(
                "fundamental",
                "intermediate",
                "advanced")
                .stream()
                .flatMap(level -> ((List<Map<String, Object>>) tagCounts.get(level)).stream())
                .map(tag -> {
                    LeetcodeSkill skill = new LeetcodeSkill();
                    skill.setName((String) tag.get("tagName"));
                    skill.setSolvedCount((Integer) tag.get("problemsSolved"));
                    return skill;
                })
                .collect(Collectors.toList());

        result.setLeetcodeSkills(skills);

        return result;
    }
}