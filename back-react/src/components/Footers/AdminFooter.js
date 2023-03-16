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

const Footer = () => {
  return (

<div className="container my-5">

<section className="">

<footer className="text-center text-dark" >
  
  <div className="container p-4 pb-0">
    
    <section className="">
      <p className="d-flex justify-content-center align-items-center">
        <span className=" me-3"> Register for free  &nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;</span>
        <Button 
          type="button" 
          href="/auth/register"  className=" btn btn-outline-light btn-rounded">
           Sign up!
        </Button>
      </p>
    </section>

    © 2020 Copyright&nbsp;&nbsp;:
    <a className="text-dark" href="/admin/index"> &nbsp;&nbsp;Assurini</a>
  </div>
</footer>
</section>

</div>
  );
};

export default Footer;
