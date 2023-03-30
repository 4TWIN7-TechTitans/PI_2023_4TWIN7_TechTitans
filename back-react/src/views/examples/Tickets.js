
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
