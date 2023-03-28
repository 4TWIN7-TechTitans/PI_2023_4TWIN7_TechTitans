import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Header from "components/Headers/Header";

function AddCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [registration_number, setRegistrationNumber] = useState("");

  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [contracts, setContracts] = useState([]);

  const types = ["Car", "Truck", "MotoCycle"];
  const brands = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Audi",
    "Isuzu",
    "BMW",
    "Golf",
    "Tesla",
    "Chevrolet",
    "Hyundai",
    "Infiniti",
    "Volkswagen",
    "Volvo",
    "Alfa Romeo",
    "Mitsubishi",
  ];

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/contarcts");
        setContracts(response.data.contracts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchContracts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const brand = form.brand.value;
    const model = form.model.value;
    const type = form.type.value;
    const registration_number = form.registration_number.value;
    const id_contrat = form.id_contrat.value;

    if (!brand || !model || !type || !registration_number || !id_contrat) {
      setShowNotification(false);

      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill  all the fields",
      });
      return;
    }

    try {
      const addcar = await axios.post(
        "http://127.0.0.1:5000/add_car",
        {
          brand,
          model,
          type,
          registration_number,
          id_contrat,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (addcar.status === 201) {
        setShowNotification(true);
        setErrors({});
        setShowError(false);
      } else {
        setShowNotification(false);
        setErrors({ ...errors, message: "Car adding failed" });
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const validateRegistrationnumber = (registration_number) => {
    const registration_numberRegex = /^[a-zA-Z0-9\s\-'\u00C0-\u024F\u0600-\u06FF"]+$/;
    return registration_numberRegex.test(registration_number);
  };
  const handleRgNumberChange = (e) => {
    const registration_number = e.target.value;
    if (!validateRegistrationnumber(registration_number)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        registration_number: "Please enter a valid registration number.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        registration_number: "",
      }));
    }
  };

  const validateModel = (model) => {
    const modelRegex = /^[a-zA-Z\s\-'\u00C0-\u024F"]+$/;
    return modelRegex.test(model);
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    if (!validateModel(model)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        model: "Please enter a valid model.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        model: "",
      }));
    }
  };

  return (
    <>
      <Header />
      <div className="content">
        <Row>
          <Col md="8" className="mx-auto">
            <Card className="card-user">
              <CardHeader>
                <h5 className="title">Add a new Car</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Brand</label>
                        <Input
                          type="select"
                          name="brand"
                          id="brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          required
                        >
                          <option value="">Select a brand</option>
                          {brands.map((brand, index) => (
                            <option key={`${brand}-${index}`} value={brand}>
                              {brand}
                            </option>
                          ))}
                        </Input>
                        {showError && errors.brand && (
                          <p className="text-danger">{errors.brand}</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Model</label>
                        <Input
                          type="text"
                          name="model"
                          id="model"
                          value={model}
                          onChange={(e) => {
                            setModel(e.target.value);
                            handleModelChange(e);
                          }}
                          required
                        />
                        {showError && errors.model && (
                          <p className="text-danger">{errors.model}</p>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Type</label>
                        <Input
                          type="select"
                          name="type"
                          id="type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          required
                        >
                          <option value="">Select type</option>
                          {types.map((type, index) => (
                            <option key={`${type}-${index}`} value={type}>
                              {type}
                            </option>
                          ))}
                        </Input>

                        {showError && errors.type && (
                          <p className="text-danger">{errors.type}</p>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Registration Number</label>
                        <Input
                          type="text"
                          name="registration_number"
                          id="registration_number"
                          value={registration_number}
                          onChange={(e) => {
                            setRegistrationNumber(e.target.value);
                            handleRgNumberChange(e);
                          }}
                          required
                        />
                        {showError && errors.registration_number && (
                          <p className="text-danger">
                            {errors.registration_number}
                          </p>
                        )}
                        <div className="registration_number error"></div>
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>Contracts</label>
                        <Input name="id_contrat" type="select" required>
                          {contracts.map((contract) => (
                            <option key={contract._id} value={contract._id}>
                              {contract._id}
                            </option>
                          ))}
                        </Input>
                        <div className="id_contrat error"></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  {showError && (
                    <div className="alert alert-danger" role="alert">
                      {errors.message}
                    </div>
                  )}
                  {showNotification && (
                    <div className="alert alert-success" role="alert">
                      Car added successfully
                    </div>
                  )}
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Add Car
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AddCar;