import { useEffect, useState } from "react";
import Tesseract from 'tesseract.js';



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
    FormGroup,
    Form,
    Input,
    Col,
  } from "reactstrap";
const Ocr = () => {
   
    const [progress,setProgress]=useState(0);
    const [result,setResult]=useState("");
    const recognizeImage = (imageData) => {
       
      };


      const handlesubmit = () =>
      {
        if(result.indexOf("Véhicule assuré par")< 0 || result.indexOf("Police d'assurance")< 0 || result.indexOf("Agence")< 0 || result.indexOf("du")< 0 || result.indexOf("au")< 0
        || result.indexOf("Nom")< 0 || result.indexOf("Prénom")< 0 || result.indexOf("adresse")< 0 || result.indexOf("Permis de conduire N")< 0
        || result.indexOf("Délivré Le")< 0 || result.indexOf("Nom")< 0 || result.indexOf("")< 0 || result.indexOf("Adresse")< 0
        || result.indexOf("Tél")< 0 || result.indexOf("Marque, Type")< 0 || result.indexOf("d'immatricualtion")< 0
        || result.indexOf("sens suivi")< 0 || result.indexOf("venant de")< 0 || result.indexOf("Allant à")< 0
        || result.indexOf("indiquer par une fléche le point de choch initial")< 0 || result.indexOf("dégâts apparents")< 0
        || result.indexOf("observations")< 0 || result.indexOf("croquis de l'accident")< 0
        
        )
        alert("The data does not resepect the statement format")
        else
        {
          //submit statement
          /*
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

          */
        }
      }

      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        Tesseract.recognize(
            file,
            'fra',
            { logger: (m) => {
                console.log(m)
                if(m.status === 'recognizing text')
                {setProgress(m.progress)}
            } }
          ).then(({ data: { text } }) => {
           /* dictionary.spellCheck(text).then((result) => {
             
              setResult(result.corrected);
            });*/
            setResult(result.corrected);
          })
       
      };
  return (
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0"></CardHeader>
            <CardBody>
            <div className="App">
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
        
          onChange={handleImageUpload}
        
        />
      </div>
        <progress value={progress} max={1}/>
    </div>
    <div className="display-flex">
       <p>Result : </p>
        <p>{result}</p>
        <Button
                  color="info float-right"
                  onClick={handlesubmit}
                >
                  Submit
                </Button>
      </div>
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Ocr;
