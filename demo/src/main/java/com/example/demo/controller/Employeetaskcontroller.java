package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Employeetask;
import com.example.demo.service.Employeetaskservice;
import com.example.demo.dto.Employeetaskdto;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/task")
public class Employeetaskcontroller {

	         @Autowired 
	         private Employeetaskservice service;
	
	         @PostMapping("/employees/add")
	         public ResponseEntity<Employeetask> saveemployeetask(@RequestBody Employeetaskdto dto) 
	         {
	        	 return ResponseEntity.status(HttpStatus.ACCEPTED).body(service.saveemployeestask(dto));    
	         }
	        
}