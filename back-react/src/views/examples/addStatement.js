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
import AnimatedText from 'react-animated-text-content';
import SignatureCanvas from "react-signature-canvas";
import CanvasDraw from "react-canvas-draw";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import swal from 'sweetalert';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
import Geolocation from 'ol/Geolocation';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// core components
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const AddStatement = () => {


  const [date_demande, setDate_demande] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
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


  const [hits_a, setHits_a] = useState([]);
  const [hits_b, setHits_b] = useState([]);
  const [apparent_damages_a, setApparent_damages_a] = useState([]);
  const [apparent_damages_b, setApparent_damages_b] = useState([]);


  const [circumstances_a, setCircumstances_a] = useState([]);
  const [circumstances_b, setCircumstances_b] = useState([]);
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
  const [firstName_w_a, setFirstName_w_a] = useState("");
  const [firstName_w_b, setFirstName_w_b] = useState("");
  const [lastName_w_a, setLastName_w_a] = useState("");
  const [lastName_w_b, setLastName_w_b] = useState("");
  const [addressWitness_a, setAddressWitness_a] = useState("");
  const [addressWitness_b, setAddressWitness_b] = useState("");
  const [phoneWitness_a, setPhoneWitness_a] = useState("");
  const [phoneWitness_b, setPhoneWitness_b] = useState("");


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

  const hitOptions = ['Front Left Fender', 'Front Right Fender', 'Rear Left Fender', 'Rear Right Fender', 'Front Bumper', 'Rear Bumper', 'Hood', 'Trunk', 'Roof', 'Front Windshield', 'Rear Windshield', 'Side Mirror Left', 'Side Mirror Right', 'Door Front Left', 'Door Front Right', 'Door Rear Left', 'Door Rear Right',];
  const damageplaces = ["Scratches", "Dents", "Cracks", "Paint Damage", "Broken Lights", "Broken Windows", "Missing Parts", "Other",];

  const dmgdirections = ["Front", "Back", "Left", "Right"];
  const Circumstances = ["Driving in a normal and careful manner", "Driving under the influence of drugs or alcohol", "Speeding", "Ignoring traffic signals or signs", "Distracted driving", "Driving while fatigued", "Reckless driving", "Tailgating", "Changing lanes without signaling", "Making an illegal turn", "Backing up without looking", "Driving in the wrong lane", "Driving in a construction zone", "Driving during inclement weather", "Other",];
  const types = ["Car", "Truck", "MotoCycle"];

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }


  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    setNom(decodeURI(getCookie("lastname")));
    setPrenom(decodeURI(getCookie("firstname")));
    setRole(decodeURI(getCookie("role")));
    console.log(role);

  }, [nom, prenom, role]);

  const [phone_number, setPhone_number] = useState("");
  const fetchData = async () => {
    const jwt = getCookie("jwt");
    if (jwt == "") return;
    const response = (
      await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
    );
    const idusertemp = response.data._id;
    setIdUser(idusertemp)
    const phonetemp = response.data.phone_number
    setPhone_number(phonetemp);
    setPhonenumber_a(phonetemp);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {

    e.preventDefault();
    const form = e.target;
    const isValidDate = validateDate(date);
    if (!isValidDate) {
      swal({
        title: 'warning',
        text: "The date of the accident must not be greater than 5 days from today's date. recheck Step 1 !",
        icon: 'error',
        button: 'OK',
      });
      return;
    }
    const location = form.location.value;
    if (!location) {
      swal({
        icon: "warning",
        title: "Validation Error",
        text: "Please select an option for Location in Step 1",
        button: 'Ok',
      });
      return;
    }
    const injured = form.injured.value;
    if (!injured) {
      swal({
        icon: "warning",
        title: "Validation Error",
        text: "Please select an option for Injured in Step 1",
        button: 'Ok',
      });
      return;
    }
    const material_damage = form.material_damage.value;
    if (!material_damage) {
      swal({
        icon: "warning",
        title: "Validation Error",
        text: "Please select an option for Material Damage in Step 1",
        button: 'Ok',
      });
      return;
    }
    const witness_a = form.witnesses_a;
    const witness_b = form.witnesses_b;

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


    if (hits_a.length === 0) {
      toast.error('Please select at least one option');
      return;
    }
    if (hits_b.length === 0) {
      toast.error('Please select at least one option');
      return;
    }
    if (apparent_damages_a.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    if (apparent_damages_b.length === 0) {
      toast.error('Please select at least one option');
      return;
    }
    if (circumstances_a.length === 0) {
      toast.error('Please select at least one option');
      return;
    }
    if (circumstances_b.length === 0) {
      toast.error('Please select at least one option');
      return;
    }

    const accident_croquis = form.accident_croquis;
    const notes_a = form.notes_a.value;
    if (!notes_a) {
      swal({
        icon: "warning",
        title: "Validation Error",
        text: "Please select an option for Observations of Client A in Step 8",
        button: 'Ok',
      });
      return;
    }
    const notes_b = form.notes_b.value;
    if (!notes_b) {
      swal({
        icon: "warning",
        title: "Validation Error",
        text: "Please select an option for Observations of Client B in Step 8",
        button: 'Ok',
      });
      return;
    }
    const signature_a = form.signature_a;
    const signature_b = form.signature_b;
    const verified = true;
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

      witness_a: [
        {
          witnesses_a
        },
      ],


      witness_b: [
        {
          witnesses_b
        },]

    };
    console.log(mystatement);



    if (!vehicule_a.assureBy || !vehicule_a.agency || !vehicule_a.contractValidity || !vehicule_a.contractValidity.start_date || !vehicule_a.contractValidity.end_date || !vehicule_a.contractNumber

      || !vehicule_b.assureBy || !vehicule_b.agency || !vehicule_b.contractValidity || !vehicule_b.contractValidity.start_date || !vehicule_b.contractValidity.end_date || !vehicule_b.contractNumber

    ) {
      toast.error("fill in all the fields in step 2");
    }
    if (!drivers_identity_a.first_name || !drivers_identity_a.last_name || !drivers_identity_a.address || !drivers_identity_a.drivers_license_issue_date || !drivers_identity_a.driver_license

      || !drivers_identity_b.first_name || !drivers_identity_b.last_name || !drivers_identity_b.address || !drivers_identity_b.drivers_license_issue_date || !drivers_identity_b.driver_license


    ) {
      toast.error("fill in all the fields in step 3");
    }
    if (!insured_a.firstname || !insured_a.lastname || !insured_a.phonenumber || !insured_a.addr

      || !insured_b.firstname || !insured_b.lastname || !insured_b.phonenumber || !insured_b.addr) {
      toast.error("fill in all the fields in step 4");
    }

    if (!vehicule_identity_a.brand || !vehicule_identity_a.type || !vehicule_identity_a.matriculation || !vehicule_identity_a.country || !vehicule_identity_a.coming_from || !vehicule_identity_a.going_to

      || !vehicule_identity_b.brand || !vehicule_identity_b.type || !vehicule_identity_b.matriculation || !vehicule_identity_b.country || !vehicule_identity_b.coming_from || !vehicule_identity_b.going_to) {
      toast.error("fill in all the fields in step 5");
    }

    //user haven't an account connected
    const user = users.find((user) => user.role === "Client");


    try {
      const add = await axios.post(
        "http://localhost:5000/addstatement",
        {
          date: date,
          location: location,
          injured: injured,
          material_damage: material_damage,
          witness_a: witnesses_a,
          witness_b: witnesses_b,
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

      const assign = await axios.post("http://localhost:5000/updateagence",
        {
          _id: idUser,
          id_agence: agency_a
        }
      )

      if (add.status === 201) {
        setShowNotification(true);
        setErrors({});
        setShowError(false);
        // add user affect here

        var date_dem = new Date();
        setDate_demande(date_dem);
        const postData = {
          titre: "A New statement is added",
          id_user: agency_a,
          date_notif: date_demande,
          descrip: ""


        };

        axios.post('http://localhost:5000/notif/', postData)
          .then(response => {
            console.log("ticket add notif added")
          })
          .catch(error => {
            console.log(error);
          });



        toast.success("Statement created successfully");
        setTimeout(() => {
          window.location.href = "/mystatement";

        }, 7000);
      }
    } catch (error) {

      setShowNotification(false);
      setErrors({ ...errors, message: "Statement adding failed" });
      setShowError(true);
      toast.error("Error creating statement");

      console.log(error);
    }


  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all-users");
        setUsers(response.data.users);
        setUsers(response.data.users.filter(
          (user) =>
            user.role === "Agence"
        )

        );
        console.log(response);
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
      canvasRef.current.clear(); // Clear the canvas
    e.preventDefault();
    setSection(section - 1);
  };
  const handleFirst = (e) => {
    e.preventDefault();
    setSection(1);
  };

  const handleLast = (e) => {
    e.preventDefault();
    // Set the last section number here
    setSection(9);
  };
  // Handle step All change
  const handleStepChange = (step) => {
    canvasRef.current.clear(); // Clear the canvas

    setSection(step);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return <div>Step 1 :</div>;
      case 2:
        return <div>Step 2 :</div>;
      case 3:
        return <div>Step 3 :</div>;
      case 4:
        return <div>Step 4 :</div>;
      case 5:
        return <div>Step 5 :</div>;
      case 6:
        return <div>Step 6 :</div>;
      case 7:
        return <div>Step 7 :</div>;
      case 8:
        return <div>Step 8 :</div>;
      case 9:
        return <div>Step 9 :</div>;
      default:
        return null;
    }
  };

  const handleUndo = () => {
    canvasRef.current.undo();
  };
  // //validators and handle :
  // useEffect(() => {
  //   // Charger la carte Google Maps
  //   const loadMap = () => {

  //     if (window.google) {
  //       const mapOptions = {
  //         center: { lat: 0, lng: 0 },
  //         zoom: 14,
  //         streetViewControl: true,
  //         disableDefaultUI: true
  //       };

  //       const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

  //       const marker = new window.google.maps.Marker({
  //         position: mapOptions.center,
  //         map: map,
  //         draggable: true
  //       });

  //       window.google.maps.event.addListener(marker, 'dragend', (event) => {
  //         const lat = event.latLng.lat();
  //         const lng = event.latLng.lng();

  //         setLocation(`${lat}, ${lng}`);
  //       });

  //       // document.getElementById('currentLocationBtn').addEventListener('click', () => {
  //       //   if (navigator.geolocation) {
  //       //     navigator.geolocation.getCurrentPosition(
  //       //       (position) => {
  //       //         const lat = position.coords.latitude;
  //       //         const lng = position.coords.longitude;

  //       //         setLocation(`${lat}, ${lng}`);

  //       //         map.setCenter({ lat, lng });

  //       //         marker.setPosition({ lat, lng });
  //       //       },
  //       //       (error) => {
  //       //         console.error(error);
  //       //       }
  //       //     );
  //       //   } else {
  //       //     console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
  //       //   }
  //       // });
  //     }
  //   };

  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAkqb5vUGDj06rTFIkdontCQQtzZAD7IW4&libraries=places`;
  //   script.onload = loadMap;
  //   document.body.appendChild(script);

  //   return () => {

  //     document.body.removeChild(script);
  //   };
  // }, []);


  //ctrl de saisie date de l'accident :
  function validateDate(date) {
    const today = new Date();
    const accidentDate = new Date(date);
    const timeDiff = Math.abs(today.getTime() - accidentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays <= 5;
  }


  //checkbox chock points a:
  const handleChocpoints_a = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setHits_a((prevSelected) => [...prevSelected, value]);
    } else {
      setHits_a((prevSelected) =>
        prevSelected.filter((v) => v !== value)
      );
    }
  };

  //checkbox chock points a:
  const handleChocpoints_b = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setHits_b((prevSelected) => [...prevSelected, value]);
    } else {
      setHits_b((prevSelected) =>
        prevSelected.filter((v) => v !== value)
      );
    }
  };
  //checkbox apparent damages a
  const handleApparentdamages_a = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setApparent_damages_a((prevSelected) => [...prevSelected, value]);
    } else {
      setApparent_damages_a((prevSelected) =>
        prevSelected.filter((v) => v !== value)
      );
    }
  };

  //checkbox apparent damages a
  const handleApparentdamages_b = (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;
    if (isChecked) {
      setApparent_damages_b((prevSelected) => [...prevSelected, value]);
    } else {
      setApparent_damages_b((prevSelected) =>
        prevSelected.filter((v) => v !== value)
      );
    }
  };

  //checkbox circumstances a
  const handleCircumstances_a = (e) => {
    const { value } = e.target;
    if (circumstances_a.includes(value)) {
      setCircumstances_a(circumstances_a.filter((v) => v !== value));
    } else {
      setCircumstances_a([...circumstances_a, value]);
    }
  };
  //checkbox circumstances a
  const handleCircumstances_b = (e) => {
    const { value } = e.target;
    if (apparent_damages_b.includes(value)) {
      setCircumstances_b(circumstances_b.filter((v) => v !== value));
    } else {
      setCircumstances_b([...circumstances_b, value]);
    }
  };

  //alan.ai 
  // useEffect(() => {
  //   alanBtn({
  //     key: '63919c26fc0982151fe31a18728a75212e956eca572e1d8b807a3e2338fdd0dc/stage',
  //     onCommand: (commandData) => {
  //       if (commandData.command === 'go:openForm') {
  //         //props.history.push("addStatement ");
  //       }
  //       if (commandData.command === 'getDate') {
  //         setDate(commandData.value);
  //       }
  //       if (commandData.command === 'getLocation') {
  //         setLocation(commandData.value);
  //       }
  //       if (commandData.command === 'getInjured') {
  //         setInjured(commandData.value);
  //       }
  //       if (commandData.command === 'getMaterial_damage') {
  //         setMaterial_damage(commandData.value);
  //       }
  //     }
  //   });
  // }, []);
  //geolocalisation :
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Add a vector layer for displaying the current location
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    // Get current location and update the map
    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;
      const coords = fromLonLat([longitude, latitude]);
      map.getView().setCenter(coords);
      map.getView().setZoom(10);

      // Create a marker at the current location
      const marker = new Feature({
        geometry: new Point(coords),
        draggable: true
      });

      // Style the marker
      const iconStyle = new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          scale: 0.1,
        }),
      });
      marker.setStyle(iconStyle);

      vectorSource.clear();
      vectorSource.addFeature(marker);
      vectorSource.clear();

      // Update the location input field with the current coordinates
      setLocation(`${latitude}, ${longitude}`);
    };

    const handleLocationError = (error) => {
      console.error('Error getting current location:', error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    // Add an event listener for map click event
    const handleMapClick = (event) => {
      // Get clicked coordinates
      const clickedCoords = event.coordinate;

      // Convert clicked coordinates to lon/lat
      const [longitude, latitude] = toLonLat(clickedCoords);

      // Update the location input field with clicked coordinates
      setLocation(`${latitude}, ${longitude}`);
    };

    // Add the click event listener to the map
    map.on('click', handleMapClick);

    return () => {
      // Remove the click event listener when component is unmounted
      map.un('click', handleMapClick);
      map.dispose();
    };
  }, []);


  //witnesses


  const [numWitnesses_a, setNumWitnesses_a] = useState(0);
  const [numWitnesses_b, setNumWitnesses_b] = useState(0);
  const [witnesses_a, setWitnesses_a] = useState([]);
  const [witnesses_b, setWitnesses_b] = useState([]);

  const handleNumWitnessesChange_a = (e) => {
    const num = parseInt(e.target.value);
    setNumWitnesses_a(num);
    setWitnesses_a(Array.from({ length: num }, () => ({})));
  };

  const handleNumWitnessesChange_b = (e) => {
    const num = parseInt(e.target.value);
    setNumWitnesses_b(num);
    setWitnesses_b(Array.from({ length: num }, () => ({})));
  };

  const handleWitnessChange_a = (index, field, value) => {
    const updatedWitnesses_a = [...witnesses_a];
    updatedWitnesses_a[index][field] = value ? value : {}; // Set value to empty object if it is empty
    setWitnesses_a(updatedWitnesses_a);
  };

  const handleWitnessChange_b = (index, field, value) => {
    const updatedWitnesses_b = [...witnesses_b];
    updatedWitnesses_b[index][field] = value ? value : {}; // Set value to empty object if it is empty
    setWitnesses_b(updatedWitnesses_b);
  };




  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <>

      <ToastContainer />
      {/*<UserHeader /> */}
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* <div className="alan-btn-container">
          <div ref={alanBtn}></div>
        </div> */}

        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col>
                    <div>
                      <span>Microphone: {listening ? 'on' : 'off'}</span><br></br>

                      <Button onClick={SpeechRecognition.startListening}>Start</Button>
                      <Button onClick={SpeechRecognition.stopListening}>Stop</Button>
                      <Button onClick={resetTranscript}>Reset</Button><br></br>
                      <span>{transcript}</span>

                    </div>
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Fill In Your Statement</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="dark" onClick={handleClick}>
                      {!isShown ? "Show" : "Hide"}
                    </Button>
                  </Col>
                </Row>

              </CardHeader>

              {isShown && (
                <CardBody>

                  <form onSubmit={handleSubmit} className="openForm" noValidate>
                    <h2 className=" mb-2">
                      set all the infromations related to the accident please
                    </h2>
                    <Row className="align-items-center">
                      <Col lg="12" className="align-items-center">

                        <FormGroup className="btn-toolbar btn-group">


                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(1)}
                            className={section === 1 ? "active" : ""}

                          >
                            STEP 1
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(2)}
                            className={section === 2 ? "active" : ""}

                          >
                            STEP 1.2
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(3)}
                            className={section === 3 ? "active" : ""}

                          >
                            STEP 2
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(4)}
                            className={section === 4 ? "active" : ""}

                          >
                            STEP 3
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(5)}
                            className={section === 5 ? "active" : ""}

                          >
                            STEP 4
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(6)}
                            className={section === 6 ? "active" : ""}

                          >
                            STEP 5
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(7)}
                            className={section === 7 ? "active" : ""}

                          >
                            STEP 6
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(8)}
                            className={section === 8 ? "active" : ""}

                          >
                            STEP 7
                          </Button>{" "}
                          <Button
                            color="light"
                            type="button"
                            onClick={() => handleStepChange(9)}
                            className={section === 9 ? "active" : ""}

                          >
                            STEP 8
                          </Button>{" "}

                        </FormGroup>

                      </Col>
                    </Row>


                    <div className="pl-lg-4">

                      {/* 1 + 2 + 3 + 4 + 5 */}
                      <div style={{ display: section === 1 ? "block" : "none" }}>


                        <Row>
                          {/* SECTION 1 + 2 + 3 + 4 + 5 */}
                          <Col lg="6">
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

                            </FormGroup>

                          </Col>
                          <Col lg="6">

                            <label htmlFor="location">2.Location:</label>
                            <Input
                              id="location"
                              type="text"
                              name="location"
                              placeholder="Location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              required
                            />

                          </Col>
                          <div id="map" className="map-container" ref={mapRef} style={{ height: '500px', width: '100%', marginBottom: '10px' }}></div>
                          <Col lg="6">
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
                          <Col lg="6">
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
                      <div style={{ display: section === 2 ? "block" : "none" }}>
                        <Row>

                        </Row>
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <Label className="form-control-label" htmlFor="input-email">
                                5. Witnesses of Client A to add if exists
                              </Label>
                              <Input
                                type="number"
                                name="numWitnesses_a"
                                id="numWitnesses_a"
                                value={numWitnesses_a}
                                onChange={handleNumWitnessesChange_a}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <Label className="form-control-label" htmlFor="input-email">
                                5. Witnesses of Client B to add if exists
                              </Label>
                              <Input
                                type="number"
                                name="numWitnesses_b"
                                id="numWitnesses_b"
                                value={numWitnesses_b}
                                onChange={handleNumWitnessesChange_b}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            {witnesses_a.map((witness, index) => (
                              <div key={index}>
                                <Col lg="6">
                                  <h6 className="heading-small  mb-4">
                                    Wintess of Insured A
                                  </h6>
                                </Col>

                                <FormGroup>
                                  <Label htmlFor={`firstName_w_a`}>
                                    First Name of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`firstName_w_a`}
                                    name="firstName_w_a"
                                    value={witnesses_a[index]?.firstName_w || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_a(index, "firstName_w", e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`lastName_w_a`}>
                                    Last Name of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`lastName_w_a`}
                                    name="lastName_w_a"
                                    value={witnesses_a[index]?.lastName_w || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_a(index, "lastName_w", e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`addressWitness_a`}>
                                    Address of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`addressWitness_a`}
                                    name="addressWitness_a"
                                    value={witnesses_a[index]?.addressWitness || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_a(index, 'addressWitness', e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`phoneWitness_a`}>
                                    Phone Number of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`phoneWitness_a`}
                                    name="phoneWitness_a"
                                    value={witnesses_a[index]?.phoneWitness || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_a(index, 'phoneWitness', e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </div>
                            ))}
                          </Col>


                          <Col lg="6">
                            {witnesses_b.map((witness, index) => (
                              <div key={index}>
                                <Col lg="6">
                                  <h6 className="heading-small text-muted mb-4">
                                    Wintess of Insured b
                                  </h6>
                                </Col>
                                <FormGroup>
                                  <Label htmlFor={`firstName_w_b`}>
                                    First Name of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`firstName_w_b`}
                                    name="firstName_w_b"
                                    value={witnesses_b[index]?.firstName_w || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_b(index, "firstName_w", e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`lastName_w_b`}>
                                    Last Name of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`lastName_w_b`}
                                    name="lastName_w_b"
                                    value={witnesses_b[index]?.lastName_w || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_b(index, "lastName_w", e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`addressWitness_b`}>
                                    Address of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`addressWitness_b`}
                                    name="addressWitness_b"
                                    value={witnesses_b[index]?.addressWitness || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_b(index, 'addressWitness', e.target.value)
                                    }
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor={`phoneWitness_b`}>
                                    Phone Number of Witness {index + 1}
                                  </Label>
                                  <Input
                                    type="text"
                                    id={`phoneWitness_b`}
                                    name="phoneWitness_b"
                                    value={witnesses_b[index]?.phoneWitness || ''}
                                    onChange={(e) =>
                                      handleWitnessChange_b(index, 'phoneWitness', e.target.value)
                                    }
                                  />
                                </FormGroup>
                              </div>
                            ))}

                          </Col>
                        </Row>

                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="info"
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

                      {/*  Section 6 */}
                      < div style={{ display: section === 3 ? "block" : "none" }}>


                        <Row>
                          {/* SECTION 6 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
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
                                Contract Numbre:
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
                                type="select"
                                value={agency_a}
                                onChange={(e) => setAgency_a(e.target.value)}
                                required
                              >
                                <option value="">Select</option>
                                {users.map((user) => (
                                  <option key={user._id} value={user._id}>
                                    {user.last_name}
                                  </option>
                                ))}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <label className="heading-small " htmlFor="input-email">
                                Start date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="start_date_a"
                                name="start_date_a"
                                type="date"
                                value={start_date_a}
                                onChange={(e) => setStartDate_a(e.target.value)}
                                onBlur={() => {
                                  if (new Date(start_date_a) > new Date(end_date_a)) {
                                    toast.error('Start date should be less than End date');
                                    setStartDate_a('');
                                  }
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <label className="heading-small " htmlFor="input-email">
                                End date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="end_date_a"
                                name="end_date_a"
                                type="date"
                                value={end_date_a}
                                onChange={(e) => setEndDate_a(e.target.value)}
                                onBlur={() => {
                                  if (new Date(start_date_a) > new Date(end_date_a)) {
                                    toast.error('End date should be greater than Start date');
                                    setEndDate_a('');
                                  }
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
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
                                Contract Numbre:
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
                              <label className="heading-small " htmlFor="input-email">
                                Start date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="start_date_b"
                                name="start_date_b"
                                type="date"
                                value={start_date_b}
                                onChange={(e) => setStartDate_b(e.target.value)}
                                onBlur={() => {
                                  if (new Date(start_date_b) > new Date(end_date_b)) {
                                    toast.error('Start date should be less than End date');
                                    setStartDate_b('');
                                  }
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <label className="heading-small " htmlFor="input-email">
                                End date of contract:
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="end_date_b"
                                name="end_date_b"
                                type="date"
                                value={end_date_b}
                                onChange={(e) => setEndDate_b(e.target.value)}
                                onBlur={() => {
                                  if (new Date(start_date_a) > new Date(end_date_a)) {
                                    toast.error('End date should be greater than Start date');
                                    setEndDate_b('');
                                  }
                                }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="info"
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
                      <div style={{ display: section === 4 ? "block" : "none" }}>


                        <Row>
                          {/*  SECTION 7 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
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
                              <Label className="heading-small" for="drivers_license_issue_date_a">
                                Driver's License Issue Date
                              </Label>
                              <Input
                                type="date"
                                name="drivers_license_issue_date_a"
                                id="drivers_license_issue_date_a"
                                value={drivers_license_issue_date_a}
                                onChange={(e) => {
                                  const selectedDate = new Date(e.target.value);
                                  const today = new Date();
                                  if (selectedDate > today) {
                                    toast.error("Please select a date less than today's date.");
                                    return;
                                  }
                                  setDrivers_license_issue_date_a(e.target.value);
                                }}
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
                                pattern="[0-9]{8}"
                                value={driver_license_a}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (!/^[0-9]{0,8}$/.test(inputValue)) {
                                    toast.error("Please enter a valid Driver's License with 8 digits");
                                    return;
                                  }
                                  setDriver_license_a(inputValue);
                                }}
                                onBlur={() => {
                                  if (!driver_license_a) {
                                    toast.warn("Please enter your Driver's License");
                                  }
                                }}
                                required
                              />
                            </FormGroup>



                          </Col>
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
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
                                onChange={(e) => {
                                  const selectedDate = new Date(e.target.value);
                                  const today = new Date();
                                  if (selectedDate > today) {
                                    toast.error("Please select a date less than today's date.");
                                    return;
                                  }
                                  setDrivers_license_issue_date_b(e.target.value);
                                }}
                                required
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label className="heading-small" for="driver_license_b">
                                Driver's License
                              </Label>
                              <Input
                                type="text"
                                name="driver_license_b"
                                id="driver_license_b"
                                pattern="[0-9]{8}"
                                value={driver_license_b}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  if (!/^[0-9]{0,8}$/.test(inputValue)) {
                                    toast.error("Please enter a valid Driver's License with 8 digits");
                                    return;
                                  }
                                  setDriver_license_b(inputValue);
                                }}
                                onBlur={() => {
                                  if (!driver_license_b) {
                                    toast.warn("Please enter the Driver's License");
                                  }
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
                                color="info"
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
                      <div style={{ display: section === 5 ? "block" : "none" }}>


                        <Row>

                          {/* SECTION 8 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
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
                                value={prenom}
                                onChange={(e) => setFirstName_a(e.target.value)}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label className="heading-small" for="lastname_a">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                name="lastname_a"
                                id="lastname_a"
                                maxLength="50"
                                value={nom}
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
                                value={phone_number}
                                onChange={(e) =>
                                  setPhonenumber_a(e.target.value)
                                }
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
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
                                Last Name
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
                                color="info"
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
                      <div style={{ display: section === 6 ? "block" : "none" }}>


                        <Row>

                          {/*  SECTION 9 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              9. Vehicule Identity
                            </label>
                            <FormGroup>
                              <label>Brand, Model</label>
                              <Input
                                type="text"
                                name="brand_a"
                                id="brand_a"
                                value={brand_a}
                                onChange={(e) => setBrand_a(e.target.value)}
                                required
                              />
                              {/* <option value="">Select a brand</option>
                                {brands.map((brand, index) => (
                                  <option
                                    key={`${brand}-${index}`}
                                    value={brand}
                                  >
                                    {brand}
                                  </option>
                                ))}
                              </Input> */}
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
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              9. Vehicule Identity
                            </label>
                            <FormGroup>
                              <label>Brand, Model</label>
                              <Input
                                type="text"
                                name="brand_b"
                                id="brand_b"
                                value={brand_b}
                                onChange={(e) => setBrand_b(e.target.value)}
                                required
                              />
                              {/* <option value="">Select a brand</option>
                                {brands.map((brand, index) => (
                                  <option
                                    key={`${brand}-${index}`}
                                    value={brand}
                                  >
                                    {brand}
                                  </option>
                                ))}
                              </Input> */}
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
                                color="info"
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
                      <div style={{ display: section === 7 ? "block" : "none" }}>


                        <Row>
                          {/* SECTION 10 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
                            <FormGroup>
                              <label className="form-control-label" htmlFor="input-country">
                                10. Choc Points
                              </label>
                              {hitOptions.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="hits_a"
                                      type="checkbox"
                                      value={option}
                                      checked={hits_a.includes(option)}
                                      onChange={handleChocpoints_a}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
                            <FormGroup>
                              <label className="form-control-label" htmlFor="input-country">
                                10. Choc Points
                              </label>
                              {hitOptions.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="hits_b"
                                      type="checkbox"
                                      value={option}
                                      checked={hits_b.includes(option)}
                                      onChange={handleChocpoints_b}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="info"
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
                      <div style={{ display: section === 8 ? "block" : "none" }}>

                        <Row>
                          {/* SECTION 11 */}
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE A
                                </h6>
                              </Col>
                            </Row>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                11. Apparent Damages
                              </label>
                              {damageplaces.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="apparent_damages_a"
                                      type="checkbox"
                                      value={option}
                                      checked={apparent_damages_a.includes(option)}
                                      onChange={handleApparentdamages_a}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <Row>
                              {/* VEHICULE A VS B */}
                              <Col lg="6">
                                <h6 className="heading-small text-muted mb-4">
                                  VEHICULE B
                                </h6>
                              </Col>
                            </Row>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                              >
                                11. Apparent Damages
                              </label>
                              {damageplaces.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="apparent_damages_b"
                                      type="checkbox"
                                      value={option}
                                      checked={apparent_damages_b.includes(option)}
                                      onChange={handleApparentdamages_b}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
                            </FormGroup>
                          </Col>
                        </Row>

                        {/* FIN SECTION 11 */}



                        {/* SECTION 12 */}

                        <Row>
                          <Col md="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                12. Circumstances By client A
                              </label>
                              {Circumstances.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="circumstances_a"
                                      type="checkbox"
                                      value={option}
                                      checked={circumstances_a.includes(option)}
                                      onChange={handleCircumstances_a}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
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
                              {Circumstances.map((option) => (
                                <FormGroup check key={option}>
                                  <Label check>
                                    <Input
                                      name="circumstances_b"
                                      type="checkbox"
                                      value={option}
                                      checked={circumstances_b.includes(option)}
                                      onChange={handleCircumstances_b}
                                    />
                                    {option}
                                  </Label>
                                </FormGroup>
                              ))}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col align="right">
                            <FormGroup>
                              <Button
                                color="info"
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
                      <div style={{ display: section === 9 ? "block" : "none" }}>

                        {/* <AnimatedText
                            type="words" // animate words or chars
                            animation={{
                              y: '200px',
                              x: '-20px',
                              scale: 1.1,
                              ease: 'ease-in-out',
                            }}
                            animationType="lights"
                            interval={0.06}
                            duration={0.8}
                            tag="h1"
                            className="animated-paragraph text-success"
                            includeWhiteSpaces
                            threshold={0.1}
                            rootMargin="20%"
                          > */}

                        {/* </AnimatedText> */}


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
                                  
                                  name="accident_croquis"
                                  brushRadius={2}
                                  canvasWidth={12000}
                                  canvasHeight={400}
                                  width={1200}
                                  height={400}
                                  brushColor={"#000000"}
                                  ref={canvasRef}
                                  value={accident_croquis || null} // Make sure accident_croquis contains valid image data
                                  onChange={() => { }}
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
                                14. Observations Of Client A
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
                                14. Observations Of Client B
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
                                  canvasHeight={500}
                                  canvasWidth={200}
                                  width="500"
                                  height="200"
                                  ref={canvasRef_a}
                                  value={signature_a}
                                />
                              </InputGroup>
                              <Label>Or Upload it via :</Label>
                              <Input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={setSignature_a}
                              />
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
                                  width="500"
                                  height="200"
                                  canvasHeight={500}
                                  canvasWidth={200}
                                  ref={canvasRef_b}
                                  value={signature_b}
                                />
                              </InputGroup>
                              <Label>Or Upload it via :</Label>
                              <Input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={setSignature_b}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        {/* FIN SECTION 15  Observation */}
                        <Row>

                          <Col align="left">
                            <FormGroup>

                              <Button
                                color="info"
                                type="button"
                                onClick={handlePrev}
                              >
                                Previous
                              </Button>

                            </FormGroup>
                          </Col>
                        </Row>
                        <div className="text-center">

                          <Button color="success" type="submit">
                            Submit
                          </Button>
                        </div>
                      </div>





                    </div>

                    {showError && (
                      <div className="col-12 my-3 alert alert-danger">
                        Invalid fields , Please Recheck !
                      </div>
                    )}
                  </form>
                  <Row>
                    <div className="date error"></div>
                  </Row>
                  {showNotification && (
                    <div className="alert alert-success mt-3" role="alert">
                      Statement created successfully
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