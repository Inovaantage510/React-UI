import React, { useState } from 'react';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
    IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Salaryinformantion = () => {

    const [form, setForm] = useState({
        email: "",
        basic: "",
        dailyAllowance: "",
        hra: "",
        ctc: "",
        professionalDevelopment: "",
        conveyanceAllowance: "",
        foodAllowance: "",
        otherAllowance: ""
    });

    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setForm({ ...form, [field]: e.target.value });
    };

    const handleSubmit = async () => {
       
        const salaryInfoData = {
            email: form.email,
            basic: parseFloat(form.basic),
            dailyAllowance: parseFloat(form.dailyAllowance),
            hra: parseFloat(form.hra),
            ctc: parseFloat(form.ctc),
            professionalDevelopment: parseFloat(form.professionalDevelopment),
            conveyanceAllowance: parseFloat(form.conveyanceAllowance),
            foodAllowance: parseFloat(form.foodAllowance),
            otherAllowance: parseFloat(form.otherAllowance)
        };

        try {
          
            const response = await axios.post('http://localhost:8333/salary/saveinfo', salaryInfoData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Salary Info Saved:', response.data);
            alert('Salary information saved successfully!');
        } catch (error) {
            console.error('Error saving salary info:', error);
            alert('There was an error saving the salary information.');
        }
    };

    return (
        <Box
            sx={{
                p: { xs: 2, md: 4 },
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FFE0B2, #FFB74D)',
                overflowX: 'hidden',
                maxWidth: '100vw',
                boxSizing: 'border-box'
            }}
        >
            <Box display="flex" alignItems="center" mb={3} flexWrap="wrap">
                <IconButton onClick={() => navigate(-1)} sx={{ color: 'black', mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                    Employee Salary Info
                </Typography>
            </Box>

            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: '#fff3e0' }}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={form.email}
                            onChange={handleChange('email')}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Basic"
                            value={form.basic}
                            onChange={handleChange('basic')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Daily Allowance"
                            value={form.dailyAllowance}
                            onChange={handleChange('dailyAllowance')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="HRA"
                            value={form.hra}
                            onChange={handleChange('hra')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="CTC"
                            value={form.ctc}
                            onChange={handleChange('ctc')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Professional Development"
                            value={form.professionalDevelopment}
                            onChange={handleChange('professionalDevelopment')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Conveyance Allowance"
                            value={form.conveyanceAllowance}
                            onChange={handleChange('conveyanceAllowance')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Food Allowance"
                            value={form.foodAllowance}
                            onChange={handleChange('foodAllowance')}
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            fullWidth
                            label="Other Allowance"
                            value={form.otherAllowance}
                            onChange={handleChange('otherAllowance')}
                            margin="normal"
                            type="number"
                        />

                        <Grid item xs={12} textAlign="center" mt={2}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#fb8c00', mx: 1 }}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Salaryinformantion;