package com.example.demo.dto;

import java.util.Date;

public class LeaveRequestdto 
{
	
	    private String email;  
	    private String leave_type;
	    private Date from_date;
	    private Date to_date;
	    private String reason;
	    private String status;  
	    private Date applied_at;
	    
	    
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