package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.SalaryRepository;
import com.example.demo.entity.Salary;

@Service
public class SalaryService {
	
	@Autowired
    private SalaryRepository salaryRepository;
	
	
    // Get all salaries
    public List<Salary> getAllSalaries() {
        return salaryRepository.findAll();
    }

    
//    public List<SalaryWithEmployeeDTO> getAllSalaryDetailsWithEmployee() 
//    {
//        return salaryRepository.getSalaryWithEmployeeDetails();
//    }
    
    
    // Get salary details by ID
    public Optional<Salary> getSalaryById(int id) {
        return salaryRepository.findById(id);
    }

    // Get salary details by Employee ID
    public List<Salary> getSalaryByEmployeeId(int employeeId) {
        return salaryRepository.findByEmployeeEmployeeId(employeeId);
    }

    // Add a new salary record
    public Salary addSalary(Salary salary) {
        return salaryRepository.save(salary);
    }

    // Update existing salary details
    public Salary updateSalary(int id, Salary updatedSalary) {
        if (salaryRepository.existsById(id)) {
            updatedSalary.setSalaryId(id);
            return salaryRepository.save(updatedSalary);
        }
        return null; // Salary ID not found
    }

    // Delete a salary record
    public void deleteSalary(int id) {
        salaryRepository.deleteById(id);
    }
    
    
    
    public double getOverallAverageSalaryPerPaidDay() { 
    	
        List<Salary> salaries = salaryRepository.findAll();

        double totalNetSalary = 0;
        int totalPaidDays = 0;

        for (Salary s : salaries) {
            int paidDays = s.getWorkingDays() - s.getLopDays();
            if (paidDays > 0) {
                totalNetSalary += s.getNetSalary();
                totalPaidDays += paidDays;
            }
        }

        return totalPaidDays > 0 ? totalNetSalary / totalPaidDays : 0.0;
    }
    
    
    public double getTotalOutstandingSalary() {
        List<Salary> allSalaries = salaryRepository.findAll();
        return allSalaries.stream()
                .mapToDouble(Salary::getOutstandingSalary)
                .sum();
    }

}