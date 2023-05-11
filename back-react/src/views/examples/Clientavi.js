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
  CardBody,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Clientavi() {
  const [currentPage, setCurrentPage] = useState(1);
  const [Experts, setExperts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwt = getCookie("jwt");
        if (jwt == "") return;

        const idagenceuser = (
          await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
        ).data.id_agence;

        console.log(idagenceuser);
        const response = await axios.get("http://localhost:5000/getallexperts");
        console.log(response);

        const responseExpert = response.data.experts;

        console.log(responseExpert)
        const expertsagence = responseExpert.filter(
          (ex) => ex.id_agence == idagenceuser
        );
        
        console.log(expertsagence);

        setExperts(expertsagence);

        // add Toastify notification
        toast.success("Welcome Dear Clients, Give Your Opinion !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 30000,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  const pageSize = 5;
  const pageCount = Math.ceil(Experts.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleredirect  = (id) => {
    window.location.replace("/reviews?id="+ id)
  }

  const paginatedUsers = Experts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchInputChange = async (event) => {
    setSearchTerm(event.target.value);
    try {
      const response = await axios.get(
        `http://localhost:5000/searchexpert?email=${searchTerm}`
      );
      setExperts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = Experts.filter((user) => {
    return user.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      {/* Page content */}

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">List Of Experts</h3>
              </CardHeader>
              <div className="p-4">
                <Input
                  type="text"
                  placeholder="Search by email"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
              </div>

              <CardBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {filteredUsers.map((expert) => (
                    <div
                      key={expert._id}
                      className="my-4"
                      style={{ flex: "1", marginRight: "1rem" }}
                    >
                      {/* <img src={expert.image}/> */}
                      <h4>{expert.email}</h4>
                      <h4>
                        {expert.first_name} {expert.last_name}
                      </h4>
                      
                     
                     
                      <Button color="primary" onClick={e => handleredirect(expert._id)}>
                        details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>

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

export default Clientavi;
