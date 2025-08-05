package com.example.demo.service;

import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.SalaryRepo;
import com.example.demo.dto.Salaryinforequestdto;
import com.example.demo.entity.Employee;
import com.example.demo.entity.SalaryInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Salaryinfoservice {

    @Autowired
    private SalaryRepo salaryInfoRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public SalaryInfo saveSalaryInfo(Salaryinforequestdto dto) {
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(dto.getEmail());

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();

            SalaryInfo salaryInfo = new SalaryInfo();
            salaryInfo.setEmail(dto.getEmail());
            salaryInfo.setBasic(dto.getBasic());
            salaryInfo.setDailyAllowance(dto.getDailyAllowance());
            salaryInfo.setHra(dto.getHra());
            salaryInfo.setCtc(dto.getCtc());
            salaryInfo.setProfessionalDevelopment(dto.getProfessionalDevelopment());
            salaryInfo.setConveyanceAllowance(dto.getConveyanceAllowance());
            salaryInfo.setFoodAllowance(dto.getFoodAllowance());
            salaryInfo.setOtherAllowance(dto.getOtherAllowance());
            salaryInfo.setEmployee(employee); // ✅ Correctly set the employee

            return salaryInfoRepository.save(salaryInfo);
        } else {
            throw new RuntimeException("Employee not found with email: " + dto.getEmail());
        }
    }
}