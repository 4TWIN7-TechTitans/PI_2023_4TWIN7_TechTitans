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
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import moment from "moment";

const ChangePassword = () => {
  const [newConfirm, setNewConfirm] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const jwt = getCookie("jwt");

    const user = {
      oldpassword: oldPassword,
      password: newPassword,
      token: jwt,
    };
    console.log(user);

    const response = await axios.post(
      "http://127.0.0.1:5000/resetpassword/",
      user
    );

    console.log(response.data);

    console.log("after");
    if (response.data.changed === true) {
      //TODO : redirect profile ? /dmin/user-profile/?mail

      console.log(true);
     if ( window.location.pathname == "/main/changepassword/") window.location.href = "/main/view-user-profile/";
     if ( window.location.pathname == "/changepassword") window.location.href = "/profile";
    } else {
      console.log("change password failed")

    }
  };

  useEffect(() => {
    //if (getCookie("role") !== "Client") window.location.href = "/auth/login";
  }, []);

  useEffect(() => {
    console.log(window.location.pathname);
    const jwt = getCookie("jwt");
    if (jwt == "") return;

    async function getUser(mail) {
      const response = (
        await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
      ).data;

      setEmail(response.email);
    }
    getUser(jwt);
  }, []);

  return (
    <>
      {window.location.pathname !== "/changepassword" && <UserHeader />}

      {/* Page content */}
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
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="email"
                            disabled
                            value={email}
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
                            new password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="first_name"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
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
                            confirm password
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="last_name"
                            value={newConfirm}
                            onChange={(e) => setNewConfirm(e.target.value)}
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Old password
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            id="input-address"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
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
};

export default ChangePassword;
