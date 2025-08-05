package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Payrollcalendar; 
import com.example.demo.service.Payrollcalendarservice;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/inovaantage")
public class PayrollCalendarcontroller { 
	
	   
	       @Autowired  
	       private Payrollcalendarservice payrollcalservice; 
	
	
	       @PostMapping("/calendar/payroll") 
	       public ResponseEntity<Payrollcalendar> savepayrollcal(@RequestBody Payrollcalendar payrollcal)
	       {
	    	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(payrollcalservice.savecalender(payrollcal));  
	       }
	
}