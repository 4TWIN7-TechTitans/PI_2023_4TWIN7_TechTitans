import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
    CardBody,
    Col,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import { FaCircle } from "react-icons/fa";
  
  function DetailsStatement() {
    const [drivers_identity_a, setdrivers_identity_a] = useState("");
    const [drivers_identity_b, setdrivers_identity_] = useState("");
    const [vehicule_identity_a, setVehicule_identity_a] = useState("");
    const [vehicule_identity_b, setVehicule_identity_b] = useState("");
    const[material_damage ,setmaterial_damage]= useState ("");


  
    useEffect(() => {
      const search = window.location.search;
      const id_statement = new URLSearchParams(search).get("id");
      async function get_specificstatement(id) {
        const response = (
          await axios.get("http://127.0.0.1:5000/get_specificstatement?id=" + id)
        ).data;
  
        setdrivers_identity_a(response.drivers_identity_a);
        setdrivers_identity_(response.drivers_identity_b);
        setVehicule_identity_a(response.vehicule_identity_a);
        setVehicule_identity_b(response.vehicule_identity_b);
        setmaterial_damage(response.material_damage);


  
        console.log(
          drivers_identity_a,
          drivers_identity_b,
          vehicule_identity_a,
          vehicule_identity_b,

          material_damage
        );
      }
  
      get_specificstatement(id_statement);
    }, []);
  
    return (
      <>
         <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
              
              <h3 className="mb-0">Examine claim</h3>
            
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {drivers_identity_a.first_name_a + " |||||||||||| " + drivers_identity_b.first_name_b}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {drivers_identity_a.address_a + " |||||||||||| " + drivers_identity_a.address_b}
                  </div>
                  <h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {drivers_identity_a.drivers_license_issue_date + " |||||||||||| " + drivers_identity_a.drivers_license_issue_date}
                  </div>
                  </h3>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {vehicule_identity_a.matriculation + "||||||||||||" + vehicule_identity_b.matriculation }
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    {vehicule_identity_a.brand + "||||||||||||" + vehicule_identity_b.brand }
                  </div>
                  <hr className="my-4" />

                 
                </div>
              </CardBody>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
  
  }
  
  export default DetailsStatement;
  