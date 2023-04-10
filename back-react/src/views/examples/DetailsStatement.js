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
  const [material_damage, setmaterial_damage] = useState("");
  const [statements, setStatements] = useState([]);
  const [user, setUser] = useState([]);

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
      <Container  className="mt--10" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <h3 className="mb-0">Examine claim </h3>

                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                  <div className="h5 font-weight-300">
                      {drivers_identity_a.first_name_a +
                        " |||||||||||| " +
                        drivers_identity_b.first_name_b}
                      <span className="font-weight-light"></span>
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {drivers_identity_a.address_a +
                        " |||||||||||| " +
                        drivers_identity_a.address_b}
                    </div>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {drivers_identity_a.drivers_license_issue_date +
                        " |||||||||||| " +
                        drivers_identity_a.drivers_license_issue_date}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {vehicule_identity_a.matriculation +
                        " |||||||||||| " +
                        vehicule_identity_b.matriculation}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {vehicule_identity_a.brand +
                        " |||||||||||| " +
                        vehicule_identity_b.brand}
                    </div>
                    <hr className="my-4" />
                    <div>
                      Cahier des charges pour les experts Cahier de charges pour les actuaires Loi n° 
                      83-112 du 12 décembre 1983 :Portant statut général des personnels de 
                      l’Etat des collectivités publiques locales et des établissements publics*
                       à caractère administratif (EPA) loi n° 85-78 du 5 août 1985,
                        portant statut général des agents des offices, des établissements 
                        publics à caractère industriel et commercial et des sociétés dont le 
                        capital appartient directement et entièrement à l’Etat ou aux collectivités 
                        publiques locales (EPIC) Barème des honoraires des experts automobile Experts et 
                        Commissaires d’Avaries Actuaires Demande d’ajout ou de changement de spécialités 
                        Demande de changement de qualité Formulaire d’intégration d’un actuaire personne 
                        physique à une société morale Demande de radiation du registre
                    </div>
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
