package com.tejas.safetyalertbackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.safetyalertbackend.service.TwilioService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sos")
public class SOSController {

    private final TwilioService twilioService;

    SOSController(TwilioService twilioService) {
        this.twilioService = twilioService;
    }

    @PostMapping("/sms")
    public ResponseEntity<String> sendSmsAlert(@RequestParam String phoneNumber,
            @RequestParam String message) {
        twilioService.sendSms(phoneNumber, message);
        return ResponseEntity.ok("SOS Alert Sent via SMS!");
    }

    @PostMapping("/whatsapp")
    public ResponseEntity<String> sendWhatsAppAlert(@RequestParam String phoneNumber,
            @RequestParam String message) {
        twilioService.sendWhatsApp(phoneNumber, message);
        return ResponseEntity.ok("SOS Alert Sent via WhatsApp!");
    }

}
