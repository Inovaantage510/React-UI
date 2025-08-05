package com.example.demo.controller;

import java.security.SecureRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.service.EmailService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class EmailController {

    @Autowired
    private EmailService emailService;

    private static final SecureRandom random = new SecureRandom();

    public static String generateOTP(int length) {
    	
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(random.nextInt(10));
        }
          return otp.toString();
    }
    
    
    @PostMapping("/forgot-password/send-mail")
    public String sendMail(@RequestParam String toEmail) {
    	
    	String genrateotp = generateOTP(6); 
    	
        emailService.sendSimpleEmail(toEmail, "One-Time Password (OTP) for Payroll Password Recovery", genrateotp);
        return "Mail Sent!";
    }
}