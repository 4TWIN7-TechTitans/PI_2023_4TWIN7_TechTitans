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
import React, { useState } from "react";
import axios from "axios";


function Login() {
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showVerifiedError, setShowVerifiedError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [show2FAform, setShow2FAform] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);


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
            
            //roles redirect
            console.log(res.data.next);
            window.location.href = "/admin/index";
            window.location.href = res.data.next;
            


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
            } else if (err.response.data.errors.email === "email not found" ) {
              setShowVerifiedError(false);
              setShowError(false);
              setEmailNotFound(true);
            } else {
              setEmailNotFound(false);
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

  sayHello() {
    alert('Hello!');
  }

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
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/github.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={googleauth}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={
                      require("../../assets/img/icons/common/google.svg")
                        .default
                    }
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign in with credentials</small>
            </div>
            <Form onSubmit={handleSubmit} noValidate>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="text"
                    name="email"
                    autoComplete="new-email"
                    required
                   // onChange={handleEmailChange}
                  />
                </InputGroup>
                <div className="email error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    required
                    //onChange={handlePasswordChange}
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
                <div className="password error"></div>
              </FormGroup>

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
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              {showNotification && (
                <div className="col-12 my-3 alert alert-success">
                  Login successful!
                </div>
              )}
              
              {emailNotFound && (
                <div className="col-12 my-3 alert alert-danger">
                  Email not found. Please check your email address and try
                  again.
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
              

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );

  
}





export default Login;
