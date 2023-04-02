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
  const [ticketadded, setTicketadded] = useState("default");
  const [num_ticket, setNum_ticket] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
  const role = getCookie("role");

  const [isShownadd_ticket, setIsShownadd_ticket] = useState("list");
  const handleShownadd_ticket = (event) => {
    // 👇️ toggle shown state
    if (isShownadd_ticket === "list")
      setIsShownadd_ticket("add");
    else if (isShownadd_ticket === "add")
      setIsShownadd_ticket("list");
    else if (isShownadd_ticket === "modif")
      setIsShownadd_ticket("list");

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
    const id_agence = "2";
    const id_demandeur = getCookie("userid").substring(
      3,
      getCookie("userid").length - 2
    );
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
        setTicketadded("OK");
      } else {
        setTicketadded("KO");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DetailsTickets = async (e, id) => {
    try {
      const response = await axios.get(" http://localhost:5000/ticket/one", {
        id: id,
      });

      if (response.data.ticket._id.length > 0) {
        const ticket = response.data.ticket;
        setIsShownadd_ticket("modif");
        setNum_ticket(ticket.number);
        setObjet(ticket.objet);

      }
    } catch (error) {
      console.log(error);
    }
    return;
  };
  // pagination :
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
                {isShownadd_ticket === "modif" && (
                  <h3 className="mb-0">Ticket N° {num_ticket}</h3>
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
                          <td>{ticket.date_demande}</td>
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
                        <td colspan="5" align="center" className="">
                          No tickets found
                        </td>
                      </tr>
                    </tbody>
                  )}
                </Table>
              )}

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
                    <PaginationItem key={page} active={currentPage === page}>
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

                    <Col md="12">
                      <FormGroup>
                        <label>Log</label>

                        <Input
                          type="textarea"
                          name="log"
                          rows="10"
                          id="log"

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
                      disabled={formvalid}
                    >
                      Create ticket
                    </Button>
                  </div>
                </Form>
              </CardBody>
            )}
          </Card>
        </div>
      </Row>
    </Container >
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
