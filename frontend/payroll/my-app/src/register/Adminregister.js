import React from "react";

import "./adminregister.css";


const Adminregister = () => {

  return (

      <section className="text-center text-lg-start">
        <div className="container py-4">
          <div className="row g-0 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card cascading-right bg-body-tertiary" style={{ 

                            backdropFilter:"blur(30px)"

                  }}>
                <div className="card-body p-5 shadow-5 text-center">
                  <h2 className="fw-bold mb-5">Sign up now</h2>
                  <form>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form3Example1">First name</label>
                          <input type="text" id="form3Example1" className="form-control" /> 
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div data-mdb-input-init className="form-outline">
                        <label className="form-label" for="form3Example2">Last name</label>
                          <input type="text" id="form3Example2" className="form-control" />    
                        </div>
                      </div>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example3">Email address</label>   
                      <input type="email" id="form3Example3" className="form-control" /> 
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example4">Password</label>   
                      <input type="password" id="form3Example4" className="form-control" /> 
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example4">Confirm Password</label>   
                      <input type="password" id="form3Example5" className="form-control" /> 
                    </div>

                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                      Sign up
                    </button>

                    <div className="text-center">
                      <p>or sign up with:</p>
                      <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                      </button>

                      <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-google"></i>
                      </button>

                      <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                      </button> 

                      <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                        <i className="fab fa-github"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        
            <div className="col-lg-6 mb-5 mb-lg-0">
            <img src="/adminreg.png" className="w-100 rounded-4 shadow-4 img-custom-height" alt="registration" />   
            </div>
          </div>
        </div>
 
 
      </section>  
  );
};
export default Adminregister; 