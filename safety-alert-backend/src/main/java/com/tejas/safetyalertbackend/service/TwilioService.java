package com.tejas.safetyalertbackend.service;

import com.tejas.safetyalertbackend.config.TwilioConfig;
import com.twilio.Twilio;
import org.springframework.stereotype.Service;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class TwilioService {

    private final TwilioConfig twilioConfig;

    public TwilioService(TwilioConfig twilioConfig) {
        this.twilioConfig = twilioConfig;
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    public String sendSms(String to, String messageBody) {
        // Twilio.init(accountSid, authToken);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber(to),
                new com.twilio.type.PhoneNumber(twilioConfig.getPhoneNumber()),
                messageBody).create();

                return message.getSid();
    }

    public String sendWhatsApp(String to, String messageBody) {
        // Twilio.init(accountSid, authToken);
        Message message = Message.creator(
                new com.twilio.type.PhoneNumber("whatsapp:" + to.trim()),
                new com.twilio.type.PhoneNumber("whatsapp:" + twilioConfig.getPhoneNumber().trim()),
                messageBody).create();

                return message.getSid();
    }
}
