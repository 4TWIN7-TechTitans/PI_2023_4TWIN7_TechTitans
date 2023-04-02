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
  
  function DetailsStatement() {
    const [first_name_a, setFirst_name_a] = useState("");
    const [first_name_b, setFirst_name_b] = useState("");
    const [address_a, setAddress_a] = useState("");
    const [address_b, setAddress_b] = useState("");
    const [vehicule_identity_a, setVehicule_identity_a] = useState("");
    const [vehicule_identity_b, setVehicule_identity_b] = useState("");
  
    useEffect(() => {
      const search = window.location.search;
      const id_statement = new URLSearchParams(search).get("id");
      async function get_specificstatement(id) {
        const response = (
          await axios.get("http://127.0.0.1:5000/get_specificstatement?id=" + id)
        ).data;
  
        setFirst_name_a(response.first_name_a);
        setFirst_name_b(response.first_name_b);
        setAddress_a(response.address_a);
        setAddress_b(response.address_b);
        setVehicule_identity_a(response.vehicule_identity_a);
        setVehicule_identity_b(response.vehicule_identity_b);
  
        console.log(
          first_name_a,
          first_name_b,
          address_a,
          address_b,
          vehicule_identity_a,
          vehicule_identity_b
        );
      }
  
      get_specificstatement(id_statement);
    }, []);
  
    return (
      <div>
        <p>DetailsStatement</p>
      </div>
    );
  }
  
  export default DetailsStatement;
  