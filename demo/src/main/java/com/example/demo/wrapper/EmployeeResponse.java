package com.example.demo.wrapper;

import com.example.demo.entity.Employee;

public class EmployeeResponse { 
	
    private String message;
    private Employee employee;

    public EmployeeResponse(String message, Employee employee) {
        this.message = message;
        this.employee = employee;
    }
 
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }
}  