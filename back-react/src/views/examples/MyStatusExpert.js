import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import axios from "axios";

const MyStatusExpert = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [email, setEmail] = useState("");

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    const jwt = getCookie("jwt");

    async function getUser(mail) {
      const response = await axios.get(
        "http://127.0.0.1:5000/getmailfromtoken?token=" + jwt
      );
      const userEmail = response.data;
      setEmail(userEmail);
    }

    getUser(jwt);
  }, []);

  async function handleAvailabilityChange() {
    try {
      const response = await axios.post(
        `http://localhost:5000/updateAvailability/${email}`,
        { is_available: !isAvailable }
      );
      if (response.data.status === "success") {
        setIsAvailable(!isAvailable);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Status</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Availability
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label className="mr-4">
                        <Input
                          addon
                          type="checkbox"
                          checked={!isAvailable}
                          onChange={handleAvailabilityChange}
                        />
                        Unavailable
                      </label>
                      <label className="ml-4">
                        <Input
                          addon
                          type="checkbox"
                          checked={isAvailable}
                          onChange={handleAvailabilityChange}
                        />
                        Available
                      </label>
                      <InputGroup>
                        <Input
                          placeholder="Status"
                          type="text"
                          value={isAvailable ? "Available" : "Unavailable"}
                          disabled
                        />
                      </InputGroup>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyStatusExpert;
