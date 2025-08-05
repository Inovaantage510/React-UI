import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, MenuItem, Typography,
  Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Paper, Box, FormControl, InputLabel, Select
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainAppBar from './MainAppBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff3e0',
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3)
}));

const emptyForm = {
  name: '', designation: '', department: '', joiningDate: '', location: '',
  pannumber: '', uannumber: '', bankaccountnumber: '', aadhaarnumber: '',
  dob: '', email: '', primarycontact: '', maritalstatus: 'No', spousesname: '',
  emergencycontactname: '', permanentaddress: '', presentaddress: '', ifsccode: ''
};

export default function EmployeePage() {
  const [formData, setFormData] = useState(emptyForm);
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = () => {
    axios.get('http://localhost:8333/employees/get-all')
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error fetching employees", err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleAdd = () => {
    const requiredFields = ["name", "designation", "department", "joiningDate", "location", "pannumber", "uannumber", "bankaccountnumber", "aadhaarnumber", "dob", "email", "primarycontact", "ifsccode"];

    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error("Please fill in all mandatory fields.");
        return;
      }
    }

    if (!/^[0-9]{10}$/.test(formData.primarycontact)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^[0-9]{12}$/.test(formData.uannumber)) {
      toast.error("Please enter a valid 12-digit UAN number");
      return;
    }

    axios.post('http://localhost:8333/employees/addemp', formData)
      .then(response => {
        toast.success("Employee added successfully!");
        setEmployees([...employees, formData]);
        setFormData(emptyForm);
      })
      .catch(error => {
        const errMsg = error.response?.data?.message || "Error adding employee";
        toast.error(errMsg);
      });
  };

  const handleUpdate = () => {
  axios.put('http://localhost:8333/employees/update-by-email', formData)
    .then(response => {
      toast.success("Employee updated successfully!");

      setEmployees([...employees, formData]); 
      setFormData(emptyForm);
      setIsEditing(false);
      setEditingIndex(null);
    })
    .catch(error => {
      if (error.response?.status === 404) {
        toast.error("Employee not found");
      } else {
        const errMsg = error.response?.data?.message || "Error updating employee";
        toast.error(errMsg);
      }
    });
};


  const handleDelete = () => {
  axios.delete(`http://localhost:8333/employees/delete_by_emp_email`, {
    params: { email: formData.email }
  })
  .then(response => {
    toast.success("Employee deleted successfully!");

    setEmployees(employees.filter(emp => emp.email !== formData.email)); 
    setFormData(emptyForm);
    setIsEditing(false);
    setEditingIndex(null);
  })
  .catch(error => {
    if (error.response?.status === 404) {
      toast.error("Employee not found");
    } else {
      const errMsg = error.response?.data?.message || "Error deleting employee";
      toast.error(errMsg);
    }
  });
};


  return (
    <Box sx={{ overflowX: "hidden" }}>
      <MainAppBar />
      <Paper sx={{ mt: 10, px: 4, py: 3, pt: 10, margin: '12px' }}>
        <Typography variant="h5" gutterBottom>Employee Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth type="date" label="DOB" name="dob" value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Primary Contact" name="primarycontact" value={formData.primarycontact} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Department" name="department" value={formData.department} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Designation" name="designation" value={formData.designation} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth type="date" label="Joining Date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="PAN" name="pannumber" value={formData.pannumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="UAN" name="uannumber" value={formData.uannumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Bank A/c No." name="bankaccountnumber" value={formData.bankaccountnumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="IFSC Code" name="ifsccode" value={formData.ifsccode} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Aadhar" name="aadhaarnumber" value={formData.aadhaarnumber} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Marital Status</InputLabel>
              <Select name="maritalstatus" value={formData.maritalstatus} label="Marital Status" onChange={handleChange}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Spouse Name" name="spousesname" value={formData.spousesname} onChange={handleChange} disabled={formData.maritalstatus === "No"} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Emergency Contact" name="emergencycontactname" value={formData.emergencycontactname} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Permanent Address" name="permanentaddress" value={formData.permanentaddress} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Present Address" name="presentaddress" value={formData.presentaddress} onChange={handleChange} /></Grid>

          <Grid item xs={12}>
            {isEditing ? (
              <>
                <Button variant="contained" onClick={handleUpdate} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
                  Update
                </Button>
                <Button variant="contained" onClick={handleDelete} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
                  Delete
                </Button>
              </>

            ) : (
              <>
                <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
                  Add
                </Button>
                {"\t"}
                <Button variant="contained" onClick={handleUpdate} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
                  Update
                </Button>
                {"\t"}
                <Button variant="contained" onClick={handleDelete} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
                  Delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: 'rgb(248, 185, 133)' }}>
              <TableRow>
                <TableCell>Name</TableCell><TableCell>Email</TableCell><TableCell>DOB</TableCell><TableCell>Primary Contact</TableCell>
                <TableCell>Department</TableCell><TableCell>Designation</TableCell><TableCell>Location</TableCell><TableCell>Joining Date</TableCell>
                <TableCell>PAN</TableCell><TableCell>UAN</TableCell><TableCell>Bank A/c No</TableCell><TableCell>IFSC Code</TableCell><TableCell>Aadhar</TableCell>
                <TableCell>Marital Status</TableCell><TableCell>Spouse Name</TableCell><TableCell>Emergency Contact</TableCell>
                <TableCell>Permanent Address</TableCell><TableCell>Present Address</TableCell>

              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: 'rgb(245, 216, 193)' }}>
              {employees.map((emp, index) => (
                <TableRow key={index}>
                  <TableCell>{emp.name}</TableCell><TableCell>{emp.email}</TableCell><TableCell>{emp.dob}</TableCell><TableCell>{emp.primarycontact}</TableCell>
                  <TableCell>{emp.department}</TableCell><TableCell>{emp.designation}</TableCell><TableCell>{emp.location}</TableCell><TableCell>{emp.joiningDate}</TableCell>
                  <TableCell>{emp.pannumber}</TableCell><TableCell>{emp.uannumber}</TableCell><TableCell>{emp.bankaccountnumber}</TableCell><TableCell>{emp.ifsccode}</TableCell>
                  <TableCell>{emp.aadhaarnumber}</TableCell><TableCell>{emp.maritalstatus}</TableCell><TableCell>{emp.spousesname}</TableCell><TableCell>{emp.emergencycontactname}</TableCell>
                  <TableCell>{emp.permanentaddress}</TableCell><TableCell>{emp.presentaddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid item xs={12} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/admin/dashboard/payroll_dashboard')} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
            Process Salary
          </Button>
        </Grid>

        <Grid sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/admin/dashboard/employees/salary_info')} sx={{ backgroundColor: '#FF9800', color: '#fff', '&:hover': { backgroundColor: '#FB8C00' } }}>
            Employee Salary Info
          </Button>
        </Grid>
      </Paper>
      <Footer />
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Box>
  );
}