package com.vishnu.devintel.profile.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.vishnu.devintel.codechef.dto.CodechefResponse;
import com.vishnu.devintel.codechef.dto.CodechefSkill;
import com.vishnu.devintel.codechef.service.CodechefService;
import com.vishnu.devintel.codeforces.dto.CodeforcesResponse;
import com.vishnu.devintel.codeforces.dto.CodeforcesSkill;
import com.vishnu.devintel.codeforces.service.CodeforcesService;
import com.vishnu.devintel.github.dto.GithubProfileResponse;
import com.vishnu.devintel.github.dto.GithubSkill;
import com.vishnu.devintel.github.service.GithubService;
import com.vishnu.devintel.leetcode.dto.LeetcodeProfileResponse;
import com.vishnu.devintel.leetcode.dto.LeetcodeSkill;
import com.vishnu.devintel.leetcode.service.LeetcodeService;
import com.vishnu.devintel.profile.dto.GeneratedResumeResponse;
import com.vishnu.devintel.profile.dto.ProfileRequest;
import com.vishnu.devintel.profile.dto.ResumeProfileResponse;
import com.vishnu.devintel.profile.dto.SkillScore;
import com.vishnu.devintel.profile.mapper.PlatformToUserMapper;

@Service
public class ResumeService {

    private final GithubService githubService;
    private final CodechefService codechefService;
    private final CodeforcesService codeforcesService;
    private final LeetcodeService leetcodeService;
    private final AIResumeService aiResumeService;

    public ResumeService(
            GithubService githubService,
            CodechefService codechefService,
            CodeforcesService codeforcesService,
            LeetcodeService leetcodeService,
            AIResumeService aiResumeService) {

        this.githubService = githubService;
        this.codechefService = codechefService;
        this.codeforcesService = codeforcesService;
        this.leetcodeService = leetcodeService;
        this.aiResumeService = aiResumeService;
    }

    /**
     * Normalizes programming language / skill names
     * coming from different platforms.
     */
    private String normalizeSkill(String skill) {

        if (skill == null) {
            return null;
        }

        skill = skill.trim();

        if (skill.isBlank()) {
            return null;
        }

        String lower = skill.toLowerCase();

        if (lower.contains("c++")) {
            return "C++";
        }

        if (lower.contains("python")
                || lower.contains("pypy")) {
            return "Python";
        }

        if (lower.equals("java")
                || lower.equals("java 8")) {
            return "Java";
        }

        if (lower.equals("javascript")) {
            return "JavaScript";
        }

        if (lower.equals("typescript")) {
            return "TypeScript";
        }

        return skill;
    }

    /**
     * Extracts username/handle from platform URLs.
     *
     * Example:
     * https://github.com/user
     * -> user
     */
    private String extractHandle(String url) {

        if (url == null || url.isBlank()) {
            return null;
        }

        url = url.trim();

        int queryIndex = url.indexOf('?');

        if (queryIndex != -1) {
            url = url.substring(0, queryIndex);
        }

        while (url.endsWith("/")) {
            url = url.substring(0, url.length() - 1);
        }

        int lastSlash = url.lastIndexOf('/');

        return lastSlash >= 0
                ? url.substring(lastSlash + 1)
                : url;
    }

