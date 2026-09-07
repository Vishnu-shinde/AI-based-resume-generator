package com.vishnu.devintel.user;

import org.springframework.web.bind.annotation.*;
import org.mindrot.jbcrypt.BCrypt;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService = new UserService();

    // SIGNUP ENDPOINT
    @PostMapping("/signup")
    public String handleSignup(@RequestBody User newUser) {
        List<User> users = userService.loadUsers();

        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(newUser.getUsername())) {
                return "User already exists!"; 
            }
        }

        String hashedPassword = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
        newUser.setPassword(hashedPassword);

        users.add(newUser);
        userService.saveUsers(users);
        return "Signup successful!";
    }

    // 3. LOGIN ENDPOINT
    @PostMapping("/login")
    public String handleLogin(@RequestBody User loginRequest) {
        List<User> users = userService.loadUsers();

        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(loginRequest.getUsername())) {
                if (BCrypt.checkpw(loginRequest.getPassword(), u.getPassword())) {
                    return "Login successful!";
                }
                return "Invalid password.";
            }
        }
        return "User not found.";
    }
}
