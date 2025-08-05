package com.example.demo.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Salary;

public interface SalaryRepository extends JpaRepository<Salary, Integer> {

	 List<Salary> findByEmployeeEmployeeId(int employeeId);

	    @Query("SELECT s FROM Salary s WHERE s.employee = :employee AND FUNCTION('MONTH', s.monthOfSalary) = :month AND FUNCTION('YEAR', s.monthOfSalary) = :year")
	    List<Salary> findByEmployeeAndMonth(@Param("employee") Employee employee,
	                                        @Param("month") int month,
	                                        @Param("year") int year);

	    @Query("SELECT COUNT(s) > 0 FROM Salary s WHERE s.employee = :employee AND FUNCTION('MONTH', s.monthOfSalary) = :month AND FUNCTION('YEAR', s.monthOfSalary) = :year")
	    boolean existsByEmployeeAndMonth(@Param("employee") Employee employee,
	                                     @Param("month") int month,
	                                     @Param("year") int year);
  
}