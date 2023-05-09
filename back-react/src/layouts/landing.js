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
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import AddStatement from "views/examples/addStatement.js";

import Chat from "views/examples/chat.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
} from "reactstrap";

import Tickets from "views/examples/Tickets";
import routes from "routes.js";
import MultipleRows from "./MultipleRows";
import MyStatements from "views/examples/Statements";
import Notfound from "views/examples/Notfound";
import Profile from "views/examples/Profile";
import ViewProfile from "views/examples/ViewProfile";
import Ocr from "views/examples/Ocr";
import ChangePassword from "views/examples/ChangePassword";
import Clientavi from "views/examples/Clientavi";
import ViewProfileExpert from "views/examples/ViewProfileExpert";
import DetailsExpert from "views/examples/DetailsExpert";

const Landing = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [chat, setChat] = React.useState("0");

  const handlechat = (event) => {
    if (chat==="1")
    setChat("0");
    if (chat==="0")
    setChat("1");
  };


  React.useEffect(() => {
    document.body.classList.add("bg-default");
    return () => {
      document.body.classList.remove("bg-default");
    };
  }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <AuthNavbar />
        <div className="header bg-gradient-info ">
          <div
            className="p-8 text-center bg-image"
            style={{
              backgroundImage:
                "url(" + require("../assets/img/theme/profile-cover.jpg") + ")",
              height: 520,
            }}
          >
            <div className="mask">
              <div className="d-flex justify-content-center align-items-center h-100">
                <div className="text-dark">
                  <h1 className="mb-6" style={{ fontSize: 80 }}>
                    Welcome To Assurini
                  </h1>
                  <h1 className="mb-3">Clic here to create your statement </h1>
                  <a className="btn btn-primary btn-lg" href="/" role="button">
                    Statement
                  </a>
                  <h1 className="mb-3">
                    or submit your statement via our OCR technologie{" "}
                  </h1>
                  <a
                    className="btn btn-primary btn-lg"
                    href="/ocr"
                    role="button"
                    style={{ marginBottom: "50px" }}
                  >
                    OCR
                  </a>

                  <br />
                </div>
              </div>
            </div>
          </div>

          <div className="separator container-fluid separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>

        <section className="my-8"></section>
        <section className="mt--8 w-75"></section>

        {/* Page content */}
        <Container className="mt--8 w-75 container-fluid" fluid>
          {window.location.pathname == "/user_tickets" && (
            <Row>
              <Tickets />
            </Row>
          )}
          {window.location.pathname == "/" && (
            <>
            <div style={{position: "fixed",
  right: "0",
  bottom: "0",zIndex:"99"}}>
  
  {chat==="1" &&       <iframe 
    allow="microphone;"
    width="350"
    height="430"
    src="https://console.dialogflow.com/api-client/demo/embedded/bb6c8ade-39c0-498d-af8d-cb053f551ce9">
</iframe>}
<Button  color="info float-right"  onClick={handlechat}>
  {chat==="0" && "Show Chat Box"}
  {chat==="1" && "Hide Chat Box"}
    </Button>
            </div>
          
              <Row>
                <AddStatement />
              </Row>
              {
                <Row style={{ marginTop: "100px" }}>
                  <div className="col">
                    <Card className="shadow">
                      <MultipleRows />
                    </Card>
                  </div>
                </Row>
              }
            </>
          )}
          {/* statements */}
          {window.location.pathname == "/mystatement" && (
            <Row>
              <MyStatements />
            </Row>
          )}

          {window.location.pathname == "/ocr" && (
            <Row>
              <Ocr />
            </Row>
          )}

          {window.location.pathname == "/changepassword" && (
            <Row>
              <ChangePassword />
            </Row>
          )}

          {window.location.pathname == "/profile" && (
            <Row>
              <ViewProfile />
            </Row>
          )}

          {window.location.pathname == "/modifyprofile" && (
            <Row>
              <Profile />
            </Row>
          )}
          {/* statements */}
          {window.location.pathname == "/notfound" && (
            <Row>
              <Notfound />
            </Row>
          )}

          {window.location.pathname == "/experts" && (
            <Row>
              <Clientavi />
            </Row>
          )}

{window.location.pathname == "/ex" && (
            <Row>
              <ViewProfileExpert />
            </Row>
          )}

{window.location.pathname == "/reviews" && (
            <Row>
              <DetailsExpert />
            </Row>
          )}
        </Container>
      </div>

      <AuthFooter />
    </>
  );
};

export default Landing;
