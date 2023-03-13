import React, { useState } from "react";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";

function Login() {
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showVerifiedError, setShowVerifiedError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FAform, setShow2FAform] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (form.tfa !== undefined) {
      const code = form.tfa.value;

      await axios
        .post("http://127.0.0.1:5000/2fa", {
          email,
          code,
        })
        .then(
          (res) => {
            console.log("res 2FA");
          },
          (err) => {
            console.log("err 2FA");
          }
        );
    } else {
      await axios
        .post("http://127.0.0.1:5000/login", {
          email,
          password,
        })
        .then(
          (res) => {
            setShowError(false);
            setShowVerifiedError(false);
            setShowNotification(true);
            window.location.href = "/index.js";
          },
          (err) => {
            console.log("err then");
            console.log(err.response.data.errors.email);

            if (err.response.data.errors.tfa === "check your sms to 2FA auth") {
              setShow2FAform(true);
              setShowVerifiedError(false);
              setShowError(false);
            }

            if (err.response.data.errors.email === "email not verified") {
              setShowVerifiedError(true);
              setShowError(false);
            } else {
              setShowError(true);
              setShowVerifiedError(false);
            }
          }
        )
        .catch((err) => {
          console.log("catch");
          console.log(err);
          setShowError(true);
        });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailError = document.querySelector(".email.error");

    let errorMessage = "";
    if (!validateEmail(email)) {
      errorMessage +=
        "&#10060; <span class='error-text'>Please enter a valid email address.</span> ";
    } else {
      errorMessage +=
        "&#9989; <span class='success-text'>Email address is valid.</span> ";
    }

    emailError.innerHTML = errorMessage;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    const passwordError = document.querySelector(".password.error");
    if (!validatePassword(password)) {
      passwordError.textContent =
        "Password must be at least 8 characters long.";
    } else {
      passwordError.textContent = "";
    }
  };

  return (
    <body>
      <Header />
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">Assurini</span>
                    </a>
                  </div>
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your Email & Password to login
                        </p>
                      </div>

                      <form
                        className="row g-3"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          required
                          onChange={handleEmailChange}
                        />
                        <div className="email error"></div>
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          name="password"
                          required
                          onChange={handlePasswordChange}
                        />

                        {show2FAform && (
                          <>
                            <label className="form-label" htmlFor="tfa">
                              2FA Code
                            </label>{" "}
                            <input
                              type="text"
                              className="form-control"
                              name="tfa"
                              required
                              maxLength={6}
                            />
                          </>
                        )}

                        <i
                          class="bi bi-eye-slash"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? "Hide" : "Show"}
                        </i>
                        <div className="password error"></div>
                        <div className="col-12">
                          <button
                            type="submit"
                            className="btn btn-primary w-100"
                          >
                            Login
                          </button>
                        </div>
                        {showNotification && (
                          <div className="col-12 my-3 alert alert-success">
                            Login successful!
                          </div>
                        )}
                        {showError && (
                          <div className="col-12 my-3 alert alert-danger">
                            Invalid email or password.
                          </div>
                        )}
                        {showVerifiedError && (
                          <div className="col-12 my-3 alert alert-danger">
                            Email not verified.
                          </div>
                        )}
                      </form>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center pt-4">
                    <a href="/signup" className="text-primary">
                      Create new account
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </body>
  );
}

export default Login;
