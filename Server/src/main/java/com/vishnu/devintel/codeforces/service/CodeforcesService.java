package com.vishnu.devintel.codeforces.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.vishnu.devintel.codeforces.dto.CodeforcesAnalytics;
import com.vishnu.devintel.codeforces.dto.CodeforcesResponse;
import com.vishnu.devintel.codeforces.dto.CodeforcesSkill;
import com.vishnu.devintel.utils.ApiServices;

@Service
public class CodeforcesService {

    private final RestClient restClient = RestClient.create();

    @SuppressWarnings("unchecked")
    public CodeforcesResponse fetchProfile(String handle) {

        try{

                Map<String, Object> response = restClient.get()
                        .uri(ApiServices.CODEFORCES_PROFILE_URL + handle)
                        .retrieve()
                        .body(Map.class);

                List<Map<String, Object>> resultList = (List<Map<String, Object>>) response.get("result");

                Map<String, Object> user = resultList.get(0);

                CodeforcesResponse result = new CodeforcesResponse();

                result.setHandle((String) user.get("handle"));
                result.setFirstName((String) user.get("firstName"));
                result.setLastName((String) user.get("lastName"));
                result.setCountry((String) user.get("country"));
                result.setCity((String) user.get("city"));
                result.setRank((String) user.get("rank"));
                result.setMaxRank((String) user.get("maxRank"));

                result.setRating(
                        user.get("rating") == null
                                ? null
                                : ((Number) user.get("rating")).intValue());

                result.setMaxRating(
                        user.get("maxRating") == null
                                ? null
                                : ((Number) user.get("maxRating")).intValue());

                result.setAvatarUrl((String) user.get("avatar"));
                return result;
        } catch (Exception e) {

                System.err.println(
                        "Codeforces profile unavailable for "
                        + handle
                        + ": "
                        + e.getMessage()
                );

                return new CodeforcesResponse();
        }
    }

    @SuppressWarnings("unchecked")
    public CodeforcesAnalytics fetchRating(String handle) {

        try{
                Map<String, Object> response = restClient.get()
                        .uri(ApiServices.CODEFORCES_CONTEST_URL + handle)
                        .retrieve()
                        .body(Map.class);

                List<Map<String, Object>> contests = (List<Map<String, Object>>) response.get("result");

                int contestsParticipated = contests.size();

                int bestRank = Integer.MAX_VALUE;

                for (Map<String, Object> contest : contests) {

                int rank = ((Number) contest.get("rank")).intValue();

                bestRank = Math.min(bestRank, rank);
                }

                int ratingGrowth = 0;

                if (!contests.isEmpty()) {

                Map<String, Object> firstContest = contests.get(0);

                Map<String, Object> lastContest = contests.get(contests.size() - 1);

                ratingGrowth = ((Number) lastContest.get("newRating")).intValue()
                        -
                        ((Number) firstContest.get("oldRating")).intValue();
                }

                CodeforcesAnalytics analytics = new CodeforcesAnalytics();

                analytics.setContestsParticipated(
                        contestsParticipated);

                analytics.setBestContestRank(
                        bestRank == Integer.MAX_VALUE ? null : bestRank);

                analytics.setRatingGrowth(
                        ratingGrowth);

                return analytics;
        } catch (Exception e) {

                System.err.println(
                        "Codeforces rating unavailable for "
                        + handle
                        + ": "
                        + e.getMessage()
                );

                return new CodeforcesAnalytics();
        }
    }

@SuppressWarnings("unchecked")
public CodeforcesResponse fetchSubmissions(String handle) {

    CodeforcesResponse result = new CodeforcesResponse();

    CodeforcesAnalytics analytics = new CodeforcesAnalytics();

    result.setCodeforcesAnalytics(analytics);

    try {

        Map<String, Object> response = restClient.get()
                .uri(ApiServices.CODEFORCES_SUBMISSIONS_URL + handle)
                .retrieve()
                .body(Map.class);

        if (response == null) {
            analytics.setProblemsSolved(0);
            result.setCodeforcesSkills(List.of());
            return result;
        }

        Object resultObject = response.get("result");

        if (!(resultObject instanceof List<?>)) {
            analytics.setProblemsSolved(0);
            result.setCodeforcesSkills(List.of());
            return result;
        }

        List<Map<String, Object>> submissions =
                (List<Map<String, Object>>) resultObject;

        Set<String> solvedProblems = new HashSet<>();
        Map<String, Integer> languageFrequency = new HashMap<>();

        for (Map<String, Object> submission : submissions) {

            if (submission == null) {
                continue;
            }

            String verdict =
                    (String) submission.get("verdict");

            if (!"OK".equals(verdict)) {
                continue;
            }

            Map<String, Object> problem =
                    (Map<String, Object>) submission.get("problem");

            if (problem != null) {

                Object contestId =
                        problem.get("contestId");

                Object index =
                        problem.get("index");

                if (contestId != null && index != null) {

                    solvedProblems.add(
                            contestId + "-" + index
                    );
                }
            }

            String language =
                    (String) submission.get("programmingLanguage");

            if (language != null && !language.isBlank()) {

                languageFrequency.compute(
                        language,
                        (key, count) -> count == null ? 1 : count + 1
                );
            }
        }

        List<CodeforcesSkill> skills =
                languageFrequency.entrySet()
                        .stream()
                        .sorted(
                            (a, b) ->
                                b.getValue()
                                 .compareTo(a.getValue())
                        )
                        .map(entry -> {

                            CodeforcesSkill skill =
                                    new CodeforcesSkill();

                            skill.setName(entry.getKey());
                            skill.setProblemCount(
                                    entry.getValue()
                            );

                            return skill;
                        })
                        .toList();

        analytics.setProblemsSolved(
                solvedProblems.size()
        );

        result.setCodeforcesSkills(skills);

        return result;

    } catch (Exception e) {

        // Keep the response valid even if Codeforces fails.
        analytics.setProblemsSolved(0);
        result.setCodeforcesSkills(List.of());

        return result;
    }
}

    public CodeforcesResponse fetchCompleteProfile(String handle) {
        CodeforcesResponse profile =
        fetchProfile(handle);

        CodeforcesAnalytics ratingAnalytics =
                fetchRating(handle);

        CodeforcesResponse submissionData =
                fetchSubmissions(handle);

        CodeforcesResponse result = new CodeforcesResponse();

        result.setHandle(profile.getHandle());
        result.setFirstName(profile.getFirstName());
        result.setLastName(profile.getLastName());
        result.setCountry(profile.getCountry());
        result.setCity(profile.getCity());
        result.setRank(profile.getRank());
        result.setMaxRank(profile.getMaxRank());
        result.setRating(profile.getRating());
        result.setMaxRating(profile.getMaxRating());
        result.setAvatarUrl(profile.getAvatarUrl());

        result.setCodeforcesSkills(
                submissionData.getCodeforcesSkills()
        );

        CodeforcesAnalytics analytics = new CodeforcesAnalytics();

    if (ratingAnalytics != null) {

        analytics.setContestsParticipated(
            ratingAnalytics.getContestsParticipated()
        );

        analytics.setBestContestRank(
            ratingAnalytics.getBestContestRank()
        );

        analytics.setRatingGrowth(
            ratingAnalytics.getRatingGrowth()
        );
    }

        if (submissionData.getCodeforcesAnalytics() != null) {

        analytics.setProblemsSolved(
            submissionData
                .getCodeforcesAnalytics()
                .getProblemsSolved()
        );
    } else {
        analytics.setProblemsSolved(0);
    }

    result.setCodeforcesAnalytics(analytics);

    return result;
    }
}