package com.tejas.safetyalertbackend.controller;

import com.tejas.safetyalertbackend.entity.AlertHistory;
import com.tejas.safetyalertbackend.entity.AlertRequest;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.service.AlertHistoryService;
import com.tejas.safetyalertbackend.service.EmailService;
import com.tejas.safetyalertbackend.service.EmergencyContactService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/alerts")
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {


    private final EmailService emailService;
    private final EmergencyContactService contactService;
    private final AlertHistoryService alertHistoryService;

    AlertController(EmailService emailService, EmergencyContactService contactService, AlertHistoryService alertHistoryService) {
        this.emailService = emailService;
        this.contactService = contactService;
        this.alertHistoryService = alertHistoryService;
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

        AlertHistory alertHistory = new AlertHistory();
        alertHistory.setUserId(alertRequest.getUserId());
        alertHistory.setMessage(alertRequest.getMessage());
        alertHistoryService.saveAlertHistory(alertHistory);

        return ResponseEntity.ok("Emergency alert sent successfully!");
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<AlertHistory>> getAlertHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(alertHistoryService.getUserAlertHistory(userId));
    }
}
