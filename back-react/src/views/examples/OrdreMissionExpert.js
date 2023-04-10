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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

function OrdreMissionExpert() {
  const [statements, setStatements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expertEmail, setExpertEmail] = useState("");

  useEffect(() => {
    function getCookie(key) {
      var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
      return b ? b.pop() : "";
    }

    const fetchData = async () => {
      try {
        // const response = await axios.get("http://127.0.0.1:5000/getstatements");
        // const filteredData = response.data.statements.filter(
        //   (statements) => statements.role !== "agency"
        // );
        // //console.log(filteredData);
        const jwt = getCookie("jwt");
        const response= await axios.get("http://localhost:5000/getmailfromtoken/?token=" + jwt);
        const email = response.data.email;
        setExpertEmail(email);
        if (email) {
          const response = await axios.get(
           ( `http://localhost:5000/statementbyexpertemail/` + email ) 
          );

          setStatements(response.data.statements);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">My Missions</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">vehicule Identity A</th>
                    <th scope="col">Vehicule Identity B</th>
                    <th scope="col">Circumstances Mr A </th>
                    <th scope="col">Circumstances Mr B </th>

                    <th> Status </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStatements.map((statement) => {
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
                      <tr key={statement._id} className={color}>
                        {console.log(statement)}
                        <td>{statement._id}</td> 
                        <td>{statement.date}</td>
                        <td>{statement.vehicule_identity_a.matriculation}</td>
                        <td>{statement.vehicule_identity_b.matriculation}</td>  
                        <td>{statement.circumstances_a}</td>
                        <td>{statement.circumstances_b}</td>
                        <td>
                        <Button color={color} disabled>{statusText}</Button>
                        </td>
                        <td> <Button href={"/expert/detailsstatement?id=" + statement._id}   > Details</Button> </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

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
export default OrdreMissionExpert;
