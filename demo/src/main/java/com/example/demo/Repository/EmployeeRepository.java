package com.example.demo.Repository;

import java.util.Date;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.demo.entity.Employee;
import jakarta.transaction.Transactional;


public interface EmployeeRepository extends JpaRepository<Employee, Integer> { 
	 Optional<Employee> findByEmail(String email);
	 Optional<Employee> findByName(String name);   
	 
	 @Modifying
	 @Transactional
	 @Query("""
	     UPDATE Employee e SET 
	         e.name = :name,
	         e.department = :department,
	         e.designation = :designation,
	         e.dob = :dob,
	         e.primarycontact = :primaryContact,
	         e.maritalstatus = :maritalStatus,
	         e.Spousesname = :spousesName,
	         e.emergencycontactname = :emergencyContactName,
	         e.permanentaddress = :permanentAddress,
	         e.presentaddress = :presentAddress,
	         e.aadhaarnumber = :aadhaarNumber,
	         e.pannumber = :panNumber,
	         e.bankaccountnumber = :bankAccountNumber,
	         e.IFSCcode = :ifscCode,
	         e.UANnumber = :uanNumber,
	         e.location = :location,
	         e.joiningDate = :joiningDate
	     WHERE e.email = :email
	 """)
	 int updateFullEmployeeByEmail(
	     @Param("name") String name,
	     @Param("department") String department,
	     @Param("designation") String designation,
	     @Param("dob") Date dob,
	     @Param("primaryContact") String primaryContact,
	     @Param("maritalStatus") String maritalStatus,
	     @Param("spousesName") String spousesName,
	     @Param("emergencyContactName") String emergencyContactName,
	     @Param("permanentAddress") String permanentAddress,
	     @Param("presentAddress") String presentAddress,
	     @Param("aadhaarNumber") String aadhaarNumber,
	     @Param("panNumber") String panNumber,
	     @Param("bankAccountNumber") String bankAccountNumber,
	     @Param("ifscCode") String ifscCode,
	     @Param("uanNumber") String uanNumber,
	     @Param("location") String location,
	     @Param("joiningDate") Date joiningDate,
	     @Param("email") String email
	 );

}