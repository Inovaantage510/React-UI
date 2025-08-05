package com.example.demo.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.EmployeeRepository;
import com.example.demo.Repository.EmployeeperformanceRepo;
import com.example.demo.Repository.EmployeestaskRepo;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Employeeperformance;
import com.example.demo.entity.Employeetask;
import com.example.demo.dto.PerformanceInfodto;

@Service
public class Employeeperformanceservice  
{

    @Autowired
    private EmployeeperformanceRepo prepo;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeestaskRepo employeetaskrepo;

    public Employeeperformance savePerformanceInfo(PerformanceInfodto dto) {
    	
        Optional<Employee> employeeOptional = employeeRepository.findByEmail(dto.getEmail());
        List<Employeetask> taskList = employeetaskrepo.findByName(dto.getName());

        if (employeeOptional.isPresent()) {
            Employee employee = employeeOptional.get();

            Employeeperformance pinfo = new Employeeperformance();
            pinfo.setName(dto.getName());
            pinfo.setEmail(dto.getEmail());
            pinfo.setDepartment(dto.getDepartment());
            pinfo.setTitle(dto.getTitle());
            pinfo.setManager(dto.getManager());
            pinfo.setStartdate(dto.getStartdate());
            pinfo.setEnddate(dto.getEnddate());
            pinfo.setAttendance(dto.getAttendance());
            pinfo.setTask(dto.getTask());
            pinfo.setProductivity(dto.getProductivity());
            pinfo.setQuality(dto.getQuality());
            pinfo.setCommunication(dto.getCommunication());
            pinfo.setProblemSolving(dto.getProblemSolving());
            pinfo.setFinalrating(dto.getFinalrating());
            pinfo.setTrainings(dto.getTrainings());
            pinfo.setCollaboration(dto.getCollaboration());
            pinfo.setManagerfeedback(dto.getManagerfeedback());
            pinfo.setBonusRecommendation(dto.getBonusRecommendation());
            pinfo.setEmployee(employee);

            if (!taskList.isEmpty()) {
                pinfo.setEmptasks(taskList);
            } else {
                throw new RuntimeException("No tasks found for name: " + dto.getName());
            }

            return prepo.save(pinfo);
        } else {
            throw new RuntimeException("Employee not found with email: " + dto.getEmail());
        }
    }
}