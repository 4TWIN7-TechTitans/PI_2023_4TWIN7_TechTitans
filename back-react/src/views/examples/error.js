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

function NotFound() {

  const handleResendEmail =  async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      console.log(email);
      const response = await axios.post(`http://127.0.0.1:5000/resend-verification/${email}`);
      return response;
    } catch (error) {
      console.log(error);
    }
    return;
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
                onClick={(e) => e.preventDefault()}
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

            <CardHeader className="key-25 text-red">Invalid verification token</CardHeader>

            <div className="text-center text-muted mb-4">
              <small>Or Resend verification Email</small>
            </div>
            <Form onSubmit={handleResendEmail} noValidate>
              <Col md="6">
                <FormGroup>
                  <label>Retype Your email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="email"
                  />
                </FormGroup>
              </Col>

              <Button
                className="btn-center right btn-icon"
                color="default" 

                type="submit"
              >
                <span className="btn-inner--text">resend verification link</span>
              </Button>

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

export default NotFound;
