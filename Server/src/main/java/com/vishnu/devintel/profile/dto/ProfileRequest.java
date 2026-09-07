package com.vishnu.devintel.profile.dto;

import lombok.Data;

@Data
public class ProfileRequest {

    private String githubUrl;
    private String codechefUrl;
    private String codeforcesUrl;
    private String leetcodeUrl;
    private String template;
    private String resumeType;
    private String phone;
    private String email;
    private String summary;
    private String customInstruction;
}