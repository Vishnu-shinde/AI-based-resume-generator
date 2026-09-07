package com.vishnu.devintel.codechef.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.vishnu.devintel.codechef.dto.CodechefAnalytics;
import com.vishnu.devintel.codechef.dto.CodechefResponse;
import com.vishnu.devintel.codechef.dto.CodechefSkill;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class CodechefService {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final ExecutorService executor = Executors.newFixedThreadPool(10);

    private void processPage(
            String json,
            Map<String, Integer> languageFrequency)
            throws Exception {

        JsonNode root = MAPPER.readTree(json);

        String html = root.get("content").asText();

        Document pageDoc = Jsoup.parse(html);

        Elements rows = pageDoc.select("table.dataTable tbody tr");

        for (Element row : rows) {

            Elements cols = row.select("td");

            if (cols.size() < 4) {
                continue;
            }

            String language = cols.get(3)
                    .text()
                    .trim();

            if (!language.isBlank()) {

                languageFrequency.merge(
                        language,
                        1,
                        (a, b) -> a + b);
            }
        }
    }

    @Cacheable("codechefProfiles")
    public CodechefResponse fetchProfile(String username) {
        try {

            String url = "https://www.codechef.com/users/" + username;

            Document document = Jsoup.connect(url)
                    .userAgent("Mozilla/5.0")
                    .timeout(10000)
                    .get();

            String name = document.select(".h2-style").text();

            String codechefusername = document.select(".m-username--link")
                    .text();

            String country = document.select(".user-country-name")
                    .text();

            Element ratingElement =
                document.selectFirst(".rating");

            String stars =
                    ratingElement != null
                            ? ratingElement.text()
                            : "0★";

            String institution = null;

            for (var li : document.select(".user-details li")) {

                String label = li.select("label").text();

                if ("Institution:".equals(label)) {
                    institution = li.select("span").text();
                    break;
                }
            }

            String professionType = null;

            for (var li : document.select(".user-details li")) {

                String label = li.select("label").text();

                if ("Student/Professional:".equals(label)) {
                    professionType = li.select("span").text();
                    break;
                }
            }

            String imageUrl = document.select(".profileImage")
                    .attr("src");
            CodechefResponse response = new CodechefResponse();
            CodechefAnalytics analytics = new CodechefAnalytics();

            Map<String, Integer> languageFrequency = new ConcurrentHashMap<>();

            String firstPageJson = Jsoup.connect(
                    "https://www.codechef.com/recent/user?page=0&user_handle="
                            + username)
                    .ignoreContentType(true)
                    .timeout(10000)
                    .execute()
                    .body();

            JsonNode firstNode = MAPPER.readTree(firstPageJson);

            int maxPage = firstNode.get("max_page").asInt();

            maxPage = Math.min(maxPage, 200);

            processPage(firstPageJson, languageFrequency);

            List<CompletableFuture<Void>> futures = new ArrayList<>();

            for (int page = 1; page < maxPage; page++) {

                int currentPage = page;

                CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {

                    try {

                        String apiUrl = "https://www.codechef.com/recent/user?page="
                                + currentPage
                                + "&user_handle="
                                + username;

                        String json = Jsoup.connect(apiUrl)
                                .ignoreContentType(true)
                                .userAgent("Mozilla/5.0")
                                .timeout(10000)
                                .execute()
                                .body();

                        processPage(json, languageFrequency);

                    } catch (Exception e) {

                        e.printStackTrace();
                    }

                }, executor);

                futures.add(future);
            }

            CompletableFuture
                    .allOf(
                            futures.toArray(
                                    new CompletableFuture[0]))
                    .join();

            List<CodechefSkill> skills = languageFrequency.entrySet()
                    .stream()
                    .sorted((a, b) -> b.getValue().compareTo(a.getValue()))
                    .map(entry -> {

                        CodechefSkill skill = new CodechefSkill();

                        skill.setName(entry.getKey());
                        skill.setSubmissionCount(entry.getValue());

                        return skill;
                    })
                    .toList();

            response.setName(name);
            response.setCodechefUsername(codechefusername);
            response.setCountry(country);
            response.setInstitution(institution);
            response.setProfessionType(professionType);
            response.setImageUrl(imageUrl);
            response.setCodechefSkills(skills);

            analytics.setCodeChefStars(stars);
            response.setCodechefAnalytics(analytics);

            return response;

        } catch (Exception e) {

            System.err.println(
                "CodeChef unavailable for user "
                + username
                + ". Continuing without CodeChef data."
            );

            return null;
        }
    }
}