import React, { useState, useEffect } from 'react';
import { Paper, Typography, Stack, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const AnimatedNumber = ({ end = 0, duration = 1000, decimals = 0 }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    let startTime = null;
    const delta = end - start;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = Math.min((timestamp - startTime) / duration, 1);
      const eased = t * (2 - t); // ease-out
      setVal(start + delta * eased);
      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{val.toFixed(decimals)}</span>;
};

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textAlign: 'center',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease-in-out',
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'translateY(-5px)',
    backgroundColor: 'rgb(245, 216, 162)',
    cursor: 'pointer',
  },
}));

export default function DemoPaperSection() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  const [average, setAverage] = useState(null);
  const [avgemp, setAvgemp] = useState(null); 
  const [Outstanding , setOutstanding] = useState(null); 
  const [totalrequest , setTotalrequest ] = useState(null); 

  useEffect(() => {
    axios.get('http://localhost:8333/salaries/average-per-paid-day')
      .then(response => setAverage(response.data))
      .catch(error => console.error("Error fetching average salary:", error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8333/employees/total/employees')
      .then(response => setAvgemp(response.data))
      .catch(error => console.error("Error fetching total employees:", error));
  }, []);

  useEffect(() => {
  axios.get('http://localhost:8333/salaries/salary/outstanding/total')
    .then(res => {
      const value = Number(res.data);
      console.log("Verified outstanding value:", value); // 👀 See if it's 19 or 20
      setOutstanding(isNaN(value) ? 0 : value);
    })
    .catch(err => console.error("Error fetching total outstanding salary", err));
}, []);

 

  useEffect(()=>{ 

     axios.get('http://localhost:8333/service/getallrequest').then(res => setTotalrequest(res.data)).catch(err => console.error("Error fetching total leave request employees:" , err)); 

  },[]); 


  const demoData = [
    {
      title: 'Total Employees',
      value: typeof avgemp === 'number' ? avgemp : 0,
      prefix: '👨‍💼',
      color: '#f28b82',
      decimals: 0,
      backgroundColor: 'rgb(245, 216, 162)'
    },
    {
      title: 'Total Average Salary',
      value: typeof average === 'number' ? average : 0,
      prefix: '₹',
      color: '#fbbc04',
      decimals: 2,
      backgroundColor:'rgb(245, 216, 162)'
    },
    {
      title: 'Total Outstanding',
      value: typeof Outstanding === 'number' ? Math.trunc(Outstanding) : 0,
      prefix: '₹',
      color: '#34a853',
      decimals: 0,
      backgroundColor:'rgb(245, 216, 162)' 
    },
    {
      title: 'Total Leave Requests',
      value: typeof totalrequest === 'number' ? totalrequest : 0,
      prefix: '📝',
      color: '#ea4335',
      decimals: 0,
      backgroundColor:'rgb(245, 216, 162)'
    },
  ];

  return (
    <Stack
      direction={isXs ? 'column' : 'row'}
      spacing={2}
      flexWrap="wrap"
      justifyContent="space-evenly"
      sx={{ width: '100%', mt: 2  }}
    >
      {demoData.map((item, index) => (
        <DemoPaper
          key={index}
          sx={{
            flex: '1 1 200px',
            minWidth: '200px',
            backgroundColor: [ item.color , item.backgroundColor ]
          }}
        >
          <Typography variant="h6">{item.title}</Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
          >
            <span>{item.prefix}</span>
            <AnimatedNumber end={item.value} decimals={item.decimals} />
          </Typography>
        </DemoPaper>
      ))}
    </Stack>
  );
}