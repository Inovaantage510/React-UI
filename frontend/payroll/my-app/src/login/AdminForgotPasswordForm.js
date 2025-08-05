import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminForgotPasswordForm = () => {

  const [email, setEmail] = useState('');

  const u_log1 = "/admin/login";
  const u_log2 = "/admin/register";

   const nagivate = useNavigate();  


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email.trim() === '') {

      toast.error('Please enter your official email address');
      return;
    }

    try {
  
      const response = await axios.post(
        'http://localhost:8333/admin/forgot-password/send-mail',
        null,
        {
          params: { toEmail: email },
        }
      );
      console.log(response.data);
      toast.success('OTP sent successfully to your email!');
      nagivate("/admin/login/forgot-password/otp");

    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
      nagivate("/admin/login/forgot-password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg rounded" style={{ width: "35rem" }}>
        <div className="card-header h5 text-black bg-warning">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we’ll send you an OTP to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-outline">
              <label className="form-label" htmlFor="typeEmail" style={{ paddingRight: "11.90rem" }}>
                Email address
              </label>
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Send OTP
            </button>
          </form>
          <div className="d-flex justify-content-between mt-4">
            <Link to={u_log1}>Login</Link>
            <Link to={u_log2}>Register</Link>
          </div>
        </div>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default AdminForgotPasswordForm;