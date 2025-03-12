package com.tejas.safetyalertbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "alert_history")
public class AlertHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String message;
    private LocalDateTime timestamp;

    public AlertHistory() {
        this.timestamp = LocalDateTime.now();
    }
}
