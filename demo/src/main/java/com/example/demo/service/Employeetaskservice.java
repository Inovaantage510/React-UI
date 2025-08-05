package com.example.demo.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Employeetask;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.EmployeestaskRepo;
import com.example.demo.dto.Employeetaskdto;


@Service   
public class Employeetaskservice  
{
                   
	          @Autowired   
	          private EmployeestaskRepo taskrepo;   
	          
	          @Autowired  
	          private EmployeeRepository emprepo; 
	          
	          
	          public Employeetask saveemployeestask(Employeetaskdto dto)  
	          { 
	        	  
	              Optional<Employee> employeeOptional = emprepo.findByName(dto.getName()); 

	              if (employeeOptional.isPresent()) {
	                  Employee employee = employeeOptional.get();

	                   Employeetask task = new Employeetask(); 
	                   task.setDate(dto.getDate());
	                   task.setName(dto.getName()); 
	                   task.setSignintime(dto.getSignintime()); 
	                   task.setSignouttime(dto.getSignouttime()); 
	                   task.setModule(dto.getModule());
	                   task.setTask(dto.getTask());
	                   task.setStarttime(dto.getStarttime());
	                   task.setEndtime(dto.getEndtime()); 
	                   task.setStatus(dto.getStatus()); 
	                   task.setRemarks(dto.getRemarks());  
	                   
	                   task.setEmployee(employee);  

	                  return taskrepo.save(task); 
	                  
	              } else { 
	                  throw new RuntimeException("Employee not found with Name: " + dto.getName());
	                 }
	         }        
} 