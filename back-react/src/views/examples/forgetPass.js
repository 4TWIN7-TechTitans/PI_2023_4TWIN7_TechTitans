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
            
            <CardBody className="px-lg-5 py-lg-5">
  
              <CardHeader className="key-25 text-red">Forget Password !</CardHeader>
  
              <div className="text-center text-muted mb-4">
                <small>Type your email here to reset your password</small>
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
                  <span className="btn-inner--text">Send </span>
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
  
  export default ForgetPass;
  