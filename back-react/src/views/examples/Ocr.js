import { useEffect, useState } from "react";
import Tesseract from 'tesseract.js';
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

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
    const [checktext,setChecktext]=useState(true);
    const [crop, setCrop] = useState({ aspect: 1 / 1 });
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const myvalue="constat amiable d'accident automobile\nJual Alamigill detall relevé conducteurs\nNan Tun des Sites of Armen, mais un\nNe constitue pas une reconnaissance de responsabilité\ndes identités et des faits, servant à l'accélération du réglement. à signer obligatoirement par les DEUX\n1. date de l'accident heure 2. lieu légers\n4. dégâts matériels autres 5. témoins noms, adresses et tel (à souligner s'il s'agit d'un passager de A ou B)\n3. blessés même Oui\nqu'aux véhicules A et B\nnon B\nnon\noui\nVEHICULE A VEHICULE\n12. circonstances\n6. Société d'Assurances chacune des cases utiles 6. Société d'Assurances\nMettre une croix (x) dans\nVéhicule assuré par ........... STAR A pour préciser le croquis par\nPolice d'Assurance N ° A325 74\nVéhicule assuré\n1 en stationnement 1 Nº.\nAgence Star Ariana. 2 quittait un stationnement 2\nPolice d'Assurance\nAttestation valable. Agence\ndu 3414212020 au 3414212034.\n3 prenait un stationnement 3 Attestation valable\nau\n7. Identité du Conducteur privé, d'un chemin de terre 7. Identité du Conducteur\ndu\n4 sortait d'un parking, d'un lieu\nNom Mzaughi lieu privé, un chemin de terre\ns'engageait dans un parking, un 5\nNom\nPrénom Superna 6 arrêt de circulation 6 Prénom\nAdresse adrene de file 7\nAdresse\nPermis de conduire N ° 1 9 8 7 6 Permis de conduire No\n7 frottement sans changement\nDélivré le 2 juin 2020. attest. d'assur.)\n8 heurtait à l'arrière, en roulant dans 8\nle même sens et sur une même file\nDélivré le\n8. Assuré (voir attest. d'assur.) même sens et 9\n9 roulait dans le\nsur une file différente 8. Assuré (voir\nNom Nom ayuré\n10 changeait de file 10\nNom\nPrénom Prénom apsuré 11 doublait 11 Prénom\nAdresse: adhepe Arianu Adresse:\n12 virait à droite 12\nTél. So 76.\nTal.\n13 virait à gauche 13\n9. Identité du Véhicule 9. Identité du Véhicule\nMarque, Type polo 3 sur la partie de chaussée Marque, Type\n14\nreculait 14\nempiétait\nN ° d'immatriculation 16 In 30.10. 15 réservée à la circulation en sens 15 N ° d'immatriculation\ninverse\nSens suivi L\n16 venait de droite (dans un 16 Sens suivi\nVenant de mo carrefour)\nAllant à tunis de priorité ☐☐ Allant à\n17 n'avait pas observé le signal 17\nVenant de\nlindiquer le nombre de\ncases marquées d'une croix\n10. Indiquer par une flèche\nle point de choc initial 10. Indiquer par une flèche\n13 croquis de l'accident le point de choc initial\n11. dégâts apparents\n11. dégâts apparents\n14. observations\n14. observations\nA signature des conducteurs\nB\n15.\n13 (edith all og dimi: (1)"
    const [inputValue, setInputValue] = useState("");
    const [outputValue, setOutputValue] = useState([]);
    const [keywords, setKeywords] = useState(["\n", "banana", "orange"]);


    function splitStringByKeywords(str, keywords) {
      let regex = new RegExp(keywords.join("|"), "gi");
      let substrings = str.split(regex);
      return substrings.filter(substring => substring.trim().length > 0);
    }




      const [stream, setStream] = useState(null);

      const handlesubmit = () =>
      {if(result.length>0)
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
      }
      const handleCropChange = (crop) => {
        setCrop(crop);
      };
    
      const handleImageLoaded = (image) => {
        console.log("Image loaded: ", image);
      };
    
      const handleCropComplete = (crop, pixelCrop) => {
        console.log("Crop complete: ", crop, pixelCrop);
        getCroppedImage(pixelCrop);
      };


      const getCroppedImage = (pixelCrop) => {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
        const imageElement = document.createElement("img");
        imageElement.src = URL.createObjectURL(image);
        imageElement.onload = () => {
          ctx.drawImage(
            imageElement,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
          );
          const croppedImageURL = canvas.toDataURL();
          setCroppedImage(croppedImageURL);
        };
      };


      const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setImage(file);
        console.log('Image loaded:', URL.createObjectURL(image));
        
        setChecktext(true)
        setResult("");
        console.log(file)
   /*     const croquisFormData = new FormData();
        croquisFormData.append("file", file);
        croquisFormData.append("upload_preset", "zgt1wota");
    
        const croquisRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dczz1wjxm/image/upload",
          croquisFormData,
        );
        console.log(croquisRes.data.secure_url);
          
*/




        if(file.type.indexOf("image")>-1)
          {/*
            
            Tesseract.recognize(
              file,
              'fra',
              { logger: (m) => {
                  console.log(m)
                  if(m.status === 'recognizing text')
                  {setProgress(m.progress)}
              } }
            ).then(async ({ data: { text } }) => {
            
             
             

              //setResult(myvalue);
            })


           */
          }
        else 
        setResult("the chosen file is not an image please try again");
     

        const data = new FormData();
data.append('srcImg', file);
data.append('Session', 'string');

const options = {
  method: 'POST',
  url: 'https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/',
  headers: {
    'X-RapidAPI-Key': '0feb89ea83msh625d3109c3556cdp1b7b5bjsnd74e67060745',
    'X-RapidAPI-Host': 'pen-to-print-handwriting-ocr.p.rapidapi.com'
  },
  data: data
};
            
            
            try {
              //  const response = await axios.request(options);
                
               
                //console.log(response.data)
              } catch (error) {
                console.error(error);
              }
       
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
          accept="image/*"
          onChange={handleImageUpload}
        
        />
      </div>
        <progress value={progress} max={1}/>
      
    </div>
    <div className="display-flex" style={{ height: '500px' }}>
       {/*<p>Result : </p>
        <p>{JSON.stringify(result)}</p>
        <Button
                  color="info float-right"
                  onClick={handlesubmit}
                  disabled={checktext}
                >
                  Submit
  </Button>*/}

{image && (
        <ReactCrop style={{maxWidth:'100%',height:'auto'}}
          src={URL.createObjectURL(image)}
          crop={crop}
          onChange={handleCropChange}
          onImageLoaded={handleImageLoaded}
          onComplete={handleCropComplete}
        />
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped Image" />}

      </div>
            </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Ocr;
