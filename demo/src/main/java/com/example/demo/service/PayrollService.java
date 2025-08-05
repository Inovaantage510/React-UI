package com.example.demo.service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.SalaryRepository;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Salary;
import jakarta.transaction.Transactional;

@Service
public class PayrollService {

    @Autowired
    private SalaryRepository salaryRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

//    public double calculateNetSalary(Salary salary) {
//        double grossSalary = salary.getBasicSalary() + salary.getBonuses();
//
//        double lopDeduction = 0.0;
//        if (salary.getWorkingDays() > 0 && salary.getLopDays() > 0) {
//            double perDaySalary = salary.getBasicSalary() / salary.getWorkingDays();
//            lopDeduction = perDaySalary * salary.getLopDays();
//        }
//
//        double totalDeductions = salary.getTaxDeductions()
//                + salary.getProfessionalTax()
//                + salary.getProvidentFund()
//                + lopDeduction;
//
//        return grossSalary - totalDeductions;
//    }
    
//    public double calculateNetSalary(Salary salary) { 
//    	
//        double basicSalary = salary.getBasicSalary();
//        double bonuses = salary.getBonuses();
//        double providentFund = salary.getProvidentFund();
//        double professionalTax = salary.getProfessionalTax();
//        double taxDeductions = salary.getTaxDeductions();
//        double workingDays = salary.getWorkingDays();
//        double lopDays = salary.getLopDays();
//
//        // 1. Calculate LOP Deduction
//        double lopDeductionAmount = 0.0;
//        if (workingDays > 0 && lopDays > 0) {
//            double perDaySalary = basicSalary / workingDays;
//            lopDeductionAmount = perDaySalary * lopDays;
//        }
//
//        // 2. Calculate Adjusted Basic Salary (Basic after LOP)
//        double adjustedBasicSalary = basicSalary - lopDeductionAmount;
//
//        // 3. Calculate Total Earnings (Adjusted Basic + Bonuses)
//        double totalEarnings = adjustedBasicSalary + bonuses;
//
//        // 4. Calculate Total Other Deductions (PF + PT + Tax Deductions)
//        double totalOtherDeductions = providentFund + professionalTax + taxDeductions;
//
//        // 5. Calculate Net Salary
//        double netSalary = totalEarnings - totalOtherDeductions;
//
//        return netSalary;
//    }

