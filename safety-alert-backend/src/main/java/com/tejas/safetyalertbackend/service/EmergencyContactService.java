package com.tejas.safetyalertbackend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.tejas.safetyalertbackend.entity.EmergencyContact;
import com.tejas.safetyalertbackend.repository.EmergencyContactRepository;

@Service
public class EmergencyContactService {

    private EmergencyContactRepository repo;

    EmergencyContactService(EmergencyContactRepository repo) {
        this.repo = repo;
    }

    public EmergencyContact addContact(EmergencyContact contact) {
        return repo.save(contact);
    }

    public List<EmergencyContact> getContacts(String userPhoneNumber) {
        return repo.findByUserPhoneNumber(userPhoneNumber);
    }
}
