import React, { useState } from "react";
import "./adminlogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet"; 

const AdminLogin = ({ setNotifications = () => {}, audioRef }) => {
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  let copyright = "©Copyright 2024. All Rights Reserved."; 


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8333/admin/login/auth/saveadmin", {
        emailId,
        password,
      });

      const admin = response.data;

      if (admin && admin.id) {
        const name = emailId.split("@")[0].split(".")[0];
        const newNotifications = [`Welcome ${name}`];

        localStorage.setItem("notifications", JSON.stringify(newNotifications));
        setNotifications(newNotifications);
        setResponseMessage("Login successful!");

        setTimeout(() => {
          playAudio();
          setTimeout(() => {
            navigate("/admin/login/dashboard", {
              state: { name, notifications: newNotifications },
            });
          }, 500);
        }, 1000);
      } else {
        setResponseMessage("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response && err.response.data) {
        setResponseMessage(err.response.data);
      } else {
        setResponseMessage("An error occurred during login.");
      }
    }
  };

  function playAudio() {
    if (audioRef?.current) {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    }
  }

  return (
    <section className="vh-100"> 
      <Helmet>
        <title>Admin Login</title>
      </Helmet>  
 
      <img src="https://inovaantage.com/wp-content/uploads/2023/08/inovaantage-logo-new.png" style={{ height:"57px" , width:"250px" }} alt="inovaantage logo"></img>

      <div className="container-fluid h-custom"> 
        <div className="row d-flex justify-content-center align-items-center h-100"> 
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="/payrollimg.png" className="img-fluid" alt="Login visual" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"  style={{ 

              border:"1px solid #b6b7b8ff",
              padding:"50px",  
              boxShadow:'10px 10px 10px grey'

          }}>
             <center><h1>Admin Login</h1></center>
             &nbsp;&nbsp; &nbsp;&nbsp;

            <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="emailInput">Email address</label>
                <input
                  type="email"
                  id="emailInput"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="passwordInput">Password</label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <Link to="/admin/login/forgot-password" className="text-body" style={{ textDecoration: "none" }}>
                  Forgot password?  
                </Link>

                 <Link to="/admin/register" className="text-body" style={{ textDecoration: "none" }}>
                  Register
                 </Link>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" , 
                          backgroundColor:'rgba(224, 176, 88, 1)', 
                          borderColor:'rgba(224, 176, 88, 1)'
                   }}
                id="btnstyle">
                  Login
                </button>
              </div>

              {responseMessage && (
                <div className="alert alert-info mt-3" role="alert">
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5" 
       
        style={{ 

            backgroundColor:'rgba(224, 176, 88, 1)' , 
            color:'white' ,  

        }}
       
       >
        <div className="text-white mb-3 mb-md-0">{copyright}</div>
        <div> 
          <a href="https://x.com/inovaantage?t=f8Qexp9rHHmDVwKhI9xefg&s=09" className="text-white me-4"><i className="fab fa-twitter"></i></a>
          <a href="https://inovaantage.com/" className="text-white me-4"><i className="fab fa-google"></i></a>
          <a href="https://www.linkedin.com/company/inovaantage/" className="text-white"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;