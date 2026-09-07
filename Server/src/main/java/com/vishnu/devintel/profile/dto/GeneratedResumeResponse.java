package com.vishnu.devintel.profile.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.vishnu.devintel.ai.dto.ExperienceItem;
import com.vishnu.devintel.ai.dto.ProjectItem;
import com.vishnu.devintel.ai.dto.ResumeSkill;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class GeneratedResumeResponse {

    private UserData userData;

    private String summary;

    private List<ResumeSkill> skills;

    private List<ExperienceItem> experience;

    private List<ProjectItem> projects;

    private List<Education> education;

    private List<String> achievements;

    private List<String> certifications;

    private List<String> socialLinks;

    private String template;

    private String resumeType;
}