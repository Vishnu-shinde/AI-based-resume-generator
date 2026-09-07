package com.vishnu.devintel.profile.mapper;

import com.vishnu.devintel.codechef.dto.CodechefResponse;
import com.vishnu.devintel.codeforces.dto.CodeforcesResponse;
import com.vishnu.devintel.github.dto.GithubProfileResponse;
import com.vishnu.devintel.leetcode.dto.LeetcodeProfileResponse;
import com.vishnu.devintel.profile.dto.Education;
import com.vishnu.devintel.profile.dto.UserData;

import java.util.ArrayList;
import java.util.List;

public class PlatformToUserMapper {

    private static String firstNonNull(String... values) {

        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value;
            }
        }

        return null;
    }

    public static UserData map(GithubProfileResponse g, CodechefResponse c, CodeforcesResponse cf, LeetcodeProfileResponse lc) {

        UserData user = new UserData();

        String githubName = g != null ? g.getName() : null;

        String codechefName = c != null ? c.getName() : null;

        String leetcodeName = lc != null ? lc.getName() : null;

        String codeforcesName = null;

        if (cf != null) {
            codeforcesName = ((cf.getFirstName() == null ? "" : cf.getFirstName())
                    + " "
                    + (cf.getLastName() == null ? "" : cf.getLastName()))
                    .trim();
        }

        String codeforcesLocation = null;

        if (cf != null
                && cf.getCity() != null
                && cf.getCountry() != null) {

            codeforcesLocation = cf.getCity() + ", " + cf.getCountry();
        }

        user.setName(firstNonNull(githubName, codechefName, codeforcesName, leetcodeName));
        user.setBio(
                g != null ? g.getBio() : null);
        user.setAvatarUrl(
                firstNonNull(
                        g != null ? g.getAvatarUrl() : null,
                        c != null ? c.getImageUrl() : null,
                        cf != null ? cf.getAvatarUrl() : null,
                        lc != null ? lc.getAvatarUrl() : null));
        user.setLocation(
                firstNonNull(
                        codeforcesLocation,
                        g != null ? g.getLocation() : null,
                        c != null ? c.getCountry() : null,
                        lc != null ? lc.getCountry() : null));
        user.setCompany(
                g != null ? g.getCompany() : null);
        user.setProfessionType(
                c != null ? c.getProfessionType() : null);
        user.setCountry(
                firstNonNull(
                        c != null ? c.getCountry() : null,
                        cf != null ? cf.getCountry() : null,
                        lc != null ? lc.getCountry() : null));
        user.setEmail(null);
        if (c != null) {
            Education education = new Education();
            education.setInstitute(
                firstNonNull(
                    c != null ? c.getInstitution() : null,
                    lc != null ? lc.getSchool() : null
                )
            );
            user.setEducation(education);
        }

        List<String> socialLinks = new ArrayList<>();

        if (g != null &&  g.getUsername() != null) {
            socialLinks.add("https://github.com/" + g.getUsername());
        }

        if (c != null  && c.getCodechefUsername() != null) {
            socialLinks.add("https://www.codechef.com/users/" + c.getCodechefUsername());
        }

        if (cf != null && cf.getHandle() != null) {
            socialLinks.add("https://codeforces.com/profile/" + cf.getHandle());
        }

        if (lc != null && lc.getUsername() != null) {
            socialLinks.add("https://leetcode.com/" + lc.getUsername());
        }

        user.setSocialLinks(socialLinks);

        return user;
    }
}