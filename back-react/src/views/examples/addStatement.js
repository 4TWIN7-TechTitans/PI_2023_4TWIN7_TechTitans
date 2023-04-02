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

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
} from "reactstrap";
import SignatureCanvas from 'react-signature-canvas';
import CanvasDraw from "react-canvas-draw";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactDatetime from "react-datetime";
import moment from "moment";

const AddStatement = () => {

  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [injured, setInjured] = useState("");
  const [material_damage, setMaterial_damage] = useState("");
  const [witness, setWitness] = useState("");
  const [vehicule_a, setVehicule_a] = useState("");
  const [assureBy, setAssureBy] = useState("");
  const [agency, setAgency] = useState("");
  const [contractValidity, setContractValidity] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [vehicule_b, setVehicule_b] = useState("");
  const [drivers_identity_a, setDriver_identity_a] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [address, setAdress] = useState("");
  const [drivers_license_issue_date, setDrivers_license_issue_date] = useState("");
  const [driver_license, setDriver_license] = useState("");
  const [drivers_identity_b, setDriver_identity_b] = useState("");
  const [insured_a, setInsured_a] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [insured_b, setInsured_b] = useState("");
  const [vehicule_identity_a, setVehicule_identity_a] = useState("");
  const [brand_a, setBrand_a] = useState("");
  const [brand_b, setBrand_b] = useState("");

  const [type, setType] = useState("");
  const [matriculation, setMatriculation] = useState("");
  const [country, setCountry] = useState("");
  const [vehicule_identity_b, setVehicule_identity_b] = useState("");
  const [hits_a, setHits_a] = useState("");
  const [possible_place, setPossiblePlace] = useState("");
  const [hits_b, setHits_b] = useState("");
  const [hit_direction, setHit_direction] = useState("");
  const [apparent_damages_a, setApparent_damages_a] = useState("");
  const [damageplaces, setDamageplaces] = useState("");
  const [damage_direction, setDamage_direction] = useState("");
  const [apparent_damages_b, setApparent_damages_b] = useState("");
  const [circumstances_a, setCircumstances_a] = useState("");
  const [circumstances_b, setCircumstances_b] = useState("");
  const [accident_croquis, setAccident_croquis] = useState("");
  const [notes_a, setNotes_a] = useState("");
  const [notes_b, setNotes_b] = useState("");
  const [signature_a, setSignature_a] = useState("");
  const [signature_b, setSignature_b] = useState("");


  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const [users, setUsers] = useState([]);

  const brands = [
    "Toyota",
    "Honda",
    "Ford",
    "Chevrolet",
    "Nissan",
    "Audi",
    "Isuzu",
    "BMW",
    "Golf",
    "Tesla",
    "Chevrolet",
    "Hyundai",
    "Infiniti",
    "Volkswagen",
    "Volvo",
    "Alfa Romeo",
    "Mitsubishi",
  ];
  const countries = [
    "Tunisia", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde",
    "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia"
  ]

  const possibleplaces = [
    "Front Left Fender",
    "Front Right Fender",
    "Rear Left Fender",
    "Rear Right Fender",
    "Front Bumper",
    "Rear Bumper",
    "Hood",
    "Trunk",
    "Roof",
    "Front Windshield",
    "Rear Windshield",
    "Side Mirrors",
    "Doors",
    "Other"
  ]

  const hitdirections = [
    "Front", "Back", "Left", "Right"
  ]
  const dmgeplaces = [
    "Scratches",
    "Dents",
    "Cracks",
    "Paint Damage",
    "Broken Lights",
    "Broken Windows",
    "Missing Parts",
    "Other"
  ]
  const dmgdirections = [
    "Front", "Back", "Left", "Right"
  ]
  const circumstance = [
    "Driving in a normal and careful manner",
    "Driving under the influence of drugs or alcohol",
    "Speeding",
    "Ignoring traffic signals or signs",
    "Distracted driving",
    "Driving while fatigued",
    "Reckless driving",
    "Tailgating",
    "Changing lanes without signaling",
    "Making an illegal turn",
    "Backing up without looking",
    "Driving in the wrong lane",
    "Driving in a construction zone",
    "Driving during inclement weather",
    "Other"
  ]

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    //if (getCookie("role") !== "Client") window.location.href = "/auth/login";
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.datetime.value;
    const location = form.location.value;
    const injured = form.injured.value;
    const material_damage = form.material_damage.value;
    const witness = form.witness.value;
    const vehicule_a = form.id_contrat.value;
    const assureBy = form.assureBy.value;
    const agency = form.agency.value;
    const contractValidity = form.contractValidity.value;
    const start_date = form.start_date.value;
    const end_date = form.end_date.value;
    const vehicule_b = form.vehicule_b.value;
    const drivers_identity_a = form.drivers_identity_a.value;
    const first_name = form.first_name.value;
    const last_name = form.last_name.value;
    const address = form.address.value;
    const drivers_license_issue_date = form.drivers_license_issue_date.value;
    const driver_license = form.driver_license.value;
    const drivers_identity_b = form.drivers_identity_b.value;
    const insured_a = form.insured_a.value;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const phonenumber = form.phonenumber.value;
    const insured_b = form.insured_b.value;
    const vehicule_identity_a = form.vehicule_identity_a.value;
    const brand = form.brand.value;
    const type = form.type.value;
    const matriculation = form.matriculation.value;
    const country = form.country.value;
    const vehicule_identity_b = form.vehicule_identity_b.value;
    const hits_a = form.hits_a.value;
    const possible_place = form.possible_place.value;
    const hits_b = form.hits_b.value;
    const hit_direction = form.hit_direction.value;
    const apparent_damages_a = form.apparent_damages_a.value;
    const damageplaces = form.damageplaces.value;
    const damage_direction = form.damage_direction.value;
    const apparent_damages_b = form.apparent_damages_b.value;
    const circumstances_a = form.circumstances_a.value;
    const circumstances_b = form.circumstances_b.value;
    const accident_croquis = form.accident_croquis.value;
    const notes_a = form.notes_a.value;
    const notes_b = form.notes_b.value;
    const signature_a = form.signature_a.value;
    const signature_b = form.signature_b.value;


    if (!date || !location || !injured || !material_damage || !witness
      || !vehicule_a || !assureBy || !agency ||
      !contractValidity || !start_date || !end_date ||
      !vehicule_b || !drivers_identity_a || !first_name ||
      !last_name || !address || !drivers_license_issue_date ||
      !driver_license || !drivers_identity_b || !insured_a ||
      !firstname || !lastname || !phonenumber || !insured_b ||
      !vehicule_identity_a || !brand || !type || !matriculation ||
      !country || !vehicule_identity_b || !hits_a || !possible_place ||
      !hits_b || !hit_direction || !apparent_damages_a || !damageplaces ||
      !damage_direction || !apparent_damages_b || !circumstances_a ||
      !circumstances_b || !accident_croquis || !notes_a ||
      !notes_b || !signature_a || !signature_b) {
      setShowNotification(false);
      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill all the fields",
      });
      return;
    }


    try {
      const add = await axios.post(
        "http://127.0.0.1:5000/addstatement",
        {
          date,
          location,
          injured,
          material_damage,
          witness,
          vehicule_a,
          assureBy,
          agency,
          contractValidity,
          start_date,
          end_date,
          vehicule_b,
          drivers_identity_a,
          first_name,
          last_name,
          address,
          drivers_license_issue_date,
          driver_license,
          drivers_identity_b,
          insured_a,
          firstname,
          lastname,
          phonenumber,
          insured_b,
          vehicule_identity_a,
          brand,
          type,
          matriculation,
          country,
          vehicule_identity_b,
          hits_a,
          possible_place,
          hits_b,
          hit_direction,
          apparent_damages_a,
          damageplaces,
          damage_direction,
          apparent_damages_b,
          circumstances_a,
          circumstances_b,
          accident_croquis,
          notes_a,
          notes_b,
          signature_a,
          signature_b,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (add.status === 201) {
        setShowNotification(true);
        setErrors({});
        setShowError(false);
      } else {
        setShowNotification(false);
        setErrors({ ...errors, message: "Statement adding failed" });
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-users");
        setUsers(
          response.data.users.filter((user) => user.role === "Agence")

        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);
  //hundle show for the whole card:
  const [isShown, setIsShown] = useState(true);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };


  //hundle show to the 1+2+3+4+5 section 
  const [isShown1, setIsShown1] = useState(true);
  const handleShow1 = event => {
    // 👇️ toggle shown state
    setIsShown1(current => !current);

  };

  //hundle show to the 6 section 
  const [isShown6, setIsShown6] = useState(true);
  const handleShow6 = event => {
    // 👇️ toggle shown state
    setIsShown6(current => !current);

  };


  //hundle show to the 7 section 
  const [isShown7, setIsShown7] = useState(true);
  const handleShow7 = event => {
    // 👇️ toggle shown state
    setIsShown7(current => !current);
  };

  //hundle show to the 8 section 
  const [isShown8, setIsShown8] = useState(true);
  const handleShow8 = event => {
    // 👇️ toggle shown state
    setIsShown8(current => !current);
  };

  //hundle show to the 9 section 
  const [isShown9, setIsShown9] = useState(true);
  const handleShow9 = event => {
    // 👇️ toggle shown state
    setIsShown9(current => !current);
  };

  //hundle show to the 10 section 
  const [isShown10, setIsShown10] = useState(true);
  const handleShow10 = event => {
    // 👇️ toggle shown state
    setIsShown10(current => !current);
  };

  //hundle show to the 11 section 
  const [isShown11, setIsShown11] = useState(true);
  const handleShow11 = event => {
    // 👇️ toggle shown state
    setIsShown11(current => !current);
  };

  //hundle show to the 12 section 
  const [isShown12, setIsShown12] = useState(true);
  const handleShow12 = event => {
    // 👇️ toggle shown state
    setIsShown12(current => !current);
  };
  //hundle show to the 13 section 
  const [isShown13, setIsShown13] = useState(true);
  const handleShow13 = event => {
    // 👇️ toggle shown state
    setIsShown13(current => !current);
  };

  const handleClear = event => {
    setAccident_croquis.current.clear();
  };

  const today = new Date().toISOString().substr(0, 10);
  return (
    <>

      {/*<UserHeader /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Fill In Your Statement</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="info" onClick={handleClick} >
                      {!isShown ? 'Show' : 'Hide'}
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {isShown && (
                <CardBody>
                  <form onSubmit="" noValidate>
                    <h6 className="heading-small text-muted mb-4">
                      set all the infromations related to the accident please
                    </h6>
                    <div className="pl-lg-4">


                      <Row> {/* Section 1 + 2 + 3 + 4 + 5 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 1 + 2 + 3 + 4 + 5
                          </h6>
                        </Col>

                      </Row>


                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow1} >
                          {!isShown1 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown1 && (
                        <Row> {/* SECTION 1 + 2 + 3 + 4 + 5 */}

                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                1. Date
                              </label>
                              <Input
                                name="date"
                                type="date"
                                placeholder="date"
                                required
                                defaultValue={today}
                              />
                              <div className="date error"></div>
                            </FormGroup>
                          </Col>

                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                2. Location
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="location"
                                type="location"
                                placeholder="location"
                                required
                              />
                              <div className="location error"></div>
                            </FormGroup>
                          </Col>
                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                3.Injured
                              </label>
                              <Input
                                name="injured"
                                type="select"
                                required
                              >
                                <option value="yes">Yes</option>
                                <option value="No">No</option>
                              </Input>
                              <div className="injured error"></div>
                            </FormGroup>
                          </Col>

                          <Col lg="3">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                4.Material damage
                              </label>
                              <Input
                                name="material_damage"
                                type="select"
                                required
                              >
                                <option value="Minor">Yes</option>
                                <option value="Major">No</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="9">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-email"
                              >
                                5. Witness to add if exists
                              </label>

                            </FormGroup>
                          </Col>
                        </Row>)} {/* FIN  1 + 2 + 3 + 4 + 5 */}


                      <Row> {/* VEHICULE A VS B */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            VEHICULE A
                          </h6>
                        </Col>
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            VEHICULE B
                          </h6>
                        </Col>
                        <Col lg="12">
                          <h6 className="heading-small text-muted mb-4">
                            Section 6
                          </h6>
                        </Col>
                      </Row>


                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow6} >
                          {!isShown6 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown6 && (
                        <Row> {/* SECTION 6 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              6. Insurance Agency
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                vehicule Insured By :
                              </label>
                              <Input name="agency" type="select" required>
                                {users.map((user) => (
                                  <option key={user._id} value={user._id} >
                                    {user.first_name}
                                  </option>
                                ))}
                              </Input>

                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Contartct Numbre:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Agency:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Start date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                End date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                          </Col>

                          <Col lg="6">


                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              6. Insurance Agency
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                vehicule Insured By :
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Contartct Numbre:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Agency:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Start date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                End date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>)} {/*  FIN Section 6 */}


                      <Row> {/* Section 7 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 7
                          </h6>
                        </Col>

                      </Row>


                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow7} >
                          {!isShown7 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown7 && (
                        <Row> {/*  SECTION 7 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              7. Driver Identity
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                First Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Last Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                License Identity :
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                date of delivrance:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              7. Driver Identity
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                First Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Last Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                License Identity :
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                date of delivrance:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                          </Col>
                        </Row>)} {/*  FIN SECTION 7 */}


                      <Row> {/* Section 8 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 8
                          </h6>
                        </Col>

                      </Row>

                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow8} >
                          {!isShown8 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown8 && (
                        <Row>  {/* SECTION 8 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              8. Insured
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                First Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Last Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Phone Number
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>

                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              8. Insured
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                First Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Last Name
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Phone Number
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>

                          </Col>
                        </Row>)} {/*  FIN SECTION 8 */}



                      <Row> {/* Section 9 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 9
                          </h6>
                        </Col>

                      </Row>


                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow9} >
                          {!isShown9 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown9 && (
                        <Row> {/*  SECTION 9 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              9. Vehicule Identity
                            </label>
                            <FormGroup>
                              <label>Brand</label>
                              <Input
                                type="select"
                                name="brand"
                                id="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                              >
                                <option value="">Select a brand</option>
                                {brands.map((brand, index) => (
                                  <option key={`${brand}-${index}`} value={brand}>
                                    {brand}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <label>Country</label>
                              <Input
                                type="select"
                                name="Country"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                              >
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                  <option key={`${country}-${index}`} value={country}>
                                    {country}
                                  </option>
                                ))}
                              </Input>
                              <p className="text-danger"></p>
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Matriculation
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Direction of Follow
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Coming From
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Going To
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>

                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              9. Vehicule Identity
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Brand
                              </label>
                              <Input
                                type="select"
                                name="brand"
                                id="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                required
                              >
                                <option value="">Select a brand</option>
                                {brands.map((brand, index) => (
                                  <option key={`${brand}-${index}`} value={brand}>
                                    {brand}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <label>Country</label>
                              <Input
                                type="select"
                                name="Country"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                              >
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                  <option key={`${country}-${index}`} value={country}>
                                    {country}
                                  </option>
                                ))}
                              </Input>
                              <p className="text-danger"></p>
                            </FormGroup>

                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Matriculation
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Direction of Follow
                            </label>
                            <FormGroup>


                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Coming From
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-email"
                              >
                                Going To
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="email"

                                type="email"
                              />
                            </FormGroup>

                          </Col>
                        </Row>)} {/*  FIN SECTION 9 */}



                      <Row> {/* Section 10 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 10
                          </h6>
                        </Col>

                      </Row>
                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow10} >
                          {!isShown10 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown10 && (
                        <Row> {/* SECTION 10 */}
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                10. Choc Points
                              </label>
                              <Input
                                name="tfa"
                                type="select"
                                required
                              >
                                <option value="Minor">Front Left Fender</option>
                                <option value="Major">Front Right Fender</option>
                                <option value="Minor">Rear Left Fender</option>
                                <option value="Major">Rear Right Fender</option>
                                <option value="Minor">Front Bumper</option>
                                <option value="Major">Rear Bumper</option>
                                <option value="Major">Hood</option>
                                <option value="Minor">Trunk</option>
                                <option value="Major">Roof</option>
                                <option value="Minor">Front Windshield</option>
                                <option value="Major">Rear Windshield"</option>
                                <option value="Minor">Side Mirror Left</option>
                                <option value="Major">Side Mirror Right</option>
                                <option value="Minor">Door Front Left</option>
                                <option value="Major">Door Front Right</option>
                                <option value="Major">Door Rear Left</option>
                                <option value="Major">Door Rear Right</option>

                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                10. Choc Points
                              </label>
                              <Input
                                name="tfa"
                                type="select"
                                required
                              >
                                <option value="Minor">Front Left Fender</option>
                                <option value="Major">Front Right Fender</option>
                                <option value="Minor">Rear Left Fender</option>
                                <option value="Major">Rear Right Fender</option>
                                <option value="Minor">Front Bumper</option>
                                <option value="Major">Rear Bumper</option>
                                <option value="Major">Hood</option>
                                <option value="Minor">Trunk</option>
                                <option value="Major">Roof</option>
                                <option value="Minor">Front Windshield</option>
                                <option value="Major">Rear Windshield"</option>
                                <option value="Minor">Side Mirror Left</option>
                                <option value="Major">Side Mirror Right</option>
                                <option value="Minor">Door Front Left</option>
                                <option value="Major">Door Front Right</option>
                                <option value="Major">Door Rear Left</option>
                                <option value="Major">Door Rear Right</option>

                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>)} {/* FIN SECTION 10 */}

                      <Row> {/* Section 11 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 11
                          </h6>
                        </Col>

                      </Row>
                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow11} >
                          {!isShown11 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown11 && (
                        <Row> {/* SECTION 11 */}
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                11. Apparent Damages
                              </label>
                              <Input
                                name="tfa"
                                type="select"
                                required
                              >
                                <option value="Scratches">Scratches</option>
                                <option value="Dents">Dents</option>
                                <option value="Cracks">Cracks</option>
                                <option value="Paint Damage">Paint Damage</option>
                                <option value="Broken Lights">Broken Lights</option>
                                <option value="Broken Windows">Broken Windows</option>
                                <option value="Missing Parts">Missing Parts</option>
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                11. Apparent Damages
                              </label>
                              <Input
                                name="tfa"
                                type="select"
                                required
                              >
                                <option value="Scratches">Scratches</option>
                                <option value="Dents">Dents</option>
                                <option value="Cracks">Cracks</option>
                                <option value="Paint Damage">Paint Damage</option>
                                <option value="Broken Lights">Broken Lights</option>
                                <option value="Broken Windows">Broken Windows</option>
                                <option value="Missing Parts">Missing Parts</option>
                              </Input>
                            </FormGroup>
                          </Col>

                        </Row>)} {/* FIN SECTION 11 */}
                    </div>
                    {/*
                     <h6 className="heading-small text-muted mb-4">
                    Contact information
                      </h6> 
                      */}
                    <div className="pl-lg-4">


                      <Row> {/* Section 12 */}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 12
                          </h6>
                        </Col>
                      </Row>


                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow12} >
                          {!isShown12 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown12 && (
                        <Row> {/* SECTION 12 */}
                          <Col md="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                12. Circumstances By client A
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Stopped too suddenly"
                                id="input-address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                12. Circumstances By client B
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Stopped too suddenly"
                                id="input-address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>

                          {/*     "Driving in a normal and careful manner",
                                "Driving under the influence of drugs or alcohol",
                                "Speeding",
                                "Ignoring traffic signals or signs",
                                "Distracted driving",
                                "Driving while fatigued",
                                "Reckless driving",
                                "Tailgating",
                                "Changing lanes without signaling",
                                "Making an illegal turn",
                                "Backing up without looking",
                                "Driving in the wrong lane",
                                "Driving in a construction zone",
                                "Driving during inclement weather", 
                            */}
                        </Row>)}{/* FIN SECTION 12 */}

                      <Row> {/* Section 13 + 14 + 14*/}
                        <Col lg="6">
                          <h6 className="heading-small text-muted mb-4">
                            Section 13 + 14 + 15
                          </h6>
                        </Col>

                      </Row>

                      <Col className="text-right" xs="12">
                        <Button color="info" onClick={handleShow13} >
                          {!isShown13 ? 'Show' : 'Hide'}
                        </Button>
                      </Col>
                      {isShown13 && (
                        <div>
                          <Row> {/* SECTION 13  IMAGE */}
                            <Col lg="12">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  13. Simulation Image Of the Accident
                                </label>
                                <InputGroup className="input-group-alternative">
                                  <CanvasDraw
                                    ref={setAccident_croquis}
                                    brushRadius={2}
                                    canvasWidth={12000}
                                    canvasHeight={400}
                                    hideGrid={true}
                                    brushColor={"#000000"}
                                  />

                                </InputGroup>
                                <button onClick={(e) => handleClear(e, setAccident_croquis)}>Clear</button>
                              </FormGroup>

                            </Col>
                          </Row> {/* FIN SECTION 13  IMAGE */}


                          <Row> {/* SECTION 14  Observation */}
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  14. Observations
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-address"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  14. Observations
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-address"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                          </Row> {/* FIN SECTION 14  Observation */}

                          <Row> {/* SECTION 15  Observation */}
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  15. Signature of A
                                </label>
                                <InputGroup className="input-group-alternative">
                                  <SignatureCanvas
                                    penColor='black'
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                    ref={setSignature_a}
                                  />
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                  color="text-primary"
                                >
                                  15. Signature of B
                                </label>
                                <InputGroup className="input-group-alternative">
                                  <SignatureCanvas
                                    penColor='black'
                                    canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                                    ref={setSignature_b}
                                  />
                                </InputGroup>
                              </FormGroup>

                            </Col>


                          </Row> {/* FIN SECTION 15  Observation */}
                        </div>
                      )}


                      <Row>
                        <Button color="info" type="submit">
                          Submit
                        </Button>
                      </Row>

                    </div>
                  </form>
                </CardBody>)}
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default AddStatement;
