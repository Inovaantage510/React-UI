package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Employeeperformance;

import jakarta.transaction.Transactional;

public interface EmployeeperformanceRepo extends JpaRepository<Employeeperformance, Integer>
{  
	@Transactional
	void deleteByEmployee(Employee employee);

}