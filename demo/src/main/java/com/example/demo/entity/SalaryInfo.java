package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "SalaryInfo")
public class SalaryInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private double basic;
    private double dailyAllowance;
    private double hra;
    private double ctc;
    private double professionalDevelopment;
    private double conveyanceAllowance;
    private double foodAllowance;
    private double otherAllowance;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee; // ✅ FIXED: Removed Optional

    public SalaryInfo() {
    }

    public SalaryInfo(Integer id, String email, double basic, double dailyAllowance, double hra, double ctc,
                      double professionalDevelopment, double conveyanceAllowance, double foodAllowance,
                      double otherAllowance, Employee employee) {
        this.id = id;
        this.email = email;
        this.basic = basic;
        this.dailyAllowance = dailyAllowance;
        this.hra = hra;
        this.ctc = ctc;
        this.professionalDevelopment = professionalDevelopment;
        this.conveyanceAllowance = conveyanceAllowance;
        this.foodAllowance = foodAllowance;
        this.otherAllowance = otherAllowance;
        this.employee = employee;
    }

    // Getters and Setters (without Optional)

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getBasic() {
        return basic;
    }

    public void setBasic(double basic) {
        this.basic = basic;
    }

    public double getDailyAllowance() {
        return dailyAllowance;
    }

    public void setDailyAllowance(double dailyAllowance) {
        this.dailyAllowance = dailyAllowance;
    }

    public double getHra() {
        return hra;
    }

    public void setHra(double hra) {
        this.hra = hra;
    }

    public double getCtc() {
        return ctc;
    }

    public void setCtc(double ctc) {
        this.ctc = ctc;
    }

    public double getProfessionalDevelopment() {
        return professionalDevelopment;
    }

    public void setProfessionalDevelopment(double professionalDevelopment) {
        this.professionalDevelopment = professionalDevelopment;
    }

    public double getConveyanceAllowance() {
        return conveyanceAllowance;
    }

    public void setConveyanceAllowance(double conveyanceAllowance) {
        this.conveyanceAllowance = conveyanceAllowance;
    }

    public double getFoodAllowance() {
        return foodAllowance;
    }

    public void setFoodAllowance(double foodAllowance) {
        this.foodAllowance = foodAllowance;
    }

    public double getOtherAllowance() {
        return otherAllowance;
    }

    public void setOtherAllowance(double otherAllowance) {
        this.otherAllowance = otherAllowance;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}