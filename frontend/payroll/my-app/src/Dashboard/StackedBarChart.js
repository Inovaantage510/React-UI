import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export const StackedBarChart = () => {
  const [empCount, setEmpCount] = useState(null);
  const [avgSalary, setAvgSalary] = useState(null);
  const [outstanding, setOutstanding] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8333/employees/total/employees')
      .then(res => setEmpCount(res.data))
      .catch(error => console.error("Error fetching employee count:", error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8333/salaries/average-per-paid-day')
      .then(res => setAvgSalary(res.data))
      .catch(error => console.error("Error fetching avg salary:", error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8333/salaries/salary/outstanding/total')
      .then(res => setOutstanding(res.data))
      .catch(error => console.error("Error fetching outstanding employees", error));
  }, []);

  if (empCount === null || avgSalary === null || outstanding === null) {
    return <div>Loading chart...</div>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '100%',
        maxWidth: 700,
        margin: 'auto',
      }}
    >
      <BarChart
        series={[
          {
            id: 'Employees',
            data: [empCount, null, null],
            label: 'Total Employees',
            color: 'pink',
          },
          {
            id: 'Salary',
            data: [null, avgSalary, null],
            label: 'Average Salary',
            color: '#FFD700', // Yellow
          },
          {
            id: 'Outstanding',
            data: [null, null, Math.trunc(outstanding)],
            label: 'Outstanding',
            color: 'blue', 
          },
        ]}
        xAxis={[{ data: ['Employees', 'Avg Salary', 'Outstanding'], scaleType: 'band' }]}
        height={400}
      />
    </Paper>
  );
};
