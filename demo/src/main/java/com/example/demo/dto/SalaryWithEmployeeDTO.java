package com.example.demo.dto;

import java.util.Date;


public class SalaryWithEmployeeDTO 
{
	
	    private Integer employeeId;
	    private String name;
	    private String email;
	    private String department;
	    private String designation;
	    private String contactDetails;
	    private Date joiningDate;

	    private Integer salaryId;
	    private Double basicSalary;
	    private Double taxDeductions;
	    private Double bonuses;
	    private Double netSalary;
	    
	    
	    
	    
		public SalaryWithEmployeeDTO(Integer employeeId, String name, String email, String department,
				String designation, String contactDetails, Date joiningDate, Integer salaryId, Double basicSalary,
				Double taxDeductions, Double bonuses, Double netSalary) {
			super();
			this.employeeId = employeeId;
			this.name = name;
			this.email = email;
			this.department = department;
			this.designation = designation;
			this.contactDetails = contactDetails;
			this.joiningDate = joiningDate;
			this.salaryId = salaryId;
			this.basicSalary = basicSalary;
			this.taxDeductions = taxDeductions;
			this.bonuses = bonuses;
			this.netSalary = netSalary;
		}


		public Integer getEmployeeId() {
			return employeeId;
		}


		public void setEmployeeId(Integer employeeId) {
			this.employeeId = employeeId;
		}


		public String getName() {
			return name;
		}


		public void setName(String name) {
			this.name = name;
		}


		public String getEmail() {
			return email;
		}


		public void setEmail(String email) {
			this.email = email;
		}


		public String getDepartment() {
			return department;
		}


		public void setDepartment(String department) {
			this.department = department;
		}


		public String getDesignation() {
			return designation;
		}


		public void setDesignation(String designation) {
			this.designation = designation;
		}


		public String getContactDetails() {
			return contactDetails;
		}


		public void setContactDetails(String contactDetails) {
			this.contactDetails = contactDetails;
		}



		public Date getJoiningDate() {
			return joiningDate;
		}



		public void setJoiningDate(Date joiningDate) {
			this.joiningDate = joiningDate;
		}


		public Integer getSalaryId() {
			return salaryId;
		}


		public void setSalaryId(Integer salaryId) {
			this.salaryId = salaryId;
		}


		public Double getBasicSalary() {
			return basicSalary;
		}

		public void setBasicSalary(Double basicSalary) {
			this.basicSalary = basicSalary;
		}

		public Double getTaxDeductions() {
			return taxDeductions;
		}

		public void setTaxDeductions(Double taxDeductions) {
			this.taxDeductions = taxDeductions;
		}


		public Double getBonuses() {
			return bonuses;
		}

		public void setBonuses(Double bonuses) {
			this.bonuses = bonuses;
		}

		public Double getNetSalary() {
			return netSalary;
		}

		public void setNetSalary(Double netSalary) {
			this.netSalary = netSalary;
		}   
	   
}