import React from 'react';

const SalaryTable = ({ salaryRecords, handleDelete, tableRef }) => (
  <div style={{ marginTop: '2rem', maxWidth: '900px', margin: 'auto' }}>
    <h3>Salary Records</h3>
    <table ref={tableRef} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Salary ID</th>
          <th>Email</th>
          <th>Basic</th>
          <th>Tax</th>
          <th>Bonus</th>
          <th>Net</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {salaryRecords.map((rec, index) => {
          const netSalary = parseFloat(rec.basicSalary || 0) - parseFloat(rec.taxDeductions || 0) + parseFloat(rec.bonuses || 0);
          return (
            <tr key={index}>
              <td>{rec.salaryId || 'N/A'}</td>
              <td>{rec.email || 'N/A'}</td>
              <td>{rec.basicSalary}</td>
              <td>{rec.taxDeductions}</td>
              <td>{rec.bonuses}</td>
              <td>{netSalary.toFixed(2)}</td>
              <td>
                <button
                  onClick={() => handleDelete(rec.salaryId)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '0.5rem'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default React.memo(SalaryTable); 