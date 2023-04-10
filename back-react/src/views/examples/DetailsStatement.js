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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function DetailsStatement() {
  const [driverIdentityA, setdriverIdentityA] = useState("");
  const [driverIdentityB, setdriverIdentityB] = useState("");
  const [driver_license_a, setdriver_license_a] = useState("");
  const [driver_license_b, setdriver_license_b] = useState("");
  const [hits_a, sethits_a] = useState("");
  const [hits_b, sethits_b] = useState("");
  const [circumstances_a, setcircumstances_a] = useState("");
  const [circumstances_b, setcircumstances_b] = useState("");
  const [location, setlocation] = useState("");
  const [date, setDate] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [Experts, setExperts] = useState([]);
  const [signature_a, setsignature_a] = useState("");
  const [signature_b, setsignature_b] = useState("");

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = getCookie("jwt");
        const id_agenceJwt = (
          await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
        ).data._id;

        const Expert = await axios.get("http://localhost:5000/getallexperts");
        console.log(Expert);

        const responseExpert = Expert.data.experts.filter(
          (elem) => elem.id_agence === id_agenceJwt
        );
        setExperts(responseExpert);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();

    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");

    async function get_specificstatement(id) {
      try {
        const statement = (
          await axios.get("http://127.0.0.1:5000/get_specificstatement/" + id)
        ).data.statement;
        console.log(statement);

        setdriverIdentityA(statement.drivers_identity_a.first_name);
        setdriverIdentityB(statement.drivers_identity_b.first_name);
        setdriver_license_a(statement.drivers_identity_a.driver_license);
        setdriver_license_b(statement.drivers_identity_b.driver_license);
        sethits_a(statement.hits_a);
        sethits_b(statement.hits_b);
        setcircumstances_a(statement.circumstances_a);
        setcircumstances_b(statement.circumstances_b);
        setlocation(statement.location);
        setsignature_a(statement.signature_a);
        setsignature_b(statement.signature_b);

        setDate(statement.date);

        console.log(driverIdentityA);
        console.log(driverIdentityB);
      } catch (err) {
        console.log(err);
      }
    }

    get_specificstatement(id_statement);
  }, []);

  const handleStatement = async (target, e) => {
    e.preventDefault();
    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");

    const result = await axios.post("http://localhost:5000/setdecision", {
      statementId: id_statement,
      decision: target,
    });
    toast.success('Decision Made Successfully!');
    console.log(result);
  };

  return (
    <>
           <ToastContainer /> 
      <Container className="mt--10" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <h3 className="mb-0">Examine claim </h3>

                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        Driver A : {driverIdentityA} || Driver B :{" "}
                        {driverIdentityB}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        License A : {driver_license_a} || License B :{" "}
                        {driver_license_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        Place Of Damage For A : {hits_a} || Place Of Damage For
                        B : {hits_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        Circumstances A : {circumstances_a} || Circumstances B :{" "}
                        {circumstances_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        Location of The Accident : {location}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                        <h4>Signature</h4>
                        {signature_a} || {signature_b}
                      </span>
                    </div>
                    <hr className="my-4" />
                    <div>
                      Date of The Accident : {date}
                      <br></br>
                      "The specifications for experts and actuaries is a
                      document that defines the requirements and standards that
                      experts and actuaries must adhere to in the performance of
                      their duties. This specifications document is based on the
                      Law No. 83-112 of December 12, 1983, which pertains to the
                      general status of personnel in the state, local public
                      authorities, and administrative public establishments
                      (EPA), as well as Law No. 85-78 of August 5, 1985, which
                      pertains to the general status of agents of offices,
                      public establishments with industrial and commercial
                      character, and companies wholly owned by the state or
                      local public authorities (EPIC). The document also
                      includes the fee schedule for automobile experts and loss
                      assessors, as well as the requirements for actuaries. It
                      also includes forms for requests to add or change
                      specialties, requests to change quality, integration of a
                      natural person actuary into a legal entity, and requests
                      for removal from the register."
                    </div>
                  </div>
                  <Button
                    type="Button" 
                    onClick={(e) => handleStatement("a", e)}
                  >
                    Decider pour {driverIdentityA}
                  </Button>
                  <Button
                    type="Button"
                    onClick={(e) => handleStatement("b", e)}
                  >
                    Decider pour {driverIdentityB}
                  </Button>
                  
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
