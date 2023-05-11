import React, { useState, useRef, useEffect } from 'react';
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
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import axios from "axios";
import Tesseract from 'tesseract.js';
const Crop = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const imgRef = useRef(null);
  const cropperRef = useRef(null);
  const [step, setStep] = useState(0);
  const [mainvis, setMainvis] = useState("");
  const [crop1, setCrop1] = useState("");
  const [crop2, setCrop2] = useState("");
  const [crop3, setCrop3] = useState("");
  const [crop4, setCrop4] = useState("");
  const [crop5, setCrop5] = useState("");
  const [progress1,setProgress1]=useState(0);
  const [progress2,setProgress2]=useState(0);
  const [progress3,setProgress3]=useState(0);
  const [progress4,setProgress4]=useState(0);
  const [progress5,setProgress5]=useState(0);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);
  const [file4, setFile4] = useState(null);
  const [file5, setFile5] = useState(null);
  
  useEffect(() => {
    if (imgRef.current && !cropperRef.current) {
      const cropper = new Cropper(imgRef.current, {
        viewMode: 1,
       
        
        crop(event) {
        /*  console.log(event.detail.x);
          console.log(event.detail.y);
          console.log(event.detail.width);
          console.log(event.detail.height);*/
        },
      });
      cropperRef.current = cropper;
    }
  }, [imageSrc]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
    setStep(1)
    console.log(step)
  };



  const handlestep6 = async (e) => {
    const files = e.target.files;

    

    for (let i = 0; i < files.length; i++) {
 

          if(files[i].name.indexOf('cropped-image1')>-1)
          setFile1(files[i]);

          if(files[i].name.indexOf('cropped-image2')>-1)
          setFile2(files[i]);


          if(files[i].name.indexOf('cropped-image3')>-1)
          setFile3(files[i]);

          if(files[i].name.indexOf('cropped-image4')>-1)
          setFile4(files[i]);

          if(files[i].name.indexOf('cropped-image5')>-1)
          setFile5(files[i]);



      }
      console.log(file1)
      console.log(file2)
      console.log(file3)
      console.log(file4)
      console.log(file5)
     if(file1 !== null)
     {
        if(file1.type.indexOf("image")>-1)
        {
          
            const data = new FormData();
            data.append('srcImg', file1);
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
                            const response = await axios.request(options);
                            
                           
                            setCrop1(response.data.value)
                          } catch (error) {
                            console.error(error);
                          }
          Tesseract.recognize(
              file1,
              'fra',
              { logger: (m) => {
                  console.log(m)
                  if(m.status === 'recognizing text')
                  {setProgress1(m.progress)}
              } }
            ).then(async ({ data: { text } }) => {
            
            
             

              
            })

          }
          else 
      setCrop1("the chosen file is not an image please try again");
        
     }
     else 
      setCrop1("the chosen file is not recognised please try again");




      if(file2 !== null)
      {
         if(file2.type.indexOf("image")>-1)
         {
            const data = new FormData();
            data.append('srcImg', file2);
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
                            const response = await axios.request(options);
                            
                           
                            setCrop2(response.data.value)
                          } catch (error) {
                            console.error(error);
                          }
 
           Tesseract.recognize(
               file2,
               'fra',
               { logger: (m) => {
                   console.log(m)
                   if(m.status === 'recognizing text')
                   {setProgress2(m.progress)}
               } }
             ).then(async ({ data: { text } }) => {
             
             
              
 
               
             })
 
           }
           else 
       setCrop2("the chosen file is not an image please try again");
         
      }
      else 
       setCrop2("the chosen file is not recognised please try again");
 

  



       if(file3 !== null)
       {
          if(file3.type.indexOf("image")>-1)
          {
            
            const data = new FormData();
            data.append('srcImg', file3);
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
                            const response = await axios.request(options);
                            
                           
                            setCrop3(response.data.value)
                          } catch (error) {
                            console.error(error);
                          }
            Tesseract.recognize(
                file3,
                'fra',
                { logger: (m) => {
                    console.log(m)
                    if(m.status === 'recognizing text')
                    {setProgress3(m.progress)}
                } }
              ).then(async ({ data: { text } }) => {
              
              
               
  
                
              })
  
            }
            else 
        setCrop3("the chosen file is not an image please try again");
          
       }
       else 
        setCrop3("the chosen file is not recognised please try again");
  




        if(file4 !== null)
        {
           if(file4.type.indexOf("image")>-1)
           {
            const data = new FormData();
            data.append('srcImg', file4);
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
                            const response = await axios.request(options);
                            
                           
                            setCrop4(response.data.value)
                          } catch (error) {
                            console.error(error);
                          }
   
             Tesseract.recognize(
                 file4,
                 'fra',
                 { logger: (m) => {
                     console.log(m)
                     if(m.status === 'recognizing text')
                     {setProgress4(m.progress)}
                 } }
               ).then(async ({ data: { text } }) => {
               
              
   
                 
               })
   
             }
             else 
         setCrop4("the chosen file is not an image please try again");
           
        }
        else 
         setCrop4("the chosen file is not recognised please try again");
   




         if(file5 !== null)
         {
            if(file5.type.indexOf("image")>-1)
            {
                const data = new FormData();
            data.append('srcImg', file5);
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
                            const response = await axios.request(options);
                            
                           
                            setCrop5(response.data.value)
                          } catch (error) {
                            console.error(error);
                          }
    
              Tesseract.recognize(
                  file5,
                  'fra',
                  { logger: (m) => {
                      console.log(m)
                      if(m.status === 'recognizing text')
                      {setProgress5(m.progress)}
                  } }
                ).then(async ({ data: { text } }) => {
                
                 
                 
    
                  
                })
    
              }
              else 
          setCrop5("the chosen file is not an image please try again");
            
         }
         else 
          setCrop5("the chosen file is not recognised please try again");
    


          
              
            

  };


  function handleCrop  ()  {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      canvas.toBlob((blob) => {
        setCroppedImage(URL.createObjectURL(blob));
      }, 'image/jpeg');
      
    }
    setMainvis("none")
  };



  async function saveCroppedImage () {
    if (croppedImage) {
      const a = document.createElement('a');
      a.href = croppedImage;
      a.download = 'cropped-image'+step+'.jpeg';
      a.click()



setStep(step+1)
console.log(step)
handleCenter()
setCroppedImage(null)
    }
  };
  const handleCenter = () => {
    // Reset crop box position to center of image
    setMainvis("")
    const imageData = cropperRef.current.getImageData();
    const cropBoxData = {
      width: imageData.width / 2,
      height: imageData.height / 2,
      left: imageData.width / 4,
      top: imageData.height / 4,
    };
    cropperRef.current.setCropBoxData(cropBoxData);
    // Reset image position and size to their initial state
    cropperRef.current.reset();
    
  };




  return (
    <Container className="container" fluid="md">
    <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0"></CardHeader>
            <CardBody>

      <div>
        {step===0 && (
            <>
            <p>Please upload the statement in picture format</p>
            <input type="file" color={"info"} onChange={handleFileChange} />
           

            </>
        )}
       
       {(step<6 && step > 0 ) && (
            <>
            {step===1 && (
            <>
            <p>STEP 1 : please crop the first part of the statement that looks like the picture below </p>
            <img src={require("../../assets/img/brand/step1.PNG")} alt="step1"/>
            </> )}

            {step===2 && (
            <>
            <p>STEP  2: please crop the second part of the statement that looks like the picture below </p>
            <img src={require("../../assets/img/brand/step2.PNG")} alt="step2"/>
            </> )}

            {step===3 && (
            <>
            <p>STEP 3 : please crop the third part of the statement that looks like the picture below </p>
            <img src={require("../../assets/img/brand/step3.PNG")} alt="step3"/>
            </> )}


            {step===4 && (
            <>
            <p>STEP 4 : please crop the fourth part of the statement that looks like the picture below </p>
            <img src={require("../../assets/img/brand/step4.PNG")} alt="step4"/>
            </> )}


            {step===5 && (
            <>
            <p>STEP 5 : please crop the fifth part of the statement that looks like the picture below </p>
            <img src={require("../../assets/img/brand/step5.PNG")} alt="step5"/>
            </> )}
            
            {imageSrc && (
          <>
           <button onClick={handleCrop}>Crop</button>
            <button onClick={handleCenter}>Try again</button>
            {croppedImage && (
          <>
        
            <button onClick={saveCroppedImage}>{step===5 ? ("Done"): ("next")}</button>
          </>
        )}
       
          <div >
          {croppedImage && (
          <>
          <hr/>
          <h1>Result : </h1>
          <hr/>
            <img src={croppedImage}  style={{ width: '100%', height: '100%', objectPosition: 'center center' }}/>
           
          </>
        )}
        <hr/>
        <hr/>
            <img
              src={imageSrc}
              ref={imgRef}
              style={{ width: '100%', height: '100%', objectPosition: 'center center' }}
            />
            </div>
        
          </>
        )}
     

            </>
        )}



{(step===6 ) && (
     <>
     <p>Please upload the 5 parts you just cropped (you can find them in your default download folder)</p>
     <input type="file"  multiple color={"info"} onChange={handlestep6}  />
     <hr/>
     <hr/>
    <h3>Part 1 :</h3>
    <progress value={progress1} max={1}/>
    <p>{crop1}</p>
    <hr/>
    <h3>Part 2 :</h3>
    <p>{crop2}</p>
    <progress value={progress2} max={1}/>
    <hr/>
    <h3>Part 3 :</h3>
    <p>{crop3}</p>
    <progress value={progress3} max={1}/>
    <hr/>
    <h3>Part 4 :</h3>
    <p>{crop4}</p>
    <progress value={progress4} max={1}/>
    <hr/>
    <h3>Part 5 :</h3>
    <p>{crop5}</p>
    <progress value={progress5} max={1}/>
    <hr/>
     </>

)}

       
      </div>
      </CardBody>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Crop;
