import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import LoadingSubmit from "./Loading";
import loginpic from "../../assets/pictur/Computer login-amico.png";
import "./Login.css";
import { useStore } from "../../Context/testzustand";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const {login ,user} =useStore();
  useEffect(()=>{
    if(user){
      navigate("/", { replace: true });
      window.location.reload();
    }
  },[])
  const handleInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErr(null); // Clear any previous error message

    try {
      const { data } = await axios.post("http://localhost:5000/login", values, {
        withCredentials: true,
      });
    
      console.log("User data received:", data); // Check the response
    
      if (data.user && data.user.isActive) {
        login(data.user)
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        setErr("Account not activated yet. Please check your email.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setErr(
        err.response?.status === 401
          ? "Incorrect email or password"
          : "Internal server error. Please try again later."
      );
    }
}

  return (
    <div className="Login-page">
      {loading && <LoadingSubmit />}
      <div className="container d-flex justify-content-center mb-5">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "rgba(79, 70, 229, 0.5)" }}
          >
            <div className="featured-image mb-3">
              <img src={loginpic} className="img-fluid" style={{ width: "250px" }} alt="logo" />
            </div>
            <p className="fs-2" style={{ fontWeight: 700, color: "#000000" }}>
              Verify Account 
            </p>
            <small className="text-wrap text-center" style={{ width: "17rem", color: "black" }}>
              Welcome to the platform... Build your future with us in safety.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h1>Login</h1>
                <p>Welcome back</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input
                    className="form-control form-control-lg bg-light fs-6"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInput}
                    placeholder="Enter your email..."
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    className="form-control form-control-lg bg-light fs-6"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInput}
                    placeholder="Enter your password..."
                    minLength={8}
                    required
                  />
                </div>

                <div className="input-group mb-5 d-flex justify-content-between">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="formCheck" />
                    <label htmlFor="formCheck" className="form-check-label text-secondary">
                      <small>Remember me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "rgb(79, 70, 229)" }}
                      >
                        Forgot password?
                      </a>
                    </small>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 fs-6"
                    style={{ backgroundColor: "rgb(79, 70, 229)", border: "none" }}
                  >
                    Login
                  </button>
                </div>

                <div className="err-message">
                  {err && <span className="error">{err}</span>}
                </div>
              </Form>

              <div className="row mt-3">
                <small>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ textDecoration: "none", color: "rgb(79, 70, 229)" }}>
                    Sign up now
                  </Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
