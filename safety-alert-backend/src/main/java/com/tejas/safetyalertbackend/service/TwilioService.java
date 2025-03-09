package com.tejas.safetyalertbackend.service;

import com.twilio.Twilio;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class TwilioService {

    @Value("${TWILIO_ACCOUNT_SID}")
    private String accountSid;

    @Value("${TWILIO_AUTH_TOKEN}")
    private String authToken;

    @Value("${TWILIO_PHONE_NUMBER}")
    private String twilioPhoneNumber;

    public void sendSms(String to, String messageBody) {
        Twilio.init(accountSid, authToken);
        Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(twilioPhoneNumber),
                messageBody).create();
    }

    public void sendWhatsApp(String to, String messageBody) {
        Twilio.init(accountSid, authToken);
        Message.creator(
                new com.twilio.type.PhoneNumber("whatsapp:" + to.trim()),
                new com.twilio.type.PhoneNumber("whatsapp:" + twilioPhoneNumber.trim()),
                messageBody).create();
    }
}
