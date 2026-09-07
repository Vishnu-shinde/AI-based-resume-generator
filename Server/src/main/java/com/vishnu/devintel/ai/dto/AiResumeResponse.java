package com.vishnu.devintel.ai.dto;

import java.util.List;

import com.vishnu.devintel.profile.dto.Education;

import lombok.Data;

@Data
public class AiResumeResponse {

    private String name;
    private String title;
    private String email;
    private String phone;
    private String location;

    private String summary;

    private List<String> skills;

    private List<ExperienceItem> experience;

    private List<ProjectItem> projects;

    private List<Education> education;

    private List<String> achievements;

    private List<String> certifications;

    private List<String> socialLinks;
}
