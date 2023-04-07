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

function ForgetPass() {
  const [showSent, setShowSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    try {
      console.log(email);
      const response = await axios.post(
        `http://127.0.0.1:5000/forget-password/${email}`
      );
      setShowSent(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <CardHeader className="key-25 text-blue text-center">
              Type your mail
            </CardHeader>

            <Form onSubmit={handleForgotPassword} noValidate>
              <Col md="12">
                <FormGroup>
                  <label></label>
                  <Input name="email" type="email" placeholder="email" />
                </FormGroup>
              </Col>

              <Button
                className="btn-center right btn-icon"
                color="default"
                type="submit"
              >
                <span className="btn-inner--text">Send </span>
              </Button>
            </Form>
            {showSent && (
              <div className="alert alert-success mt-3" role="alert">
                mail sent !
              </div>
            )}
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="8">
            <a className="center text-light" href="/auth/register">
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default ForgetPass;
