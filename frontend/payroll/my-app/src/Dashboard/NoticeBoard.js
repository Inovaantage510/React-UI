import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import MainAppBar from './MainAppBar';
import Footer from './Footer';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNotice, setCurrentNotice] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('notices')) || [
      { id: 1, text: "Payroll will be processed on 25th March." },
      { id: 2, text: "Submit attendance before 5 PM today." },
    ];
    setNotices(stored);
  }, []);

  const updateStorage = (updatedNotices) => {
    localStorage.setItem('notices', JSON.stringify(updatedNotices));
  };

  const handleAdd = () => {
    setCurrentNotice("");
    setEditId(null);
    setOpenDialog(true);
  };

  const handleEdit = (id, text) => {
    setCurrentNotice(text);
    setEditId(id);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    updateStorage(updated);
  };

  const handleSave = () => {
    let updated = [];
    if (editId !== null) {
      updated = notices.map(n => n.id === editId ? { ...n, text: currentNotice } : n);
    } else {
      updated = [...notices, { id: Date.now(), text: currentNotice }];
    }
    setNotices(updated);
    updateStorage(updated);
    setOpenDialog(false);
  };

  return (
    <>
    <MainAppBar />
    <Box sx={{ mt: 12, px: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Manage Notices</Typography>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>
          Add Notice
        </Button>
      </Stack>

      {notices.map((notice) => (
        <Box
          key={notice.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#FFF3E0',
            border: '1px solid #FFB74D',
            borderRadius: 2,
            p: 2,
            mb: 1
          }}
        >
          <Typography>{notice.text}</Typography>
          <Box>
            <IconButton onClick={() => handleEdit(notice.id, notice.text)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(notice.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editId !== null ? "Edit Notice" : "Add Notice"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Notice Text"
            type="text"
            fullWidth
            variant="standard"
            value={currentNotice}
            onChange={(e) => setCurrentNotice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
    <Footer />
    </>
  );
};

export default NoticeBoard;