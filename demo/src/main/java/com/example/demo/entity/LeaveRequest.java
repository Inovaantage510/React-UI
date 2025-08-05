package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;


@Entity
@Table(name = "leaverequests")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer leaveId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    
    private String email;  
    private String leave_type;
    private Date from_date;
    private Date to_date;
    private String reason;
    private String status;

    @Temporal(TemporalType.TIMESTAMP)
    private Date applied_at;

    public LeaveRequest() {}

	public LeaveRequest(Integer leaveId, Employee employee, String email, String leave_type, Date from_date,
			Date to_date, String reason, String status, Date applied_at) {
		super();
		this.leaveId = leaveId;
		this.employee = employee;
		this.email = email;
		this.leave_type = leave_type;
		this.from_date = from_date;
		this.to_date = to_date;
		this.reason = reason;
		this.status = status;
		this.applied_at = applied_at;
	}

	public Integer getLeaveId() {
		return leaveId;
	}

	public void setLeaveId(Integer leaveId) {
		this.leaveId = leaveId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getLeave_type() {
		return leave_type;
	}

	public void setLeave_type(String leave_type) {
		this.leave_type = leave_type;
	}

	public Date getFrom_date() {
		return from_date;
	}

	public void setFrom_date(Date from_date) {
		this.from_date = from_date;
	}

	public Date getTo_date() {
		return to_date;
	}

	public void setTo_date(Date to_date) {
		this.to_date = to_date;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getApplied_at() {
		return applied_at;
	}

	public void setApplied_at(Date applied_at) {
		this.applied_at = applied_at;
	}

	
   
}