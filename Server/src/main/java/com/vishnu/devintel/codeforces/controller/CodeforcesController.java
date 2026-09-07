package com.vishnu.devintel.codeforces.controller;

import org.springframework.web.bind.annotation.*;

import com.vishnu.devintel.codeforces.dto.CodeforcesResponse;
import com.vishnu.devintel.codeforces.service.CodeforcesService;

@RestController
@RequestMapping("/api/codeforces")
public class CodeforcesController {

    private final CodeforcesService codeforcesService;

    public CodeforcesController(CodeforcesService codeforcesService) {
        this.codeforcesService = codeforcesService;
    }

    @GetMapping("/{handle}")
    public CodeforcesResponse profile(
            @PathVariable String handle) {

        return codeforcesService.fetchProfile(handle);
    }
}