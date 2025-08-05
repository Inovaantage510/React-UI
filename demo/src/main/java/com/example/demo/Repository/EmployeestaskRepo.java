package com.example.demo.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Employeetask;

public interface EmployeestaskRepo extends JpaRepository<Employeetask, Integer>  
{  
	 List<Employeetask> findByName(String name);   
}