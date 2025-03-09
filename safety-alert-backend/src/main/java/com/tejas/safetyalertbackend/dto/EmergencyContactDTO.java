package com.tejas.safetyalertbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyContactDTO {
    private String userPhoneNumber;
    private String contactName;
    private String contactPhoneNumber;
}
