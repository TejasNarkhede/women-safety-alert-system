package com.tejas.safetyalertbackend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tejas.safetyalertbackend.dto.EmergencyContactDTO;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.service.EmergencyContactService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/contacts")
public class EmergencyContactController {

    private final EmergencyContactService service;

    public EmergencyContactController(EmergencyContactService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public ResponseEntity<EmergencyContact> addContact(@RequestBody EmergencyContactDTO dto) {
        EmergencyContact contact = new EmergencyContact();
        contact.setUserPhoneNumber(dto.getUserPhoneNumber());
        contact.setContactName(dto.getContactName());
        contact.setContactPhoneNumber(dto.getContactPhoneNumber());
        return ResponseEntity.ok(service.addContact(contact));
    }

    @GetMapping("/{userPhone}")
    public ResponseEntity<List<EmergencyContact>> getContacts(@PathVariable String userPhone) {
        return ResponseEntity.ok(service.getContacts(userPhone));
    }

}
