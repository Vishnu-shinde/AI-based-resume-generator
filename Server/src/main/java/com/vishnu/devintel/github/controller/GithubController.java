package com.vishnu.devintel.github.controller;

import com.vishnu.devintel.github.dto.GithubProfileRequest;
import com.vishnu.devintel.github.dto.GithubProfileResponse;
import com.vishnu.devintel.github.service.GithubService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/github")
public class GithubController {

    private final GithubService githubService;

    public GithubController(GithubService githubService) {
        this.githubService = githubService;
    }

    @PostMapping("/profile")
    public GithubProfileResponse profile(
            @RequestBody GithubProfileRequest request
    ) {

        String username = request.getUrl()
                .replace("https://github.com/", "")
                .replace("/", "");

        return githubService.fetchProfile(username);
    }
}