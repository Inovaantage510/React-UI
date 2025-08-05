import React, { useState } from 'react';
import  OtpInput  from 'react-otp-input';
import './otp.css';
import { Link } from 'react-router-dom';


const AdminOTPform = () => {
  const [otp, setOtp] = useState('');
   
  const number_len = 6; 

  const handleOtpChange = (value) => { 
 
    if (isNaN(value)) {
      alert("Invalid character");
    } else {
      setOtp(value);
    }
  };    


  let a_o_r_p = "/admin/login/forgot-password/otp/reset-password";  
  let url7 = `${a_o_r_p}`; 

    
  return (

<div className="container d-flex justify-content-center align-items-center min-vh-100">
<div className="card shadow-lg rounded" style={{ width: "30rem" }}>
  <div className="card-header h5 text-black bg-warning">OTP Verification</div>
  <div className="card-body px-5">
     
  <div className="otp-wrapper justify-content-center align-items-center px-5 ">
    <h3>Enter OTP</h3>
    <br></br>
    <div style={{ 
          boxShadow:'13px 13px 17px grey' 
    }}> 
    <OtpInput  
      value={otp}
      onChange={handleOtpChange}
      numInputs={number_len}
      id="numberInput"
      isInputNum={true}
      shouldAutoFocus={true}
      renderSeparator={<span>&nbsp;&nbsp;</span>}
      renderInput={(props) => <input {...props} className="otp-box" />}     
    />
    </div>
    </div>
    <br></br>
    <Link to={url7}><button type="submit" className="btn btn-primary w-100" >
                  Verify OTP
    </button></Link>

  </div>  

  </div>
  
</div>

  );
};

export default AdminOTPform;