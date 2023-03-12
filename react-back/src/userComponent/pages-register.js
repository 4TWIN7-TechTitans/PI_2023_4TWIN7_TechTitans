import React, { useState } from "react";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";
import { checkEmail } from "../services/api.js";

function Signup() {
  const [showNotification, setShowNotification] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const last_name = form.last_name.value;
    const first_name = form.first_name.value;
    const role = form.role.value;

    try {
      // Check if email is already in use
      console.log(email);
      const checkEmailRes = await checkEmail(email);
      if (checkEmailRes) {
        setShowNotification(true);
        setShowVerifyEmail(false);
        console.log("inside");
        setErrors({ ...errors, email: "Email already in use" }); // Display error message
        return;
      }
      console.log("out");
      // Register user
      const registerRes = await axios.post(
        "http://127.0.0.1:5000/signup",
        {
          email,
          password,
          last_name,
          first_name,
          role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // handle response
      console.log(registerRes);
      setShowNotification(true);
      setShowVerifyEmail(true);
    } catch (err) {
      console.log(err);
    }
  
  };
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const validateFirstName = (last_name) => {
    const first_nameRegex = /^[a-zA-Z]+$/;
    return first_nameRegex.test(last_name);
  };

  const validateLastName = (last_name) => {
    const last_nameRegex = /^[a-zA-Z]+$/;
    return last_nameRegex.test(last_name);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const emailError = document.querySelector(".email.error");
    if (!validateEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
    } else {
      emailError.textContent = "";
    }
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

  const handleFirstNameChange = (e) => {
    const first_name = e.target.value;
    const first_nameError = document.querySelector(".first_name.error");
    if (!validateFirstName(first_name)) {
      first_nameError.textContent = "Please enter a valid first name (letters only).";
    } else {
      first_nameError.textContent = "";
    }
  };
  
    const handleLastNameChange = (e) => {
      const last_name = e.target.value;
      const last_nameError = document.querySelector(".last_name.error");
      if (!validateLastName(last_name)) {
        last_nameError.textContent = "Please enter a valid last name (letters only).";
      } else {
        last_nameError.textContent = "";
      }
    };
  
  return (
    <>
      <Header />
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex justify-content-center align-items-center">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Signup</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label class="form-label" for="email">
                      Email
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      name="email"
                      required
                      onChange={handleEmailChange}
                    />
                    <div class="email error"></div>
                    <label class="form-label" for="password">
                      Password
                    </label>
                    <input
                      class="form-control"
                      type="password"
                      name="password"
                      required
                      onChange={handlePasswordChange}
                    />
                    <div class="password error"></div>
                    <label class="form-label" for="last_name">
                      Last Name
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      name="last_name"
                      required
                      onChange={handleLastNameChange}
                    />  <div class="last_name error"></div>

                    <label class="form-label" for="first_name">
                      First Name
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      name="first_name"
                      required
                      onChange={handleFirstNameChange}
                    />
                 <div class="first_name error"></div>

                    <div className="mb-3">
                      <label classe="role" className="form-label">
                        Role
                      </label>
                      <select name="role">
                        <option value="">Select role</option>
                        <option value="Admin">Admin</option>
                        <option value="Expert">Expert</option>
                        <option value="Agence">Agence</option>
                      </select>
                    </div>
                    <div class="role error"></div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    Register
                  </button>
                </form>
                {showNotification && (
                  <div className="alert alert-success mt-3" role="alert">
                    {showVerifyEmail
                      ? "Signup successful! Please check your email to verify your account."
                      : "An account with that email already exists."}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Signup;
