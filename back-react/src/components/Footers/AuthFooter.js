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
import { NavItem, NavLink, Nav, Container, Row, Col, Button } from "reactstrap";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';
const Login = () => {
  return (
    <>



      <section className="p-6 pb-0">
        {/* 
          <footer className="text-center text-white" >

            <div className="container p-4 pb-0 positionInBottom" >



              © 2020 Copyright&nbsp;&nbsp;:
              <a className="text-white" href="/admin/index"> &nbsp;&nbsp;Assurini</a>
            </div>
          </footer> */}
      </section>
      <footer >

        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }} >
          <MDBContainer className='p-3 pb-0' >
            <section className=''>
              <p className='d-flex justify-content-center align-items-center 8rem'>
                <span className='me-3' style={{ fontSize: 30 }}><b >Register for free</b>&nbsp; &nbsp; </span>
                <Button href='http://localhost:3000/auth/register' type='button' outline color='light' style={{ fontSize: 15 }}>
                  Sign up!
                </Button>
              </p>

            </section>
          </MDBContainer>
          <MDBContainer className='p-4 pb-0'>
            <section className='mb-4'>
              <Button outline color="light" floating className='m-1' href='#!'>
                <MDBIcon icon="phone" className="me-3" /><p>(+216) 20 760 820  </p>
              </Button>


              <Button outline color="light" floating className='m-1' href='#!'>
                <MDBIcon icon="envelope" className="me-6" /><p>assurini.tunisien0reply@gmail.com</p>
              </Button>

              <Button outline color="light" floating className='m-1' href='#!' >
                <MDBIcon fab icon='github' /><p>4TWIN7-TechTitans</p>
              </Button>

              <Button outline color="light" floating className='m-1' href='#!'>
                <MDBIcon icon='map' className="me-6" /><p>Esprit School of Engineering</p>
              </Button>

            </section>
          </MDBContainer>
          <div ><iframe width="50%" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=50%25&amp;height=300&amp;hl=en&amp;q=+(Esprit%20school%20of%20engineering)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/sport-gps/">bike gps</a></iframe></div>
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
            © 2023 Copyright :&nbsp; &nbsp;
            <a className='text-white' href='http://localhost:3000/auth/register'>
              &nbsp; ASSURINI
            </a>
          </div>
        </MDBFooter>

      </footer>
    </>
  );
};

export default Login;