    /**
     * Main resume generation flow.
     *
     * Frontend
     *     ↓
     * /api/resume/generate
     *     ↓
     * Fetch platform data
     *     ↓
     * Build ResumeProfileResponse
     *     ↓
     * AIResumeService
     *     ↓
     * Final Resume JSON
     *     ↓
     * Frontend
     */
    public GeneratedResumeResponse buildResume(ProfileRequest request) {

        /*
         * ---------------------------------------------------------
         * 1. Extract platform usernames
         * ---------------------------------------------------------
         */

        String githubUsername =
                extractHandle(request.getGithubUrl());

        String codechefUsername =
                extractHandle(request.getCodechefUrl());

        String codeforcesUsername =
                extractHandle(request.getCodeforcesUrl());

        String leetcodeUsername =
                extractHandle(request.getLeetcodeUrl());


        /*
         * ---------------------------------------------------------
         * 2. Fetch platform data
         * ---------------------------------------------------------
         */

        GithubProfileResponse github = null;

        if (githubUsername != null && !githubUsername.isBlank()) {

            github =
                    githubService.fetchProfile(githubUsername);
        }


        CodechefResponse codechef = null;

        if (codechefUsername != null && !codechefUsername.isBlank()) {

            codechef =
                    codechefService.fetchProfile(codechefUsername);
        }


        CodeforcesResponse codeforces = null;

        if (codeforcesUsername != null
                && !codeforcesUsername.isBlank()) {

            codeforces =
                    codeforcesService
                            .fetchCompleteProfile(codeforcesUsername);
        }


        LeetcodeProfileResponse leetcode = null;

        if (leetcodeUsername != null
                && !leetcodeUsername.isBlank()) {

            leetcode =
                    leetcodeService
                            .fetchCompleteProfile(leetcodeUsername);
        }


        /*
         * ---------------------------------------------------------
         * 3. Create common user profile
         * ---------------------------------------------------------
         */

        ResumeProfileResponse response =
                new ResumeProfileResponse();

        response.setUserData(
                PlatformToUserMapper.map(
                        github,
                        codechef,
                        codeforces,
                        leetcode
                )
        );


        /*
         * ---------------------------------------------------------
         * 4. Build combined skills
         * ---------------------------------------------------------
         */

        Map<String, SkillScore> skills =
                new HashMap<>();


        /*
         * ---------------------------------------------------------
         * GitHub Skills
         * ---------------------------------------------------------
         */

        if (github != null
                && github.getGithubSkills() != null) {

            for (GithubSkill githubSkill
                    : github.getGithubSkills()) {

                String skillName =
                        normalizeSkill(
                                githubSkill.getName()
                        );

                if (skillName == null
                        || skillName.isBlank()) {
                    continue;
                }

                SkillScore skill =
                        skills.computeIfAbsent(
                                skillName,
                                k -> new SkillScore()
                        );

                skill.setName(skillName);

                int currentRepoCount =
                        skill.getGithubRepoCount() == null
                                ? 0
                                : skill.getGithubRepoCount();

                int repoCount =
                        githubSkill.getRepositoryCount() == null
                                ? 0
                                : githubSkill.getRepositoryCount();

                skill.setGithubRepoCount(
                        currentRepoCount + repoCount
                );
            }
        }


        /*
         * ---------------------------------------------------------
         * CodeChef Skills
         * ---------------------------------------------------------
         */

        if (codechef != null
                && codechef.getCodechefSkills() != null) {

            for (CodechefSkill codechefSkill
                    : codechef.getCodechefSkills()) {

                String skillName =
                        normalizeSkill(
                                codechefSkill.getName()
                        );

                if (skillName == null
                        || skillName.isBlank()) {
                    continue;
                }

                SkillScore skill =
                        skills.computeIfAbsent(
                                skillName,
                                k -> new SkillScore()
                        );

                skill.setName(skillName);

                int currentSubmissionCount =
                        skill.getCodechefSubmissionCount() == null
                                ? 0
                                : skill.getCodechefSubmissionCount();

                int submissionCount =
                        codechefSkill.getSubmissionCount() == null
                                ? 0
                                : codechefSkill.getSubmissionCount();

                skill.setCodechefSubmissionCount(
                        currentSubmissionCount
                                + submissionCount
                );
            }
        }


        /*
         * ---------------------------------------------------------
         * Codeforces Skills
         * ---------------------------------------------------------
         */

        if (codeforces != null
                && codeforces.getCodeforcesSkills() != null) {

            for (CodeforcesSkill codeforcesSkill
                    : codeforces.getCodeforcesSkills()) {

                String skillName =
                        normalizeSkill(
                                codeforcesSkill.getName()
                        );

                if (skillName == null
                        || skillName.isBlank()) {
                    continue;
                }

                SkillScore skill =
                        skills.computeIfAbsent(
                                skillName,
                                k -> new SkillScore()
                        );

                skill.setName(skillName);

                int currentProblemCount =
                        skill.getCodeforcesSubmissionCount() == null
                                ? 0
                                : skill.getCodeforcesSubmissionCount();

                int problemCount =
                        codeforcesSkill.getProblemCount() == null
                                ? 0
                                : codeforcesSkill.getProblemCount();

                skill.setCodeforcesSubmissionCount(
                        currentProblemCount
                                + problemCount
                );
            }
        }


        /*
         * ---------------------------------------------------------
         * LeetCode Skills
         * ---------------------------------------------------------
         */

        if (leetcode != null
                && leetcode.getLeetcodeSkills() != null) {

            for (LeetcodeSkill leetcodeSkill
                    : leetcode.getLeetcodeSkills()) {

                String skillName =
                        normalizeSkill(
                                leetcodeSkill.getName()
                        );

                if (skillName == null
                        || skillName.isBlank()) {
                    continue;
                }

                SkillScore skill =
                        skills.computeIfAbsent(
                                skillName,
                                k -> new SkillScore()
                        );

                skill.setName(skillName);

                int currentSolvedCount =
                        skill.getLeetcodeSolvedCount() == null
                                ? 0
                                : skill.getLeetcodeSolvedCount();

                int solvedCount =
                        leetcodeSkill.getSolvedCount() == null
                                ? 0
                                : leetcodeSkill.getSolvedCount();

                skill.setLeetcodeSolvedCount(
                        currentSolvedCount
                                + solvedCount
                );
            }
        }


        /*
         * ---------------------------------------------------------
         * 5. Calculate skill score
         * ---------------------------------------------------------
         */

        for (SkillScore skill : skills.values()) {

            int repoCount =
                    skill.getGithubRepoCount() == null
                            ? 0
                            : skill.getGithubRepoCount();

            int codechefSubmissions =
                    skill.getCodechefSubmissionCount() == null
                            ? 0
                            : skill.getCodechefSubmissionCount();

            int codeforcesProblems =
                    skill.getCodeforcesSubmissionCount() == null
                            ? 0
                            : skill.getCodeforcesSubmissionCount();

            int leetcodeSolved =
                    skill.getLeetcodeSolvedCount() == null
                            ? 0
                            : skill.getLeetcodeSolvedCount();


            double finalScore =
                    (repoCount * 10)
                    +
                    (codechefSubmissions * 0.1)
                    +
                    (codeforcesProblems * 0.2)
                    +
                    (leetcodeSolved * 0.2);

            skill.setFinalScore(finalScore);
        }


        /*
         * ---------------------------------------------------------
         * 6. Rank skills
         * ---------------------------------------------------------
         */

        List<SkillScore> rankedSkillScores =
                skills.values()
                        .stream()
                        .sorted(
                                (a, b) ->
                                        Double.compare(
                                                b.getFinalScore(),
                                                a.getFinalScore()
                                        )
                        )
                        .toList();

        response.setSkills(rankedSkillScores);


        /*
         * ---------------------------------------------------------
         * 7. Add platform analytics
         * ---------------------------------------------------------
         */

        if (github != null) {

            response.setGithubAnalytics(
                    github.getAnalytics()
            );
        }

        if (codechef != null) {

            response.setCodechefAnalytics(
                    codechef.getCodechefAnalytics()
            );
        }

        if (codeforces != null) {

            response.setCodeforcesAnalytics(
                    codeforces.getCodeforcesAnalytics()
            );
        }

        if (leetcode != null) {

            response.setLeetcodeAnalytics(
                    leetcode.getLeetcodeAnalytics()
            );
        }


        /*
         * ---------------------------------------------------------
         * 8. Send EVERYTHING to AI
         * ---------------------------------------------------------
         *
         * At this point response contains:
         *
         * - User information
         * - Skills
         * - GitHub analytics
         * - CodeChef analytics
         * - Codeforces analytics
         * - LeetCode analytics
         *
         * request contains:
         *
         * - template
         * - resumeType
         * - phone
         * - email
         * - summary
         * - customInstruction
         *
         * AIResumeService combines both.
         */

        return aiResumeService.generateResume(
            response,
            request
        );
    }
}