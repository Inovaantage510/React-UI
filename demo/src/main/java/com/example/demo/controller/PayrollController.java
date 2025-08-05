package com.example.demo.controller;

import java.util.Calendar;
import java.util.List; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Salary;
import com.example.demo.service.PayrollService;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.SalaryRepository;
import com.example.demo.dto.SalaryRequestDTO;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;   
    
    
    @Autowired
    private SalaryRepository salrepo; 
    
    
    @Autowired
    private EmployeeRepository repo;

  
    @PostMapping("/generate")
    public ResponseEntity<?> generatePayroll(@RequestBody SalaryRequestDTO dto) {
        String email = dto.getEmail();

        Employee employee = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + email));

        Calendar cal = Calendar.getInstance();
        cal.setTime(dto.getMonthOfSalary());
        int month = cal.get(Calendar.MONTH) + 1;
        int year = cal.get(Calendar.YEAR);

        boolean exists = salrepo.existsByEmployeeAndMonth(employee, month, year);
        if (exists) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Salary already exists for employee with email: " + email + " for " + month + "/" + year);
        }

        Salary salary = payrollService.generatePayroll(
                employee,
                dto.getBasicSalary(),
                dto.getTaxDeductions(),
                dto.getBonuses(),
                dto.getProfessionalTax(),
                dto.getProvidentFund(),
                dto.getWorkingDays(),
                dto.getLopDays(),
                dto.getMonthOfSalary(),
                email
        );

        return ResponseEntity.ok(salary);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Salary>> getPayrollByEmployeeId(@PathVariable int employeeId) {
        List<Salary> salaries = payrollService.getPayrollByEmployeeId(employeeId);
        if (salaries.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(salaries);
    }
    
    
    @GetMapping("/employees/salary")
    public ResponseEntity<List<Salary>> getallsalary()
    {
    	return ResponseEntity.status(HttpStatus.OK).body(payrollService.getallsalary());
    }
    
    
//    @PutMapping("/update/{salaryId}")
//    public ResponseEntity<Salary> updatePayroll(@PathVariable int salaryId, @RequestBody Salary salary) {
//        Salary updatedSalary = payrollService.updatePayroll(salaryId, salary);
//        if (updatedSalary == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(updatedSalary);
//    }

    
    @PutMapping("/update_salary_by_email")
    public ResponseEntity<Salary> updateEmployeeByEmail(@Validated @RequestBody SalaryRequestDTO request) {
        String email = request.getEmail();
        System.out.println("Updating salary for email: " + email);

        Employee employee = repo.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Employee not found with email: " + email));

        Salary updatedSalary = payrollService.updateOrCreatePayroll(
            employee,
            request.getBasicSalary(),
            request.getTaxDeductions(),
            request.getBonuses(),
            request.getProfessionalTax(),
            request.getProvidentFund(),
            request.getWorkingDays(),
            request.getLopDays(),
            request.getMonthOfSalary(),
            email
        );

        return ResponseEntity.ok(updatedSalary);
    }

    
    @DeleteMapping("/delete_by_email")
    public ResponseEntity<?> deleteSalaryByEmail(@RequestParam String email) {
        boolean deleted = payrollService.deleteSalaryByEmail(email);
        if (deleted) {
            return ResponseEntity.ok("Salary record(s) deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("No records found for the given email.");
        }
    }

}