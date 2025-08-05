package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "Employeeperformance")
public class Employeeperformance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String email;
    private String department;
    private String title;
    private String manager;
    private Date startdate;
    private Date enddate;
    private float attendance;
    private float task;
    private float productivity;
    private String quality;
    private String communication;
    private String problemSolving;
    private String finalrating;
    private String trainings;
    private String collaboration;
    private String managerfeedback;
    private String bonusRecommendation;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToMany
    @JoinTable(
        name = "performance_tasks",
        joinColumns = @JoinColumn(name = "performance_id"),
        inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private List<Employeetask> emptasks;

    // Default constructor
    public Employeeperformance() {}

    // Full constructor
    public Employeeperformance(Integer id, String name, String email, String department, String title,
                               String manager, Date startdate, Date enddate, float attendance, float task,
                               float productivity, String quality, String communication, String problemSolving,
                               String finalrating, String trainings, String collaboration, String managerfeedback,
                               String bonusRecommendation, Employee employee, List<Employeetask> emptasks) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.department = department;
        this.title = title;
        this.manager = manager;
        this.startdate = startdate;
        this.enddate = enddate;
        this.attendance = attendance;
        this.task = task;
        this.productivity = productivity;
        this.quality = quality;
        this.communication = communication;
        this.problemSolving = problemSolving;
        this.finalrating = finalrating;
        this.trainings = trainings;
        this.collaboration = collaboration;
        this.managerfeedback = managerfeedback;
        this.bonusRecommendation = bonusRecommendation;
        this.employee = employee;
        this.emptasks = emptasks;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public Date getStartdate() {
		return startdate;
	}

	public void setStartdate(Date startdate) {
		this.startdate = startdate;
	}

	public Date getEnddate() {
		return enddate;
	}

	public void setEnddate(Date enddate) {
		this.enddate = enddate;
	}

	public float getAttendance() {
		return attendance;
	}

	public void setAttendance(float attendance) {
		this.attendance = attendance;
	}

	public float getTask() {
		return task;
	}

	public void setTask(float task) {
		this.task = task;
	}

	public float getProductivity() {
		return productivity;
	}

	public void setProductivity(float productivity) {
		this.productivity = productivity;
	}

	public String getQuality() {
		return quality;
	}

	public void setQuality(String quality) {
		this.quality = quality;
	}

	public String getCommunication() {
		return communication;
	}

	public void setCommunication(String communication) {
		this.communication = communication;
	}

	public String getProblemSolving() {
		return problemSolving;
	}

	public void setProblemSolving(String problemSolving) {
		this.problemSolving = problemSolving;
	}

	public String getFinalrating() {
		return finalrating;
	}

	public void setFinalrating(String finalrating) {
		this.finalrating = finalrating;
	}

	public String getTrainings() {
		return trainings;
	}

	public void setTrainings(String trainings) {
		this.trainings = trainings;
	}

	public String getCollaboration() {
		return collaboration;
	}

	public void setCollaboration(String collaboration) {
		this.collaboration = collaboration;
	}

	public String getManagerfeedback() {
		return managerfeedback;
	}

	public void setManagerfeedback(String managerfeedback) {
		this.managerfeedback = managerfeedback;
	}

	public String getBonusRecommendation() {
		return bonusRecommendation;
	}

	public void setBonusRecommendation(String bonusRecommendation) {
		this.bonusRecommendation = bonusRecommendation;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public List<Employeetask> getEmptasks() {
		return emptasks;
	}

	public void setEmptasks(List<Employeetask> emptasks) {
		this.emptasks = emptasks;
	}

}