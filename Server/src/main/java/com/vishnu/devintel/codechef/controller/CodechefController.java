package com.vishnu.devintel.codechef.controller;

import com.vishnu.devintel.codechef.dto.CodechefResponse;
import com.vishnu.devintel.codechef.service.CodechefService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/codechef")
public class CodechefController {

    private final CodechefService codechefService;

    public CodechefController(CodechefService codechefService) {
        this.codechefService = codechefService;
    }

    @GetMapping("/{username}")
    public CodechefResponse profile(@PathVariable String username) {
        return codechefService.fetchProfile(username);
    }
}