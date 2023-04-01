
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
  import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";







const Tickets = () => {
  
const [tickets, setTickets] = useState([]);

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

  return (
    <>
    <Header />
    {/* Page content */}
    <Container className="mt--7" fluid>
      <Row>
        <div className="col">
          <Card className="shadow">
            <CardHeader className="border-0">
              <h3 className="mb-0">Tickets</h3>
            </CardHeader>
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
              <tbody>
              {tickets.map((ticket) => (
                    <tr key={ticket._id}>
                     <td>{ticket.number}</td>
                     <td>{ticket.objet}</td>
                     <td>{ticket.date_demande}</td>
                     <td>{ticket.etat}</td>
                     <td></td>
                    </tr>
                  ))}
              </tbody>
            </Table>

          </Card>
        </div>
      </Row>
    </Container>
  </>

  )
}

export default Tickets