    public double calculateNetSalary(Salary salary) { 
        
        double basicSalary = salary.getBasicSalary();
        double bonuses = salary.getBonuses();
        double providentFund = salary.getProvidentFund();
        double professionalTax = salary.getProfessionalTax();
        double taxDeductions = salary.getTaxDeductions();
        double workingDays = salary.getWorkingDays();
        double lopDays = salary.getLopDays();

        
        double lopDeductionAmount = 0.0;
        if (workingDays > 0 && lopDays > 0) {
            double perDaySalary = basicSalary / workingDays;
            lopDeductionAmount = perDaySalary * lopDays;
        }

      
        double adjustedBasicSalary = basicSalary - lopDeductionAmount;

        
        double totalEarnings = adjustedBasicSalary + bonuses;

        
        double totalOtherDeductions = providentFund + professionalTax + taxDeductions;

        
        double netSalary = totalEarnings - totalOtherDeductions;

        
        double roundedNetSalary = Math.round(netSalary * 100.0) / 100.0;

        return roundedNetSalary;
    }

    
    @Transactional
    public Salary generatePayroll(Employee employee,
                                  double basicSalary,
                                  double taxDeductions,
                                  double bonuses,
                                  double professionalTax,
                                  double providentFund,
                                  int workingDays,
                                  int lopDays,
                                  Date monthOfSalary,
                                  String email) {
        Salary salary = new Salary();
        salary.setEmployee(employee);
        salary.setBasicSalary(basicSalary);
        salary.setTaxDeductions(taxDeductions);
        salary.setBonuses(bonuses);
        salary.setProfessionalTax(professionalTax);
        salary.setProvidentFund(providentFund);
        salary.setWorkingDays(workingDays);
        salary.setLopDays(lopDays);
        salary.setMonthOfSalary(monthOfSalary != null ? monthOfSalary : new Date());
        salary.setEmail(email); 

        double netSalary = calculateNetSalary(salary);
        salary.setNetSalary(netSalary);

        return salaryRepository.save(salary);
    }

 
    public List<Salary> getPayrollByEmployeeId(int employeeId) {
        return salaryRepository.findByEmployeeEmployeeId(employeeId);
    }
    
    
    public List<Salary> getallsalary()
    {
        return salaryRepository.findAll(); 
    }
    
    
//    public Salary updatePayroll(int salaryId, Salary updatedSalary) {
//        if (salaryRepository.existsById(salaryId)) {
//            updatedSalary.setSalaryId(salaryId);
//
//            double netSalary = calculateNetSalary(updatedSalary);
//            updatedSalary.setNetSalary(netSalary);
//
//            return salaryRepository.save(updatedSalary);
//        } else {
//            return null;
//        }
//    }
    
//    public Salary updateOrCreatePayroll(
//            Employee employee,
//            double basicSalary,
//            double taxDeductions,
//            double bonuses,
//            double professionalTax,
//            double providentFund,
//            int workingDays,
//            int lopDays,
//            Date monthOfSalary,
//            String email
//    ) {
//        Calendar cal = Calendar.getInstance();
//        cal.setTime(monthOfSalary);
//        int year = cal.get(Calendar.YEAR);
//        int month = cal.get(Calendar.MONTH) + 1;  
//
//        List<Salary> salaryList = salaryRepository.findByEmployeeAndMonth(employee, month, year);
//
//        Salary salary;
//        if (!salaryList.isEmpty()) {
//            salary = salaryList.get(0); 
//            if (salaryList.size() > 1) {
//                System.out.println("Warning: Multiple salary records found for the same employee and month. Using the first one.");
//            }
//        } else {
//            salary = new Salary();
//        }
//
//        salary.setEmployee(employee);
//        salary.setEmail(email);
//        salary.setBasicSalary(basicSalary);
//        salary.setTaxDeductions(taxDeductions);
//        salary.setBonuses(bonuses);
//        salary.setProfessionalTax(professionalTax);
//        salary.setProvidentFund(providentFund);
//        salary.setWorkingDays(workingDays);
//        salary.setLopDays(lopDays);
//        salary.setMonthOfSalary(monthOfSalary);
//
//        double grossSalary = basicSalary + bonuses;
//        double totalDeductions = taxDeductions + professionalTax + providentFund;
//        double perDaySalary = grossSalary / workingDays;
//        double lopAmount = perDaySalary * lopDays;
//        double netSalary = grossSalary - totalDeductions - lopAmount;
//
//        salary.setNetSalary(netSalary);
//
//        return salaryRepository.save(salary);
//    }
    
    public Salary updateOrCreatePayroll(
            Employee employee,
            double basicSalary,
            double taxDeductions,
            double bonuses,
            double professionalTax,
            double providentFund,
            int workingDays,
            int lopDays,
            Date monthOfSalary,
            String email
    ) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(monthOfSalary);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;

        List<Salary> salaryList = salaryRepository.findByEmployeeAndMonth(employee, month, year);

        Salary salary;
        if (!salaryList.isEmpty()) {
            salary = salaryList.get(0);
            if (salaryList.size() > 1) {
                System.out.println("Warning: Multiple salary records found. Using the first one.");
            }
        } else {
            salary = new Salary();
        }

        salary.setEmployee(employee);
        salary.setEmail(email);
        salary.setBasicSalary(basicSalary);
        salary.setTaxDeductions(taxDeductions);
        salary.setBonuses(bonuses);
        salary.setProfessionalTax(professionalTax);
        salary.setProvidentFund(providentFund);
        salary.setWorkingDays(workingDays);
        salary.setLopDays(lopDays);
        salary.setMonthOfSalary(monthOfSalary);

       
        double netSalary = calculateNetSalary(salary);
        salary.setNetSalary(netSalary);

        return salaryRepository.save(salary);
    }

    public boolean deleteSalaryByEmail(String email) {
        Optional<Employee> optionalEmployee = employeeRepository.findByEmail(email);

        if (optionalEmployee.isEmpty()) {
            return false; 
        }

        Employee employee = optionalEmployee.get();

        List<Salary> salaryList = salaryRepository.findByEmployeeEmployeeId(employee.getEmployeeId());

        if (!salaryList.isEmpty()) {
            salaryRepository.deleteAll(salaryList);
            return true; 
        }

        return false; 
    }

}