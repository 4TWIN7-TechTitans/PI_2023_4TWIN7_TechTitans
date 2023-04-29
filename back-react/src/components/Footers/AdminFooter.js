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
/*eslint-disable*/

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink, Button } from "reactstrap";

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
const Footer = () => {
  return (
    <>
     <div className="d-flex flex-column min-vh-100">
      <footer className="text-center text-dark p-3" style={{position: "absolute", bottom: 0, left: 0, width: "100%", backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>

        <div className='text-center p-3'>


          <MDBFooter className='text-center text-dark' >
            © 2023 Copyright&nbsp;&nbsp;:
            <a className="text-dark" href="/admin/index"> &nbsp;&nbsp;Assurini</a>
          </MDBFooter>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Footer;
