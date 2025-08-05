import React, { useState } from 'react';
import {
  Box, Typography, useMediaQuery, Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Fab
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MainAppBar from './MainAppBar';
import axios from 'axios';


const localizer = momentLocalizer(moment);

// Sample event
const initialEvents = [
  {
    title: 'Monthly Payroll',
    start: new Date(),
    end: new Date(),
    allDay: true,
  },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  backgroundImage: 'linear-gradient(135deg,rgb(254, 248, 206),rgb(249, 143, 61))',
  minHeight: '100vh',
  width: '100%',
  boxSizing: 'border-box',
}));

const AddEventFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  backgroundColor: '#fbab60',
  color: 'black',
  '&:hover': {
    backgroundColor: '#f57c00',
  },
}));

export default function PayrollCalendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [events, setEvents] = useState(initialEvents);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleSelectSlot = ({ start, end }) => {
    if (!isMobile) {
      setNewEvent({ ...newEvent, start, end });
      setOpen(true);
    }
  };

  const handleAddEvent = () => {

    if (newEvent.title && newEvent.start && newEvent.end) {
      const formattedEvent = {
        title: newEvent.title,
        start: new Date(newEvent.start),
        end: new Date(newEvent.end)
      };

      const payload = {   

        eventtitle: newEvent.title, 
        fromEventDate: moment(newEvent.start).format('YYYY-MM-DD'),
        toEventDate: moment(newEvent.end).format('YYYY-MM-DD') 

      };

      axios.post('http://localhost:8333/inovaantage/calendar/payroll', payload, 
         {
              headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => {
          console.log('Event saved:', response.data);
          setEvents([...events, formattedEvent]);
          setOpen(false);
          setNewEvent({ title: '', start: '', end: '' });
        })
        .catch((error) => {
          console.error('Error saving event:', error);
        });
    }
  };

  return (
    <>
      <MainAppBar />
      <StyledContainer>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Payroll Calendar
        </Typography>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={!isMobile}
          onSelectSlot={handleSelectSlot}
          style={{ height: 600, backgroundColor: '#fff3e0', borderRadius: 10, padding: 10 }}
          eventPropGetter={() => ({
            style: {
              backgidth: '400px', roundColor: '#fbab60',
              color: 'black',
              borderRadius: '8px',
              border: 'none',
              padding: '4px 8px',
            },
          })}
          components={{
            event: ({ event }) => (
              <div className="rbc-event-custom">
                {event.title}
              </div>
            ),
          }}
        />


        {/* FAB only visible on mobile */}
        {isMobile && (
          <AddEventFab onClick={() => setOpen(true)}>
            <AddIcon />
          </AddEventFab>
        )}

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogTitle>
            Add Payroll Event
            <IconButton onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Event Title"
              fullWidth
              margin="dense"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <TextField
              type="datetime-local"
              label="Start"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={newEvent.start ? moment(newEvent.start).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
            />
            <TextField
              type="datetime-local"
              label="End"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={newEvent.end ? moment(newEvent.end).format('YYYY-MM-DDTHH:mm') : ''}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogContent>
        </Dialog>
      </StyledContainer>
    </>
  );
}