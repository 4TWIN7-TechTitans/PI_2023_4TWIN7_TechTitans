
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
  import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Tickets = () => {
  
const [tickets, setTickets] = useState([]);

const [objet, setObjet] = useState("");
const [description, setDescription] = useState("");
const [errors, setErrors] = useState({});
const [showErrorObjet, setShowErrorObjet] = useState(false);
const [showErroroDescription, setShowErrorDescription] = useState(false);
const [formvalid, setFormvalid] = useState(true);

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/ticket");
    const filteredData = response.data.tickets;
    setTickets(filteredData);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  fetchData();
}, []);
const role=getCookie('role');

const [isShownadd_ticket, setIsShownadd_ticket] = useState(false);
const handleShownadd_ticket = event => {
  // 👇️ toggle shown state
  setIsShownadd_ticket(current => !current);
};

const validateObjet = (objet) => {
  const modelRegex = /^(.{10,100})$/;
  return modelRegex.test(objet);
};

const handleObjetChange = (e) => {
  const model = e.target.value;
  if (!validateObjet(model)) {
   
    setShowErrorObjet(true);
  } else {
    setFormvalid(true);
    setShowErrorObjet(false);
  }
};

const validateDescription = (objet) => {
  const modelRegex = /^(.{10,})$/;
  return modelRegex.test(objet);
};

const handleDescriptionChange = (e) => {
  const model = e.target.value;
  if (!validateDescription(model)) {
    
    setShowErrorDescription(true);

  } else {
    setFormvalid(true);
    setShowErrorDescription(false);
  }
};


const handleSubmitTicket = async (e) => {
  e.preventDefault();
  const form = e.target;
  const objet = form.objet.value;
  const description = form.description.value;
  
  if (validateObjet(objet) && validateDescription(description) ) 
  {
    
  }

 
};


  return (
    <>
   {role!="Client" ? <Header /> : ''} 
    {/* Page content */}
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
            {!isShownadd_ticket ? <h3 className="mb-0">Tickets</h3> : <h3 className="mb-0">New Ticket</h3>}
              
              <Button color="info float-right"  onClick={handleShownadd_ticket}>
              {!isShownadd_ticket ? 'New Ticket' : 'Liste des tickets'}
                    </Button>
            </CardHeader>
            {!isShownadd_ticket 
            ? 
            
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Objet</th>
                  <th scope="col">Date</th>
                  <th scope="col">Etat</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              
                {tickets.length>0
                 ?
                 <tbody>
                 {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                   <td>{ticket.number}</td>
                   <td>{ticket.objet}</td>
                   <td>{ticket.date_demande}</td>
                   <td>{ticket.etat}</td>
                   <td></td>
                  </tr>
                ))}</tbody>
                 :   <tbody>
                  <tr>
                   
                    <td colspan="5" align="center" className="">No tickets found</td>
                    
                  </tr>
             
                 </tbody>
                }
             
              
            </Table>
             : 
             <CardBody>
             <Form  onSubmit={handleSubmitTicket} noValidate>
             <Row>
               <Col md="12">
                 <FormGroup>
                 <label>Objet</label>
                   <Input
                     type="text"
                     name="objet"
                     id="objet"                    
                          onChange={(e) => {validateObjet(e.target.value);
                            handleObjetChange(e);}}
                     required
                   />
                 {showErrorObjet  && (
                          <p className="text-danger">l'objet du ticket ne doit pas dépasser 100 caractéres</p>
                        )}
                 </FormGroup>
               </Col>
               <Col md="12">
                 <FormGroup>
                   <label>Description</label>
                 
                <Input type="textarea" name="description" rows="10" id="description"  
                         onChange={(e) => {validateDescription(e.target.value);
                          handleDescriptionChange(e);}} />
                 {showErroroDescription  && (
                          <p className="text-danger">la description du ticket doit avoit 10 caractéres au min</p>
                        )}
                 </FormGroup>
               </Col>
             </Row>
            
            
             <div className="text-center">
             
               <Button className="my-4" color="primary" type="submit" disabled={formvalid}>
                 Create ticket
               </Button>
             </div>
           </Form>
           </CardBody>

            }

          </Card>
        </div>
      </Row>
    </Container>
  </>

  )
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default Tickets
