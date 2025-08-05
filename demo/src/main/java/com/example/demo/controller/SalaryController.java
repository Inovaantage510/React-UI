package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Salary;
import com.example.demo.service.SalaryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/salaries")
public class SalaryController {
	
	@Autowired
    private SalaryService salaryService;

    @GetMapping
    public List<Salary> getAllSalaries() {
        return salaryService.getAllSalaries();
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Salary> getSalaryById(@PathVariable int id) {
//        Optional<Salary> salary = salaryService.getSalaryById(id);
//        return salary.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @PostMapping("/employees/salary")
    public Salary addSalary(@RequestBody Salary salary) {
        return salaryService.addSalary(salary);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteSalary(@PathVariable int id) {
//        salaryService.deleteSalary(id);
//        return ResponseEntity.ok("Salary deleted successfully");
//    }
    
    
//    @GetMapping("/get_all/salary/employees_details")
//    public List<SalaryWithEmployeeDTO> getAllPayrollData() {
//        return salaryService.getAllSalaryDetailsWithEmployee();
//    }
    
    
    @GetMapping("/average-per-paid-day")
    public double getAveragePerPaidDay() { 
    	
        return salaryService.getOverallAverageSalaryPerPaidDay();
    }
    
    
    @GetMapping("/salary/outstanding/total")
    public ResponseEntity<Double> getTotalOutstandingSalary()  
    {
        double totalOutstanding = salaryService.getTotalOutstandingSalary();
        return ResponseEntity.ok(totalOutstanding);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSalary(@PathVariable int id)  
    {
        salaryService.deleteSalary(id);
        return ResponseEntity.ok("Salary deleted successfully");
    }   
    
}