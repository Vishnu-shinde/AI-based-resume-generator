package com.vishnu.devintel.profile.controller;

import org.springframework.web.bind.annotation.*;

import com.vishnu.devintel.profile.dto.GeneratedResumeResponse;
import com.vishnu.devintel.profile.dto.ProfileRequest;
import com.vishnu.devintel.profile.service.ResumeService;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/generate")
    public GeneratedResumeResponse generate(
            @RequestBody ProfileRequest request) {

        return resumeService.buildResume(request);
    }
}