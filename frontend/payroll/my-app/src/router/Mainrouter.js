import React, { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "../login/AdminLogin";
import Adminregister from "../register/Adminregister";
import UserLogin from "../login/UserLogin";
import Userregister from "../register/Userregister";
import AdminForgotPasswordForm from "../login/AdminForgotPasswordForm";
import AdminOTPform from "../login/AdminOTPform";
import AdminResetPasswordForm from "../login/AdminResetPasswordForm";
import AdminDashboard from "../Dashboard/AdminDashboard";
import PayrollGenerator from "../Dashboard/PayrollGenerator";
import Employeesdashboard from "../Dashboard/Employeesdashboard";
import EmployeeApp from "../Dashboard/EmployeeApp";
import Errorhandler from "../Errorhandler";
import PayrollCalendar from "../Dashboard/PayrollCalendar";
import NotificationSound from "./notification-sound.mp3";
import HelpCenter from "../Dashboard/HelpCenter";
import Hiring from "../Dashboard/Hiring";
import Task from "../Dashboard/Task";
import Performance from "../Dashboard/Performance";
import Salaryinformantion from "../Dashboard/Salaryinformantion";
import NoticeBoard from "../Dashboard/NoticeBoard";
import NoticeTicker from "../Dashboard/NoticeTicker"; 

import Payslip from "../Dashboard/Payslip";

const Mainrouter = () => {
  const audioRef = useRef(null);

  let a_l_u = "/admin/login";
  let url1 = `${a_l_u}`;

  let a_r_u = "/admin/register";
  let url2 = `${a_r_u}`;

  let u_l_u = "/user/login";
  let url3 = `${u_l_u}`;

  let u_r_u = "/user/register";
  let url4 = `${u_r_u}`;

  let a_f_p = "/admin/login/forgot-password";
  let url5 = `${a_f_p}`;

  let a_o_f = "/admin/login/forgot-password/otp";
  let url6 = `${a_o_f}`;

  let a_o_r_p = "/admin/login/forgot-password/otp/reset-password";
  let url7 = `${a_o_r_p}`;

  let a_d_b = "/admin/login/dashboard";
  let url8 = `${a_d_b}`;

  let a_p_d_b = "/admin/dashboard/payroll_dashboard";
  let url9 = `${a_p_d_b}`;

  let e_p_d_b = "/admin/dashboard/payroll/employees";
  let url10 = `${e_p_d_b}`;

  let e_d = "/admin/dashboard/payroll/employees/details";
  let url11 = `${e_d}`;

  let payroll_calender = "/admin/dashboard/payroll/calendar";
  let url13 = `${payroll_calender}`;

  let help_center = "/admin/dashboard/helpcenter";
  let url14 = `${help_center}`;

  let hiring = "/admin/dashboard/employees/jobs/hiring";
  let url15 = `${hiring}`;

  let task = "/admin/dashboard/employees/daily/tasks";
  let url16 = `${task}`;

  let performance = "/admin/dashboard/employees/performance";
  let url17 = `${performance}`;

  let salary_info = "/admin/dashboard/employees/salary_info";  
  let url19 = `${salary_info}`; 

  let notice_board = "/admin/dashboard/employees/notice_board"; 
  let url20 = `${notice_board}`; 

  let notice_ticker = "/admin/dashboard/employees/notice_ticker"; 
  let url21 = `${notice_ticker}`;  

  let payslip = "/admin/dashboard/employees/payslip"; 
  let url22 = `${payslip}`; 

  return (
    <BrowserRouter>
      <audio ref={audioRef} src={NotificationSound} />
      <Routes>
        <Route path={url1} element={<AdminLogin audioRef={audioRef} />} />
        <Route path={url2} element={<Adminregister />} />
        <Route path={url3} element={<UserLogin />} />
        <Route path={url4} element={<Userregister />} />
        <Route path={url5} element={<AdminForgotPasswordForm />} />
        <Route path={url6} element={<AdminOTPform />} />
        <Route path={url7} element={<AdminResetPasswordForm />} />
        <Route path={url8} element={<AdminDashboard />} />
        <Route path={url9} element={<PayrollGenerator />} />
        <Route path={url10} element={<Employeesdashboard addEmployee={(emp) => console.log(emp)} />} />
        <Route path={url11} element={<EmployeeApp />} /> 
        <Route path={url13} element={<PayrollCalendar />} />
        <Route path={url14} element={<HelpCenter />} />
        <Route path={url15} element={<Hiring />} />
        <Route path={url16} element={<Task />} />
        <Route path={url17} element={<Performance />} />   
        <Route path={url22} element={<Payslip />} /> 
        <Route path={url19} element={<Salaryinformantion />}  />   
        <Route path={url20} element={<NoticeBoard />} />
        <Route path={url21} element={<NoticeTicker />} />

        <Route path="*" element={<Errorhandler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Mainrouter;