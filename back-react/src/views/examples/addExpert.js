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
import React, { useEffect, useState } from "react";
import Header from "components/Headers/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function AddExpert() {
  const [showNotification, setShowNotification] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jwt = getCookie("jwt");
    if(jwt == "") return ;

    const id_agence = (
      await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
    ).data._id;

    const form = e.target;
    const email = form.email.value;
    const last_name = form.last_name.value;
    const first_name = form.first_name.value;
    const role = "Expert";
    const verified = true;
    const phone_number = String(form.phone_number.value);
    const expert_status = true;

    if (
      !email ||
      !last_name ||
      !first_name ||
      !role ||
      !verified
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
      const verif1 = "true";
      // Register user
      const add = await axios.post(
        "http://localhost:5000/add",
        {
          email,
          password : email,
          last_name,
          first_name,
          role: "Expert",
          verif1,
          phone_number,
          id_agence,
          expert_status
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // handle response
      if (add.status === 201) {
        toast.success('Expert has been added successfully!');
        setShowNotification(true);
        setShowVerifyEmail(true);
        setErrors({});
        setShowError(false);
        window.location.replace("http://localhost:3000/agence/listexpert");
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
    const numberRegex = /[0-9]/;

    let strength = 0;
    let strengthMessage = "";

    if (password.length >= 8) {
      strength += 1;
      strengthMessage += "✅ Password is at least 8 characters long. ";
    } else {
      strengthMessage += "❌ Password must be at least 8 characters long. ";
    }

    if (lowercaseRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ Password can contains a lowercase letter. ";
    } else {
      strengthMessage += " Password can contains a lowercase letter. ";
    }

    if (uppercaseRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ Password contains a capital letter. ";
    } else {
      strengthMessage += " Password can contains a capital letter. ";
    }

    if (numberRegex.test(password)) {
      strength += 1;
      strengthMessage += "✅ Password contains a number. ";
    } else {
      strengthMessage += " Password can contains a number. ";
    }

    if (strength === 4) {
      strengthMessage += "✅ Password is strong.";
    } else if (strength >= 2) {
      strengthMessage += "😊 Password is medium.";
    } else {
      strengthMessage += "😔 Password is weak.";
    }

    passwordError.innerHTML = strengthMessage;
  };

  const validatePhoneNumber = (phone_number) => {
    const phone_numberRegex = /^(\+216)?\d{8}$|^\d{8}$/;
    return phone_numberRegex.test(phone_number);
  };

  const handlePhoneNumberChange = (e) => {
    const phone_number = e.target.value;
    const phone_numberError = document.querySelector(".phone_number.error");
    if (!validatePhoneNumber(phone_number)) {
      phone_numberError.textContent =
        "Please enter a valid Tunisian phone number";
    } else {
      phone_numberError.textContent = "Phone number is correct";
    }
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
    
      <Header />
      <ToastContainer />

      <div className="content">
        <Row>
          <Col md="8" className="mx-auto">
            <Card className="card-user">
              <CardHeader>
                <h5 className="title">Add a new account</h5>
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
                        onChange={handlePhoneNumberChange}
                      />
                    </InputGroup>
                    <div className="phone_number error"></div>
                  </FormGroup>
                  <Button className="btn-fill" color="primary" type="submit">
                    Add
                  </Button>
                </Form>
                {showNotification && (
                  <div className="alert alert-success mt-3" role="alert">
                    {showVerifyEmail
                      ? "Expert Added."
                      : "This Expert is already a member in the website."}
                  </div>
                )}
                {showError && (
                  <div className="col-12 my-3 alert alert-danger">
                    Invalid fields !
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
export default AddExpert;
