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

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/getstatements");
      const filteredData = response.data.statements.filter(
        (statements) => statements.role !== "Client"
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
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">

                

                </thead>
                <tbody>
                  <th scope="col">Date</th>
                  <th>Croquis</th>
                  <th scope="col">ContractNumber</th>
                  <th scope="col">First Name </th>
                  <th scope="col">Last Name </th>
                  <th scope="col">Etat</th>
                  <th scope="col">my signature </th>
                  <th scope="col">signature of B </th>

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
                    <tr key={statement._id}>
                      <td>{statement.date}</td>
                      <td><img src={statement.accident_croquis} alt="Accident Croquis" /></td>
                      <td>{statement.vehicule_a.contractNumber}</td>
                      <td>{statement.insured_a.firstname}</td>
                      <td>{statement.insured_a.lastname}</td>
 
                      <td>
                        <Button color={color} disabled>
                          {statusText}
                        </Button>
                      </td>
                      <td><img src={statement.signature_a} alt="sig a" /></td>
                      <td><img src={statement.signature_b} alt="sig b" /></td>
                    </tr>

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
      </Container>
    </>
  );
}

export default MyStatements;