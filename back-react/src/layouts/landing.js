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
import ChangePassword from "views/examples/ChangePassword";
import ClientForum from "views/examples/ClientForum";


const Landing = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

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
            className='p-8 text-center bg-image'
            style={{ backgroundImage: "url(" + require("../assets/img/theme/profile-cover.jpg") + ")", height: 520 }}
          >
            <div className='mask' >
              <div className='d-flex justify-content-center align-items-center h-100'>
                <div className='text-dark'>
                  <h1 className='mb-6'style={{ fontSize: 80 }}>Welcome To Assurini</h1>
                  <h1 className='mb-3' >Clic here to create your statement </h1>
                  <a className='btn btn-primary btn-lg' href='/' role='button'>
                    Statement
                  </a>
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

        <section className="my-8">
        </section>
        <section className="mt--8 w-75">
        </section>

        {/* Page content */}
        <Container className="mt--8 w-75 container-fluid" fluid>
          {window.location.pathname == "/user_tickets" && (
            <Row>
              <Tickets />
            </Row>
          )}
          {window.location.pathname == "/" && (
            <>
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
          {window.location.pathname == "/userForum" && (
            <Row>
              <ClientForum />
            </Row>
          )}
          {/* statements */}
          {window.location.pathname == "/notfound" && (
            <Row>
              <Notfound />
            </Row>
          )}
        </Container>
      </div>
      <AuthFooter />
    </>
  );
};

export default Landing;
