import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Col,
  Container,
  Row,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

function MyStatements() {
  const [statements, setStatements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [notification, setNotification] = useState("");
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [sortOrderByDate, setSortOrderByDate] = useState("asc");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [selectedStatement, setSelectedStatement] = useState(null);

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  useEffect(() => {
    setNom(decodeURI(getCookie("lastname")));
    setPrenom(decodeURI(getCookie("firstname")));
    setRole(decodeURI(getCookie("role")));
    console.log(role);

    fetchData();
  }, [nom, prenom, role]);

  const fetchData = async () => {

    try {
      const response = await axios.get("http://localhost:5000/getstatements");
      const filteredData = response.data.statements.filter(
        (statement) =>
          statement.insured_a.firstname === prenom &&
          statement.insured_a.lastname === nom
      );

      console.log(filteredData);
      setStatements(filteredData);

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {

    fetchData();
  }, []);

  useEffect(() => {
    console.log(statements);
  }, [statements]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 10000);
  };
  const pageSize = 5;
  const pageCount = Math.ceil(statements.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };



  const paginatedStatements = statements.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    let sortedStatements = [...statements];
    if (sortOrderByDate === "asc") {
      sortedStatements.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      sortedStatements.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setStatements(sortedStatements);
  }, [sortOrderByDate]);
  // Update the handleStatementSelect function to set the selected statement
  const handleStatementSelect = (statement) => {
    setSelectedStatement(statement);
  };

  // Update the handleCloseModal function to clear the selected statement
  const handleCloseModal = () => {
    setSelectedStatement(null);
  };
  const [selectedCaseState, setSelectedCaseState] = useState("");
  const handleCaseStateFilter = async (caseState) => {
    setSelectedCaseState(caseState);

  };
  const fetchFilter = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getstatements/${selectedCaseState}`
      );
      const filteredData = response.data.statements.filter(
        (statement) =>
          statement.insured_a.firstname === prenom &&
          statement.insured_a.lastname === nom
      );
      console.log(filteredData);
      setStatements(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilter();
  }, [selectedCaseState]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <>

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col lg="10">
                    <h3 className="mb-0">My Statements</h3>
                  </Col>
                  <Col lg="2">
                    <Button color="dark" onClick={() => setSortOrderByDate(sortOrderByDate === "asc" ? "desc" : "asc")}>
                      Sort By Date
                    </Button>
                  </Col>

                </Row>
                <Row>
                  <FormGroup>
                    <Col>
                      <Label>
                        Filter By Case State
                      </Label>
                      <Input
                        className="form-control"
                        type="select"
                        value={selectedCaseState}
                        onChange={(e) => handleCaseStateFilter(e.target.value)}
                      >

                        <option value="">All</option>
                        <option value="treated">Treated</option>
                        <option value="closed">Closed</option>
                        <option value="waiting">Waiting</option>
                        <option value="inProgress">In Progress</option>

                      </Input>
                    </Col>
                  </FormGroup>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">



                </thead>
                <tbody>

                  <th scope="col">Date</th>

                  <th scope="col">ContractNumber</th>
                  <th scope="col">First Name </th>
                  <th scope="col">Last Name </th>
                  <th scope="col">my signature </th>
                  <th scope="col">Etat</th>
                  <th scope="col">Action</th>


                </tbody>
                {paginatedStatements.map((statement) => {
                  console.log(statement); // Add this line to log the statements object
                  let statusText = "";
                  let color = "orange";
                  switch (statement.case_state) {
                    case "treated":
                      statusText = "Treated";
                      color = "success";
                      break;
                    case "inProgress":
                      statusText = "In Progress";
                      color = "info";
                      break;
                    case "closed":
                      statusText = "Closed";
                      color = "warning";
                      break;
                    default:
                      statusText = "Waiting";
                      color = "danger";

                      break;
                  }
                  return (
                    <tbody>
                      <tr key={statement._id}>
                        <td>{formatDate(statement.date)}</td>

                        <td>{statement.vehicule_a.contractNumber}</td>
                        <td>{statement.insured_a.firstname}</td>
                        <td>{statement.insured_a.lastname}</td>
                        <td><img src={statement.signature_a} alt="signature a" width={"50%"} /></td>
                        <td>
                          <Button color={color} disabled>
                            {statusText}
                          </Button>
                        </td>
                        <td>
                          <Button color="light" onClick={() => handleStatementSelect(statement)}>
                            Show Details
                          </Button>

                        </td>

                      </tr>
                    </tbody>
                  );
                })}

              </Table>
              {notification && (
                <div className="alert alert-success">{notification}</div>
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
            </Card>
          </div>
        </Row>

        {selectedStatement && (
          <div>
            {/* Render modal backdrop */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
              }}
              onClick={handleCloseModal}
            ></div>
            {/* Render modal content */}
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "20px",
                zIndex: 10000,
                maxWidth: "950px",
                width: "100%",
                maxHeight: "80vh", // Ajout de la hauteur maximale avec défilement
                overflowY: "auto", // Activation de la barre de défilement verticale
              }}
            >
              <Card>
                <center><h2>Statement Details</h2></center>
                <hr />
                <div style={{ marginBottom: "20px" }}>
                  <h4 class="font-weight-bold" style={{ color: "#666", marginBottom: "10px" }}>Accident Information</h4>
                  <p style={{ marginBottom: "5px" }}>Date: {selectedStatement.date}</p>
                  <p style={{ marginBottom: "5px" }}>Location: {selectedStatement.location}</p>
                  <p style={{ marginBottom: "5px" }}>Injured: {selectedStatement.injured}</p>
                  <p style={{ marginBottom: "5px" }}>Material Damage: {selectedStatement.material_damage}</p>
                  <p style={{ marginBottom: "5px" }}>Witness A:{selectedStatement.witness_a.map((element, index) => (
                      <span key={index}>
                        First Name: {element.firstName_w}, Last Name: {element.lastName_w}, Address: {element.addressWitness}, Phone: {element.phoneWitness}
                      </span>
                    ))}
                  </p>
                  <p style={{ marginBottom: "5px" }}>Witness B: {selectedStatement.witness_b.map((element,index) => (
                      <span key={index}>
                      First Name: {element.firstName_w}, Last Name: {element.lastName_w}, Address: {element.addressWitness}, Phone: {element.phoneWitness}
                    </span>
                  ))}</p>
                </div>

                <hr />
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <h4 class="font-weight-bold" style={{ color: "#666", marginBottom: "10px" }}>Driver's Identity</h4>
                    <div style={{ marginBottom: "10px" }}>
                      <h6 style={{ color: "#999", marginBottom: "5px" }}>Driver A:</h6>
                      <p style={{ marginBottom: "5px" }}>First Name: {selectedStatement.drivers_identity_a.first_name}</p>
                      <p style={{ marginBottom: "5px" }}>Last Name: {selectedStatement.drivers_identity_a.last_name}</p>
                      <p style={{ marginBottom: "5px" }}>Address: {selectedStatement.drivers_identity_a.address}</p>
                      <p style={{ marginBottom: "5px" }}>Driver's License Issue Date: {selectedStatement.drivers_identity_a.drivers_license_issue_date}</p>
                      <p style={{ marginBottom: "5px" }}>Driver's License: {selectedStatement.drivers_identity_a.driver_license}</p>
                    </div>
                  </div>
                  <div>
                    <h6 class="font-weight-bold">Driver B:</h6>
                    <p>First Name: {selectedStatement.drivers_identity_b.first_name}</p>
                    <p>Last Name: {selectedStatement.drivers_identity_b.last_name}</p>
                    <p>Address: {selectedStatement.drivers_identity_b.address}</p>
                    <p>Driver's License Issue Date: {selectedStatement.drivers_identity_b.drivers_license_issue_date}</p>
                    <p>Driver's License: {selectedStatement.drivers_identity_b.driver_license}</p>
                  </div>
                </div>
                <hr />
                <div>
                  <h4 class="font-weight-bold">Insured Information</h4>
                  <div>
                    <h6>Insured A:</h6>
                    <p>First Name: {selectedStatement.insured_a.firstname}</p>
                    <p>Last Name: {selectedStatement.insured_a.lastname}</p>
                    <p>Phone Number: {selectedStatement.insured_a.phonenumber}</p>
                    <p>Address: {selectedStatement.insured_a.addr}</p>
                  </div>
                  <div>
                    <h6 class="font-weight-bold">Insured B:</h6>
                    <p>First Name: {selectedStatement.insured_b.firstname}</p>
                    <p>Last Name: {selectedStatement.insured_b.lastname}</p>
                    <p>Phone Number: {selectedStatement.insured_b.phonenumber}</p>
                    <p>Address: {selectedStatement.insured_b.addr}</p>
                  </div>
                </div>
                <hr />
                <div>
                  <h4 class="font-weight-bold">Vehicle Information</h4>
                  <div>
                    <h6 class="font-weight-bold">Vehicle A:</h6>
                    <p>Brand: {selectedStatement.vehicule_identity_a.brand}</p>
                    <p>Type: {selectedStatement.vehicule_identity_a.type}</p>
                    <p>Matriculation: {selectedStatement.vehicule_identity_a.matriculation}</p>
                    <p>Country {selectedStatement.vehicule_identity_a.country}</p>
                    <p>Coming From: {selectedStatement.vehicule_identity_a.coming_from}</p>
                    <p>Going To: {selectedStatement.vehicule_identity_a.going_to}</p>
                  </div>
                  <div>
                    <h6 class="font-weight-bold">Vehicle B:</h6>
                    <p>Brand: {selectedStatement.vehicule_identity_b.brand}</p>
                    <p>Type: {selectedStatement.vehicule_identity_b.type}</p>
                    <p>Matriculation: {selectedStatement.vehicule_identity_b.matriculation}</p>
                    <p>Country: {selectedStatement.vehicule_identity_b.country}</p>
                    <p>Coming From: {selectedStatement.vehicule_identity_b.coming_from}</p>
                    <p>Going To: {selectedStatement.vehicule_identity_b.going_to}</p>
                  </div>
                  <div>
                    <h6 class="font-weight-bold">Vehicle Owner A:</h6>
                    <p>Agency : {selectedStatement.vehicule_a.assureBy}</p>
                    <p>Contract Number: {selectedStatement.vehicule_a.contractNumber}</p>
                    <p>Agency Branche: {selectedStatement.vehicule_a.agency}</p>
                    <p>Start Date of Contract: {selectedStatement.vehicule_a.contractValidity.start_date}</p>
                    <p>End Date of Contract: {selectedStatement.vehicule_a.contractValidity.end_date}</p>
                  </div>
                  <div>
                    <h6 class="font-weight-bold">Vehicle Owner B:</h6>
                    <p>Agency: {selectedStatement.vehicule_b.assureBy}</p>
                    <p>Contract Number: {selectedStatement.vehicule_b.contractNumber}</p>
                    <p>Agency Branche: {selectedStatement.vehicule_b.agency}</p>
                    <p>Start Date of Contract: {selectedStatement.vehicule_b.contractValidity.start_date}</p>
                    <p>End Date of Contract: {selectedStatement.vehicule_b.contractValidity.end_date}</p>
                  </div>
                </div>
                <hr />
                <div>
                  <h4 class="font-weight-bold">Additional Information</h4>
                  <p>Choc Points of Client A: {selectedStatement.hits_a}</p>
                  <p>Choc Points of Client B: {selectedStatement.hits_b}</p>
                  <p>Apparent Damages A: {selectedStatement.apparent_damages_a}</p>
                  <p>Apparent Damages B: {selectedStatement.apparent_damages_b}</p>
                  <p>Circumstances by Client A: {selectedStatement.circumstances_a}</p>
                  <p>Circumstances by Client B: {selectedStatement.circumstances_b}</p>
                  <p>Croquis :<img src={selectedStatement.accident_croquis} /></p>
                  <p>Notes A: {selectedStatement.notes_a}</p>
                  <p>Notes B: {selectedStatement.notes_b}</p>
                  <p>Signature of Client A: <img src={selectedStatement.signature_a} /></p>
                  <p>Signature of Client B:<img src={selectedStatement.signature_b} /></p>
                </div>
                <hr />
                <center><Button color="success" onClick={handleCloseModal}>Close</Button></center>
              </Card>
            </div>

          </div>
        )}
      </Container>

    </>
  );
}

export default MyStatements;
