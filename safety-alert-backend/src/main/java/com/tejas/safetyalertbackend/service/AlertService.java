package com.tejas.safetyalertbackend.service;

import com.tejas.safetyalertbackend.entity.AlertHistory;
import com.tejas.safetyalertbackend.entity.AlertRequest;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertService {

    private final EmailService emailService;
    private final EmergencyContactService contactService;
    private final AlertHistoryService alertHistoryService;
    private final UserService userService;

    public AlertService(EmailService emailService, 
                       EmergencyContactService contactService, 
                       AlertHistoryService alertHistoryService,
                       UserService userService) {
        this.emailService = emailService;
        this.contactService = contactService;
        this.alertHistoryService = alertHistoryService;
        this.userService = userService;
    }

    public String sendEmailAlert(AlertRequest alertRequest) {
        // fetch user
        User user = userService.findById(alertRequest.getUserId());
        if (user == null) {
            return "User not found.";
        }

        // fetch emergency contacts
        List<EmergencyContact> contacts = contactService.getUserContacts(alertRequest.getUserId());
        if (contacts.isEmpty()) {
            return "No emergency contacts found for this user.";
        }

        // // build
        // String alertMessage = String.format(
        //     "Emergency Alert from %s (%s)!\n\nMessage: %s",
        //     user.getName(),
        //     user.getEmail(),
        //     alertRequest.getMessage()
        // );

        // Send emails to all contacts
        for (EmergencyContact contact : contacts) {
            String emailBody = buildHtmlEmailBody(alertRequest.getMessage(), user);
            emailService.sendHtmlEmail(
                contact.getContactEmail(),
                "Emergency Alert from "+ user.getName(),
                emailBody
            );
        }

        // Save alert history
        AlertHistory alertHistory = new AlertHistory();
        alertHistory.setUserId(alertRequest.getUserId());
        alertHistory.setMessage(alertRequest.getMessage());
        alertHistoryService.saveAlertHistory(alertHistory);

        return "Emergency alert sent successfully!";
    }

    private String buildHtmlEmailBody(String message, User user) {
        return "<html>"
                + "<body style='font-family: Arial, sans-serif; padding: 20px;'>"
                + "<h2 style='color: red; text-align: center;'>🚨 Emergency Alert 🚨</h2>"
                + "<p><strong>Message:</strong> " + message + "</p>"
                + "<p><strong>Alert By:</strong><br>"
                + "Name: " + user.getName() + "<br>"
                + "Email: " + user.getEmail() + "</p>"
                + "</body></html>";
    }
} 