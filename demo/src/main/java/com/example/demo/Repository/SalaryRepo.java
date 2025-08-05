package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SalaryInfo;

public interface SalaryRepo extends JpaRepository<SalaryInfo, Integer>  
{  }