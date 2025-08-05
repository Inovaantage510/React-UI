import React from 'react';

const PayrollForm = React.memo(({ formData, handleChange, handleGenerate }) => {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '140px auto 2rem',
      background: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 0 10px #ccc'
    }}>
      <h2 style={{ textAlign: 'center' }}>Payroll Generator</h2>

      <input
        type="email"
        name="email"
        placeholder="Employee Email"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="basicSalary"
        placeholder="Basic Salary"
        value={formData.basicSalary}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="taxDeductions"
        placeholder="Tax Deductions"
        value={formData.taxDeductions}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="number"
        name="bonuses"
        placeholder="Bonuses"
        value={formData.bonuses}
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        onClick={handleGenerate}
        style={{
          width: '100%',
          padding: '0.8rem',
          backgroundColor: '#0d6efd',
          color: '#fff',
          border: 'none',
          marginTop: '1rem',
          cursor: 'pointer',
          borderRadius: '5px'
        }}
      >
        Generate Payroll
      </button>
    </div>
  );
});

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none'
};

export default PayrollForm;