package com.tejas.safetyalertbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.tejas.safetyalertbackend.entity.User;
import com.tejas.safetyalertbackend.service.UserService;
import com.tejas.safetyalertbackend.service.EmailService;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private EmailService emailService;
    private PasswordEncoder passwordEncoder;

    UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
        this.emailService = emailService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        }
        return ResponseEntity.badRequest().body("Invalid email or password!");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody User updatedUser) {
        User existingUser = userService.findByEmail(updatedUser.getEmail());
        if(existingUser == null) return ResponseEntity.badRequest().body("User not found");
        if(updatedUser.getName() != null && !updatedUser.getName().isEmpty()) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        userService.saveUser(existingUser);
        return ResponseEntity.ok("Profile updated successfully!");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userService.findByEmail(email);
        
        if (user == null) {
            return ResponseEntity.badRequest().body("Email not found!");
        }

        // Generate a random temporary password
        String temporaryPassword = generateTemporaryPassword();
        
        // Update user's password in database
        user.setPassword(passwordEncoder.encode(temporaryPassword));
        userService.saveUser(user);

        // Send email with temporary password
        emailService.sendEmail(
            email,
            "Password Reset - Women Safety Alert System",
            "Your temporary password is: " + temporaryPassword + 
            "\nPlease login and change your password immediately."
        );

        return ResponseEntity.ok("Password reset instructions sent to your email!");
    }

    private String generateTemporaryPassword() {
        // Generate a random 10-character password
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 10; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}