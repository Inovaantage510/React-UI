import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const NoticeTicker = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notices')) || [];
    setNotices(stored);
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: '#FFA726',
        py: 1,
        px: 2,
        position: 'relative',
        borderBottom: '2px solid #FB8C00',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          animation: 'scroll-left 20s linear infinite',
        }}
      >
        {notices.map((notice) => (
          <Typography
            key={notice.id}
            component="span"
            sx={{ color: 'white', fontWeight: 500, mr: 5 }}
          >
            📢 {notice.text}
          </Typography>
        ))}
      </Box>

      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NoticeTicker;