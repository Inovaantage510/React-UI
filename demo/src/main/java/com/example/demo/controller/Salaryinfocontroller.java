package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.Salaryinforequestdto;
import com.example.demo.entity.SalaryInfo;
import com.example.demo.service.Salaryinfoservice;  

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/salary")
public class Salaryinfocontroller {

	          
	        @Autowired     
	        private Salaryinfoservice infoservice;  
	        
	        @PostMapping("/saveinfo")
	        public ResponseEntity<SalaryInfo> savesalaryinformantion(@RequestBody Salaryinforequestdto info) {
	            return ResponseEntity.status(HttpStatus.ACCEPTED).body(infoservice.saveSalaryInfo(info));
	        }

	        
}