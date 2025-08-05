package com.example.demo.entity;

import java.sql.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="Payrollcalendar")
public class Payrollcalendar 
{

	    @Id  
	    @GeneratedValue(strategy =  GenerationType.IDENTITY) 
	    private Integer id; 
	    
	    
	    private String eventtitle; 
	    
	    private Date fromEventDate; 
	    
	    private Date toEventDate;

	   
		public Payrollcalendar() { }


		public Payrollcalendar(Integer id, String eventtitle, Date fromEventDate, Date toEventDate) {
			super();
			this.id = id;
			this.eventtitle = eventtitle;
			this.fromEventDate = fromEventDate;
			this.toEventDate = toEventDate;
		}


		public Integer getId() {
			return id;
		}


		public void setId(Integer id) {
			this.id = id;
		}


		public String getEventtitle() {
			return eventtitle;
		}


		public void setEventtitle(String eventtitle) {
			this.eventtitle = eventtitle;
		}


		public Date getFromEventDate() {
			return fromEventDate;
		}


		public void setFromEventDate(Date fromEventDate) {
			this.fromEventDate = fromEventDate;
		}


		public Date getToEventDate() {
			return toEventDate;
		}


		public void setToEventDate(Date toEventDate) {
			this.toEventDate = toEventDate;
		}
		  
}