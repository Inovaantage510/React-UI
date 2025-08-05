package com.example.demo.Repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employee;
import com.example.demo.entity.LeaveRequest;


public interface ServicerequestRepo extends JpaRepository<LeaveRequest, Integer>
{   
	Optional<LeaveRequest> findTopByEmployeeOrderByLeaveIdDesc(Employee employee);

}