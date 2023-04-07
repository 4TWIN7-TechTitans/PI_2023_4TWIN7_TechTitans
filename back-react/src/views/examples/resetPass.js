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

    const handleResendEmail = async (e) => {
    e.preventDefault();

    const form = e.target;
    const search = window.location.search;
    const email = new URLSearchParams(search).get("email");
    const token = new URLSearchParams(search).get("token");
    const password = form.password.value;

    console.log(token, email, password);

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
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ResetPass;
