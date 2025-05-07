package com.tejas.safetyalertbackend.controller;

import com.tejas.safetyalertbackend.entity.AlertHistory;
import com.tejas.safetyalertbackend.entity.AlertRequest;
import com.tejas.safetyalertbackend.service.AlertHistoryService;
import com.tejas.safetyalertbackend.service.AlertService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/alerts")
public class AlertController {

    private final AlertService alertService;
    private final AlertHistoryService alertHistoryService;

    AlertController(AlertService alertService, AlertHistoryService alertHistoryService) {
        this.alertService = alertService;
        this.alertHistoryService = alertHistoryService;
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendEmailAlert(@RequestBody AlertRequest alertRequest) {
        String result = alertService.sendEmailAlert(alertRequest);
        if (result.startsWith("Emergency alert sent successfully!")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.badRequest().body(result);
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<AlertHistory>> getAlertHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(alertHistoryService.getUserAlertHistory(userId));
    }
}
