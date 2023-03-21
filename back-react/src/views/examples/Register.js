import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { checkEmail } from "../services/api";
import axios from "axios";
import React, { useState } from "react";

function Register() {
  const [showNotification, setShowNotification] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const password2 = form.password2.value;
    const last_name = form.last_name.value;
    const first_name = form.first_name.value;
    const role = "Client";
    const two_factor_auth = "none";
    const two_factor_auth_code = "";
    const phone_number = form.phone_number.value
      ? "+216" + form.phone_number.value
      : "";

    if (
      !email ||
      !password ||
      !password2 ||
      !last_name ||
      !first_name ||
      !role
    ) {
      setShowNotification(false);
      setShowVerifyEmail(false);
      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill in at least one field except phone number",
      });
      return;
    }

    if (password !== password2) {
      setShowNotification(false);
      setShowVerifyEmail(false);
      setErrors({ ...errors, password2: "Passwords do not match" });
      setShowError(true);
      return;
    }
    try {
      // Check if email is already in use
      console.log(email);
      const checkEmailRes = await checkEmail(email);
      if (checkEmailRes) {
        setShowNotification(true);
        setShowVerifyEmail(false);
        setShowError(false);
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
          phone_number,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // handle response
      if (registerRes.status === 201) {
        setShowNotification(true);
        setShowVerifyEmail(true);
        setErrors({});
        setShowError(false);
      } else {
        setShowNotification(false);
        setShowVerifyEmail(false);
        setErrors({ ...errors, message: "Signup failed" });
        setShowError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };
  /*  const validatePassword = (password) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
  
    return (
      password.length >= 8 &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
    );
  };*/
  const validateFirstName = (first_name) => {
    const first_nameRegex = /^[a-zA-Z\s\-'\u00C0-\u024F"]+$/;
    return first_nameRegex.test(first_name);
  };

  const validateLastName = (last_name) => {
    const last_nameRegex = /^[a-zA-Z\s\-'\u00C0-\u024F"]+$/;
    return last_nameRegex.test(last_name);
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
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    let strength = 0;
    let strengthMessage = "";

    if (password.length >= 8) {
      strength += 1;
      strengthMessage += "✅ is at least 8 characters long. <br>";
    } else {
      strengthMessage += "❌ must be at least 8 characters long. <br>";
    }

    if (lowercaseRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ can contains a lowercase letter. <br>";
    } else {
      strengthMessage += "";
    }

    if (uppercaseRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ contains a capital letter. <br>";
    } else {
      strengthMessage += "";
    }

    if (numberRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ contains a number. <br>";
    } else {
      strengthMessage += "";
    }

    if (strength === 4) {
      strengthMessage += "✅ strong.<br>";
    } else if (strength >= 2) {
      strengthMessage += "😊 medium.<br>";
    } else {
      strengthMessage += "😔 weak.<br>";
    }

    passwordError.innerHTML = strengthMessage;
  };

  const handleFirstNameChange = (e) => {
    const first_name = e.target.value;
    const first_nameError = document.querySelector(".first_name.error");
    if (!validateFirstName(first_name)) {
      first_nameError.textContent = "Please enter a valid first name .";
    } else {
      first_nameError.textContent = "";
    }
  };

  const handleLastNameChange = (e) => {
    const last_name = e.target.value;
    const last_nameError = document.querySelector(".last_name.error");
    if (!validateLastName(last_name)) {
      last_nameError.textContent = "Please enter a valid last name .";
    } else {
      last_nameError.textContent = "";
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8" className="mx-auto">
            <Card className="card-user">
              <CardHeader>
                <h5 className="title">Register</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          name="first_name"
                          type="text"
                          placeholder="First Name"
                          required
                          onChange={handleFirstNameChange}
                        />
                        <div className="first_name error"></div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          name="last_name"
                          type="text"
                          placeholder="Last Name"
                          required
                          onChange={handleLastNameChange}
                        />
                        <div className="last_name error"></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email"
                          required
                          onChange={handleEmailChange}
                        />
                        <div className="email error"></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Password</label>
                        <InputGroup>
                          <Input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            onChange={handlePasswordChange}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <i className="fas fa-eye-slash" />
                              ) : (
                                <i className="fas fa-eye" />
                              )}
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Confirm </label>
                        <InputGroup>
                          <Input
                            name="password2"
                            type={showPassword2 ? "text" : "password"} // Change input type based on showPassword2 state
                            placeholder="Confirm Password"
                            required
                          />
                          <div className="password2 error"></div>
                          <InputGroupAddon addonType="append">
                            <InputGroupText
                              onClick={() => setShowPassword2(!showPassword2)}
                            >
                              {showPassword2 ? (
                                <i className="fas fa-eye-slash" />
                              ) : (
                                <i className="fas fa-eye" />
                              )}{" "}
                              {/* Change icon based on showPassword2 state */}
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {errors.password2 && (
                          <p className="text-danger">{errors.password2}</p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <label className="phone_number">
                      Phone number (+216){" "}
                      <span className="optional">(optional)</span>
                    </label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        placeholder="+216XXXXXXXX"
                        pattern="^\[0-9]{8}$"
                        title="Please enter a valid Tunisian phone number (including the country code +216)"
                        required="false"
                      />
                    </InputGroup>
                  </FormGroup>

                  <Button className="btn-fill" color="primary" type="submit">
                    Register
                  </Button>
                </Form>
                {showNotification && (
                  <div className="alert alert-success mt-3" role="alert">
                    {showVerifyEmail
                      ? "Signup successful! Please check your email to verify your account."
                      : "An account with that email already exists."}
                  </div>
                )}
                <div className="password error"></div>
                {showError && (
                  <div className="col-12 my-3 alert alert-danger">
                    Invalid fields , Please Recheck !
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Register;
