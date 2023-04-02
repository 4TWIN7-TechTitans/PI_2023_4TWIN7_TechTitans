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
  const [location, setLocation] = useState();
  const [injured, setInjured] = useState("");
  const [material_damage, setMaterial_damage] = useState("");
  const [witness, setWitness] = useState("");
  const [vehicule_a, setVehicule_a] = useState("");
  const [assureBy_a, setAssureBy_a] = useState("");
  const [assureBy_b, setAssureBy_b] = useState("");

  const [agency_a, setAgency_a] = useState("");
  const [agency_b, setAgency_b] = useState("");
  const [contractValidity_a, setContractValidity_a] = useState("");
  const [contractValidity_b, setContractValidity_b] = useState("");

  const [start_date_a, setStartDate_a] = useState("");
  const [start_date_b, setStartDate_b] = useState("");

  const [end_date_a, setEndDate_a] = useState("");
  const [end_date_b, setEndDate_b] = useState("");

  const [vehicule_b, setVehicule_b] = useState("");
  const [drivers_identity_a, setDriver_identity_a] = useState("");
  const [first_name_a, setFirst_name_a] = useState("");
  const [first_name_b, setFirst_name_b] = useState("");
  const [last_name_a, setLast_name_a] = useState("");
  const [last_name_b, setLast_name_b] = useState("");

  const [address_a, setAddress_a] = useState("");
  const [address_b, setAddress_b] = useState("");

  const [drivers_license_issue_date_a, setDrivers_license_issue_date_a] = useState("");
  const [drivers_license_issue_date_b, setDrivers_license_issue_date_b] = useState("");
  const [driver_license_a, setDriver_license_a] = useState("");
  const [driver_license_b, setDriver_license_b] = useState("");
  const [drivers_identity_b, setDriver_identity_b] = useState("");
  const [insured_a, setInsured_a] = useState("");
  const [firstname_a, setFirstName_a] = useState("");
  const [firstname_b, setFirstName_b] = useState("");

  const [lastname_a, setLastname_a] = useState("");
  const [lastname_b, setLastname_b] = useState("");

  const [phonenumber_a, setPhonenumber_a] = useState("");
  const [phonenumber_b, setPhonenumber_b] = useState("");
  const [insured_b, setInsured_b] = useState("");
  const [vehicule_identity_a, setVehicule_identity_a] = useState("");
  const [brand_a, setBrand_a] = useState("");
  const [brand_b, setBrand_b] = useState("");

  const [type, setType] = useState("");
  const [matriculation_a, setMatriculation_a] = useState("");
  const [matriculation_b, setMatriculation_b] = useState("");
  const [country_a, setCountry_a] = useState("");
  const [country_b, setCountry_b] = useState("");
  const [vehicule_identity_b, setVehicule_identity_b] = useState("");
  const [hits_a, setHits_a] = useState("");
  const [hits_b, setHits_b] = useState("");
  const [hit_direction, setHit_direction] = useState("");
  const [apparent_damages_a, setApparent_damages_a] = useState("");
  const [apparent_damages_b, setApparent_damages_b] = useState("");


  const [damage_direction_a, setDamage_direction_a] = useState("");
  const [damage_direction_b, setDamage_direction_b] = useState("");

  const [circumstances_a, setCircumstances_a] = useState("");
  const [circumstances_b, setCircumstances_b] = useState("");
  const [accident_croquis, setAccident_croquis] = useState("");
  const [notes_a, setNotes_a] = useState("");
  const [notes_b, setNotes_b] = useState("");
  const [signature_a, setSignature_a] = useState("");
  const [signature_b, setSignature_b] = useState("");
  const [addr_a, setAddr_a] = useState("");
  const [addr_b, setAddr_b] = useState("");
  const [coming_from_a, setComing_from_a] = useState("");
  const [coming_from_b, setComing_from_b] = useState("");
  const [going_to_a, setGoing_to_a] = useState("");
  const [going_to_b, setGoing_to_b] = useState("");
  const [possibleplaces_a, setPossiblePlace_a] = useState("");
  const [possibleplaces_b, setPossiblePlace_b] = useState("");


  const [showNotification, setShowNotification] = useState(false);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const [users, setUsers] = useState([]);
  const [contractNumber_a, setContractNumber_a] = useState([]);
  const [contractNumber_b, setContractNumber_b] = useState([]);

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
    const date = form.date.value;
    const location = form.location.value;
    const injured = form.injured.value;
    const material_damage = form.material_damage.value;
    const witness = "aaa";

    const vehicule_a = {
      assureBy: form.assureBy_a.value,
      contractNumber: form.contractNumber_a.value,
      agency: form.agency_a.value,
      contractValidity: {
        start_date: form.start_date_a.value,
        end_date: form.end_date_a.value,
      },
    };

    const vehicule_b = {
      assureBy: form.assureBy_b.value,
      contractNumber: form.contractNumber_b.value,
      agency: form.agency_b.value,
      contractValidity: {
        start_date: form.start_date_b.value,
        end_date: form.end_date_b.value,
      },
    };

    const drivers_identity_a = {
      first_name: form.first_name_a.value,
      last_name: form.last_name_a.value,
      address: form.address_a.value,
      drivers_license_issue_date: form.drivers_license_issue_date_a.value,
      driver_license: form.driver_license_a.value,
    };

    const drivers_identity_b = {
      first_name: form.first_name_b.value,
      last_name: form.last_name_b.value,
      address: form.address_b.value,
      drivers_license_issue_date: form.drivers_license_issue_date_b.value,
      driver_license: form.driver_license_b.value,
    };

    const insured_a = {
      firstname: form.firstname_a.value,
      lastname: form.lastname_a.value,
      phonenumber: form.phonenumber_a.value,
      addr: form.addr_a.value,
    };

    const insured_b = {
      firstname: form.firstname_b.value,
      lastname: form.lastname_b.value,
      phonenumber: form.phonenumber_b.value,
      addr: form.addr_b.value,
    };

    const vehicule_identity_a = {
      brand: form.brand_a.value,
      type: "",
      matriculation: form.matriculation_a.value,
      country: form.country_a.value,
      coming_from: form.coming_from_a.value,
      going_to: form.going_to_a.value,
    };
    const vehicule_identity_b = {

      brand: form.brand_b.value,
      type: "",
      matriculation: form.matriculation_b.value,
      country: form.country_b.value,
      coming_from: form.coming_from_b.value,
      going_to: form.going_to_b.value,
    }

    const hits_a = {

      possible_place_a: "",  
    }
    const hits_b = {

      possible_place_b: "",  
    }
    
    const apparent_damages_a = {
      damage_direction: form.damage_direction_a.value,
    };

    const apparent_damages_b = {
      damage_direction: form.damage_direction_b.value,
    };
    const circumstances_a = form.circumstances_a.value;
    const circumstances_b = form.circumstances_b.value;
    const accident_croquis = "";
    const notes_a = form.notes_a.value;
    const notes_b = form.notes_b.value;
    const signature_a = "";
    const signature_b = "";

    //console.log( notes_a)


