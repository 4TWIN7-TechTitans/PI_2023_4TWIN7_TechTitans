import React, { useState } from "react";
import axios from 'axios';
import Footer from "./footer";
import Header from "./header";
import {checkEmail} from "../services/api.js"

function Error({ message }) {
  return (
    <div className="alert alert-danger mt-3" role="alert">
      {message}
    </div>
  );
}

function validateInput(name, value, options) {
  if (options.required && !value) {
    return `${name} is required`;
  }

  if (options.minLength && value.length < options.minLength) {
    return `${name} must be at least ${options.minLength} characters`;
  }

  if (options.maxLength && value.length > options.maxLength) {
    return `${name} must be at most ${options.maxLength} characters`;
  }

  if (options.pattern && !options.pattern.test(value)) {
    return `Invalid ${name}`;
  }

  return null;
}

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

    // validate inputsw
    const emailError = validateInput("Email", email, {
      required: true,
      pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    });
    const passwordError = validateInput("Password", password, {
      required: true,
      minLength: 8,
    });
    const lastNameError = validateInput("Last Name", last_name, {
      required: true,
    });
    const firstNameError = validateInput("First Name", first_name, {
      required: true,
    });
    const roleError = validateInput("Role", role, { required: true });

    // display errors
    const errors = {
      email: emailError,
      password: passwordError,
      last_name: lastNameError,
      first_name: firstNameError,
      role: roleError,
    };
    setErrors(errors);

    // check if there are any errors
    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }
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
      const registerRes = await axios.post("http://127.0.0.1:5000/signup", {
        email,
        password,
        last_name,
        first_name,
        role,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      // handle response
      console.log(registerRes);
      setShowNotification(true);
      setShowVerifyEmail(true);
    } catch (err) {
      console.log(err);
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
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                    {errors.email && <Error message={errors.email} />}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password && <Error message={errors.password} />}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                      id="last_name"
                      name="last_name"
                      placeholder="Enter your last name"
                    />
                    {errors.last_name && <Error message={errors.last_name} />}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                      id="first_name"
                      name="first_name"
                      placeholder="Enter your first name"
                    />
                    {errors.first_name && <Error message={errors.first_name} />}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
                      id="role"
                      name="role"
                    >
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="provider">Expert</option>
                      <option value="customer">Agence</option>
                    </select>
                    {errors.role && <Error message={errors.role} />}
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

