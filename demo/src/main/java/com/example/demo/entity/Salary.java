package com.example.demo.entity;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(
	    name = "salary",
	    uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "month_of_salary"})
	)
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int salaryId;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private double basicSalary;
    private double taxDeductions;
    private double bonuses;
    private double netSalary;
    private int workingDays; 
    private int lopDays;
    private double professionalTax;
    private double providentFund; 
    
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date monthOfSalary;  
    
    @Transient       
    private String email;

    public Salary() {
    }

	public Salary(int salaryId, Employee employee, double basicSalary, double taxDeductions, double bonuses,
			double netSalary, int workingDays, int lopDays, double professionalTax, double providentFund,
			Date monthOfSalary, String email) {
		super();
		this.salaryId = salaryId;
		this.employee = employee;
		this.basicSalary = basicSalary;
		this.taxDeductions = taxDeductions;
		this.bonuses = bonuses;
		this.netSalary = netSalary;
		this.workingDays = workingDays;
		this.lopDays = lopDays;
		this.professionalTax = professionalTax;
		this.providentFund = providentFund;
		this.monthOfSalary = monthOfSalary;
		this.email = email;
	}

	public int getSalaryId() {
		return salaryId;
	}

	public void setSalaryId(int salaryId) {
		this.salaryId = salaryId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public double getBasicSalary() {
		return basicSalary;
	}

	public void setBasicSalary(double basicSalary) {
		this.basicSalary = basicSalary;
	}

	public double getTaxDeductions() {
		return taxDeductions;
	}

	public void setTaxDeductions(double taxDeductions) {
		this.taxDeductions = taxDeductions;
	}

	public double getBonuses() {
		return bonuses;
	}

	public void setBonuses(double bonuses) {
		this.bonuses = bonuses;
	}

	public double getNetSalary() {
		return netSalary;
	}

	public void setNetSalary(double netSalary) {
		this.netSalary = netSalary;
	}

	public int getWorkingDays() {
		return workingDays;
	}

	public void setWorkingDays(int workingDays) {
		this.workingDays = workingDays;
	}

	public int getLopDays() {
		return lopDays;
	}

	public void setLopDays(int lopDays) {
		this.lopDays = lopDays;
	}

	public double getProfessionalTax() {
		return professionalTax;
	}

	public void setProfessionalTax(double professionalTax) {
		this.professionalTax = professionalTax;
	}

	public double getProvidentFund() {
		return providentFund;
	}

	public void setProvidentFund(double providentFund) {
		this.providentFund = providentFund;
	}

	public Date getMonthOfSalary() {
		return monthOfSalary;
	}

	public void setMonthOfSalary(Date monthOfSalary) {
		this.monthOfSalary = monthOfSalary;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public int getPaidDays() {
	    return workingDays - lopDays;
	}
	
	
	public double calculateAverageSalary() {
        int paidDays = getPaidDays();
        if (paidDays <= 0) return 0.0;
        return netSalary / paidDays;
    }
	
	
	@Transient
	public double getOutstandingSalary()  
	{
	    int paidDays = getPaidDays();
	    if (paidDays <= 0 || workingDays <= 0) return 0.0;

	    double grossPayable = ((basicSalary + bonuses) / workingDays) * paidDays;
	    double totalDeductions = taxDeductions + professionalTax + providentFund;
	    double expectedNetSalary = grossPayable - totalDeductions;

	    return Math.abs(expectedNetSalary - netSalary);
	}

	
}