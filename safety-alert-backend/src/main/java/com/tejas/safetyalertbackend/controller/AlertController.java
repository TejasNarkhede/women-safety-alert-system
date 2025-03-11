package com.tejas.safetyalertbackend.controller;

import com.tejas.safetyalertbackend.entity.AlertRequest;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.service.EmailService;
import com.tejas.safetyalertbackend.service.EmergencyContactService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {


    private final EmailService emailService;
    private final EmergencyContactService contactService;

    AlertController(EmailService emailService, EmergencyContactService contactService) {
        this.emailService = emailService;
        this.contactService = contactService;
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendEmailAlert(@RequestBody AlertRequest alertRequest) {
        List<EmergencyContact> contacts = contactService.getUserContacts(alertRequest.getUserId());
        if (contacts.isEmpty()) {
            return ResponseEntity.badRequest().body("No emergency contacts found for this user.");
        }
        for (EmergencyContact contact : contacts) {
            emailService.sendEmail(
                    contact.getContactEmail(),
                    "Emergency Alert!",
                    "Message: " + alertRequest.getMessage()
            );
        }
        return ResponseEntity.ok("Emergency alert sent successfully!");
    }
}
