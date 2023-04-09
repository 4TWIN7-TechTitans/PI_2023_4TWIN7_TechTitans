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
import SignatureCanvas from "react-signature-canvas";
import CanvasDraw from "react-canvas-draw";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// core components
import { useEffect, useState, useRef } from "react";
import axios from "axios";
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

  const [drivers_license_issue_date_a, setDrivers_license_issue_date_a] =
    useState("");
  const [drivers_license_issue_date_b, setDrivers_license_issue_date_b] =
    useState("");
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

  const [type_a, setType_a] = useState("");
  const [type_b, setType_b] = useState("");
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
  const canvasRef = useRef(null);
  const canvasRef_a = useRef(null);
  const canvasRef_b = useRef(null);
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
  const [case_state, setCase_state] = useState("waiting");

  const [hasAccount, setHasAccount] = useState(true);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  //statement by steps
  const [section, setSection] = useState(1);
  const brands = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Audi", "Isuzu", "BMW", "Golf", "Tesla", "Chevrolet", "Hyundai", "Infiniti", "Volkswagen", "Volvo", "Alfa Romeo", "Mitsubishi",];
  const countries = ["Tunisia", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia"]

  const possibleplaces = ["Front Left Fender", "Front Right Fender", "Rear Left Fender", "Rear Right Fender", "Front Bumper", "Rear Bumper", "Hood", "Trunk", "Roof", "Front Windshield", "Rear Windshield", "Side Mirrors", "Doors", "Other",];

  const hitdirections = ["Front", "Back", "Left", "Right"];
  const dmgeplaces = ["Scratches", "Dents", "Cracks", "Paint Damage", "Broken Lights", "Broken Windows", "Missing Parts", "Other",];
  const dmgdirections = ["Front", "Back", "Left", "Right"];
  const Circumstances = ["Driving in a normal and careful manner", "Driving under the influence of drugs or alcohol", "Speeding", "Ignoring traffic signals or signs", "Distracted driving", "Driving while fatigued", "Reckless driving", "Tailgating", "Changing lanes without signaling", "Making an illegal turn", "Backing up without looking", "Driving in the wrong lane", "Driving in a construction zone", "Driving during inclement weather", "Other",];
  const types = ["Car", "Truck", "MotoCycle"];

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }




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
      type: form.type_a.value,
      matriculation: form.matriculation_a.value,
      country: form.country_a.value,
      coming_from: form.coming_from_a.value,
      going_to: form.going_to_a.value,
    };
    const vehicule_identity_b = {
      brand: form.brand_b.value,
      type: form.type_b.value,
      matriculation: form.matriculation_b.value,
      country: form.country_b.value,
      coming_from: form.coming_from_b.value,
      going_to: form.going_to_b.value,
    };

    const hits_a = form.hits_a.value;
    const hits_b = form.hits_b.value;

    const apparent_damages_a = form.apparent_damages_a.value;

    const apparent_damages_b = form.apparent_damages_b.value;
    const circumstances_a = form.circumstances_a.value;
    const circumstances_b = form.circumstances_b.value;
    const accident_croquis = form.accident_croquis;
    const notes_a = form.notes_a.value;
    const notes_b = form.notes_b.value;
    const signature_a = form.signature_a;
    const signature_b = form.signature_b;
    const verified = true;

    //console.log( notes_a)
    //debut image
    // Get the canvas elements
    const canvas = canvasRef.current;
    const canvas_a = canvasRef_a.current;
    const canvas_b = canvasRef_b.current;

    // Convert the canvas elements to data URLs
    const image = canvas.canvasContainer.children[1].toDataURL("image/jpg", 1.0);
    const image_a = canvas_a.toDataURL("image/jpg");
    const image_b = canvas_b.toDataURL("image/jpg");

    // Upload accident_croquis
    const croquisFormData = new FormData();
    croquisFormData.append("file", image);
    croquisFormData.append("upload_preset", "cbqa7u7w");

    const croquisRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dczz1wjxm/image/upload",
      croquisFormData,
    );
    console.log(croquisRes.data.secure_url);

    // Upload signature_a
    const signatureAFormData = new FormData();
    signatureAFormData.append("file", image_a);
    signatureAFormData.append("upload_preset", "jfekkbgv");

    const signatureARes = await axios.post(
      "https://api.cloudinary.com/v1_1/dczz1wjxm/image/upload",
      signatureAFormData,
      
    );
    console.log(signatureARes.data.secure_url);

    // Upload signature_b
    const signatureBFormData = new FormData();
    signatureBFormData.append("file", image_b);
    signatureBFormData.append("upload_preset", "nkdc6ntg");

    const signatureBRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dczz1wjxm/image/upload",
      signatureBFormData,

    );
    console.log(signatureBRes.data.secure_url);
    //fin image

    const mystatement = {
      date: date,
      location: location,
      injured: injured,
      material_damage: material_damage,
      witness: witness,
      drivers_identity_a: {
        first_name: drivers_identity_a.first_name,
        last_name: drivers_identity_a.last_name,
        address: drivers_identity_a.address,
        drivers_license_issue_date: drivers_identity_a.drivers_license_issue_date,
        driver_license: drivers_identity_a.driver_license,
      },

      drivers_identity_b: {
        first_name: drivers_identity_b.first_name,
        last_name: drivers_identity_b.last_name,
        address: drivers_identity_b.address,
        drivers_license_issue_date: drivers_identity_b.drivers_license_issue_date,
        driver_license_b: drivers_identity_b.driver_license,
      },
      insured_a: {
        firstname: insured_a.firstname,
        lastname: insured_a.lastname,
        phonenumber: insured_a.phonenumber,
        addr: insured_a.addr,
      },
      insured_b: {
        firstname: insured_b.firstname,
        lastname: insured_b.lastname,
        phonenumber: insured_b.phonenumber,
        addr: insured_b.addr,
      },
      vehicule_identity_a: {
        brand: vehicule_identity_a.brand,
        type: vehicule_identity_a.type,
        matriculation: vehicule_identity_a.matriculation,
        country: vehicule_identity_a.country,
        coming_from: vehicule_identity_a.coming_from,
        going_to: vehicule_identity_a.going_to,
      },
      vehicule_identity_b: {
        brand: vehicule_identity_b.brand,
        type: vehicule_identity_b.type,
        matriculation: vehicule_identity_b.matriculation,
        country: vehicule_identity_b.country,
        coming_from: vehicule_identity_b.coming_from,
        going_to: vehicule_identity_b.going_to,
      },
      vehicule_a: {
        assureBy: assureBy_a,
        contractNumber: contractNumber_a,
        agency: agency_a,
        contractValidity: {
          start_date: start_date_a,
          end_date: end_date_a,
        },
      },

      vehicule_b: {
        assureBy: assureBy_b,
        contractNumber: contractNumber_b,
        agency: agency_b,
        contractValidity: {
          start_date: start_date_b,
          end_date: end_date_b,
        },
      },
      hits_a: hits_a,
      hits_b: hits_b,

      apparent_damages_a: apparent_damages_a,
      apparent_damages_b: apparent_damages_b,
      circumstances_a: circumstances_a,
      circumstances_b: circumstances_b,
      accident_croquis: croquisRes.data.secure_url,
      notes_a: notes_a,
      notes_b: notes_b,
      signature_a: signatureARes.data.secure_url,
      signature_b: signatureBRes.data.secure_url,
      case_state: "waiting",
    };
    console.log(mystatement);



    /* if (!date || !location || !injured || !material_damage 
  
        || !vehicule_a.assureBy || !vehicule_a.agency || !vehicule_a.contractValidity || !vehicule_a.contractValidity.start_date || !vehicule_a.contractValidity.end_date || !vehicule_a.contractNumber
  
        || !vehicule_b.assureBy || !vehicule_b.agency || !vehicule_b.contractValidity || !vehicule_b.contractValidity.start_date || !vehicule_b.contractValidity.end_date || !vehicule_b.contractNumber
  
        || !drivers_identity_a.first_name || !drivers_identity_a.last_name || !drivers_identity_a.address || !drivers_identity_a.drivers_license_issue_date || !drivers_identity_a.driver_license
  
        || !drivers_identity_b.first_name || !drivers_identity_b.last_name || !drivers_identity_b.address || !drivers_identity_b.drivers_license_issue_date || !drivers_identity_b.driver_license
  
        || !insured_a.firstname || !insured_a.lastname || !insured_a.phonenumber || !insured_a.addr
  
        || !insured_b.firstname || !insured_b.lastname || !insured_b.phonenumber || !insured_b.addr
  
        || !vehicule_identity_a.brand || !vehicule_identity_a.type || !vehicule_identity_a.matriculation || !vehicule_identity_a.country || !vehicule_identity_a.coming_from || !vehicule_identity_a.going_to
  
        || !vehicule_identity_b.brand || !vehicule_identity_b.type || !vehicule_identity_b.matriculation || !vehicule_identity_b.country || !vehicule_identity_b.coming_from || !vehicule_identity_b.going_to
  
        || !hits_a || !hits_b
  
        || !apparent_damages_a || !apparent_damages_b
  
        || !circumstances_a || !circumstances_b
  
        || !accident_croquis
  
        || !notes_a || !notes_b
  
      ) {
        setShowNotification(false);
        setErrors({});
        setShowError(true);
        setErrors({
          ...errors,
          message: "Please fill all the fields",
        });
        return;
      }*/

    //user haven't an account connected
    const user = users.find((user) => user.role === "Client");


    try {
      const add = await axios.post(
        "http://127.0.0.1:5000/addstatement",
        {
          date: date,
          location: location,
          injured: injured,
          material_damage: material_damage,
          witness: witness,
          drivers_identity_a: {
            first_name: drivers_identity_a.first_name,
            last_name: drivers_identity_a.last_name,
            address: drivers_identity_a.address,
            drivers_license_issue_date: drivers_identity_a.drivers_license_issue_date,
            driver_license: drivers_identity_a.driver_license,
          },

          drivers_identity_b: {
            first_name: drivers_identity_b.first_name,
            last_name: drivers_identity_b.last_name,
            address: drivers_identity_b.address,
            drivers_license_issue_date: drivers_identity_b.drivers_license_issue_date,
            driver_license_b: drivers_identity_b.driver_license,
          },
          insured_a: {
            firstname: insured_a.firstname,
            lastname: insured_a.lastname,
            phonenumber: insured_a.phonenumber,
            addr: insured_a.addr,
          },
          insured_b: {
            firstname: insured_b.firstname,
            lastname: insured_b.lastname,
            phonenumber: insured_b.phonenumber,
            addr: insured_b.addr,
          },
          vehicule_identity_a: {
            brand: vehicule_identity_a.brand,
            type: vehicule_identity_a.type,
            matriculation: vehicule_identity_a.matriculation,
            country: vehicule_identity_a.country,
            coming_from: vehicule_identity_a.coming_from,
            going_to: vehicule_identity_a.going_to,
          },
          vehicule_identity_b: {
            brand: vehicule_identity_b.brand,
            type: vehicule_identity_a.type,
            matriculation: vehicule_identity_b.matriculation,
            country: vehicule_identity_b.country,
            coming_from: vehicule_identity_b.coming_from,
            going_to: vehicule_identity_b.going_to,
          },
          vehicule_a: {
            assureBy: assureBy_a,
            contractNumber: contractNumber_a,
            agency: agency_a,
            contractValidity: {
              start_date: start_date_a,
              end_date: end_date_a,
            },
          },

          vehicule_b: {
            assureBy: assureBy_b,
            contractNumber: contractNumber_b,
            agency: agency_b,
            contractValidity: {
              start_date: start_date_b,
              end_date: end_date_b,
            },
          },
          hits_a: hits_a,
          hits_b: hits_b,

          apparent_damages_a: apparent_damages_a,
          apparent_damages_b: apparent_damages_b,
          circumstances_a: circumstances_a,
          circumstances_b: circumstances_a,
          accident_croquis: croquisRes.data.secure_url,
          notes_a: notes_a,
          notes_b: notes_b,
          signature_a: signatureARes.data.secure_url,
          signature_b: signatureBRes.data.secure_url,
          case_state: "waiting",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (add.status === 201) {
        setShowNotification(true);
        setErrors({});
        setShowError(false);

        toast.success("Statement created successfully");
      } else {
        setShowNotification(false);
        setErrors({ ...errors, message: "Statement adding failed" });
        setShowError(true);
        toast.error("Error creating statement");
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
        setUsers(response.data.users.filter((user) => user.role === "Agence"));
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);
  //hundle show for the whole card:
  const [isShown, setIsShown] = useState(true);

  const handleClick = (event) => {
    // 👇️ toggle shown state
    setIsShown((a) => !a);

    // 👇️ or simply set it to true

  };


  const today = new Date().toISOString().substr(0, 10);

  //hanle statement by steps :
  const handleNext = (e) => {
    e.preventDefault();
    setSection(section + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setSection(section - 1);
  };




  const handleUndo = () => {
    canvasRef.current.undo();
  };
  //validators and handle :


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
                    <Button color="info" onClick={handleClick}>
                      {!isShown ? "Show" : "Hide"}
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

                      {/* 1 + 2 + 3 + 4 + 5 */}
                      <div style={{ display: section === 1 ? "block" : "none" }}>
                        <Row>
                          {/* Section 1 + 2 + 3 + 4 + 5 */}
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 1 + 2 + 3 + 4 + 5
                            </h6>
                          </Col>
                        </Row>

                        <Row>
                          {/* SECTION 1 + 2 + 3 + 4 + 5 */}
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
                                <option value="">Select</option>
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
                                onChange={(e) =>
                                  setMaterial_damage(e.target.value)
                                }
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
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
                        </Row>
                        <Col align="center">
                          <FormGroup>
                            <Button
                              color="primary"
                              type="button"
                              onClick={handleNext}
                            >
                              Next
                            </Button>
                          </FormGroup>
                        </Col>
                      </div>
                      {/* FIN  1 + 2 + 3 + 4 + 5 */}

                      {/*  Section 6 */}
                      <div style={{ display: section === 2 ? "block" : "none" }}>
                        <Row>
                          {/* VEHICULE A VS B */}
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
                        <Row>
                          {/* SECTION 6 */}
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
                                name="assureBy_a"
                                type="select"
                                required
                                value={assureBy_a}
                                onChange={(e) => setAssureBy_a(e.target.value)}
                              >
                                <option value="">Select</option>
                                {users.map((user) => (
                                  <option key={user._id} value={user._id}>
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
                                onChange={(e) =>
                                  setContractNumber_a(e.target.value)
                                }
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
                                onChange={(e) =>
                                  setContractNumber_b(e.target.value)
                                }
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
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/*  FIN Section 6 */}

                      {/* Section 7 */}
                      <div style={{ display: section === 3 ? "block" : "none" }}>
                        <Row>
                          {/* VEHICULE A VS B */}
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
                        </Row>
                        <Row>
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 7
                            </h6>
                          </Col>
                        </Row>

                        <Row>
                          {/*  SECTION 7 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              7. Driver Identity
                            </label>
                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="first_name_a"
                              >
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="first_name_a"
                                id="first_name_a"
                                maxLength="50"
                                value={first_name_a}
                                onChange={(e) =>
                                  setFirst_name_a(e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="last_name_a"
                              >
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
                              <Label
                                className="heading-small"
                                for="drivers_license_issue_date_a"
                              >
                                Driver's License Issue Date
                              </Label>
                              <Input
                                type="date"
                                name="drivers_license_issue_date_a"
                                id="drivers_license_issue_date_a"
                                value={drivers_license_issue_date_a}
                                onChange={(e) =>
                                  setDrivers_license_issue_date_a(
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="driver_license_a"
                              >
                                Driver's License
                              </Label>
                              <Input
                                type="text"
                                name="driver_license_a"
                                id="driver_license_a"
                                maxLength="20"
                                pattern="^[a-zA-Z0-9]+$"
                                value={driver_license_a}
                                onChange={(e) =>
                                  setDriver_license_a(e.target.value)
                                }
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
                              <Label
                                className="heading-small"
                                for="first_name_b"
                              >
                                First Name
                              </Label>
                              <Input
                                type="text"
                                name="first_name_b"
                                id="first_name_b"
                                maxLength="50"
                                value={first_name_b}
                                onChange={(e) =>
                                  setFirst_name_b(e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="last_name_b"
                              >
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
                              <Label
                                className="heading-small"
                                for="drivers_license_issue_date_b"
                              >
                                Driver's License Issue Date
                              </Label>
                              <Input
                                type="date"
                                name="drivers_license_issue_date_b"
                                id="drivers_license_issue_date_b"
                                value={drivers_license_issue_date_b}
                                onChange={(e) =>
                                  setDrivers_license_issue_date_b(
                                    e.target.value
                                  )
                                }
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="drivers_identity_b"
                              >
                                Driver's License
                              </Label>
                              <Input
                                type="text"
                                name="driver_license_b"
                                id="driver_license_b"
                                maxLength="20"
                                pattern="^[a-zA-Z0-9]+$"
                                value={driver_license_b}
                                onChange={(e) =>
                                  setDriver_license_b(e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/*  FIN SECTION 7 */}

                      {/*  SECTION 8 */}
                      <div style={{ display: section === 4 ? "block" : "none" }}>
                        <Row>

                          {/* VEHICULE A VS B */}
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
                        </Row>
                        <Row>

                          {/* Section 8 */}
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 8
                            </h6>
                          </Col>
                        </Row>

                        <Row>

                          {/* SECTION 8 */}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              8. Insured
                            </label>
                            <FormGroup>
                              <Label
                                className="heading-small"
                                for="firstname_a"
                              >
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
                                onChange={(e) =>
                                  setPhonenumber_a(e.target.value)
                                }
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
                              <Label
                                className="heading-small"
                                for="firstname_b"
                              >
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
                                onChange={(e) =>
                                  setPhonenumber_b(e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/*  FIN SECTION 8 */}

                      {/*  SECTION 9 */}
                      <div style={{ display: section === 5 ? "block" : "none" }}>
                        <Row>

                          {/* VEHICULE A VS B */}
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
                        </Row>
                        <Row>
                          {/* Section 9 */}
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 9
                            </h6>
                          </Col>
                        </Row>
                        <Row>

                          {/*  SECTION 9 */}
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
                                  <option
                                    key={`${brand}-${index}`}
                                    value={brand}
                                  >
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
                                  <option
                                    key={`${country}-${index}`}
                                    value={country}
                                  >
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
                            <FormGroup>
                              <label>Type</label>
                              <Input
                                type="select"
                                name="type"
                                id="type_a"
                                value={type_a}
                                onChange={(e) => setType_a(e.target.value)}
                                required
                              >
                                <option value="">Select a vehicule type</option>
                                {types.map((type, index) => (
                                  <option
                                    key={`${type}-${index}`}
                                    value={type}
                                  >
                                    {type}
                                  </option>
                                ))}
                              </Input>
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
                                  <option
                                    key={`${brand}-${index}`}
                                    value={brand}
                                  >
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
                                  <option
                                    key={`${country}-${index}`}
                                    value={country}
                                  >
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
                            <FormGroup>
                              <label>Type</label>
                              <Input
                                type="select"
                                name="type"
                                id="type_b"
                                value={type_b}
                                onChange={(e) => setType_b(e.target.value)}
                                required
                              >
                                <option value="">Select a vehicule type</option>
                                {types.map((type, index) => (
                                  <option
                                    key={`${type}-${index}`}
                                    value={type}
                                  >
                                    {type}
                                  </option>
                                ))}
                              </Input>
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
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/*  FIN SECTION 9 */}

                      {/* Section 10 */}
                      <div style={{ display: section === 6 ? "block" : "none" }}>
                        <Row>
                          {/* VEHICULE A VS B */}
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
                        </Row>
                        <Row>
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 10
                            </h6>
                          </Col>
                        </Row>
                        <Row>
                          {/* SECTION 10 */}
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                10. Choc Points
                              </label>
                              <Input
                                name="hits_a"
                                type="select"
                                value={hits_a}
                                onChange={(e) => setHits_a(e.target.value)}
                                required
                              >
                                <option value="Other">Select</option>
                                <option value="Front Left Fender"> Front Left Fender</option>
                                <option value="Front Right Fender"> Front Right Fender</option>
                                <option value="Rear Left Fender">Rear Left Fender</option>
                                <option value="Rear Right Fender">Rear Right Fender</option>
                                <option value="Front Bumper"> Front Bumper</option>
                                <option value="Rear Bumper">Rear Bumper</option>
                                <option value="Hood">Hood</option>
                                <option value="Trunk">Trunk</option>
                                <option value="Roof">Roof</option>
                                <option value="Front Windshield">Front Windshield</option>
                                <option value="Rear Windshield">Rear Windshield</option>
                                <option value="Side Mirror Left">Side Mirror Left</option>
                                <option value="Side Mirror Right">Side Mirror Right</option>
                                <option value="Door Front Left">Door Front Left</option>
                                <option value="Door Front Right">Door Front Right</option>
                                <option value="Door Rear Left">Door Rear Left</option>
                                <option value="Door Rear Right">Door Rear Right</option>
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
                                name="hits_b"
                                type="select"
                                value={hits_b}
                                onChange={(e) => setHits_b(e.target.value)}
                                required
                              >                              <option value="Other">Select</option>
                                <option value="Front Left Fender"> Front Left Fender</option>
                                <option value="Front Right Fender"> Front Right Fender</option>
                                <option value="Rear Left Fender">Rear Left Fender</option>
                                <option value="Rear Right Fender">Rear Right Fender</option>
                                <option value="Front Bumper"> Front Bumper</option>
                                <option value="Rear Bumper">Rear Bumper</option>
                                <option value="Hood">Hood</option>
                                <option value="Trunk">Trunk</option>
                                <option value="Roof">Roof</option>
                                <option value="Front Windshield">Front Windshield</option>
                                <option value="Rear Windshield">Rear Windshield</option>
                                <option value="Side Mirror Left">Side Mirror Left</option>
                                <option value="Side Mirror Right">Side Mirror Right</option>
                                <option value="Door Front Left">Door Front Left</option>
                                <option value="Door Front Right">Door Front Right</option>
                                <option value="Door Rear Left">Door Rear Left</option>
                                <option value="Door Rear Right">Door Rear Right</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/* FIN SECTION 10 */}

                      {/* Section 11 */}
                      <div style={{ display: section === 7 ? "block" : "none" }}>

                        <Row>

                          {/* VEHICULE A VS B */}
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
                        </Row>
                        <Row>
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 11
                            </h6>
                          </Col>
                        </Row>
                        <Row>
                          {/* SECTION 11 */}
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                11. Apparent Damages
                              </label>
                              <Input
                                name="apparent_damages_a"
                                type="select"
                                value={apparent_damages_a}
                                onChange={(e) =>
                                  setApparent_damages_a(e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                <option value="Scratches">Scratches</option>
                                <option value="Dents">Dents</option>
                                <option value="Cracks">Cracks</option>
                                <option value="Paint Damage">
                                  Paint Damage
                                </option>
                                <option value="Broken Lights">
                                  Broken Lights
                                </option>
                                <option value="Broken Windows">
                                  Broken Windows
                                </option>
                                <option value="Missing Parts">
                                  Missing Parts
                                </option>
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
                                name="apparent_damages_b"
                                type="select"
                                value={apparent_damages_b}
                                onChange={(e) =>
                                  setApparent_damages_b(e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                <option value="Scratches">Scratches</option>
                                <option value="Dents">Dents</option>
                                <option value="Cracks">Cracks</option>
                                <option value="Paint Damage">
                                  Paint Damage
                                </option>
                                <option value="Broken Lights">
                                  Broken Lights
                                </option>
                                <option value="Broken Windows">
                                  Broken Windows
                                </option>
                                <option value="Missing Parts">
                                  Missing Parts
                                </option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        {/* FIN SECTION 11 */}



                        {/* SECTION 12 */}
                        <Row>
                          {/* Section 12 */}
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 12
                            </h6>
                          </Col>
                        </Row>
                        <Row>
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
                                type="select"
                                value={circumstances_a}
                                onChange={(e) =>
                                  setCircumstances_a(e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                <option value="Driving in a normal and careful manner">Driving in a normal and careful manner </option>
                                <option value="Driving under the influence of drugs or alcohol">Driving under the influence of drugs or alcohol</option>
                                <option value="Speeding">Speeding</option>
                                <option value="Ignoring traffic signals or signs">Ignoring traffic signals or signs</option>
                                <option value="Distracted driving">Distracted driving</option>
                                <option value="Driving while fatigued">Driving while fatigued</option>
                                <option value="Reckless driving">Reckless driving</option>
                                <option value="Tailgating">Tailgating</option>
                                <option value="Changing lanes without signaling"> Changing lanes without signaling</option>
                                <option value="Making an illegal turn"> Making an illegal turn</option>
                                <option value="Backing up without looking"> Backing up without looking </option>
                                <option value="Driving in the wrong lane">Driving in the wrong lane </option>
                                <option value="Driving in a construction zone">Driving in a construction zone</option>
                                <option value="Driving during inclement weather"> Driving during inclement weather</option>
                              </Input>
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
                                type="select"
                                value={circumstances_b}
                                onChange={(e) =>
                                  setCircumstances_b(e.target.value)
                                }
                                required
                              >
                                <option value="">Select</option>
                                <option value="Driving in a normal and careful manner">Driving in a normal and careful manner </option>
                                <option value="Driving under the influence of drugs or alcohol">Driving under the influence of drugs or alcohol</option>
                                <option value="Speeding">Speeding</option>
                                <option value="Ignoring traffic signals or signs">Ignoring traffic signals or signs</option>
                                <option value="Distracted driving">Distracted driving</option>
                                <option value="Driving while fatigued">Driving while fatigued</option>
                                <option value="Reckless driving">Reckless driving</option>
                                <option value="Tailgating">Tailgating</option>
                                <option value="Changing lanes without signaling"> Changing lanes without signaling</option>
                                <option value="Making an illegal turn"> Making an illegal turn</option>
                                <option value="Backing up without looking"> Backing up without looking </option>
                                <option value="Driving in the wrong lane">Driving in the wrong lane </option>
                                <option value="Driving in a construction zone">Driving in a construction zone</option>
                                <option value="Driving during inclement weather"> Driving during inclement weather</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>
                      </div>
                      {/* FIN SECTION 12 */}

                      {/* Section 13 + 14 + 14*/}
                      <div style={{ display: section === 8 ? "block" : "none" }}>
                        <Row>
                          <Col lg="6">
                            <h6 className="heading-small text-muted mb-4">
                              Section 13 + 14 + 15
                            </h6>
                          </Col>
                        </Row>

                        <Row>
                          {/* SECTION 13  IMAGE */}
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
                                  enctype="multipart/form-data"

                                  name="accident_croquis"

                                  brushRadius={2}
                                  canvasWidth={12000}
                                  canvasHeight={400}
                                  brushColor={"#000000"}
                                  ref={canvasRef}
                                  value={accident_croquis}
                                />

                                <Button className="btn btn-warning" onClick={handleUndo}>Undo</Button>
                              </InputGroup>
                              {/* <button onClick={(e) => handleClear(e, setAccident_croquis)}>Clear</button> */}
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* FIN SECTION 13  IMAGE */}
                        <Row>
                          {/* SECTION 14  Observation */}
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
                        </Row>
                        {/* FIN SECTION 14  Observation */}
                        <Row>
                          {/* SECTION 15  Observation */}
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
                                  penColor="black"
                                  name="signature_a"
                                  canvasProps={{
                                    width: 500,
                                    height: 200,
                                    className: "sigCanvas",
                                  }}
                                  ref={canvasRef_a}
                                  value={signature_a}
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
                                  penColor="black"
                                  name="signature_b"
                                  canvasProps={{
                                    width: 500,
                                    height: 200,
                                    className: "sigCanvas",
                                  }}
                                  ref={canvasRef_b}
                                  value={signature_b}
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* FIN SECTION 15  Observation */}

                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="secondary"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>
                            </FormGroup>
                          </Col>
                          <Col align="left">
                            <FormGroup>
                              <Button
                                color="primary"
                                type="button"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </FormGroup>
                          </Col>

                        </Row>

                      </div>

                      <Row>
                      </Row>
                      {/* partie suivant :
                      <div className="form-group">
                        <label>
                          <input
                            type="checkbox"
                            checked={!hasAccount}
                            onChange={() => setHasAccount(!hasAccount)}
                          />
                          {" "}
                          Create Account for Client
                        </label>
                      </div>
                      {!hasAccount && (
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />

                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                      )} */}
                      <div className="text-center">

                        <Button color="info" type="submit">
                          Submit
                        </Button>
                      </div>

                    </div>

                  </form>
                  {showNotification && (
                    <div className="alert alert-success mt-3" role="alert">
                      Statement created successfully
                    </div>
                  )}

                  {showError && (
                    <div className="col-12 my-3 alert alert-danger">
                      Invalid fields , Please Recheck !
                    </div>
                  )}
                </CardBody>
              )}

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddStatement;