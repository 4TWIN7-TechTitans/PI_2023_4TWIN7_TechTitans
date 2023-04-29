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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  return (
    <>
            <div
        className="header pb-3 pt-2 pt-lg-3 d-flex align-items-center"
        style={{
          minHeight: "400px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/profile-cover.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top"
        }}> <span className="mask bg-gradient-default opacity-8" />
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col className="center m-3 text-uppercase " lg="12" col="1">
                <center><h1 className="text-light">Welcome To Assurini !</h1></center>

              </Col>
            </Row>

          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
