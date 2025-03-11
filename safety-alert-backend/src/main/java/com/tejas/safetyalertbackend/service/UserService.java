package com.tejas.safetyalertbackend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.tejas.safetyalertbackend.entity.User;
import com.tejas.safetyalertbackend.repository.UserRepository;

@Service
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    // Spring Security, hashes passwords using the BCrypt algorithm, which is
    // computationally intensive and resistant to brute-force attacks. This ensures
    // that passwords are securely hashed before being stored in the database.

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if(user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

}
