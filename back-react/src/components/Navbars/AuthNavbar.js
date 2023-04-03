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
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Media,
} from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const location = useLocation();
  useEffect(() => {
    
    setNom(decodeURI(getCookie("lastname")));
    setPrenom(decodeURI(getCookie("firstname")));
    setRole(decodeURI(getCookie("role")));
    if((role==="Admin" || role==="Agence" || role==="Expert") && window.location.pathname !== "/notfound" )
    {
        window.location.replace("http://localhost:3000/notfound");
    }
    console.log(role);
   
  }, [nom, prenom, role,location]);
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <img
              alt="..."
              src={require("../../assets/img/brand/argon-react-white.png")}
            />
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/argon-react.png")}
                    />
                   
                  </Link> 
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
             
            
            {(role==="Admin" || role==="Agence" || role==="Expert")  ? ( <NavItem> <NavLink
                  className="nav-link-icon"
                  to="/admin/index"
                  tag={Link}
                >
                  <i className="ni ni-map-big" />
                  <span className="nav-link-inner--text">Home</span>
                </NavLink>
              </NavItem>):
              <NavItem> <NavLink
              className="nav-link-icon"
              to="/"
              tag={Link}
            >
              <i className="ni ni-map-big" />
              <span className="nav-link-inner--text">Home</span>
            </NavLink>
          </NavItem>
            }
              
              {!role.length>0 ? 
              <>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Sign up</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Sign in</span>
                </NavLink>
              </NavItem>
              </>
              
              : ''}
              

            </Nav>
          </UncontrolledCollapse>
              
          {role.length>0 && (<>
          
            {role==="Client" && (    <UncontrolledDropdown nav>
          <DropdownToggle className="pr-0" nav>
            <Media className="align-items-center">
              <span className="avatar avatar-sm rounded-circle">
                <img
                  alt="..."
                  src={require("../../assets/img/theme/team-4-800x800.jpg")}
                />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold" style={{color:'white'}}>
                  {nom  + " " + prenom}
                  <br></br>
                 
                </span>
              </Media>
            </Media>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem className="noti-title" header tag="div">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </DropdownItem>
            <DropdownItem to="/admin/user-profile" tag={Link}>
              <i className="ni ni-single-02" />
              <span>My profile</span>
            </DropdownItem>
         
          
            <DropdownItem to="/user_tickets" tag={Link}>
              <i className="ni ni-support-16" />
              <span>Support</span>
            </DropdownItem>
            <DropdownItem divider />

            <DropdownItem to="/mystatement" tag={Link}>
              <i className="ni ni-single-copy-04" />
              <span>My statements</span>
            </DropdownItem>
            <DropdownItem divider />

            <DropdownItem href="/" onClick={handleLogout}>
              <i className="ni ni-user-run" />
              <span>Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>)}
          </>)
      
          }
          
        </Container>
      </Navbar>
      {role==="Admin" && (<Redirect  to="/notfound" />)}
      {role==="Agence" && (<Redirect  to="/notfound" />)}
      {role==="Expert" && (<Redirect  to="/notfound" />)}
    </>
  );
};


const handleLogout = async () => {
  try {
    const response = await axios.get("http://localhost:5000/logout", { responseType: "text" });
    console.log("Logged out successfully");
    
    // Delete all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  } catch (error) {
    console.error("Error while logging out", error);
  }
};



function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default AdminNavbar;
