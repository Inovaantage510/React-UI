package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Employeeperformance;
import com.example.demo.service.Employeeperformanceservice; 
import com.example.demo.dto.PerformanceInfodto;         

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employees/performance")
public class Employeeperformancecontroller 
{
     
	        @Autowired
	        private Employeeperformanceservice pservice;
	        
	        
	        @PostMapping("/addperformance")
	        public ResponseEntity<Employeeperformance> Saveemployeeperformanceinformantion(@RequestBody PerformanceInfodto dto)
	        {
	        	  return ResponseEntity.status(HttpStatus.ACCEPTED).body(pservice.savePerformanceInfo(dto));  
	        }
	        
}