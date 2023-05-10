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

function Severity() {
  const [time, setTime] = useState("17:02:00");

  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [sex, setSex] = useState("Male");
  const [age, setAge] = useState("18-30");
  const [educationLevel, setEducationLevel] = useState("Junior high school");
  const [relation, setRelation] = useState("Employee");
  const [vehicleAge, setVehicleAge] = useState("Above 10yr");
  const [drivingExperience, setDrivingExperience] = useState("Above 10yr");
  const [result, setResult] = useState("");

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDayOfWeekChange = (event) => {
    setDayOfWeek(event.target.value);
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleEducationLevelChange = (event) => {
    setEducationLevel(event.target.value);
  };

  const handleRelationChange = (event) => {
    setRelation(event.target.value);
  };

  const handleVehicleAgeChange = (event) => {
    setVehicleAge(event.target.value);
  };

  const handleDrivingExperienceChange = (event) => {
    setDrivingExperience(event.target.value);
  };

  const handleResultChange = (event) => {
    setResult(event.target.value);
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    console.log(time);
    const response = await axios.post("http://localhost:5000/genpredict", {
      time: time,
      date: dayOfWeek,
      age: age,
      sex: sex,
      education: educationLevel,
      relation,
      serviceyear: vehicleAge,
      experience: drivingExperience,
    });
    // setResult(response);
    setResult(response.data)
    console.log(response);
  };

  return (
    <>
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
                        <h6 className="heading-small text-muted mb-4">
                          Time Information
                        </h6>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Time
                          </label>
                          <Input
                            type="time"
                            id="timeInput"
                            value={time}
                            onChange={(e) => handleTimeChange(e)}
                            step="3600"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Day of week
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={dayOfWeek}
                            onChange={(e) => handleDayOfWeekChange(e)}
                            required
                          >
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4">
                            Client Information
                          </h6>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Sexe
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={sex}
                            onChange={(e) => handleSexChange(e)}
                            required
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Age of client
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={age}
                            onChange={(e) => handleAgeChange(e)}
                            required
                          >
                            <option value="Under 18">Under 18</option>
                            <option value="18-30">18-30</option>
                            <option value="31-50">31-50</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Education level
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={educationLevel}
                            onChange={(e) => handleEducationLevelChange(e)}
                            required
                          >
                            <option value="Junior high school">
                              Junior high school
                            </option>
                            <option value="Elementary school">
                              Elementary school
                            </option>
                            <option value="Above high school">
                              Above high school
                            </option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <h6 className="heading-small text-muted mb-4">
                            Vehicle information
                          </h6>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Relation
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={relation}
                            onChange={(e) => handleRelationChange(e)}
                            required
                          >
                            <option value="Employee">Employee</option>
                            <option value="Owner">Owner</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Age of vehicle
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={vehicleAge}
                            onChange={(e) => handleVehicleAgeChange(e)}
                            required
                          >
                            <option value="1-2yr">1-2yr</option>
                            <option value="2-5yr">2-5yr</option>
                            <option value="5-10yr">5-10yr</option>
                            <option value="Above 10yr">Above 10yr</option>
                          </Input>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Driving experience
                          </label>
                          <Input
                            name="tfa"
                            type="select"
                            value={drivingExperience}
                            onChange={(e) => handleDrivingExperienceChange(e)}
                            required
                          >
                            <option value="1-2yr">1-2yr</option>
                            <option value="2-5yr">2-5yr</option>
                            <option value="5-10yr">5-10yr</option>
                            <option value="Above 10yr">Above 10yr</option>
                          </Input>

                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            RESULT
                          </label>
                          <Input
                            name="tfa"
                            type="text"
                            value={result}
                          ></Input>
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

export default Severity;
