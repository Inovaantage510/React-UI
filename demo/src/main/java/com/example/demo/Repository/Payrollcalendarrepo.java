package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.dto.PayrollcalendarDto;
import com.example.demo.entity.Payrollcalendar;

public interface Payrollcalendarrepo extends JpaRepository<Payrollcalendar, Integer>
{
         Payrollcalendar save(PayrollcalendarDto payrollcaldto);  
} 