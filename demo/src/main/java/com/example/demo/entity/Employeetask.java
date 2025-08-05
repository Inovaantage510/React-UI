package com.example.demo.entity;

import java.time.LocalTime;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Employeetask")  
public class Employeetask {
             
	       @Id
	       @GeneratedValue(strategy = GenerationType.IDENTITY)      
	       private Integer id; 
	       
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
	       
	       @ManyToOne
	       @JoinColumn(name = "employee_id")
	       private Employee employee;

		public Employeetask() 
		{   }

		public Employeetask(Integer id, Date date, String name, LocalTime signintime, LocalTime signouttime,
				String module, String task, LocalTime starttime, LocalTime endtime, String status, String remarks,
				Employee employee) {
			super();
			this.id = id;
			this.date = date;
			this.name = name;
			this.signintime = signintime;
			this.signouttime = signouttime;
			this.module = module;
			this.task = task;
			this.starttime = starttime;
			this.endtime = endtime;
			this.status = status;
			this.remarks = remarks;
			this.employee = employee;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

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

		public Employee getEmployee() {
			return employee;
		}

		public void setEmployee(Employee employee) {
			this.employee = employee;
		}  
		  
}