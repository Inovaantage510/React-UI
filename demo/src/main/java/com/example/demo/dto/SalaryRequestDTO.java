package com.example.demo.dto;

import java.util.Date;

public class SalaryRequestDTO {

    private String email; 
    private double basicSalary;
    private double taxDeductions;
    private double bonuses;
    private double professionalTax;
    private double providentFund;
    private int workingDays;
    private int lopDays;
    private Date monthOfSalary; 

   

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public Date getMonthOfSalary() {
        return monthOfSalary;
    }

    public void setMonthOfSalary(Date monthOfSalary) {
        this.monthOfSalary = monthOfSalary;
    }
}