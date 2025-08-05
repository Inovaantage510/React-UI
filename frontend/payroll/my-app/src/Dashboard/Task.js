import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import MainAppBar from "./MainAppBar";
import Footer from "./Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";


const Task = () => {
  const [formData, setFormData] = useState({

    name: '',
    date: '',
    signintime: '',
    signouttime: '',
    starttime: '',
    endtime: '',
    module: '',
    task: '',
    status: '',
    remarks: ''

  });

  const [submittedTasks, setSubmittedTasks] = useState(() => {
    const stored = localStorage.getItem("dailyTasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("dailyTasks", JSON.stringify(submittedTasks));
  }, [submittedTasks]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updated = [...submittedTasks];
      updated[editIndex] = formData;

      setSubmittedTasks(updated);
      setEditIndex(null);
      toast.success("Task updated locally (no server sync)");
    } else {

      if (formData.date === "" ||
        formData.name === "" ||
        formData.signintime === "" ||
        formData.signouttime === "" ||
        formData.starttime === "" ||
        formData.endtime === "" ||
        formData.module === "" ||
        formData.task === "" ||
        formData.status === "" ||
        formData.remarks === ""
      ) {

            toast.error("Please fill in all mandatory fields."); 
            return; 
      }
      else { 

        axios.post('http://localhost:8333/task/employees/add', formData)
          .then(function (response) {
            console.log('Task added:', response.data);
            toast.success("Task added successfully!");
            setSubmittedTasks([...submittedTasks, formData]);
          })
          .catch(function (error) {
            console.error('Error adding task:', error);
            toast.error("Error adding task");
          });
      }   

      // axios.post('http://localhost:8333/task/employees/add', formData)
      //   .then(function (response) {
      //     console.log('Task added:', response.data);
      //     toast.success("Task added successfully!");
      //     setSubmittedTasks([...submittedTasks, formData]);
      //   })
      //   .catch(function (error) {
      //     console.error('Error adding task:', error);
      //     toast.error("Error adding task");
      //   });    

    }

    setFormData({

      name: '',
      date: '',
      signintime: '',
      signouttime: '',
      starttime: '',
      endtime: '',
      module: '',
      task: '',
      status: '',
      remarks: ''

    });
  };

  const handleEdit = (index) => {
    setFormData(submittedTasks[index]);
    setEditIndex(index);
  };

  const exportToExcel = () => {

    const ws = XLSX.utils.json_to_sheet(submittedTasks);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DailyTasks");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "EmployeesDailyTaskSheet.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Daily Task Sheet", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [[
        "Date",
        "Employee Name",
        "Sign-In",
        "Sign-Out",
        "Module",
        "Task",
        "Start Time",
        "End Time",
        "Status",
        "Remarks",
      ]],
      body: submittedTasks.map((task) => [
        task.date,
        task.name,
        task.signintime,
        task.signouttime,
        task.module,
        task.task,
        task.starttime,
        task.endtime,
        task.status,
        task.remarks,
      ]),
    });

    doc.save("EmployeesDailyTaskSheet.pdf");
  };


  return (
    <>
      <MainAppBar />
      <Box
        p={3}
        sx={{
          backgroundColor: "#fff3e0",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "#e65100", fontWeight: "bold" }}
        >
          Daily Task Sheet
        </Typography>

        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#ffe0b2", mb: 4 }}>
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(220px, 1fr))"
            gap={2}
          >
            {[
              { label: "Date", key: "date", type: "date" },
              { label: "Employee Name", key: "name" },
              { label: "Sign-In Time", key: "signintime", type: "time" },
              { label: "Sign-Out Time", key: "signouttime", type: "time" },
              { label: "Module", key: "module" },
              { label: "Task", key: "task" },
              { label: "Start Time", key: "starttime", type: "time" },
              { label: "End Time", key: "endtime", type: "time" },
              { label: "Status", key: "status" },
              { label: "Remarks", key: "remarks" },
            ].map(({ label, key, type }) => (
              <TextField
                key={key}
                label={label}
                type={type || "text"}
                value={formData[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                InputLabelProps={{ shrink: true }}
                disabled={
                  [
                    "date",
                    "name",
                    "signintime",
                    "signouttime",
                    "starttime",
                    "endtime",
                  ].includes(key) && editIndex !== null
                }
              />
            ))}
          </Box>

          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#fb8c00", color: "white" }}
              onClick={handleSubmit}
            >
              {editIndex !== null ? "Update Task" : "Submit Task"}
            </Button>
          </Box>
        </Paper>

        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
          <Button variant="outlined" onClick={exportToExcel}>
            Export Excel
          </Button>
          <Button variant="outlined" onClick={exportToPDF}>
            Export PDF
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ backgroundColor: "#fff8e1" }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Date",
                  "Employee Name",
                  "Sign-In",
                  "Sign-Out",
                  "Module",
                  "Task",
                  "Start Time",
                  "End Time",
                  "Status",
                  "Remarks",
                  "Actions",
                ].map((head) => (
                  <TableCell key={head}>
                    <strong>{head}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedTasks.length > 0 ? (
                submittedTasks.map((task, i) => (
                  <TableRow key={i}>
                    <TableCell>{task.date}</TableCell>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.signintime}</TableCell>
                    <TableCell>{task.signouttime}</TableCell>
                    <TableCell>{task.module}</TableCell>
                    <TableCell>{task.task}</TableCell>
                    <TableCell>{task.starttime}</TableCell>
                    <TableCell>{task.endtime}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.remarks}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleEdit(i)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} align="center">
                    No tasks submitted yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <Footer />
    </>
  );
};

export default Task;