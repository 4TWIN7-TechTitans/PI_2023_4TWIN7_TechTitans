import {
  FormGroup,
  Form,
  Input,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
  CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import ReactDatetime from "react-datetime";
import moment from "moment";

const handleEdit = async () => {};

function Isclaim() {
  const [make, setMake] = useState("1");
  const [fuel, setFuel] = useState("Diesel");
  const [airbags, setAirbags] = useState("6");
  const [transmission, setTransmission] = useState("Manual");
  const [camera, setCamera] = useState("1");
  const [sensor, setSensor] = useState("1");
  const [cyl, setCyl] = useState("1");
  const [gear, setGear] = useState("5");
  const [result, setResult] = useState("");

  const handleEditMake = (event) => {
    setMake(event.target.value);
  };

  const handleEditFuel = (event) => {
    setFuel(event.target.value);
  };

  const handleEditAirbags = (event) => {
    setAirbags(event.target.value);
  };

  const handleEditTransmission = (event) => {
    setTransmission(event.target.value);
  };

  const handleEditCamera = (event) => {
    setCamera(event.target.value);
  };

  const handleEditSensor = (event) => {
    setSensor(event.target.value);
  };

  const handleEditCyl = (event) => {
    setCyl(event.target.value);
  };

  const handleEditGear = (event) => {
    setGear(event.target.value);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/predictstatement",
      {
        make,
        fuel,
        airbags,
        transmission,
        camera,
        sensor,
        cyl,
        gear,
      }
    );
    setResult(response);
    setResult(response.data);
    console.log(response);
  };

  return (
    <>
    <Header/>
      <Container className="mt--12" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4"></Col>
                </Row>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleEdit}>
                  <div className="pl-lg-4">
                    <Row></Row>
                    <Row></Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12"></Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <h6 className="heading-small text-muted mb-4"></h6>

                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Brand country
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={make}
                            onChange={(e) => handleEditMake(e)}
                            required
                          >
                            <option value="1">France</option>
                            <option value="2">Germany</option>
                            <option value="3">USA</option>
                            <option value="4">Japan</option>
                            <option value="5">South Korea</option>
                            <option value="5">Italy</option>
                            <option value="5">China</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4"></h6>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Fuel
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={fuel}
                            onChange={(e) => handleEditFuel(e)}
                            required
                          >
                            <option value="Diesel">Diesel</option>
                            <option value="Petrol">Petrol</option>
                            <option value="CNG">CNG</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Airbags
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={airbags}
                            onChange={(e) => handleEditAirbags(e)}
                            required
                          >
                            <option value="1">1</option>
                            <option value="2">2-6</option>
                            <option value="6">6+</option>
                          </Input>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Gearbox
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={gear}
                            onChange={(e) => handleEditGear(e)}
                            required
                          >
                            <option value="5">5 speed</option>
                            <option value="6">6 speed</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Transmission
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={transmission}
                            onChange={(e) => handleEditTransmission(e)}
                            required
                          >
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4"></h6>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Parking Camera
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={camera}
                            onChange={(e) => handleEditCamera(e)}
                            required
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Parking Sensor
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={sensor}
                            onChange={(e) => handleEditSensor(e)}
                            required
                          >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </Input>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Engine Cylinders
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={cyl}
                            onChange={(e) => handleEditCyl(e)}
                            required
                          >
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </Input>

                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            RESULT
                          </label>
                          <Input name="tfa" type="text" value={result}></Input>
                        </FormGroup>
                      </Col>
                      <Col md="12"></Col>
                      <Col lg="12">
                        <Button color="info" type="submit">
                          Edit Profile
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Isclaim;
