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
  const { login, user } = useStore();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
      window.location.reload();
    }
  }, []);

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

        login(data.user);
        navigate("/", { replace: true });
        window.location.reload();
      
    } catch (err) {
      console.error("Error during login:", err);
      setErr(
        err.response?.status === 401
          ? "Incorrect email or password"
          : "Internal server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Login-page bg-[#11111] text-white">
      {loading && <LoadingSubmit />}
      <div className="container d-flex justify-content-center mb-5">
        <div className="row border rounded-5 p-3 bg-[#333333] shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "rgba(255, 193, 7, 0.5)" }}
          >
            <div className="featured-image mb-3">
              <img
                src={loginpic}
                className="img-fluid"
                style={{ width: "250px" }}
                alt="logo"
              />
            </div>
            <p className="fs-2 font-bold text-black">
              Verify Account
            </p>
            <small className="text-wrap text-center" style={{ width: "17rem", color: "black" }}>
              Welcome to the platform... Build your future with us in safety.
            </small>
          </div>

          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h1 className="text-yellow-400">Login</h1>
                <p>Welcome back</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <div className="input-group mb-4">
                  <input
                    className="form-control form-control-lg bg-[#333333] text-gray-300 border border-gray-600 outline-none focus:border-yellow-400 shadow-sm rounded-lg"
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
                    className="form-control form-control-lg bg-[#333333] text-gray-300 border border-gray-600 outline-none focus:border-yellow-400 shadow-sm rounded-lg"
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
                    <label htmlFor="formCheck" className="form-check-label text-gray-300">
                      <small>Remember me</small>
                    </label>
                  </div>
                  <div className="forgot">
                    <small>
                      <a
                        href="#"
                        style={{ textDecoration: "none", color: "#FFC107" }}
                      >
                        Forgot password?
                      </a>
                    </small>
                  </div>
                </div>

                <div className="input-group mb-3">
                <button
  type="submit"
  className="w-full mb-2 py-2 text-white text-lg font-medium bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
>
  Login
</button>
                </div>

                <div className="err-message">
                  {err && <span className="text-red-500">{err}</span>}
                </div>
              </Form>

              <div className="row mt-3">
                <small className="text-gray-300">
                  Don't have an account?{' '}
                  <Link to="/signup" style={{ textDecoration: "none", color: "#FFC107" }}>
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
