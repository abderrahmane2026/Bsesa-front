import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import LoadingSubmite from './Loading';
import loginpic from "../../assets/pictur/Computer login-amico.png";
import "./Login.css";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
   
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handlePrivacyCheck = (event) => {
    setPrivacyChecked(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!privacyChecked) {
      setError("Please agree to the privacy policy.");
      return;
    }
    setLoading(true);
  
    try {
      const response = await axios.post("http://localhost:5000/userCreate", values, {
        withCredentials: true
      });
      setLoading(false);
  
      // Assuming the token is in response.data.token
      const token = response.data.token;
  
      alert("Account created successfully! Please check your email to activate your account.");
  
      // Navigate to the activation page with the token as a URL parameter
      navigate(`/activate_account/${token}`, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.status === 422) {
        setError("Email is already in use.");
      } else {
        setError("Internal server error.");
      }
    }
  };

  return (
    <div>
      {loading && <LoadingSubmite />}
      <div className="container d-flex justify-content-center mb-5">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" 
            style={{ background: "rgb(79, 70, 229,0.5)" }}>
            <div className="featured-image mb-3">
              <img src={loginpic} className="img-fluid" style={{ width: '250px' }} alt="logo" />
            </div>
            <p className="fs-2" style={{ fontWeight: 700, color: "#000000" }}>Create Your Free Account</p>
            <small className="text-wrap text-center" style={{ width: '17rem', color: 'black' }}>
              Welcome to the Develop Yourself platform... secure your future with us!
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h1>Sign Up</h1>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input 
                    className="form-control form-control-lg bg-light fs-6"
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleInput}
                    placeholder="Enter your first name..."
                    minLength={3}
                    required
                  />
                </div>

                <div className="input-group mb-4">
                  <input 
                    className="form-control form-control-lg bg-light fs-6"
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleInput}
                    placeholder="Enter your last name..."
                    minLength={3}
                    required
                  />
                </div>

                <div className="input-group mb-4">
                  <input 
                    className="form-control form-control-lg bg-light fs-6"
                    type="email"
                    name="email"
                    onChange={handleInput}
                    value={values.email}
                    placeholder="Enter your email..."
                    required
                  />
                </div>

                <div className="input-group mb-4">
                  <input 
                    className="form-control form-control-lg bg-light fs-6"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    value={values.password}
                    placeholder="Enter your password..."
                    minLength={8}
                    required
                  />
                </div>

                <div className="input-group mb-4 d-flex">
                  <input 
                    type="checkbox" 
                    className="form-check-input" 
                    id="privacyCheck" 
                    onChange={handlePrivacyCheck}
                  />
                  <label htmlFor="privacyCheck" className="form-check-label text-secondary ms-2">
                    <small>I agree to the <Link to="/privacy-policy" style={{textDecoration:"none", color:"rgb(79, 70, 229)"}}>Privacy Policy</Link> and Terms of Service</small>
                  </label>
                </div>

                <div className="input-group mb-3">
                  <button 
                    style={{ backgroundColor:"rgb(79, 70, 229)", border:"rgba(255, 0, 0, 0.8)"}}  
                    className="btn btn-lg btn-primary w-100 mb-2 fs-6"
                    type="submit"
                    disabled={!privacyChecked}
                  >
                    Sign Up
                  </button>
                </div>

                <div className="err-masseg">
                  {error && <span className="errur">{error}</span>}
                </div>
              </Form>

              <div className="row mt-3">
                <small>Already have an account? <Link style={{textDecoration:"none", color:"rgb(79, 70, 229)"}} to={"/Login"}>Log in</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}