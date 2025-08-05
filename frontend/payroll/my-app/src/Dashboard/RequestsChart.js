import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export const RequestsChart = () => {
  const [totalleavereq, setTotalleavereq] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8333/service/getallrequest')
      .then(res => setTotalleavereq(res.data))
      .catch(error => console.error("Error fetching leave request", error));
  }, []);

  if (totalleavereq === null) {
    return <div>Loading chart...</div>;
  }

  const totalCount = totalleavereq;

  let barvlaue = "Total Request";

  const chartData = { 
    series: [
      {
        id: 'LeaveRequest',
        label: 'LeaveRequest',
        data: [totalCount],
        color: '#d18a8a',
      },
    ],
    xAxis: [{ data: [barvlaue], scaleType: 'band' }],
    yAxis: [{ min: 0, max: totalCount < 10 ? 10 : totalCount + 5 }], 
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '50%',
      }}
    >
      <BarChart {...chartData} height={400} />
    </Paper>
  );
};