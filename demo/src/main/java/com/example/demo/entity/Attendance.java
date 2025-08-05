package com.example.demo.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "attendance")
public class Attendance {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int attendanceId;

	    @ManyToOne
	    @JoinColumn(name = "employee_id", nullable = false)
	    private Employee employee;

	    private LocalDate date;
	    private boolean isPresent;

	    public Attendance() {}

	    public Attendance(Employee employee, LocalDate date, boolean isPresent) {
	        this.employee = employee;
	        this.date = date;
	        this.isPresent = isPresent;
	    }

	    // Getters and Setters
	    public int getAttendanceId() {
	        return attendanceId;
	    }

	    public void setAttendanceId(int attendanceId) {
	        this.attendanceId = attendanceId;
	    }

	    public Employee getEmployee() {
	        return employee;
	    }

	    public void setEmployee(Employee employee) {
	        this.employee = employee;
	    }

	    public LocalDate getDate() {
	        return date;
	    }

	    public void setDate(LocalDate date) {
	        this.date = date;
	    }

	    public boolean isPresent() {
	        return isPresent;
	    }

	    public void setPresent(boolean isPresent) {
	        this.isPresent = isPresent;
	    }

}