package com.tejas.safetyalertbackend.entity;

import lombok.Data;

@Data
public class AlertRequest {
    private Long userId;
    private String message;
}
