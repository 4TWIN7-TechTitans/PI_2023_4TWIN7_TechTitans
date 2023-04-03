import {
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  import React, { useState } from "react";
  import axios from "axios";
  
  function Notfound() {
  return(
    <>
     <Container className="mt--7" fluid>
     <Card className="shadow flex-justify-center center">
     <center><h1 >404 NOT FOUND</h1></center>
     </Card>
     </Container>
    
    
    </>
  )
  }

  export default Notfound;
  