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

function ListOfUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/all-users");
      const filteredData = response.data.users.filter(
        (user) => user.role !== "admin"
      );
      console.log(filteredData);
      setUsers(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  useEffect(() => {
    /*
    if (getCookie("role") !== "admin") window.location.href = "/auth/login";*/
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const pageSize = 5;
  const pageCount = Math.ceil(users.length / pageSize);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


   
    const handleBanUser = async (e, user) => {
      e.preventDefault();
    
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/users/ban/" + user.email
        );
    
        console.log(response);
        if (response.data === true) {
          user.banned = !user.banned;
          fetchData();
        }
    } catch (error) {
      console.log(error);
    }
    return;
  };
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleUserClick = (email) => {
    // navigate to user details page with id
    window.location.href = `/admin/user-profile/${email}`;
  };

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">List Of Users</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <Link to={`/main/user-profile/?mail=${user.email}`}>
                          {user.first_name}
                        </Link>
                      </td>
                      <td>{user.last_name}</td>
                      <td>
                        <Badge color="primary" className="badge-dot mr-4">
                          {user.role}
                        </Badge>
                      </td>
                      <td>{user.email}</td>
          <td>
            <Button onClick={(e) => handleBanUser(e, user)}>
              {user.banned ? "Unban User" : "Ban User"}
            </Button>
          </td>
                    </tr>
                  ))}
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
                <Button href="/admin/add">Add an account</Button>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default ListOfUsers;
