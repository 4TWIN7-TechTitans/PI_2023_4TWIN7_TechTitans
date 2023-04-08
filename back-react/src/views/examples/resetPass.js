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
import axios from "axios";

import React, { useState } from "react";



function ResetPass() {
    const [showError , setShowError] = useState(false);
    const [errors, setErrors] = useState({});

    

    const handleResendEmail = async (e) => {
    e.preventDefault();

    const form = e.target;
    const search = window.location.search;
    const email = new URLSearchParams(search).get("email");
    const token = new URLSearchParams(search).get("token");
    const password = form.password.value;

    console.log(token, email, password);


    if (
  
      !password 
      ) 
      {

      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill in !",
      });
      return;

      if (password.length < 8) {
        setErrors({ ...errors, password2: "weak password" });
        setShowError(true);
        return;
      }
  
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/reset-password/`,
        {
          email,
          token,
          password,
        }
      );
      window.location.replace("http://localhost:3000/auth/login");
      
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
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

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <CardHeader className="key-25 text-blue">
              Type your new password
            </CardHeader>

            <div className="text-center text-muted mb-4"></div>
            <Form onSubmit={handleResendEmail} noValidate>
              <Col md="12">
                <FormGroup>
                  <Input
                    name="password"
                    type="password"
                    placeholder="********"
                    onChange={handlePasswordChange}
                  />
                </FormGroup>
              </Col>

              <Button
                className="btn-center right btn-icon"
                color="default"
                type="submit"
              >
                <span className="btn-inner--text">Send</span>
              </Button>
            </Form>
          {showError && (
              <div className="alert alert-warning mt-3" role="alert">
                invalid reset token
              </div>
            )}
            </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="/auth/forgetpwd">
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="/auth/register">
              <small>Create new account</small>
            </a>

            <div className="password error"></div>
                {showError && (
                  <div className="col-12 my-3 alert alert-danger">
                    Password isn't accepted !
                  </div>
                )}
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ResetPass;
