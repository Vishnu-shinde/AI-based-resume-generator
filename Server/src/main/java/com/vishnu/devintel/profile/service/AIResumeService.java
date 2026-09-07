package com.vishnu.devintel.profile.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.vishnu.devintel.profile.dto.GeneratedResumeResponse;
import com.vishnu.devintel.profile.dto.ProfileRequest;
import com.vishnu.devintel.profile.dto.ResumeProfileResponse;

@Service
public class AIResumeService {

        private GenerateContentResponse generateWithRetry(
                String prompt) throws InterruptedException {

        int maxAttempts = 3;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {

                try {

                return client.models.generateContent(
                        model,
                        prompt,
                        null);

                } catch (com.google.genai.errors.ServerException e) {

                if (attempt == maxAttempts) {
                        throw e;
                }

                long delay = 1000L * (1L << (attempt - 1));

                Thread.sleep(delay);
                }
        }

        throw new RuntimeException("Gemini request failed");
        }

    private final Client client;
    private final ObjectMapper objectMapper;

    @Value("${gemini.model}")
    private String model;

    public AIResumeService(
            @Value("${gemini.api-key}") String apiKey,
            ObjectMapper objectMapper) {

        if (apiKey == null || apiKey.isBlank()) {
            throw new IllegalStateException(
                    "GEMINI_API_KEY is missing. " +
                    "Add it to .env or your environment before starting the app.");
        }

        this.client = Client.builder()
                .apiKey(apiKey)
                .build();

        this.objectMapper = objectMapper;
    }

