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

function AddNewContract() {
  const [showNotification, setShowNotification] = useState(false);

  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    //if (getCookie("role") !== "agence") window.location.href = "/auth/login";
  }, []);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/all-users");
        setUsers(response.data.users);
        setAgencies(
          response.data.users.filter((user) => user.role === "Agence")
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const start_date = form.start_date.value;
    const end_date = form.end_date.value;
    const id_client = form.id_client.value;
    const id_agence = form.id_agence.value;

    if (!start_date || !end_date || !id_client || !id_agence) {
      setShowNotification(false);

      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill in all the fields",
      });
      return;
    }

    try {
      const add = await axios.post(
        "http://127.0.0.1:5000/add_contract",
        {
          start_date,
          end_date,
          id_client,
          id_agence,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (add.status === 201) {
        setShowNotification(true);
        setErrors({});
        setShowError(false);
      } else {
        setShowNotification(false);
        setErrors({ ...errors, message: "Signup failed" });
        setShowError(true);
      }
    } catch (err) {
      console.log(err);
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
                <h5 className="title">Add a new contract</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Client</label>
                        <Input name="id_client" type="select" required>
                          {users.map((user) => (
                            <option key={user._id} value={user._id} >
                              {user.first_name}
                            </option>
                          ))}
                        </Input>
                        <div className="first_name error"></div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>Agency</label>
                        <Input name="id_agence" type="select" required>
                          {agencies.map((agency) => (
                            <option key={agency._id} value={agency._id} >
                              {agency.first_name}
                            </option>
                          ))}
                        </Input>
                        <div className="id_agence error"></div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label>Start date</label>
                        <Input
                          name="start_date"
                          type="date"
                          placeholder="start date"
                          required
                        />
                        <div className="start_date error"></div>
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label>End date</label>
                        <Input
                          name="end_date"
                          type="date"
                          placeholder="end date"
                          required
                        />
                        <div className="end_date error"></div>
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
                      Contract added successfully
                    </div>
                  )}
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="submit">
                      Add Contract
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

export default AddNewContract;