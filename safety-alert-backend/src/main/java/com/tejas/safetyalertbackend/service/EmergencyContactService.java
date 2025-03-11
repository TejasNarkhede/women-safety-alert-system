package com.tejas.safetyalertbackend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.repository.EmergencyContactRepository;

@Service
public class EmergencyContactService {

    private EmergencyContactRepository contactRepository;

    EmergencyContactService(EmergencyContactRepository repo) {
        this.contactRepository = repo;
    }

    public EmergencyContact addContact(EmergencyContact contact) {
        return contactRepository.save(contact);
    }

    public List<EmergencyContact> getUserContacts(Long userId) {
        return contactRepository.findByUserId(userId);
    }

    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}
