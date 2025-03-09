package com.tejas.safetyalertbackend;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SafetyalertbackendApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); // Load .env file
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USER", dotenv.get("DB_USER"));
		System.setProperty("DB_PASS", dotenv.get("DB_PASS"));
		System.setProperty("TWILIO_ACCOUNT_SID", dotenv.get("TWILIO_ACCOUNT_SID"));
		System.setProperty("TWILIO_AUTH_TOKEN", dotenv.get("TWILIO_AUTH_TOKEN"));
		System.setProperty("TWILIO_PHONE_NUMBER", dotenv.get("TWILIO_PHONE_NUMBER"));
		SpringApplication.run(SafetyalertbackendApplication.class, args);
	}

}
