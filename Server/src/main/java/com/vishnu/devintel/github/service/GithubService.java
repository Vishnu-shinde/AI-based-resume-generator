package com.vishnu.devintel.github.service;

import com.vishnu.devintel.github.dto.GithubAnalytics;
import com.vishnu.devintel.github.dto.GithubProfileResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.vishnu.devintel.github.dto.GithubRepository;
import com.vishnu.devintel.github.dto.GithubSkill;
import com.vishnu.devintel.utils.ApiServices;

@Service
public class GithubService {

        @Value("${github.token}")
        private String githubToken;

        private final RestClient restClient = RestClient.create();

        @SuppressWarnings("unchecked")
        public GithubProfileResponse fetchProfile(String username) {

                String query = """
                                {
                                  user(login: "%s") {
                                    login
                                    name
                                    bio
                                    avatarUrl
                                    location
                                    company

                                    followers {
                                      totalCount
                                    }

                                    following {
                                      totalCount
                                    }

                                    repositoryCount: repositories(ownerAffiliations: OWNER) {
                                        totalCount
                                    }

                                    repositories(
                                        first: 100,
                                        ownerAffiliations: OWNER,
                                        orderBy: {
                                        field: STARGAZERS,
                                        direction: DESC
                                        }
                                    ) {
                                      nodes {
                                        name
                                        description
                                        stargazerCount
                                        forkCount
                                        url
                                        updatedAt
                                        languages(first: 10) {
                                                edges {
                                                        size
                                                        node {
                                                                name
                                                        }
                                                }
                                        }
                                      }
                                    }

                                    contributionsCollection {
                                      contributionCalendar {
                                        totalContributions
                                      }
                                    }
                                  }
                                }
                                """.formatted(username);

                Map<String, String> body = Map.of("query", query);

                Map<String, Object> response = (Map<String, Object>) restClient.post()
                                .uri(ApiServices.GITHUB_PROFILE_URL)
                                .header("Authorization", "Bearer " + githubToken)
                                .body(body)
                                .retrieve()
                                .body(Map.class);

                if (response.get("data") == null) {
                        throw new RuntimeException(
                                        "GitHub GraphQL Error: " + response);
                }
                Map<String, Object> data = (Map<String, Object>) response.get("data");
                Map<String, Object> user = (Map<String, Object>) data.get("user");

                if (user == null) {
                        throw new RuntimeException(
                                "GitHub returned errors: " + response
                        );
                }

                Map<String, Object> repositoryCount =
                        (Map<String, Object>) user.get("repositoryCount");

                Map<String, Object> repositoriesData =
                        (Map<String, Object>) user.get("repositories");

                List<Map<String, Object>> repositoryNodes =
                        (List<Map<String, Object>>) repositoriesData.get("nodes");

                List<GithubRepository> repositoriesList = new ArrayList<>();

                Map<String, Object> contributionsCollection = (Map<String, Object>) user.get("contributionsCollection");

                Map<String, Object> contributionCalendar = (Map<String, Object>) contributionsCollection
                                .get("contributionCalendar");

                Integer totalContributions = ((Number) contributionCalendar.get("totalContributions")).intValue();

                Map<String, Integer> skillFrequency = new HashMap<>();

                for (Map<String, Object> repo : repositoryNodes) {

                        GithubRepository repository = new GithubRepository();

                        repository.setName(
                                        (String) repo.get("name"));

                        repository.setDescription(
                                        repo.get("description") == null
                                                        ? ""
                                                        : (String) repo.get("description"));

                        repository.setUrl(
                                        (String) repo.get("url"));

                        repository.setStargazerCount(
                                        ((Number) repo.get("stargazerCount")).intValue());

                        repository.setForkCount(
                                        ((Number) repo.get("forkCount")).intValue());

                        repository.setUpdatedAt(
                                (String) repo.get("updatedAt"));

                       Map<String, Object> languages =
                                (Map<String, Object>) repo.get("languages");

                        List<Map<String, Object>> languageEdges =
                                (List<Map<String, Object>>) languages.get("edges");

                        List<String> languageNames =
                                new ArrayList<>();

                        for (Map<String, Object> edge : languageEdges) {

                                Map<String, Object> node =
                                        (Map<String, Object>) edge.get("node");

                                String language =
                                        (String) node.get("name");

                                languageNames.add(language);

                                skillFrequency.put(
                                        language,
                                        skillFrequency.getOrDefault(language, 0) + 1
                                );
                        }

                        repository.setLanguages(languageNames);

                        repositoriesList.add(repository);
                }

                GithubProfileResponse result = new GithubProfileResponse();

                result.setUsername(
                                (String) user.get("login"));

                result.setName(
                                (String) user.get("name"));

                result.setBio(
                                (String) user.get("bio"));
                Map<String, Object> followers = (Map<String, Object>) user.get("followers");

                Map<String, Object> following = (Map<String, Object>) user.get("following");

                List<GithubSkill> skills =
                        skillFrequency.entrySet()
                                .stream()
                                .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                                .map(entry -> {

                                GithubSkill skill = new GithubSkill();

                                skill.setName(entry.getKey());

                                skill.setRepositoryCount(entry.getValue());

                                return skill;
                                })
                                .toList();

                result.setAvatarUrl(
                                (String) user.get("avatarUrl"));

                result.setLocation(
                                (String) user.get("location"));

                result.setCompany(
                                (String) user.get("company"));

                GithubAnalytics analytics = new GithubAnalytics();
                analytics.setFollowers(
                                ((Number) followers.get("totalCount")).intValue());
                analytics.setFollowing(
                                ((Number) following.get("totalCount")).intValue());
                analytics.setRepositoriesCount(((Number) repositoryCount.get("totalCount")).intValue());
                analytics.setRepositoriesList(repositoriesList);
                analytics.setTotalContributions(totalContributions);
                
                result.setAnalytics(analytics);
                result.setGithubSkills(skills);
                return result;
        }
}