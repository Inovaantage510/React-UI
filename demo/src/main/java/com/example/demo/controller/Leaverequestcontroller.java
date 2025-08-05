package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.service.Requests;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.ServicerequestRepo;
import com.example.demo.dto.LeaveRequestdto;
import com.example.demo.entity.Employee;
import com.example.demo.entity.LeaveRequest;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/service")
public class Leaverequestcontroller  
{

	          @Autowired    
	          private Requests service_request;  
	          
	          @Autowired 
	          private ServicerequestRepo repo; 
	          
	          @Autowired
	          private EmployeeRepository emprepo; 
	          
	          @PostMapping("/leave/requests")  
	          public ResponseEntity<LeaveRequest> saveservice(@RequestBody LeaveRequestdto requestdto)
	          {
	        	   return ResponseEntity.status(HttpStatus.CREATED).body(service_request.saverequest(requestdto));     
	          }  
	          
	          
	          @PutMapping("/leave/requests/update-by-email")
	          public ResponseEntity<?> updateEmployeeByEmail(@RequestBody LeaveRequestdto updatedleave) {
	              Optional<Employee> existing = emprepo.findByEmail(updatedleave.getEmail());

	              if (existing.isPresent()) {
	                  service_request.saverequest(updatedleave);   
	                  return ResponseEntity.ok("Leave updated");
	              } else {
	                  return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
	              }
	          }
	          
	        @GetMapping("/getallrequest")  
	        public ResponseEntity<Long> gettotalrequest()
	        {
	        	 return ResponseEntity.status(HttpStatus.OK).body(service_request.gettotalrequest());
	        }
	          
}