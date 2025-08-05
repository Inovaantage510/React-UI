import React from 'react';
import { Typography } from '@mui/material';

const Notification = ({ notifications }) => {
    if (!notifications || notifications.length === 0) {
      return <Typography>No new notifications</Typography>;
    }
  
    const latestNotification = notifications[notifications.length - 1];
  
    return <Typography>{latestNotification}</Typography>;
  };
export default Notification; 