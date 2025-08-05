package com.example.demo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.EmployeeperformanceRepo;
import com.example.demo.dto.EmployeeUpdateDto;
import com.example.demo.entity.Employee;
import com.example.demo.wrapper.EmployeeResponse;

import jakarta.transaction.Transactional;

@Service
public class EmployeeService {
	
	    @Autowired
	    private EmployeeRepository employeeRepository;
	    
	    @Autowired
	    private EmployeeperformanceRepo performanceRepository;

	    
	    public List<Employee> getAllEmployees() {
	        return employeeRepository.findAll();
	    }

	    public Optional<Employee> getEmployeeById(int id) {
	        return employeeRepository.findById(id);
	    }

	    public Optional<Employee> getEmployeeByEmail(String email) {
	        return employeeRepository.findByEmail(email);
	    }

	    public ResponseEntity<EmployeeResponse> addOrUpdateEmployee(Employee employee) {

	        Optional<Employee> emailOwnerOpt = employeeRepository.findByEmail(employee.getEmail());

	        if (emailOwnerOpt.isPresent()) {
	            Employee emailOwner = emailOwnerOpt.get();

	            if (employee.getEmployeeId() == 0 || emailOwner.getEmployeeId() != employee.getEmployeeId()) {
	                return ResponseEntity
	                        .status(HttpStatus.CONFLICT)
	                        .body(new EmployeeResponse("Email is already used.", null));
	            }
	        }

	        Optional<Employee> existingEmployeeOpt = employeeRepository.findById(employee.getEmployeeId());

	        if (existingEmployeeOpt.isPresent()) {
	            Employee existing = existingEmployeeOpt.get();
	            existing.setName(employee.getName());
	            existing.setEmail(employee.getEmail());
	            existing.setDepartment(employee.getDepartment());
	            existing.setDesignation(employee.getDesignation());
	            existing.setDob(employee.getDob());
	            existing.setPrimarycontact(employee.getPrimarycontact());
	            existing.setMaritalstatus(employee.getMaritalstatus());
	            existing.setSpousesname(employee.getSpousesname());
	            existing.setEmergencycontactname(employee.getEmergencycontactname());
	            existing.setPermanentaddress(employee.getPermanentaddress());
	            existing.setPresentaddress(employee.getPresentaddress());
	            existing.setAadhaarnumber(employee.getAadhaarnumber());
	            existing.setPannumber(employee.getPannumber());
	            existing.setBankaccountnumber(employee.getBankaccountnumber());
	            existing.setIFSCcode(employee.getIFSCcode());
	            existing.setUANnumber(employee.getUANnumber());
	            existing.setLocation(employee.getLocation());
	            existing.setJoiningDate(employee.getJoiningDate());

	            Employee updated = employeeRepository.save(existing);
	            return ResponseEntity.ok(new EmployeeResponse("Employee updated successfully.", updated)); // ✅ wrap in ResponseEntity
	        }

	        Employee inserted = employeeRepository.save(employee);
	        return ResponseEntity.ok(new EmployeeResponse("New employee added successfully.", inserted)); // ✅ wrap in ResponseEntity
	    }


	   
	    public Date getJoiningDateByEmail(String email)  
	    {
	        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
	        return employeeOpt.map(Employee::getJoiningDate).orElse(null);
	    }

	    public String getdesignationbyemail(String email)
	    {
	    	Optional<Employee> employeeopt = employeeRepository.findByEmail(email);
	    	return employeeopt.map(Employee::getDesignation).orElse(null); 
	    }
	    
	    public String getdepartmentbyemail(String email)
	    {
	    	Optional<Employee> employeeopt = employeeRepository.findByEmail(email);
	    	return employeeopt.map(Employee::getDepartment).orElse(null); 
	    }
	    
	  
	    public Long totalemployeecount()
	    {
	    	return employeeRepository.count();  
	    }
	    
	    
	    public Employee updateEmployee(int id, Employee updatedEmployee) {
	        if (employeeRepository.existsById(id)) {
	            updatedEmployee.setEmployeeId(id);
	            return employeeRepository.save(updatedEmployee);
	        }
	        return null;
	    }

	    
	    public void updateEmployees(List<EmployeeUpdateDto> updates) {
	        for (EmployeeUpdateDto dto : updates) {
	            employeeRepository.updateFullEmployeeByEmail(
	                dto.getName(),
	                dto.getDepartment(),
	                dto.getDesignation(),
	                dto.getDob(),
	                dto.getPrimaryContact(),
	                dto.getMaritalStatus(),
	                dto.getSpousesName(),
	                dto.getEmergencyContactName(),
	                dto.getPermanentAddress(),
	                dto.getPresentAddress(),
	                dto.getAadhaarNumber(),
	                dto.getPanNumber(),
	                dto.getBankAccountNumber(),
	                dto.getIfscCode(),
	                dto.getUanNumber(),
	                dto.getLocation(),
	                dto.getJoiningDate(),
	                dto.getEmail()
	            );
	        }
	    }
    
	    @Transactional
	    public boolean deleteEmployee(String email) {
	        Optional<Employee> employeeOpt = employeeRepository.findByEmail(email);
	        if (employeeOpt.isPresent()) {
	            Employee emp = employeeOpt.get();
	            performanceRepository.deleteByEmployee(emp); // Ensure this works as expected
	            employeeRepository.delete(emp);
	            return true;
	        }
	        return false;
	    }

}