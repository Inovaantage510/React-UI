import React from 'react';

const Employeesdetails = ({ employeesRecords, deleteEmployee }) => {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '2rem',
  };

  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{ marginTop: '3rem', maxWidth: '900px', margin: '3rem auto' }}>
      <h3>Employee Records</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Contact Details</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeesRecords.map((record) => (
            <tr key={record.employeeId}>
              <td>{record.employeeId}</td>
              <td>{record.employeeName}</td>
              <td>{record.employeeEmail}</td>
              <td>{record.employeeDepartment}</td>
              <td>{record.employeeDesignation}</td>
              <td>{record.employeeContact}</td>
              <td>{record.employeeJoiningDate}</td>
              <td>
                <button onClick={() => deleteEmployee(record.employeeId)} style={deleteButtonStyle}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employeesdetails;