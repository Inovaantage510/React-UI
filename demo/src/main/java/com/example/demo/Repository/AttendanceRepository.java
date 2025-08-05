package com.example.demo.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;     

import com.example.demo.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    List<Attendance> findByEmployeeEmployeeId(int employeeId);
    List<Attendance> findByEmployeeEmployeeIdAndDateBetween(int employeeId, LocalDate startDate, LocalDate endDate);
}