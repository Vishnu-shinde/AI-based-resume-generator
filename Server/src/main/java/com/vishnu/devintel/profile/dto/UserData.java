package com.vishnu.devintel.profile.dto;

import java.util.List;
import lombok.Data;

@Data
public class UserData {

    private String name;
    private String email;
    private String location;
    private String company;
    private String bio;
    private String avatarUrl;
    private String country;
    private String professionType;

    private Education education;

    private List<String> socialLinks;
}
