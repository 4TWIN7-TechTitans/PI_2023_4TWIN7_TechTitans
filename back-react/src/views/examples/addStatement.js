/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import moment from "moment";

const AddStatement = () => {
  const [agence_a, setAgence_a] = useState("");
  const [agence_b, setAgence_b] = useState("");
  const [driver_a, setDriver_a] = useState("");
  const [driver_b, setDriver_b] = useState("");
  const [notes_a, setNotes_a] = useState("");
  const [notes_b, setNotes_b] = useState("");
  const [id_contract_a, setId_contract_a] = useState("");
  const [id_contract_B, setId_contract_b] = useState("");
  const [circumstances_a, setCircumstances_a] = useState("");
  const [circumstances_b, setCircumstances_b] = useState("");
  const [signature_a, setSignature_a] = useState("");
  const [signature_b, setSignature_b] = useState("");
  const [location, setLocation] = useState("");
  const [injured, setInjured] = useState("");
  const [material_damage, setMaterial_damage] = useState("");
  const [date, setDate] = useState("");
  const [image_pdf, setImage_pdf] = useState("");
  const [case_state, setCase_state] = useState(true);




  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    if (getCookie("role") !== "Client") window.location.href = "/auth/login";
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Fill In Your Statement</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <form onSubmit="">
                  <h6 className="heading-small text-muted mb-4">
                  set all the infromations related to the accident please
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Person A Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"

                            type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Person B Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"

                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Agence of client A
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="first_name"
                            type="text"
                            name="first_name"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Contarct ID of client A
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="last_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>

                      {/* CLEINT B */}
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Agence of client B
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="first_name"
                            type="text"
                            name="first_name"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Contarct ID of client B
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="last_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  {/* <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6> */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Circumstances By client A
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Stopped too suddenly"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Circumstances By client B
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Stopped too suddenly"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                             If Cleint A Injured
                          </label>
                          <Input
                            name="gender"
                            type="select"
                            required
                          >
                            <option value="Male">yes</option>
                            <option value="Female">no</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Material damage of cleint A
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            required
                          >
                            <option value="Minor">Minor</option>
                            <option value="Major">Major</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                             If Cleint B Injured
                          </label>
                          <Input
                            name="gender"
                            type="select"
                            required
                          >
                            <option value="Male">yes</option>
                            <option value="Female">no</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Material damage of cleint B
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            required
                          >
                            <option value="Minor">Minor</option>
                            <option value="Major">Major</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Notes By Person A
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Notes By Person B
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Date of accident
                          </label>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-calendar-grid-58" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <ReactDatetime
                              value={date}
                              onChange={(e) => setDate(moment(e))}
                              timeFormat={false}
                            />
                          </InputGroup>
                        </FormGroup>

                      </Col>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Location
                          </label>
                          <InputGroup className="input-group-alternative">
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                          </InputGroup>
                        </FormGroup>

                      </Col>

                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Simulation Image Of the Accident 
                          </label>
                          <InputGroup className="input-group-alternative">
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                          </InputGroup>
                        </FormGroup>

                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                           Signature of Person A 
                          </label>
                          <InputGroup className="input-group-alternative">
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                          </InputGroup>
                        </FormGroup>

                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                           Signature of Person B 
                          </label>
                          <InputGroup className="input-group-alternative">
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                          </InputGroup>
                        </FormGroup>

                      </Col>
                      <Button color="info" type="submit">
                        Submit
                      </Button>
                    </Row>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>

          {/* CLIENT B */}

          {/* <Col className="order-xl-1" xl="6">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Client B information</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <form onSubmit="">
                  <h6 className="heading-small text-muted mb-4">
                    User information B
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Person B  Full Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"

                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Agence
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="first_name"
                            type="text"
                            name="first_name"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Contarct ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="last_name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Circumstances
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Rear-ended at a stop light"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Injured
                          </label>
                          <Input
                            name="gender"
                            type="select"
                            required
                          >
                            <option value="Male">yes</option>
                            <option value="Female">no</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Material damage
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            required
                          >
                            <option value="Minor">Minor</option>
                            <option value="Major">Major</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Notes
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      

                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                           Signature
                          </label>
                          <InputGroup className="input-group-alternative">
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            type="text"
                          />
                          </InputGroup>
                        </FormGroup>

                      </Col>
                      <Button color="info" type="submit">
                        Submit
                      </Button>
                    </Row>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col> */}



        </Row>
      </Container>
    </>
  );
};

export default AddStatement;
