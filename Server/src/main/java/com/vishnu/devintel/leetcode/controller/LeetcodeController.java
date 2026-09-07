package com.vishnu.devintel.leetcode.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vishnu.devintel.leetcode.dto.LeetcodeProfileResponse;
import com.vishnu.devintel.leetcode.service.LeetcodeService;

@RestController
@RequestMapping("/api/leetcode")
public class LeetcodeController {

    private final LeetcodeService leetcodeService;

    public LeetcodeController(LeetcodeService leetcodeService) {
        this.leetcodeService = leetcodeService;
    }

    @GetMapping("/{username}")
    public LeetcodeProfileResponse getProfile(
            @PathVariable String username) {

        return leetcodeService.fetchCompleteProfile(username);
    }
}
