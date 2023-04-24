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
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'jspdf-autotable';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

 
  const [errors, setErrors] = useState({});
  const [showErrorObjet, setShowErrorObjet] = useState(false);
  const [showErroroDescription, setShowErrorDescription] = useState(false);
  const [formvalid, setFormvalid] = useState(true);
  const [ticketadded, setTicketadded] = useState("default");
  const [objet, setObjet] = useState("");
  const [description, setDescription] = useState("");
  const [num_ticket, setNum_ticket] = useState("");
  const [date_demande, setDate_demande] = useState("");
  const [log, setLog] = useState("");
  const [id_demandeur, setId_demandeur] = useState("");
  const [id_agence, setId_agence] = useState("");
  const [etat, setEtat] = useState("");
  const [ticket_id, setTicket_id] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [etat_ticket, setEtat_ticket] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  
  const generatePDF = (ticket) => {
    const doc = new jsPDF();
  
    // Set background color
    doc.setFillColor("#EFEFEF");
    doc.rect(0, 0, 210, 297, "F");
  
    // Add background image or pattern
    const background = new Image();
    background.src = "/Myassets/argon-react-white.png";
  
    background.onload = function () {
      const bgWidth = 210;
      const bgHeight = 297;
      doc.addImage(background, "PNG", 0, 0, bgWidth, bgHeight);
    };
  
    // Add logo or icon
    const logo = new Image();
    logo.src = "/Myassets/argon-react-white.png";
  
    // Add logo to PDF
    logo.onload = function () {
      const logoWidth = 50;
      const logoHeight = 50;
      const logoX = 15;
      const logoY = 15;
      doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    };
  
    // Add custom font
    doc.addFont('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap', 'Open Sans', 'normal');
    doc.setFont('Open Sans');
  
    // Add title
    doc.setTextColor("#333333");
    doc.setFontSize(30);
    doc.setFont("Open Sans", "bold");
    doc.text("Assurini", 105, 70, "center");
  
    // Add subtitle
    doc.setFontSize(16);
    doc.setFont("Open Sans", "normal");
    doc.setTextColor("#2D3752");
    doc.text("My Tickets", 105, 85, "center");
  
    // Define the table columns and rows
    const tableHeaders = ["Description", "Date Of Creation", "Status"];
    const tableData = [[ticket.description, ticket.date_demande, ticket.etat]];
  
    // Add the table to the PDF with custom styles
    doc.autoTable({
      head: [tableHeaders],
      body: tableData,
      startY: 120,
      theme: "striped",
      styles: {
        fillColor: "#F5F5F5",
        textColor: "#2D3752",
        fontStyle: "bold",
        halign: "center",
        cellPadding: 6,
        overflow: "linebreak",
        alternateRow: "#F9F9F9",
      },
    });
  
    // Add padding around the table
    doc.setLineWidth(0.1);
    doc.setDrawColor("#767676");
    doc.rect(20, 110, 170, 60, "S");
  
    // Add footer with date
    doc.setFontSize(10);
   
  doc.setTextColor("#767676");
  doc.text(
  "Generated on " + new Date().toLocaleDateString(),
  105,
  290,
  "center"
  );
  
  // Save document
  doc.save("Ticket.pdf");
  
  toast.success("PDF downloaded successfully!", {
  position: toast.POSITION.BOTTOM_CENTER,
  autoClose: 3000,
  });
  };

  const role = getCookie("role");
  const userid = getCookie("userid").substring(
    3,
    getCookie("userid").length - 1
  );


  const handleInputChange = (event) => {
    setLog(event.target.value);
  };

  const handleetatChange = (event) => {
    setEtat(event.target.value);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/ticket");
      if (role === "Client") {
        const filteredData = response.data.tickets.filter(
          (obj) => obj.id_demandeur === userid
        );
        setTickets(filteredData);
      } else if (role === "Agence") {
        const filteredData = response.data.tickets.filter(
          (obj) => obj.id_agence === userid
        );
        setTickets(filteredData);
      } else if (role === "Admin") {
        const filteredData = response.data.tickets;
        setTickets(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [isShownadd_ticket, setIsShownadd_ticket] = useState("list");
  const handleShownadd_ticket = (event) => {
    // 👇️ toggle shown state
    if (isShownadd_ticket === "list") setIsShownadd_ticket("add");
    else if (isShownadd_ticket === "add") setIsShownadd_ticket("list");
    else if (isShownadd_ticket === "modif") setIsShownadd_ticket("list");

    fetchData();
    setTicketadded("default");
    setShowErrorObjet(false);
    setShowErrorDescription(false);
  };

  const validateObjet = (objet) => {
    const modelRegex = /^(.{10,100})$/;
    return modelRegex.test(objet);
  };

  const handleObjetChange = (e) => {
    const model = e.target.value;
    if (!validateObjet(model)) {
      setShowErrorObjet(true);
      setFormvalid(true);
    } else {
      setShowErrorObjet(false);
      if (!showErrorObjet && !showErroroDescription) {
        setFormvalid(false);
      }
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
      setFormvalid(true);
    } else {
      setShowErrorDescription(false);
      if (!showErrorObjet && !showErroroDescription) {
        setFormvalid(false);
      }
    }
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    const form = e.target;
    const objet = form.objet.value;
    const description = form.description.value;
    const log = "";
    const date_demande = new Date();
    const etat = "a traiter";
    const jwt = getCookie("jwt");
    if(jwt == "") return ;
    if (jwt) {
      const agence = (
        await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
      ).data.id_agence;
     
      setId_agence(agence);
    }
  
  
    const id_demandeur = getCookie("userid").substring(
      3,
      getCookie("userid").length - 1
    );
   console.log( {
    objet: objet,
    description: description,
    log: log,
    date_demande: date_demande,
    etat: etat,
    id_agence: id_agence,
    id_demandeur: id_demandeur,
  })
    try {
      const addticket = await axios.post(
        "http://localhost:5000/ticket",
        {
          objet: objet,
          description: description,
          log: log,
          date_demande: date_demande,
          etat: etat,
          id_agence: id_agence,
          id_demandeur: id_demandeur,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (addticket.status === 201) {
        fetchData();
        setTicketadded("OK");
        setIsShownadd_ticket("list");
        //start add notif
        //const date_demande = new Date();
        const postData = {
          titre: "A New ticket was added #"+addticket.data.ticket.number,
          id_user:id_agence,
          date_notif:date_demande,
          descrip:objet

         
        };
        
        axios.post('http://localhost:5000/notif/', postData)
          .then(response => {
          
          })
          .catch(error => {
            console.log(error);
          });
//end add notif
      } else {
        setTicketadded("KO");
      }
    } catch (error) {
      console.log(error);
    }




  };



  const handleupdateticket = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const log = form.log.value;
   
    console.log(etat)
 
    const id=ticket_id;
  
   
    try {
      const updateticket = await axios.post(
        "http://localhost:5000/ticket/update",
        {
         _id:id,
          log: log,
          etat:etat
         
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (updateticket.status === 200) {
        fetchData();
        setTicketadded("OK");
        setIsShownadd_ticket("list");
      } else {
        setTicketadded("KO");
      }
    } catch (error) {
      console.log(error);
    }
  };




  const DetailsTickets = async (e, id) => {
    try {
      const response = await axios.get("http://localhost:5000/ticket/");

      //console.log(response.data)

      const ticket = response.data.tickets.filter((obj) => obj._id === id);

      setNum_ticket(ticket[0].number);
      setObjet(ticket[0].objet);
      setEtat(ticket[0].etat);
      setTicket_id(ticket[0]._id);
      setId_demandeur(ticket[0].id_demandeur);
      var timestamp = Date.parse(ticket[0].date_demande); 
      var date_dem = new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp);
      setDate_demande(date_dem);
      setDescription(ticket[0].description);
      setLog(ticket[0].log);

      
      setTicketadded("");
      setIsShownadd_ticket("modif");
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const pageSize = 5;
  const pageCount = Math.ceil(tickets.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const paginatedTicket = tickets.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      {role != "Client" ? <Header /> : ""}
      {/* Page content */}
      <Container className="mt--7" fluid>
              <ToastContainer />

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                {isShownadd_ticket === "list" && (
                  <h3 className="mb-0">List Ticket</h3>
                )}
                {isShownadd_ticket === "add" && (
                  <h3 className="mb-0">New Ticket</h3>
                )}
               
               
                <Button
                  color="info float-right"
                  onClick={handleShownadd_ticket}
                >
                  {isShownadd_ticket === "list" && "New Ticket"}
                  {isShownadd_ticket === "add" && "Liste des tickets"}
                  {isShownadd_ticket === "modif" && "Liste des tickets"}
                </Button>
               
              </CardHeader>
              {isShownadd_ticket === "list" && (
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

                  {tickets.length > 0 ? (
                    <tbody>
                      {paginatedTicket.map((ticket) => (
                        <tr key={ticket._id}>
                          <td>{ticket.number}</td>
                          <td>{ticket.objet}</td>
                          <td>{ticket.date_demande.substring(0,10)}</td>
                          <td>{ticket.etat}</td>
                          <td>
                            {" "}
                            <Button
                              color="success"
                              onClick={(e) => DetailsTickets(e, ticket._id)}
                            >
                              
                              <span className="ni ni-align-center"></span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td align="center" className="">
                          No tickets found
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              )}
              
              {isShownadd_ticket === "list" && (
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          onClick={() => handlePageClick(currentPage - 1)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      {pages.map((page) => (
                        <PaginationItem
                          key={page}
                          active={currentPage === page}
                        >
                          <PaginationLink onClick={() => handlePageClick(page)}>
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem disabled={currentPage === pageCount}>
                        <PaginationLink
                          onClick={() => handlePageClick(currentPage + 1)}
                          tabIndex="-1"
                        >
                          
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
                
              )}
                
              {isShownadd_ticket === "add" && (
                <CardBody>
                  <Form onSubmit={handleSubmitTicket} noValidate>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Objet</label>
                          <Input
                            type="text"
                            name="objet"
                            id="objet"
                            defaultValue={objet}
                            onChange={(e) => {
                              validateObjet(e.target.value);
                              handleObjetChange(e);
                            }}
                            required
                          />
                          {showErrorObjet && (
                            <p className="text-danger">
                              l'objet du ticket ne doit etre entre 10 et 100
                              caractéres
                            </p>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label>Description</label>

                          <Input
                            type="textarea"
                            name="description"
                            rows="10"
                            id="description"
                            defaultValue={description}
                            onChange={(e) => {
                              validateDescription(e.target.value);
                              handleDescriptionChange(e);
                            }}
                          />
                          {showErroroDescription && (
                            <p className="text-danger">
                              la description du ticket doit avoit 10 caractéres
                              au min
                            </p>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="text-center">
                      {ticketadded === "OK" && (
                        <div className="alert alert-success mt-3" role="alert">
                          Ticket Added
                        </div>
                      )}
                      {ticketadded === "KO" && (
                        <div className="alert alert-danger mt-3" role="alert">
                          Something went wrong
                        </div>
                      )}

                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
                        disabled={formvalid}
                      >
                        Create ticket
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              )}

              {isShownadd_ticket === "modif" && (
                <CardBody>
                  <div className="card-profile-stats d-flex justify-content-center ">
                  
                  <div>
                      <span className="heading ">Ticket </span>
                      <span className="heading ni ni-support-16"></span>
                      <span className="description ">N° {num_ticket}</span>
                    </div>
                    <div>
                      <span className="heading ">Created by </span>
                      <span className="heading ni ni-user-run"></span>
                      <span className="description ">{id_demandeur}</span>
                    </div>
                    <div>
                      <span className="heading">Date </span>
                      <span className="heading ni ni-calendar-grid-58"> </span>
                      <span className="description">{date_demande}</span>
                    </div>
                    <div>
                      <span className="heading">Etat</span>
                      <span className="heading ni ni-sound-wave"></span>
                      
                      <span className="description">{etat}</span>
                    </div>
                    <div>
                      {role!=="Client" && (<Input
                                name="apparent_damages_a"
                                type="select"
                                value={etat}
                                onChange={handleetatChange}
                                         >
                                <option value="a traiter">a traiter</option>
                                <option value="en cours de traitement">en cours de traitement</option>
                                <option value="traité">traité</option>
                                <option value="clos">clos</option>
                                </Input>)}
                                <Button
                    color={showPDF ? "success" : "primary"}
                    onClick={() => setShowPDF(!showPDF)}
                  >
                    {showPDF
                      ? "Hide Downaload Pdf"
                      : "The Pdf Will Be Created Once You Press That Button"}
                  </Button>
                  {showPDF && (
                    <Button color="primary" onClick={generatePDF}>
                      Download PDF
                    </Button>
                  )}
                    </div>

                   
                  </div>
                  <hr className="my-4"/>
                  <span class="heading ni ni-bold-right"></span>
                    <span class="heading"> Titre</span>
                      
                      <br/>
                      <span class="description">{objet}</span>
                      <hr className="my-4"/>
                  <hr className="my-4"/>
                  <span class="heading ni ni-ruler-pencil"></span>
                    <span class="heading"> Description</span>
                      
                      <br/>
                      <span class="description">{description}</span>
                      <hr className="my-4"/>
                  <Form onSubmit={handleupdateticket} noValidate>
                    <Row>
                      <Col md="12">
                        <FormGroup></FormGroup>
                      </Col>
                     
                      <Col md="12">
                        <FormGroup>
                        <span class="heading ni ni-single-copy-04"></span>
                        <span class="heading">Suivi</span>

                          <Input
                            type="textarea"
                            name="log"
                            rows="10"
                            id="log"
                            value={log}
                            onChange={handleInputChange} 
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <div className="text-center">
                      {ticketadded === "OK" && (
                        <div className="alert alert-success mt-3" role="alert">
                          Ticket Added
                        </div>
                      )}
                      {ticketadded === "KO" && (
                        <div className="alert alert-danger mt-3" role="alert">
                          Something went wrong
                        </div>
                      )}

                      <Button
                        className="my-4"
                        color="primary"
                        type="submit"
                        
                      >
                        Enregistrer
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export default Tickets;
