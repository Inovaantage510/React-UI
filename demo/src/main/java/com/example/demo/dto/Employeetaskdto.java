package com.example.demo.dto;

import java.time.LocalTime;
import java.util.Date;

public class Employeetaskdto {  
	

	private Date date;  
    private String name; 
    private LocalTime signintime;
    private LocalTime signouttime;
    private String module; 
    private String task;
    private LocalTime starttime; 
    private LocalTime endtime; 
    private String status; 
    private String remarks; 
    
    
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public LocalTime getSignintime() {
		return signintime;
	}
	public void setSignintime(LocalTime signintime) {
		this.signintime = signintime;
	}
	public LocalTime getSignouttime() {
		return signouttime;
	}
	public void setSignouttime(LocalTime signouttime) {
		this.signouttime = signouttime;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public LocalTime getStarttime() {
		return starttime;
	}
	public void setStarttime(LocalTime starttime) {
		this.starttime = starttime;
	}
	public LocalTime getEndtime() {
		return endtime;
	}
	public void setEndtime(LocalTime endtime) {
		this.endtime = endtime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}  
	      
}    