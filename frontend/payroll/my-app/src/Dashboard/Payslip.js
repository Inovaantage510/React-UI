import React from 'react';

const Payslip = ({ data }) => {
  return (
    <div style={{ padding: '24px', width: '600px', fontFamily: 'Arial', border: '1px solid #ccc' }}>
      <h2>Payslip - {data.payPeriod}</h2>
      <p><strong>Employee:</strong> {data.name}</p>
      <p><strong>Designation:</strong> {data.designation}</p>
      <p><strong>Department:</strong> {data.department}</p>
      <p><strong>Joining Date:</strong> {data.joiningDate}</p>
      <hr />
      <h4>Earnings</h4>
      {data.earnings.map((item, i) => (
        <p key={i}>{item.label}: ₹{item.amount}</p>
      ))}
      <h4>Deductions</h4>
      {data.deductions.map((item, i) => (
        <p key={i}>{item.label}: ₹{item.amount}</p>
      ))}
      <h3>Net Pay: ₹{data.netPay}</h3>
    </div>
  );
};

export default Payslip;