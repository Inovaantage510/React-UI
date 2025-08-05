package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.ServicerequestRepo;
import com.example.demo.entity.Employee;  
import com.example.demo.entity.LeaveRequest; 
import com.example.demo.dto.LeaveRequestdto;


@Service
public class Requests {

	        
	     @Autowired    
	     private ServicerequestRepo servicerepo;   
	     
	     
	     @Autowired 
	     private EmployeeRepository employeerepo; 
	     
	     public LeaveRequest saverequest(LeaveRequestdto requestdto) {
	    	    Optional<Employee> employeeOptional = employeerepo.findByEmail(requestdto.getEmail());

	    	    if (employeeOptional.isPresent()) {
	    	        Employee employee = employeeOptional.get();

	    	
	    	        Optional<LeaveRequest> existingLeaveOpt = servicerepo
	    	                .findTopByEmployeeOrderByLeaveIdDesc(employee);   

	    	        LeaveRequest req = existingLeaveOpt.orElse(new LeaveRequest()); 
	    	        req.setEmail(requestdto.getEmail());
	    	        req.setLeave_type(requestdto.getLeave_type());
	    	        req.setFrom_date(requestdto.getFrom_date());
	    	        req.setTo_date(requestdto.getTo_date());
	    	        req.setReason(requestdto.getReason());
	    	        req.setStatus(requestdto.getStatus());
	    	        req.setApplied_at(requestdto.getApplied_at());
	    	        req.setEmployee(employee);

	    	        return servicerepo.save(req);
	    	    } else {
	    	        throw new RuntimeException("Employee not found with Email: " + requestdto.getEmail());
	    	    }
	    	} 
	     
	     public Long gettotalrequest()
	     {
	    	 return servicerepo.count();
	     }
	    
}