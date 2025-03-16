package com.tejas.safetyalertbackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.service.EmergencyContactService;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "http://localhost:5173")
public class EmergencyContactController {

    private final EmergencyContactService contactService;

    public EmergencyContactController(EmergencyContactService service) {
        this.contactService = service;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addContact(@RequestBody EmergencyContact contact) {
        contactService.addContact(contact);
        return ResponseEntity.ok("Emergency contact added successfully!");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<EmergencyContact>> getContacts(@PathVariable Long userId) {
        return ResponseEntity.ok(contactService.getUserContacts(userId));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.ok("Emergency contact deleted successfully!");
    }
}
