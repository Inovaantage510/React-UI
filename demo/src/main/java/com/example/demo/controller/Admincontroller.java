package com.example.demo.controller;

import java.time.LocalDate;
import java.util.Locale;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Admin;
import com.example.demo.service.Adminservice;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class Admincontroller {
	

    private static final Set<String> ALLOWED_EMAILS = Set.of(
        "sarthak.satapathy@inovaantage.com",
        "sukanta.jena@inovaantageesri.com",
        "sonali.mohanty@inovaantage.com"
    );

    @Autowired
    private Adminservice service;

    @PostMapping("/login/auth/saveadmin")
    public ResponseEntity<?> saveadmin(@RequestBody Admin request) {

        if (request == null || request.getEmailId() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password are required.");
        }

        final String email = request.getEmailId().toLowerCase(Locale.ROOT);
        final String password = request.getPassword();

        if (!ALLOWED_EMAILS.contains(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Unauthorized: Only 3 pre-approved admins can login.");
        }

        Admin adminFromDb = service.findByEmail(email);

        LocalDate now = LocalDate.now();

        if (adminFromDb == null) {
      
            Admin newAdmin = new Admin();
            newAdmin.setEmailId(email);
            newAdmin.setPassword(password);
            newAdmin.setCreatedAt(now);
            newAdmin.setUpdatedAt(now);
            newAdmin.setLastLogin(now);
            newAdmin.setRole("admin");
            newAdmin.setActive(true);

            return ResponseEntity.status(HttpStatus.CREATED).body(service.saveadmin(newAdmin));
        }

        if (!password.equals(adminFromDb.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password.");
        }

        adminFromDb.setLastLogin(now);
        adminFromDb.setUpdatedAt(now);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.saveadmin(adminFromDb));
    }

    @PostMapping("/login/auth/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Admin request) {

        if (request == null || request.getEmailId() == null || request.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and new password are required.");
        }

        final String email = request.getEmailId().toLowerCase(Locale.ROOT);
        final String newPassword = request.getPassword();

        if (!ALLOWED_EMAILS.contains(email)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Unauthorized: Only the 3 pre-approved admins can reset the password.");
        }

        Admin existingAdmin = service.findByEmail(email);
        if (existingAdmin == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Admin with this email not found.");
        }

        existingAdmin.setPassword(newPassword);
        existingAdmin.setUpdatedAt(LocalDate.now());
        service.saveadmin(existingAdmin);

        return ResponseEntity.ok("Password updated successfully.");
    }
}