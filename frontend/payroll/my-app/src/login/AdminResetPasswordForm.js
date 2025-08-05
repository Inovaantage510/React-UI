import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AdminResetPasswordForm = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8333/admin/login/auth/forgot-password', {
        emailId: emailId,
        password: password
      });

      console.log(response.data);
      setMessage('Password has been reset!');
      toast.success('Password has been reset!');

     
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Reset failed';
      setMessage(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg rounded" style={{ width: "30rem" }}>
        <div className="card-header h5 text-black bg-warning">Reset Password</div>
        <div className="card-body px-5">
          <form onSubmit={handleReset}>
            <label>Email ID</label>
            <br /><br />
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
            <br />
            <label>New password</label>
            <br /><br />
            <input
              type="password"
              placeholder="New password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label>Confirm New password</label>
            <br /><br />
            <input
              type="password"
              placeholder="Confirm New password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br />
            <button type="submit" className="btn btn-primary w-100">
              Reset Password
            </button>
          </form>
          {message && <p className="mt-2 text-sm" style={{ color: 'red' }}>{message}</p>}
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </div>
  );
};

export default AdminResetPasswordForm;