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
  } from "reactstrap";
  import { Link, Redirect } from "react-router-dom";
  
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import { useState } from "react";
  import axios from "axios";

const SetAvailability = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    
    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
      }

    const handleOnline = async () => {
      const email = getCookie("email");
      try {
        const response = await axios.post(`http://localhost:5000/status/${email}`, {
          is_available: true,
        });
        setIsAvailable(true);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleOffline = async () => {
      const email = getCookie("email");
      try {
        const response = await axios.post(`http://localhost:5000/statusoffline/${email}`, {
          is_available: false,
        });
        setIsAvailable(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="6">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Set My Availability</h3>
                    </Col>
                    <Col className="text-right" xs="4"></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Button
                    color="primary"
                    className="mr-4"
                    onClick={handleOnline}
                    disabled={isAvailable}
                  >
                    Go Online
                  </Button>
                  <Button
                    color="danger"
                    onClick={handleOffline}
                    disabled={!isAvailable}
                  >
                    Go Offline
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default SetAvailability;