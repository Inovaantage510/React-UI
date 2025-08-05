package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Repository.Payrollcalendarrepo; 
import com.example.demo.entity.Payrollcalendar; 


@Service
public class Payrollcalendarservice {

	   @Autowired      
	   private Payrollcalendarrepo calrepo; 
	    
	   
	   public Payrollcalendar savecalender(Payrollcalendar payrollcal) {
		   
		   Payrollcalendar cal = new Payrollcalendar();  
		   cal.setEventtitle(payrollcal.getEventtitle());
		   cal.setFromEventDate(payrollcal.getFromEventDate()); 
		   cal.setToEventDate(payrollcal.getFromEventDate()); 
   	       return calrepo.save(payrollcal); 
   	   }  
}