package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Attendance;
import com.example.demo.service.AttendanceService;

@RestController
@RequestMapping("/attendances")
public class AttendanceController  
{
	
	    @Autowired
	    private AttendanceService attendanceService;    
	    
	    @PostMapping("/entryattendance")
	    public ResponseEntity<?> addAttendance(@RequestBody Attendance attendance) 
	    {
	         return ResponseEntity.status(HttpStatus.OK).body(attendanceService.addAttendance(attendance)); 
	            
	    }

	    @GetMapping("/get_AllAttendances")
	    public List<Attendance> getAllAttendances() {
	        return attendanceService.getAllAttendances();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Attendance> getAttendanceById(@PathVariable int id) {
	        Optional<Attendance> attendance = attendanceService.getAttendanceById(id);
	        return attendance.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    @GetMapping("/employee/{employeeId}")
	    public List<Attendance> getAttendanceByEmployeeId(@PathVariable int employeeId) {
	        return attendanceService.getAttendanceByEmployeeId(employeeId);
	    }

	    @GetMapping("/employee/{employeeId}/date-range")
	    public List<Attendance> getAttendanceByEmployeeAndDateRange(@PathVariable int employeeId,
	                                                                @RequestParam("startDate") String startDate,
	                                                                @RequestParam("endDate") String endDate) {
	        LocalDate start = LocalDate.parse(startDate);
	        LocalDate end = LocalDate.parse(endDate);
	        return attendanceService.getAttendanceByEmployeeAndDateRange(employeeId, start, end);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteAttendance(@PathVariable int id) {
	        attendanceService.deleteAttendance(id);
	        return ResponseEntity.ok("Attendance record deleted successfully");
	    }
	   
}