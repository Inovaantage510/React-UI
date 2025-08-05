package com.example.demo.dto;

import java.sql.Date;

public class PayrollcalendarDto  
{

	    private Date fromEventDate; 
	    
	    private Date toEventDate;

	    
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