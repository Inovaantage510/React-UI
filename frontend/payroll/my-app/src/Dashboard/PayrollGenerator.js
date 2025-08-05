import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MainAppBar from './MainAppBar';
import Footer from './Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from './inovaantage_16_06.png';



const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#e3f2fd',
  borderRadius: 16,
  boxShadow: theme.shadows[3],
  marginBottom: theme.spacing(3),
}));

const PayrollGenerator = () => {

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasError, setHasError] = useState(null);


  const [formData, setFormData] = useState({
    email: '',
    monthOfSalary: '',
    workingDays: '',
    lopDays: '',
    basicSalary: '',
    bonuses: '',
    providentFund: '',
    professionalTax: '',
    taxDeductions: '',
  });

  const [salaryRecords, setSalaryRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.email) {
      toast.error('Email is required');
      return;
    }
    if (!formData.monthOfSalary) {
      toast.error('Month of Salary is required');
      return;
    }

    if (isNaN(parseFloat(formData.basicSalary)) || isNaN(parseFloat(formData.workingDays))) {
      toast.error('Basic Salary and Working Days must be valid numbers.');
      return;
    }
    if (parseFloat(formData.workingDays) <= 0) {
      toast.error('Working Days must be greater than zero for accurate calculations.');
      return;
    }


    setSalaryRecords([...salaryRecords, formData]);

    axios
      .post('http://localhost:8333/payroll/generate', formData)
      .then((response) => {
        console.log(response.data);
        setHasError(true);
        toast.success('Salary info added successfully');
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setHasError(false);
          toast.error("Employee's Email id not found for adding");

        } else {
          const errMsg =
            typeof error.response?.data === 'string'
              ? error.response.data
              : error.response?.data?.message || "Error Adding salary";

          setHasError(false);
          toast.error(errMsg);

        }
      });

    setFormData({
      email: '',
      monthOfSalary: '',
      workingDays: '',
      lopDays: '',
      basicSalary: '',
      bonuses: '',
      providentFund: '',
      professionalTax: '',
      taxDeductions: '',
    });
  };

  const handleUpdate = () => {
    if (!formData.email) {
      toast.error('Email is required for update');
      return;
    }

    axios.put('http://localhost:8333/payroll/update_salary_by_email', formData)
      .then(res => {
        const index = salaryRecords.findIndex(r => r.email === formData.email);
        const updated = [...salaryRecords];
        if (index !== -1) updated[index] = formData;
        else updated.push(formData);
        setSalaryRecords(updated);
        setHasError(true);
        toast.success('Salary Updated successfully');
        setFormData({ email: '', monthOfSalary: '', workingDays: '', lopDays: '', basicSalary: '', bonuses: '', providentFund: '', professionalTax: '', taxDeductions: '' });
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Error updating salary');
      });
  };

  const handleDelete = () => {

    const API_BASE_URL = "http://localhost:8333";

    axios.delete(`${API_BASE_URL}/payroll/delete_by_email`, {
      params: { email: formData.email }
    })
      .then(() => {
        toast.success("Salary record(s) deleted.");
        setSalaryRecords(prev => prev.filter(r => r.email !== formData.email));
      })
      .catch((error) => {

        if (error.response?.status === 404) {

          toast.error("Employee's Email id not found for deleting");

        } else {

          const errMsg =
            typeof error.response?.data === 'string'
              ? error.response.data
              : error.response?.data?.message || "Error deleting salary";

          toast.error(errMsg);

        }

      });
  };

  const calcNetSalary = (item) => {
    const basic = parseFloat(item.basicSalary || 0);
    const bonuses = parseFloat(item.bonuses || 0);
    const providentFund = parseFloat(item.providentFund || 0);
    const professionalTax = parseFloat(item.professionalTax || 0);
    const taxDeductions = parseFloat(item.taxDeductions || 0);
    const workingDays = parseFloat(item.workingDays || 0);
    const lopDays = parseFloat(item.lopDays || 0);

    if (workingDays <= 0) return '0.00';

    const perDaySalary = basic / workingDays;
    const lopDeduction = perDaySalary * lopDays;

    const adjustedBasic = basic - lopDeduction;
    const grossSalary = adjustedBasic + bonuses;
    const totalDeductions = providentFund + professionalTax + taxDeductions;

    const netSalary = grossSalary - totalDeductions;
    return netSalary.toFixed(2);
  };



  let navigate = useNavigate();


  const generatePayslipPDF = async (record) => {
    const {
      email,
      monthOfSalary,
      workingDays,
      lopDays,
      basicSalary,
      bonuses,
      providentFund,
      professionalTax,
      taxDeductions,
    } = record;

    let joiningDate = 'N/A';
    let designation = 'N/A';
    let department = 'N/A';

    const API_BASE_URL = 'http://localhost:8333';

    try {
      const [joiningDateRes, designationRes, departmentRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/employees/joining-date`, { params: { email } }),
        axios.get(`${API_BASE_URL}/employees/designation`, { params: { email } }),
        axios.get(`${API_BASE_URL}/employees/department`, { params: { email } }),
      ]);
      joiningDate = joiningDateRes.data || 'N/A';
      designation = designationRes.data || 'N/A';
      department = departmentRes.data || 'N/A';
    } catch (error) {
      console.error('Error fetching employee details for PDF:', error);
      toast.error('Failed to fetch employee details for payslip. PDF might be incomplete.');
    }

    // Convert and calculate
    const basicCents = Math.round(parseFloat(basicSalary || 0) * 100);
    const bonCents = Math.round(parseFloat(bonuses || 0) * 100);
    const pfCents = Math.round(parseFloat(providentFund || 0) * 100);
    const profTaxCents = Math.round(parseFloat(professionalTax || 0) * 100);
    const taxDedCents = Math.round(parseFloat(taxDeductions || 0) * 100);
    const wDays = parseFloat(workingDays || 0);
    const lDays = parseFloat(lopDays || 0);

    let adjustedBasicSalaryCents = basicCents;
    let lopDeductionAmountCents = 0;

    if (wDays > 0 && lDays > 0) {
      const perDaySalaryCents = Math.round(basicCents / wDays);
      lopDeductionAmountCents = Math.round(perDaySalaryCents * lDays);
      adjustedBasicSalaryCents = basicCents - lopDeductionAmountCents;
    }

    const earningsTotalCents = adjustedBasicSalaryCents + bonCents;
    const deductionsTotalCents = pfCents + profTaxCents + taxDedCents;
    const netPayCents = earningsTotalCents - deductionsTotalCents;

    // Display format
    const basicDisp = (basicCents / 100).toFixed(2);
    const bonDisp = (bonCents / 100).toFixed(2);
    const pfDisp = (pfCents / 100).toFixed(2);
    const profTaxDisp = (profTaxCents / 100).toFixed(2);
    const taxDedDisp = (taxDedCents / 100).toFixed(2);
    const lopDeductionAmountDisp = (lopDeductionAmountCents / 100).toFixed(2);
    const adjustedBasicSalaryDisp = (adjustedBasicSalaryCents / 100).toFixed(2);
    const earningsTotalDisp = (earningsTotalCents / 100).toFixed(2);
    const deductionsTotalDisp = (deductionsTotalCents / 100).toFixed(2);
    const netPayDisp = (netPayCents / 100).toFixed(2);

    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;

    img.onload = () => {
      const pdfWidth = 50;
      const aspectRatio = img.height / img.width;
      const pdfHeight = pdfWidth * aspectRatio;
      doc.addImage(img, 'PNG', 20, 10, pdfWidth, pdfHeight); // Top left

      doc.setFontSize(18);
      doc.text('Payslip', 90, 20); // Title

      doc.setFontSize(12);
      doc.text('Inovaantage Inc', 85, 30); // Company name

      // Moved content up
      doc.setFontSize(11);
      doc.text(`Date of Joining: ${joiningDate}`, 20, 60);
      doc.text(`Pay Period: ${monthOfSalary || 'N/A'}`, 90, 60);
      doc.text(`Worked Days: ${wDays || 'N/A'}`, 160, 60);

      doc.text(`Email id: ${email || 'N/A'}`, 20, 50);
      doc.text(`Designation: ${designation}`, 90, 70);
      doc.text(`Department: ${department}`, 160, 70); 


      autoTable(doc, {
        startY: 80,
        head: [['Earnings', 'Amount']],
        body: [
          ['Basic Salary (Gross)', basicDisp],
          ['Less LOP Days', `(${lDays} days)`],
          ['LOP Deduction', (-parseFloat(lopDeductionAmountDisp)).toFixed(2)],
          ['Adjusted Basic Salary', adjustedBasicSalaryDisp],
          ['Bonuses', bonDisp],
          ['Total Earnings', earningsTotalDisp],
        ],
        theme: 'grid',
        headStyles: { fillColor: [220, 176, 93] },
        bodyStyles: { fillColor: [245, 216, 162] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Deductions', 'Amount']],
        body: [
          ['Provident Fund', pfDisp],
          ['Professional Tax', profTaxDisp],
          ['Tax Deductions', taxDedDisp],
          ['Total Deductions', deductionsTotalDisp],
        ],
        theme: 'grid',
        headStyles: { fillColor: [220, 176, 93] },
        bodyStyles: { fillColor: [245, 216, 162] },
      });

      const footerY = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`Net Pay: ${netPayDisp}`, 90, footerY);

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text('Employer Signature', 20, footerY + 20);
      doc.text('Employee Signature', 150, footerY + 20);

      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      doc.text('This is a system generated payslip', 70, footerY + 40);

      doc.save(`${email || 'payslip'}_${monthOfSalary}.pdf`);
    };
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <MainAppBar />
      <Paper sx={{ mt: 10, px: 4, py: 3, pt: 10, margin: '12px' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: 'black', mr: 1 }}>
          <ArrowBackIcon />
          &nbsp;&nbsp;
          <Typography variant="h5" gutterBottom>
            Salary Processing
          </Typography>
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            &nbsp;
            <TextField
              fullWidth
              label="Employee Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            &nbsp;
            <TextField
              fullWidth
              type="date"
              label="Month of Salary"
              name="monthOfSalary"
              value={formData.monthOfSalary}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Working Days"
              name="workingDays"
              value={formData.workingDays}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="LOP Days"
              name="lopDays"
              value={formData.lopDays}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Basic Salary"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Bonuses"
              name="bonuses"
              value={formData.bonuses}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Provident Fund"
              name="providentFund"
              value={formData.providentFund}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Professional Tax"
              name="professionalTax"
              value={formData.professionalTax}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            &nbsp;
            <TextField
              fullWidth
              type="number"
              label="Tax Deductions"
              name="taxDeductions"
              value={formData.taxDeductions}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAdd}
              sx={{
                backgroundColor: 'rgb(230, 198, 138)',
                color: 'black',
                '&:hover': { backgroundColor: 'rgb(245, 216, 162)' },
                mt: 10
              }}
            >
              Process Salary
            </Button>
          </Grid>
        </Grid>

        {hasError && (

          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: 'rgb(220, 176, 93)' }}>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>Working Days</TableCell>
                  <TableCell>LOP Days</TableCell>
                  <TableCell>Basic Salary</TableCell>
                  <TableCell>Bonuses</TableCell>
                  <TableCell>Provident Fund</TableCell>
                  <TableCell>Professional Tax</TableCell>
                  <TableCell>Tax Deductions</TableCell>
                  <TableCell>Net Salary</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ backgroundColor: 'rgb(245, 216, 162)' }}>
                {salaryRecords.map((sal, index) => (
                  <TableRow key={index}
                    selected={selectedIndex === index}
                    onClick={() => {
                      setSelectedIndex(index);
                      setFormData(salaryRecords[index]);
                      toast.info(`Selected record: ${salaryRecords[index].email}`, { autoClose: 1500 });
                    }}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: selectedIndex === index ? 'rgba(25, 118, 210, 0.2)' : 'inherit',
                    }}>

                    <TableCell>{sal.email}</TableCell>
                    <TableCell>{sal.monthOfSalary}</TableCell>
                    <TableCell>{sal.workingDays}</TableCell>
                    <TableCell>{sal.lopDays}</TableCell>
                    <TableCell>{sal.basicSalary}</TableCell>
                    <TableCell>{sal.bonuses}</TableCell>
                    <TableCell>{sal.providentFund}</TableCell>
                    <TableCell>{sal.professionalTax}</TableCell>
                    <TableCell>{sal.taxDeductions}</TableCell>
                    <TableCell>{calcNetSalary(sal)}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: 'rgb(120, 140, 200)', // Blueish
                          color: 'white',
                          '&:hover': { backgroundColor: 'rgb(100, 120, 180)' },
                          mr: 1,
                        }}
                        onClick={() => {
                          setSelectedIndex(index);
                          setFormData(salaryRecords[index]);
                          toast.success(`Selected ${salaryRecords[index].email}`, { autoClose: 1500 });
                        }}
                      >
                        Select
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: 'rgb(188, 193, 138)',
                          color: 'white',
                          '&:hover': { backgroundColor: 'rgb(220, 194, 62)' },
                        }}
                        onClick={() => generatePayslipPDF(sal)}
                      >
                        Download Payslip
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
          >
            <EditIcon sx={{ mr: 1 }} /> Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            <DeleteIcon sx={{ mr: 1 }} /> Delete
          </Button>
        </Box>

      </Paper>
      <Footer />
      <ToastContainer position="bottom-center" autoClose={3000} />
    </Box>
  );
}

export default PayrollGenerator;