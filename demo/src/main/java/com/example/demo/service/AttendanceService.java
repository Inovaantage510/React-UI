package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.AttendanceRepository;
import com.example.demo.entity.Attendance;

@Service
public class AttendanceService {
	
	    @Autowired
	    private AttendanceRepository attendanceRepository;

	    public List<Attendance> getAllAttendances() {
	        return attendanceRepository.findAll();
	    }

	    public Optional<Attendance> getAttendanceById(int id) {
	        return attendanceRepository.findById(id);
	    }

	    public List<Attendance> getAttendanceByEmployeeId(int employeeId) {
	        return attendanceRepository.findByEmployeeEmployeeId(employeeId);
	    }

	    public List<Attendance> getAttendanceByEmployeeAndDateRange(int employeeId, LocalDate startDate, LocalDate endDate) {
	        return attendanceRepository.findByEmployeeEmployeeIdAndDateBetween(employeeId, startDate, endDate);
	    }

	    public Attendance addAttendance(Attendance attendance) {
	        return attendanceRepository.save(attendance);
	    }

	    public void deleteAttendance(int id) {
	        attendanceRepository.deleteById(id);
	    }

}