const mystatement=  {
  date:date,
          location:location,
          injured:injured,
          material_damage:material_damage,
          witness:witness,
          drivers_identity_a: {
            first_name: drivers_identity_a.first_name,
            last_name: drivers_identity_a.last_name,
            address: drivers_identity_a.address,
            drivers_license_issue_date: drivers_identity_a.drivers_license_issue_date,
          },

          drivers_identity_b: {
            first_name: drivers_identity_b.first_name,
            last_name: drivers_identity_b.last_name,
            address: drivers_identity_b.address,
            drivers_license_issue_date: drivers_identity_b.drivers_license_issue_date,
          },
          insured_a: {
            firstname: insured_a.firstname,
            lastname: insured_a.lastname,
            phonenumber: insured_a.phonenumber,
            address: insured_a.address,
          },
          insured_b: {
            firstname: insured_b.firstname,
            lastname: insured_b.lastname,
            phonenumber: insured_b.phonenumber,
            address: insured_b.address,
          },
          vehicule_identity_a: {
            brand: vehicule_identity_a.brand,
            type: "Truck",
            matriculation: vehicule_identity_a.matriculation,
            country: vehicule_identity_a.country,
            coming_from: vehicule_identity_a.coming_from,
            going_to: vehicule_identity_a.going_to,
          },
          vehicule_identity_b: {
            brand: vehicule_identity_b.brand,
            type: "Truck",
            matriculation: vehicule_identity_b.matriculation,
            country: vehicule_identity_b.country,
            coming_from: vehicule_identity_b.coming_from,
            going_to: vehicule_identity_b.going_to,
          },
          hits_a: "Doors",
          hits_b: "Doors",
          
          apparent_damages_a:"Scratches",
          apparent_damages_b:"Scratches",
          circumstances_a:"Speeding",
          circumstances_b: "Speeding",
          accident_croquis:"Hello",
          notes_a:notes_a,
          notes_b: notes_b,
          signature_a:signature_a,
          signature_b:signature_b,
};
console.log( mystatement)


    
/*

    if (!date || !location || !injured || !material_damage || !witness || !vehicule_a.assureBy || !vehicule_a.agency_a
      || !vehicule_a.contractValidity || !vehicule_a.contractValidity.start_date || !vehicule_a.contractValidity.end_date
      || !vehicule_a.contractNumber || !vehicule_b.assureBy || !vehicule_b.agency_b || !vehicule_b.contractValidity
      || !vehicule_b.contractValidity.start_date || !vehicule_b.contractValidity.end_date || !vehicule_b
        .contractNumber || !drivers_identity_a.first_name || !drivers_identity_a.last_name || !drivers_identity_a.address
      || !drivers_identity_a.drivers_license_issue_date || !drivers_identity_a.driver_license || !drivers_identity_b.first_name
      || !drivers_identity_b.last_name || !drivers_identity_b.address || !drivers_identity_b.drivers_license_issue_date
      || !drivers_identity_b.driver_license || !insured_a.firstname || !insured_a.lastname || !insured_a.phonenumber
      || !insured_a.addr || !insured_b.firstname || !insured_b.lastname || !insured_b.phonenumber || !insured_b.addr
      || !vehicule_identity_a.brand || !vehicule_identity_a.type || !vehicule_identity_a.matriculation || !vehicule_identity_a.country
      || !vehicule_identity_a.coming_from || !vehicule_identity_a.going_to || !vehicule_identity_b.brand || !vehicule_identity_b.type
      || !vehicule_identity_b.matriculation || !vehicule_identity_b.country || !vehicule_identity_b.coming_from || !vehicule_identity_b.going_to
      || !hits_a.possible_place_a || !hits_b.possible_place_b   || !apparent_damages_a || !apparent_damages_a.damage_direction
      || !apparent_damages_b.damage_direction || !circumstances_a || !circumstances_b || !accident_croquis || !notes_a || !notes_b
      || !signature_a || !signature_b) {
      setShowNotification(false);
      setErrors({});
      setShowError(true);
      setErrors({
        ...errors,
        message: "Please fill all the fields",
      });
      return;
    }

*/
    try {
      const add = await axios.post(
        "http://127.0.0.1:5000/addstatement",
        {
          date:date,
          location:location,
          injured:injured,
          material_damage:material_damage,
          witness:witness,
          drivers_identity_a: {
            first_name: drivers_identity_a.first_name,
            last_name: drivers_identity_a.last_name,
            address: drivers_identity_a.address,
            drivers_license_issue_date: drivers_identity_a.drivers_license_issue_date,
          },

          drivers_identity_b: {
            first_name: drivers_identity_b.first_name,
            last_name: drivers_identity_b.last_name,
            address: drivers_identity_b.address,
            drivers_license_issue_date: drivers_identity_b.drivers_license_issue_date,
          },
          insured_a: {
            firstname: insured_a.firstname,
            lastname: insured_a.lastname,
            phonenumber: insured_a.phonenumber,
            address: insured_a.address,
          },
          insured_b: {
            firstname: insured_b.firstname,
            lastname: insured_b.lastname,
            phonenumber: insured_b.phonenumber,
            address: insured_b.address,
          },
          vehicule_identity_a: {
            brand: vehicule_identity_a.brand,
            type: "Truck",
            matriculation: vehicule_identity_a.matriculation,
            country: vehicule_identity_a.country,
            coming_from: vehicule_identity_a.coming_from,
            going_to: vehicule_identity_a.going_to,
          },
          vehicule_identity_b: {
            brand: vehicule_identity_b.brand,
            type: "Truck",
            matriculation: vehicule_identity_b.matriculation,
            country: vehicule_identity_b.country,
            coming_from: vehicule_identity_b.coming_from,
            going_to: vehicule_identity_b.going_to,
          },
          hits_a: "Doors",
          hits_b: "Doors",
          
          apparent_damages_a:"Scratches",
          apparent_damages_b:"Scratches",
          circumstances_a:"Speeding",
          circumstances_b: "Speeding",
          accident_croquis:"Hello",
          notes_a:notes_a,
          notes_b: notes_b,
          signature_a:signature_a,
          signature_b:signature_b,
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
        setUsers(response.data.users);
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



  const today = new Date().toISOString().substr(0, 10);


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
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
                  <form onSubmit={handleSubmit} noValidate>
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
                                value={date}
                                required
                                onChange={(e) => setDate(e.target.value)}
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
                                type="text"
                                name="location"
                                placeholder="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
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
                                value={injured}
                                onChange={(e) => setInjured(e.target.value)}
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
                                value={material_damage}
                                onChange={(e) => setMaterial_damage(e.target.value)}

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
                              <Input name="assureBy_a" type="select" required
                                value={assureBy_a}
                                onChange={(e) => setAssureBy_a(e.target.value)}>
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
                                id="contractNumber_a"
                                name="contractNumber_a"
                                type="text"
                                value={contractNumber_a}
                                onChange={(e) => setContractNumber_a(e.target.value)}
                                required
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
                                id="agency_a"
                                name="agency_a"
                                type="text"
                                value={agency_a}
                                onChange={(e) => setAgency_a(e.target.value)}
                                required
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
                                id="start_date_a"
                                name="start_date_a"
                                type="date"
                                value={start_date_a}
                                onChange={(e) => setStartDate_a(e.target.value)}
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
                                id="end_date_a"
                                name="end_date_a"
                                type="date"
                                value={end_date_a}
                                onChange={(e) => setEndDate_a(e.target.value)}
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
                                id="assureBy_b"
                                name="assureBy_b"
                                type="text"
                                value={assureBy_b}
                                onChange={(e) => setAssureBy_b(e.target.value)}
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
                                id="contractNumber_b"
                                name="contractNumber_b"
                                type="text"
                                value={contractNumber_b}
                                onChange={(e) => setContractNumber_b(e.target.value)}
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
                                id="agency_b"
                                name="agency_b"
                                type="text"
                                value={agency_b}
                                onChange={(e) => setAgency_b(e.target.value)}
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
                                id="start_date_b"
                                name="start_date_b"
                                type="date"
                                value={start_date_b}
                                onChange={(e) => setStartDate_b(e.target.value)}
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
                                id="end_date_b"
                                name="end_date_b"
                                type="date"
                                value={end_date_b}
                                onChange={(e) => setEndDate_b(e.target.value)}
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
                              <Label className="heading-small" for="first_name_a">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="first_name_a"
                                id="first_name_a"
                                maxLength="50"
                                value={first_name_a}
                                onChange={(e) => setFirst_name_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="last_name_a">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="last_name_a"
                                id="last_name_a"
                                maxLength="50"
                                value={last_name_a}
                                onChange={(e) => setLast_name_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="address_a">
                                Address
                              </Label>
                              <Input
                                type="text"
                                name="address_a"
                                id="address_a"
                                maxLength="100"
                                value={address_a}
                                onChange={(e) => setAddress_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="drivers_license_issue_date_a">
                                Driver's License Issue Date
                              </Label>
                              <Input
                                type="date"
                                name="drivers_license_issue_date_a"
                                id="drivers_license_issue_date_a"
                                value={drivers_license_issue_date_a}
                                onChange={(e) => setDrivers_license_issue_date_a(e.target.value)}
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label className="heading-small" for="driver_license_a">
                                Driver's License
                              </Label>
                              <Input
                                type="text"
                                name="driver_license_a"
                                id="driver_license_a"
                                maxLength="20"
                                pattern="^[a-zA-Z0-9]+$"
                                value={driver_license_a}
                                onChange={(e) => setDriver_license_a(e.target.value)}
                                required
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
                              <Label className="heading-small" for="first_name_b">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="first_name_b"
                                id="first_name_b"
                                maxLength="50"
                                value={first_name_b}
                                onChange={(e) => setFirst_name_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="last_name_b">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="last_name_b"
                                id="last_name_b"
                                maxLength="50"
                                value={last_name_b}
                                onChange={(e) => setLast_name_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="address_b">
                                Address
                              </Label>
                              <Input
                                type="text"
                                name="address_b"
                                id="address_b"
                                maxLength="100"
                                value={address_b}
                                onChange={(e) => setAddress_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="drivers_license_issue_date_b">
                                Driver's License Issue Date
                              </Label>
                              <Input
                                type="date"
                                name="drivers_license_issue_date_b"
                                id="drivers_license_issue_date_b"
                                value={drivers_license_issue_date_b}
                                onChange={(e) => setDrivers_license_issue_date_b(e.target.value)}
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label className="heading-small" for="drivers_identity_b">
                                Driver's License
                              </Label>
                              <Input
                                type="text"
                                name="driver_license_b"
                                id="driver_license_b"
                                maxLength="20"
                                pattern="^[a-zA-Z0-9]+$"
                                value={driver_license_b}
                                onChange={(e) => setDriver_license_b(e.target.value)}
                                required
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
                              <Label className="heading-small" for="firstname_a">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="firstname_a"
                                id="firstname_a"
                                maxLength="50"
                                value={firstname_a}
                                onChange={(e) => setFirstName_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="lastname_a">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="lastname_a"
                                id="lastname_a"
                                maxLength="50"
                                value={lastname_a}
                                onChange={(e) => setLastname_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="addr_a">
                                Address
                              </Label>
                              <Input
                                type="text"
                                name="addr_a"
                                id="addr_a"
                                maxLength="100"
                                value={addr_a}
                                onChange={(e) => setAddr_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-phonenumber"
                              >
                                Phone Number
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="phonenumber_a"
                                type="phonenumber_a"
                                value={phonenumber_a}
                                onChange={(e) => setPhonenumber_a(e.target.value)}
                                required
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
                              <Label className="heading-small" for="firstname_b">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="firstname_b"
                                id="firstname_b"
                                maxLength="50"
                                value={firstname_b}
                                onChange={(e) => setFirstName_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="lastname_b">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="lastname_b"
                                id="lastname_b"
                                maxLength="50"
                                value={lastname_b}
                                onChange={(e) => setLastname_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="addr_b">
                                Address
                              </Label>
                              <Input
                                type="text"
                                name="addr_b"
                                id="addr_b"
                                maxLength="100"
                                value={addr_b}
                                onChange={(e) => setAddr_b(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="heading-small "
                                htmlFor="input-phonenumber"
                              >
                                Phone Number
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="phonenumber_b"
                                type="phonenumber_b"
                                value={phonenumber_b}
                                onChange={(e) => setPhonenumber_b(e.target.value)}
                                required
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
                                name="brand_a"
                                id="brand_a"
                                value={brand_a}
                                onChange={(e) => setBrand_a(e.target.value)}
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
                                id="country_a"
                                value={country_a}
                                onChange={(e) => setCountry_a(e.target.value)}
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
                              <label>Matriculation </label>
                              <Input
                                type="text"
                                name="matriculation_a"
                                id="matriculation_a"
                                value={matriculation_a}
                                onChange={(e) => {
                                  setMatriculation_a(e.target.value);
                                }}
                                required
                              />

                              <div className="matriculation_a error"></div>
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
                                type="text"
                                name="coming_from_a"
                                id="coming_from_a"
                                value={coming_from_a}
                                onChange={(e) => {
                                  setComing_from_a(e.target.value);
                                }}
                                required
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
                                type="text"
                                name="goi"
                                id="going_to_a"
                                value={going_to_a}
                                onChange={(e) => {
                                  setGoing_to_a(e.target.value);
                                }}
                                required
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
                              <label>Brand</label>
                              <Input
                                type="select"
                                name="brand_b"
                                id="brand_b"
                                value={brand_b}
                                onChange={(e) => setBrand_b(e.target.value)}
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
                                id="country_b"
                                value={country_b}
                                onChange={(e) => setCountry_b(e.target.value)}
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
                              <label>Matriculation </label>
                              <Input
                                type="text"
                                name="matriculation_b"
                                id="matriculation_b"
                                value={matriculation_b}
                                onChange={(e) => {
                                  setMatriculation_b(e.target.value);
                                }}
                                required
                              />

                              <div className="matriculation_a error"></div>
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
                                type="text"
                                name="coming_from_b"
                                id="coming_from_b"
                                value={coming_from_b}
                                onChange={(e) => {
                                  setComing_from_b(e.target.value);
                                }}
                                required
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
                                type="text"
                                name="going_to_b"
                                id="going_to_b"
                                value={going_to_b}
                                onChange={(e) => {
                                  setGoing_to_b(e.target.value);
                                }}
                                required
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
                                name="possibleplaces_a"
                                type="select"
                                value={possibleplaces_a}
                                onChange={(e) => setPossiblePlace_a(e.target.value)}
                                required
                              >
                                <option value="Front Left Fender">Front Left Fender</option>
                                <option value="Front Right Fender">Front Right Fender</option>
                                <option value="Rear Left Fender">Rear Left Fender</option>
                                <option value="Rear Right Fender">Rear Right Fender</option>
                                <option value="Front Bumper">Front Bumper</option>
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
                                name="possibleplaces_b"
                                type="select"
                                value={possibleplaces_b}
                                onChange={(e) => setPossiblePlace_b(e.target.value)}
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
                                name="damage_direction_a"
                                type="select"
                                value={damage_direction_a}
                                onChange={(e) => setDamage_direction_a(e.target.value)}
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
                                name="damage_direction_b"
                                type="select"
                                value={damage_direction_b}
                                onChange={(e) => setDamage_direction_b(e.target.value)}
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
                                name="circumstances_a"
                                type="text"
                                value={circumstances_a}
                                onChange={(e) => setCircumstances_a(e.target.value)}
                                required
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
                                name="circumstances_b"
                                type="text"
                                value={circumstances_b}
                                onChange={(e) => setCircumstances_b(e.target.value)}
                                required
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
                                <InputGroup className="input-group-alternative" >
                                  
                                  <CanvasDraw
                                  name="accident_croquis"
                                    brushRadius={2}
                                    canvasWidth={12000}
                                    canvasHeight={400}
                                    hideGrid={true}
                                    brushColor={"#000000"}

                                  />

                                </InputGroup>
                                {/* <button onClick={(e) => handleClear(e, setAccident_croquis)}>Clear</button> */}
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
                                  type="text"
                                  name="notes_a"
                                  id="notes_a"
                                  value={notes_a}
                                  onChange={(e) => {
                                    setNotes_a(e.target.value);
                                  }}
                                  required
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
                                  type="text"
                                  name="notes_b"
                                  id="notes_b"
                                  value={notes_b}
                                  onChange={(e) => {
                                    setNotes_b(e.target.value);
                                  }}
                                  required
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
