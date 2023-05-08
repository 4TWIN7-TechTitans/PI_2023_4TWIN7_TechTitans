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

        const id_agenceJwt = (
          await axios.get("http://127.0.0.1:5000/getmailfromtoken?token=" + jwt)
        ).data._id;

        const response = await axios.get("http://localhost:5000/getallexperts");
        console.log(response);

        const responseExpert = response.data.experts.filter(
          (elem) => elem.id_agence === id_agenceJwt
        );

        setExperts(responseExpert);

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

  const paginatedUsers = Experts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  function generatePDF() {
    const doc = new jsPDF();

    // Add agency name
    doc.setFontSize(14);
    doc.text("Assurini Agency", 105, 30, { align: "center" });

    // Add title
    doc.setFontSize(18);
    doc.text("List Of Experts", 105, 50, { align: "center" });

    // Add table headers
    doc.setFontSize(12);
    doc.text("Identifiant Du L'Expert", 20, 60);
    doc.text("Name", 80, 60); // Increased x-coordinate of "Name" header
    doc.text("Email", 130, 60); // Increased x-coordinate of "Email" header
    doc.text("Contact Number", 180, 60); // Increased x-coordinate of "Contact Number" header

    // Add table rows
    let row = 70;
    Experts.forEach((user, index) => {
      if (index % 2 === 0) {
        doc.setFillColor(240, 240, 240); // Light gray color for even rows
      } else {
        doc.setFillColor(255, 255, 255); // White color for odd rows
      }
      doc.rect(20, row - 5, 170, 10, "F"); // Draw rectangle to fill row with color
      doc.setTextColor(0, 0, 0); // Set text color to black
      doc.text(user.first_name, 80, row); // Increased x-coordinate of "Name" text
      doc.text(user.email, 130, row); // Increased x-coordinate of "Email" text
      doc.text(user.phone_number, 180, row); // Increased x-coordinate of "Contact Number" text
      row += 10;
    });

    // Add generation date
    doc.setTextColor(128, 128, 128); // Set text color to gray
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    ); // Add date of generation

    doc.save("list_of_users.pdf");
  }

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
      <Header />
      {/* Page content */}
      <ToastContainer />

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
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                  {filteredUsers.map((expert) => (
                    <div key={expert._id} className="my-4" style={{ flex: "1", marginRight: "1rem" }}>
<div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", margin: "0 auto" }}>
  <div style={{ width: "100%", height: "100%", backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
</div>
                      <h4>{expert.email}</h4>
                      <h4>{expert.first_name}  {expert.phone_number}</h4>
                       {/* <p>{expert.description}</p>  */}
                       <div>
                        <ul>
                        <Input
                  type="text"
                  placeholder="Give Your Opinion Dear Client"
                  // value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                        </ul>
                       </div>
                      <Button color="primary" >
                      Give Your Opinion
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
