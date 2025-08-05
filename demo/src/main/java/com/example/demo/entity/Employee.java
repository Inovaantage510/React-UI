package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "employee")
public class Employee   
{
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int employeeId;

    private String name;

    @Column(unique = true)
    private String email;

    private String department;
    private String designation;
   
    private Date dob;
    private String primarycontact; 
    private String maritalstatus; 
    private String Spousesname;   
    private String emergencycontactname; 
    private String permanentaddress; 
    private String presentaddress; 
    private String aadhaarnumber; 
    private String pannumber; 
    private String bankaccountnumber; 
    private String IFSCcode;
    private String UANnumber; 
    private String location;  
    
    
    @Temporal(TemporalType.DATE)
    private Date joiningDate;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    private List<Salary> salaries;

    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)   
    private List<SalaryInfo> salariresinfo; 
    
   
	                public Employee() {  }


					public Employee(int employeeId, String name, String email, String department, String designation,
							Date dob, String primarycontact, String maritalstatus, String spousesname,
							String emergencycontactname, String permanentaddress, String presentaddress,
							String aadhaarnumber, String pannumber, String bankaccountnumber, String iFSCcode,
							String uANnumber, String location, Date joiningDate, List<Salary> salaries,
							List<SalaryInfo> salariresinfo) {
						super();
						this.employeeId = employeeId;
						this.name = name;
						this.email = email;
						this.department = department;
						this.designation = designation;
						this.dob = dob;
						this.primarycontact = primarycontact;
						this.maritalstatus = maritalstatus;
						Spousesname = spousesname;
						this.emergencycontactname = emergencycontactname;
						this.permanentaddress = permanentaddress;
						this.presentaddress = presentaddress;
						this.aadhaarnumber = aadhaarnumber;
						this.pannumber = pannumber;
						this.bankaccountnumber = bankaccountnumber;
						IFSCcode = iFSCcode;
						UANnumber = uANnumber;
						this.location = location;
						this.joiningDate = joiningDate;
						this.salaries = salaries;
						this.salariresinfo = salariresinfo;
					}


					public int getEmployeeId() {
						return employeeId;
					}


					public void setEmployeeId(int employeeId) {
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


					public Date getDob() {
						return dob;
					}


					public void setDob(Date dob) {
						this.dob = dob;
					}


					public String getPrimarycontact() {
						return primarycontact;
					}


					public void setPrimarycontact(String primarycontact) {
						this.primarycontact = primarycontact;
					}


					public String getMaritalstatus() {
						return maritalstatus;
					}


					public void setMaritalstatus(String maritalstatus) {
						this.maritalstatus = maritalstatus;
					}


					public String getSpousesname() {
						return Spousesname;
					}


					public void setSpousesname(String spousesname) {
						Spousesname = spousesname;
					}


					public String getEmergencycontactname() {
						return emergencycontactname;
					}


					public void setEmergencycontactname(String emergencycontactname) {
						this.emergencycontactname = emergencycontactname;
					}


					public String getPermanentaddress() {
						return permanentaddress;
					}


					public void setPermanentaddress(String permanentaddress) {
						this.permanentaddress = permanentaddress;
					}


					public String getPresentaddress() {
						return presentaddress;
					}


					public void setPresentaddress(String presentaddress) {
						this.presentaddress = presentaddress;
					}


					public String getAadhaarnumber() {
						return aadhaarnumber;
					}


					public void setAadhaarnumber(String aadhaarnumber) {
						this.aadhaarnumber = aadhaarnumber;
					}


					public String getPannumber() {
						return pannumber;
					}


					public void setPannumber(String pannumber) {
						this.pannumber = pannumber;
					}


					public String getBankaccountnumber() {
						return bankaccountnumber;
					}


					public void setBankaccountnumber(String bankaccountnumber) {
						this.bankaccountnumber = bankaccountnumber;
					}


					public String getIFSCcode() {
						return IFSCcode;
					}


					public void setIFSCcode(String iFSCcode) {
						IFSCcode = iFSCcode;
					}


					public String getUANnumber() {
						return UANnumber;
					}


					public void setUANnumber(String uANnumber) {
						UANnumber = uANnumber;
					}


					public String getLocation() {
						return location;
					}


					public void setLocation(String location) {
						this.location = location;
					}


					public Date getJoiningDate() {
						return joiningDate;
					}


					public void setJoiningDate(Date joiningDate) {
						this.joiningDate = joiningDate;
					}


					public List<Salary> getSalaries() {
						return salaries;
					}


					public void setSalaries(List<Salary> salaries) {
						this.salaries = salaries;
					}


					public List<SalaryInfo> getSalariresinfo() {
						return salariresinfo;
					}


					public void setSalariresinfo(List<SalaryInfo> salariresinfo) {
						this.salariresinfo = salariresinfo;
					}
  	
}