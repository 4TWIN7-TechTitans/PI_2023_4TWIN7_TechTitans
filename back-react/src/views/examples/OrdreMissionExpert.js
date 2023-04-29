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
  Input,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OrdreMissionExpert() {
  const [statements, setStatements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expertEmail, setExpertEmail] = useState("");
  const [id, setId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [sortOrderByDate, setSortOrderByDate] = useState("asc");
  const [selectedStatement, setSelectedStatement] = useState(null);

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
    if(jwt == "") return ;

        const response = await axios.get(
          "http://localhost:5000/getmailfromtoken/?token=" + jwt
        );
        const email = response.data.email;
        setIsAvailable(response.data.expert_status)
        setExpertEmail(email);
        if (email) {
          const response = await axios.get(
            `http://localhost:5000/statementbyexpertemail/` + email
          );

          setStatements(response.data.statements);
        }
      } catch (error) {
        console.log(error);
      }
    };
 

    fetchData();
  }, []);
  
  const fetchExpertsStatus = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getexpert_status/` + email
      );
      console.log(response);
      // handle the response here
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchExpertsStatus(expertEmail);
  }, [expertEmail]);
  

  
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

  const handleSearchInputChange = async (event) => {
    setSearchTerm(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:5000/get_specificstatement?id=${searchTerm}`
      );
      setStatements(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredStatements = statements.filter((statement) => {
    return statement._id.toString().includes(searchTerm);
  });

  /////Status////////////////
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handleOnline = async () => {

    const jwt = getCookie("jwt");
    if(jwt == "") return ;

    const email = (
      await axios.get("http://localhost:5000/getmailfromtoken?token=" + jwt)
    ).data.email;

    try {
      await axios.post("http://localhost:5000/status/" + email, {
        expert_status: true,
      });
      setIsAvailable(true);
      toast.success('You are now online!');
    } catch (error) {
      console.log(error);
    }
  };

  const handleOffline = async () => {
    const jwt = getCookie("jwt");
    if(jwt == "") return ;

    const email = (
      await axios.get("http://localhost:5000/getmailfromtoken?token=" + jwt)
    ).data.email;

    try {
      await axios.post("http://localhost:5000/statusoffline/" + email, {
        expert_status: false,
      });
      setIsAvailable(false);
      toast.warning('You are now offline.');
      console.log("Offline status updated successfully");
    } catch (error) {
      console.log(error);
    }
  };


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

  /////Status////////////////

  return (
    <>
      <Header />
      <ToastContainer />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">My Missions</h3>
              </CardHeader>
              <Col lg="2">
                    <Button color="dark" onClick={() => setSortOrderByDate(sortOrderByDate === "asc" ? "desc" : "asc")}>
                      Sort By Date
                    </Button>
                  </Col>
            

              <div className="p-4">
                <Input
                  type="text"
                  placeholder="Search by identifier of Statement"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Date</th>
                    <th scope="col">vehicule Identity A</th>
                   
                   
                   
                    <th> Status </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStatements.map((statement) => {
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
                        
                      
                       
                        <td>
                          <Button color={color} disabled>
                            {statusText}
                          </Button>
                        </td>
                        <td>
                          {" "}
                          <Button
                            href={
                              "/expert/detailsstatement?id=" + statement._id
                            }
                          >
                            {" "}
                            Details
                          </Button>{" "}
                        </td>
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
