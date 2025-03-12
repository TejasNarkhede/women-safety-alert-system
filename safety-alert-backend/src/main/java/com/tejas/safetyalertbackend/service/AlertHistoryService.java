package com.tejas.safetyalertbackend.service;

import com.tejas.safetyalertbackend.entity.AlertHistory;
import com.tejas.safetyalertbackend.repository.AlertHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlertHistoryService {

    private final AlertHistoryRepository alertHistoryRepository;

    public AlertHistoryService(AlertHistoryRepository alertHistoryRepository) {
        this.alertHistoryRepository = alertHistoryRepository;
    }

    public void saveAlertHistory(AlertHistory alertHistory) {
        alertHistoryRepository.save(alertHistory);
    }

    public List<AlertHistory> getUserAlertHistory(Long userId) {
        return alertHistoryRepository.findByUserId(userId);
    }
}
