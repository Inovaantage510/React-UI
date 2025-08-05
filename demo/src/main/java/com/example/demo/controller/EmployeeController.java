package com.example.demo.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Repository.EmployeeRepository;    
import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import com.example.demo.wrapper.EmployeeResponse;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
	
	@Autowired
    private EmployeeService employeeService; 
	
	
	@Autowired 
	private EmployeeRepository repo; 
	

	@GetMapping("/get_Allemployees")
	public ResponseEntity<List<Employee>> getAllEmployees() {
	    List<Employee> employees = employeeService.getAllEmployees();
	    // Ensure it's never null, and always returns an empty list if no data
	    if (employees == null) {
	        return ResponseEntity.status(HttpStatus.OK).body(java.util.Collections.emptyList());
	    }
	    return ResponseEntity.status(HttpStatus.OK).body(employees);
	}

//    @GetMapping("/{id}")
//    public ResponseEntity<Employee> getEmployeeById(@PathVariable int id) {
//        Optional<Employee> employee = employeeService.getEmployeeById(id);
//        return employee.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Optional<Employee>> getEmployeeByEmail(@PathVariable String email) {
        Optional<Employee> employee = employeeService.getEmployeeByEmail(email);
        return employee != null ? ResponseEntity.ok(employee) : ResponseEntity.notFound().build();
    }

    @PostMapping("/addemp")
    public ResponseEntity<EmployeeResponse> addEmployee(@RequestBody Employee employee) {  
        return employeeService.addOrUpdateEmployee(employee);
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<Employee> updateEmployee(@PathVariable int id, @RequestBody Employee employee) {
//        Employee updatedEmployee = employeeService.updateEmployee(id, employee);
//        return updatedEmployee != null ? ResponseEntity.ok(updatedEmployee) : ResponseEntity.notFound().build();
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
//        employeeService.deleteEmployee(id);
//        return ResponseEntity.ok("Employee deleted successfully");
//    }

    
    @GetMapping("/joining-date")
    public ResponseEntity<Date> getJoiningDate(@RequestParam String email) {
        Date joiningDate = employeeService.getJoiningDateByEmail(email);
        if (joiningDate != null) {
            return ResponseEntity.ok(joiningDate);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    
    @GetMapping("/designation")
    public ResponseEntity<String> getDesignation(@RequestParam String email)  
    {
        String desg = employeeService.getdesignationbyemail(email);
        if (desg != null) {
            return ResponseEntity.ok(desg);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @GetMapping("/department")
    public ResponseEntity<String> getDepartment(@RequestParam String email)  
    {
        String depart = employeeService.getdepartmentbyemail(email); 
        
        if (depart != null) {
            return ResponseEntity.ok(depart);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @GetMapping("/total/employees")
    public ResponseEntity<Long> getemployeecount()
    {
    	 return ResponseEntity.status(HttpStatus.OK).body(employeeService.totalemployeecount()); 
    }
    
   
    @PutMapping("/update-by-email")
    public ResponseEntity<?> updateEmployeeByEmail(@RequestBody Employee updatedEmp) {
        Optional<Employee> existing = repo.findByEmail(updatedEmp.getEmail());
        if (existing.isPresent()) {    
            updatedEmp.setEmployeeId(existing.get().getEmployeeId()); 
            repo.save(updatedEmp);
            return ResponseEntity.ok("Employee updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
        }
    } 
    
    
    @DeleteMapping("/delete_by_emp_email")
    public ResponseEntity<?> deleteEmployee(@RequestParam String email) {
        try {
            boolean deleted = employeeService.deleteEmployee(email);
            if (deleted) {
                return ResponseEntity.ok("Employee deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Cannot delete employee: referenced in other tables.");
        }
    }

 
}