package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.Repository.AdminRepo;

@Service
public class Adminservice {

    @Autowired
    private AdminRepo repo;

    // Save or update admin
    public Admin saveadmin(Admin admin) {
        return repo.save(admin);
    }

    // Find admin by email (case-insensitive)
    public Admin findByEmail(String email) {
        return repo.findByEmailIdIgnoreCase(email).orElse(null);
    }
}