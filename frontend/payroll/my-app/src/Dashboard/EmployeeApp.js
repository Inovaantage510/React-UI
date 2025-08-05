import React, { useState } from 'react';
import Employeesdetails from './Employeesdetails';
import Employeesdashboard from './Employeesdashboard';

const EmployeeApp = () => {
  const [employeesRecords, setEmployeesRecords] = useState([]);

  const addEmployee = (employee) => {
    setEmployeesRecords((prevRecords) => [...prevRecords, employee]);
  };

  const deleteEmployee = (employeeId) => {
    setEmployeesRecords((prevRecords) => 
      prevRecords.filter(record => record.employeeId !== employeeId)
    );
  };

  return (
    <div>
      <Employeesdashboard addEmployee={addEmployee} />
      <Employeesdetails 
        employeesRecords={employeesRecords} 
        deleteEmployee={deleteEmployee} 
      />
    </div>
  );
};

export default EmployeeApp;