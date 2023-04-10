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
  const [driverIdentityA, setdriverIdentityA] = useState("");
  const [driverIdentityB, setdriverIdentityB] = useState("");
  const [driver_license_a ,  setdriver_license_a] = useState("");
  const [driver_license_b ,  setdriver_license_b] = useState("");
  const [hits_a , sethits_a] = useState("");
  const [hits_b , sethits_b] = useState("");
  const [circumstances_a , setcircumstances_a] = useState("");
  const [circumstances_b , setcircumstances_b] = useState("");
  const [location , setlocation] = useState("");
  const [date , setDate]=useState("");
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");
    async function get_specificstatement(id) {
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
      setDate(statement.date);
      console.log(driverIdentityA);
      console.log(driverIdentityB);
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

    console.log(result);
  };

  return (
    <>
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
                       Driver A :  {driverIdentityA} ||  Driver B : {driverIdentityB}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                       License A :  {driver_license_a} ||   License B : {driver_license_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                      Place Of Damage For A :  {hits_a} ||  Place Of Damage For B : {hits_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                      Circumstances A : {circumstances_a}     ||  Circumstances B : {circumstances_b}
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                       Location of The Accident :  {location} 
                      </span>
                    </div>
                    <div className="h5 font-weight-300">
                      <span className="font-weight-light">
                       Date of The Accident :  {date} 
                      </span>
                    </div>
                    <hr className="my-4" />
                    <div>
                      Cahier des charges pour les experts Cahier de charges pour
                      les actuaires Loi n° 83-112 du 12 décembre 1983 :Portant
                      statut général des personnels de l'Etat des collectivités
                      publiques locales et des établissements publics* à
                      caractère administratif (EPA) loi n° 85-78 du 5 août 1985,
                      portant statut général des agents des offices, des
                      établissements publics à caractère industriel et
                      commercial et des sociétés dont le capital appartient
                      directement et entièrement à l'Etat ou aux collectivités
                      publiques locales (EPIC) Barème des honoraires des experts
                      automobile Experts et Commissaires d'Avaries Actuaires
                      Demande d'ajout ou de changement de spécialités Demande de
                      changement de qualité Formulaire d'intégration d'un
                      actuaire personne physique à une société morale Demande de
                      radiation du registre
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
