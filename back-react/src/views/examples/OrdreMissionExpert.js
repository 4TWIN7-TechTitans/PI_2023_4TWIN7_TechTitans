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
  
  function OrdreMissionExpert() {
    const [statements, setStatements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expertEmail, setExpertEmail] = useState("");
  
    useEffect(() => {
      function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
      }
  
      const email = getCookie("email");
      setExpertEmail(email);
  
      async function fetchData(email) {
        try {
          const response = await axios.get(
            (`http://localhost:5000/statementbyexpertemail/`+email)
          );
          const statements = response.data.statements;
          setStatements(statements);
        } catch (error) {
          console.log(error);
        }
      }
  
      if (email) {
        fetchData(email);
      }
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
                      <th scope="col">Date</th>
                      <th scope="col">Contract Number</th>
                      <th scope="col">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStatements.map((statement) => {
                      console.log(statement); // Add this line to log the statements object
  
                      return (
                        <tr key={statement._id}>
                          <td>{statement.date}</td>
                          <td>{statement.vehicule_a.contractNumber}</td>
                          <td>{statement.etat}</td>
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
    
    export default OrdreMissionExpert;
       