    public GeneratedResumeResponse generateResume(
            ResumeProfileResponse profile,
            ProfileRequest request) {

        try {

            /*
             * Send the complete collected developer data to Gemini.
             */
            String profileJson =
                    objectMapper.writeValueAsString(profile);

            String prompt = buildPrompt(
                    request,
                    profileJson);

            GenerateContentResponse response =
                generateWithRetry(prompt);

            String content = response.text();

            if (content == null || content.isBlank()) {
                throw new RuntimeException(
                        "Gemini returned an empty response");
            }

            content = cleanJsonResponse(content);

            /*
             * Deserialize only the AI-generated resume content.
             */
            GeneratedResumeResponse result =
                    objectMapper.readValue(
                            content,
                            GeneratedResumeResponse.class);

            /*
             * IMPORTANT:
             *
             * userData comes from our backend/platform APIs.
             * Do not trust Gemini to regenerate it.
             */
            result.setUserData(profile.getUserData());

            result.setTemplate(request.getTemplate());
            result.setResumeType(request.getResumeType());

            /*
             * Social links are also original user data.
             */
            if (profile.getUserData() != null) {
                result.setSocialLinks(
                        profile.getUserData().getSocialLinks());
            }

            return result;

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate resume using Gemini",
                    e);
        }
    }

    private String buildPrompt(
            ProfileRequest request,
            String profileJson) {

        return """
                You are an expert professional resume writer.

                Your task is to generate structured, professional,
                ATS-friendly resume content.

                You MUST use ONLY information present in the
                USER PROFILE DATA.

                You may rewrite and improve wording professionally,
                but you MUST NOT invent information.

                ========================================
                INFORMATION YOU MUST NOT INVENT
                ========================================

                NEVER invent:

                - phone numbers
                - email addresses
                - companies
                - job titles
                - projects
                - technologies
                - achievements
                - certifications
                - education
                - dates
                - metrics
                - work experience
                - URLs
                - organizations
                - responsibilities

                If information is unavailable, return null
                or an empty array.

                ========================================
                RESUME CONFIGURATION
                ========================================

                Resume Type:
                %s

                Template:
                %s

                Custom User Instruction:
                %s

                ========================================
                USER PROFILE DATA
                ========================================

                %s

                ========================================
                YOUR TASK
                ========================================

                Generate ONLY the following resume content:

                1. summary
                2. skills
                3. experience
                4. projects
                5. education
                6. achievements
                7. certifications

                ========================================
                OUTPUT FORMAT
                ========================================

                Return ONLY valid JSON.

                Return exactly this structure:

                {
                  "summary": "",
                  "skills": [],
                  "experience": [],
                  "projects": [],
                  "education": [],
                  "achievements": [],
                  "certifications": []
                }

                ========================================
                SKILLS FORMAT
                ========================================

                The skills field MUST contain ResumeSkill objects.

                Each skill MUST have:

                {
                  "name": "",
                  "proficiency": ""
                }

                Example:

                "skills": [
                  {
                    "name": "JavaScript",
                    "proficiency": "Advanced"
                  },
                  {
                    "name": "React",
                    "proficiency": "Intermediate"
                  }
                ]

                NEVER return:

                "skills": [
                  "JavaScript",
                  "React"
                ]

                ========================================
                EXPERIENCE FORMAT
                ========================================

                Each experience item MUST have:

                {
                  "company": "",
                  "role": "",
                  "startDate": "",
                  "endDate": "",
                  "responsibilities": []
                }

                Do NOT create experience if the profile
                does not contain experience information.

                ========================================
                PROJECT FORMAT
                ========================================

                Each project MUST have:

                {
                  "name": "",
                  "description": "",
                  "technologies": [],
                  "url": ""
                }

                Only include projects that can be supported
                by the provided profile data.

                ========================================
                EDUCATION FORMAT
                ========================================

                The education field MUST contain objects matching
                the Education DTO exactly.

                Each education object MUST contain ONLY:

                {
                "degree": "",
                "institute": "",
                "startYear": null,
                "endYear": null
                }

                IMPORTANT:

                Use "startYear", NOT "startDate".

                Use "endYear", NOT "endDate".

                NEVER return:

                {
                "degree": "",
                "institute": "",
                "startDate": "",
                "endDate": ""
                }

                Only use education information that exists in
                USER PROFILE DATA.

                Do NOT invent:

                - degree
                - institute
                - startYear
                - endYear
                - grades
                - CGPA

                ========================================
                ACHIEVEMENTS
                ========================================

                Only include achievements that are supported
                by the provided profile data.

                Do NOT turn ordinary statistics into fake
                achievements.

                ========================================
                CERTIFICATIONS
                ========================================

                Only include certifications explicitly supported
                by the provided profile data.

                ========================================
                SKILL RANKING
                ========================================

                The USER PROFILE DATA contains SkillScore information.

                Use the finalScore to determine which skills
                should receive higher priority.

                However, do NOT expose these internal fields
                in the final resume:

                - githubRepoCount
                - codechefSubmissionCount
                - codeforcesSubmissionCount
                - leetcodeSolvedCount
                - finalScore

                Only return:

                {
                  "name": "...",
                  "proficiency": "..."
                }

                ========================================
                PROFICIENCY
                ========================================

                Determine proficiency conservatively from the
                available evidence.

                Allowed values:

                - Beginner
                - Intermediate
                - Advanced
                - Expert

                Do not automatically mark a skill as Expert.

                ========================================
                SUMMARY
                ========================================

                Write a concise professional summary.

                The summary must:

                - be ATS-friendly
                - reflect the user's actual profile
                - prioritize relevant technical skills
                - avoid exaggerated claims
                - avoid invented experience
                - normally be 2-4 sentences

                ========================================
                IMPORTANT RULES
                ========================================

                1. Do NOT invent information.

                2. Do NOT add fields outside the requested JSON.

                3. Do NOT return userData.

                4. Do NOT return phone.

                5. Do NOT return title.

                6. Do NOT return template.

                7. Do NOT return resumeType.

                8. Do NOT return socialLinks.

                9. Do NOT return GitHub/CodeChef/
                   Codeforces/LeetCode statistics directly.

                10. Do NOT create fake work experience.

                11. Do NOT create fake projects.

                12. Do NOT create fake certifications.

                13. Do NOT create fake achievements.

                14. Use empty arrays when information is unavailable.

                15. Return ONLY JSON.

                Do NOT return:

                - Markdown
                - ```json
                - explanations
                - comments
                - HTML
                - CSS

                """.formatted(
                        request.getResumeType(),
                        request.getTemplate(),
                        request.getCustomInstruction(),
                        profileJson);
    }

    private String cleanJsonResponse(String content) {

        content = content.trim();

        if (content.startsWith("```json")) {
            content = content.substring(7);
        } else if (content.startsWith("```")) {
            content = content.substring(3);
        }

        if (content.endsWith("```")) {
            content = content.substring(
                    0,
                    content.length() - 3);
        }

        return content.trim();
    }
}