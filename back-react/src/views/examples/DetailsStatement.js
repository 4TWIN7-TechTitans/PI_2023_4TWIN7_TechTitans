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
  CardBody,
  Col,
  FormGroup,
  Label,
  Input,
  Form
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



function DetailsStatement() {
  const [driverIdentityA, setdriverIdentityA] = useState("");
  const [driverIdentityB, setdriverIdentityB] = useState("");
  const [driver_license_a, setdriver_license_a] = useState("");
  const [driver_license_b, setdriver_license_b] = useState("");
  const [hits_a, sethits_a] = useState("");
  const [hits_b, sethits_b] = useState("");
  const [circumstances_a, setcircumstances_a] = useState("");
  const [circumstances_b, setcircumstances_b] = useState("");
  const [location, setlocation] = useState("");
  const [date, setDate] = useState("");
  const [Experts, setExperts] = useState([]);
  const [signature_a, setsignature_a] = useState("");
  const [signature_b, setsignature_b] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [commentaire, setCommentaire] = useState("");
  const [comment, setComment] = useState([]);
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [timestamp, settimestamp] = useState("");
  const [isListening, setIsListening] = useState(false)
  const [savedcommentaire, setcommentaire] = useState([])
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [savedNotes, setSavedNotes] = useState([]);
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set background color
    doc.setFillColor("#EFEFEF");
    doc.rect(0, 0, 210, 297, "F");

    // Add logo or icon
    const logo = new Image();
    <img src="/Myassets/argon-react-white.png" width="100%" height="500" />;

    // Add logo to PDF
    logo.onload = function () {
      const logoWidth = 50;
      const logoHeight = 50;
      const logoX = 15;
      const logoY = 15;
      doc.addImage(logo, "PNG", logoX, logoY, logoWidth, logoHeight);
    };

    // Add title
    doc.setTextColor("#333333");
    doc.setFontSize(30);
    doc.setFont("times", "bold");
    doc.text("Assurini", 105, 40, "center");

    // Add subtitle
    doc.setFontSize(16);
    doc.setFont("times", "normal");
    doc.setTextColor("#2D3752");
    doc.text("Accident Statement", 105, 55, "center");

    // Add content
    doc.setFontSize(14);
    doc.setFont("times", "normal");
    doc.setTextColor("#2D3752");
    doc.text("Driver A: " + driverIdentityA, 20, 80);
    doc.setFont("times", "italic");
    doc.setTextColor("#767676");
    doc.text("Driver A License: " + driver_license_a, 20, 90);
    doc.setFont("times", "normal");
    doc.setTextColor("#2D3752");
    doc.text("Hits A: " + hits_a, 20, 100);

    doc.text("Driver B: " + driverIdentityB, 100, 80);
    doc.setFont("times", "italic");
    doc.setTextColor("#767676");
    doc.text("Driver B License: " + driver_license_b, 100, 90);
    doc.setFont("times", "normal");
    doc.setTextColor("#2D3752");
    doc.text("Hits B: " + hits_b, 100, 100);

    doc.setFont("times", "bold");

    doc.setFont("times", "italic");
    doc.text("Date Of Accident: " + date, 20, 170);
    doc.text("Expert Commentary : " + commentaire, 40, 180);

    //Add additional text
    doc.setFontSize(8);
    doc.setTextColor("#2D3752");
    doc.text(
      `The specifications for experts and actuaries is a
document that defines the requirements and standards that
experts and actuaries must adhere to in the performance of
their duties. This specifications document is based on the
Law No. 83-112 of December 12, 1983, which pertains to the
general status of personnel in the state, local public
authorities, and administrative public establishments
(EPA), as well as Law No. 85-78 of August 5, 1985, which
pertains to the general status of agents of offices,
public establishments with industrial and commercial
character, and companies wholly owned by the state or
local public authorities (EPIC). The document also
includes the fee schedule for automobile experts and loss
assessors, as well as the requirements for actuaries. It
also includes forms for requests to add or change
specialties, requests to change quality, integration of a
natural person actuary into a legal entity, and requests
for removal from the register.`,
      30,
      200
    );

    // Add footer with date
    doc.setFontSize(10);
    doc.setTextColor("#767676");
    doc.text(
      "Generated on " + new Date().toLocaleDateString(),
      105,
      290,
      "center"
    );

    // Save document
    doc.save("statement.pdf");

    toast.success("PDF downloaded successfully!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    });
  };

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

        const Expert = await axios.get("http://localhost:5000/getallexperts");
        console.log(Expert);

        const responseExpert = Expert.data.experts.filter(
          (elem) => elem.id_agence === id_agenceJwt
        );
        setExperts(responseExpert);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();

    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");

    async function get_specificstatement(id) {
      try {
        const statement = (
          await axios.get("http://127.0.0.1:5000/get_specificstatement/" + id)
        ).data.statement;
        console.log(statement);

        setdriverIdentityA(statement.drivers_identity_a.first_name);
        setdriverIdentityB(statement.drivers_identity_b.first_name);
        setdriver_license_a(statement.drivers_identity_a.driver_license);
        setdriver_license_b(statement.drivers_identity_b.driver_license);
        sethits_a(statement.hits_a);
        sethits_b(statement.hits_b);
        setcircumstances_a(statement.circumstances_a);
        setcircumstances_b(statement.circumstances_b);
        setlocation(statement.location);
        setsignature_a(statement.signature_a);
        setsignature_b(statement.signature_b);

        setDate(statement.date);
        setCommentaire(statement.commentaire);

        console.log(driverIdentityA);
        console.log(driverIdentityB);
      } catch (err) {
        console.log(err);
      }
    }

    get_specificstatement(id_statement);
  }, []);

  const handleStatement = async (target, e) => {
    e.preventDefault();
    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");
    setIsDisabled(true);

    const result = await axios.post("http://localhost:5000/setdecision", {
      statementId: id_statement,
      decision: target,
    });
    toast.success("Decision Made Successfully!");
    console.log(result);
  };

  const handleStatusChange = async (event) => {
    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");
    console.log(
      "http://localhost:5000/statements_status/" + id_statement + "/status"
    );

    const newStatus = event.target.value;
    try {
      await axios.post(
        "http://localhost:5000/statements_status/" + id_statement + "/status",
        {
          case_state: newStatus,
        }
      );
      setStatus(newStatus);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the status.");
    }
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  ///
  useEffect(() => {
    handleListen();
  }, [isListening]);


  const handleListen = () => {
    console.log("Listen");
    if (isListening) {
      SpeechRecognition.startListening();
      SpeechRecognition.onend = () => {
        console.log("continue..");
        SpeechRecognition.startListening();
      };
    } else {
      SpeechRecognition.stopListening();
      SpeechRecognition.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    SpeechRecognition.onstart = () => {
      console.log("Mics on");
    };

    SpeechRecognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setComment(transcript);
      SpeechRecognition.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleComment = async (event, isRemove = false) => {
    event.preventDefault();
    const id_statement = new URLSearchParams(window.location.search).get("id");
    const timestamp = new Date();

    try {
      if (isRemove) {
        await axios.put("http://localhost:5000/remove_comment/" + id_statement, { commentaire: comment, savedNotes });
        toast.success("Comment removed successfully!");
      } else {
        await axios.post("http://127.0.0.1:5000/comment/" + id_statement, { commentaire: comment, timestamp: timestamp, savedNotes });
        toast.success("Comment added successfully!");
      }
      // handle successful response
      setComment("");
      setSavedNotes([]); // clear saved notes
      window.location.reload(); // Reload the page
    } catch (error) {
      // handle error
      const errorMessage = isRemove ? "An error occurred while removing the comment." : "An error occurred while adding the comment.";
      toast.error(errorMessage);
    }
  };

  const predict = async (target, e) => {
    e.preventDefault();
    const search = window.location.search;
    const id_statement = new URLSearchParams(search).get("id");
    setIsDisabled(true);
  
    const prediciton =  await axios.get("http://localhost:5000/", {
      statementId: id_statement,
      decision: target,
    });
    console.log(prediciton);
    const detectionPercentage = calculateDetectionPercentage(target);
    return detectionPercentage;
  };
  const calculateDetectionPercentage = (target) => {
    // Perform detection logic and return percentage value
    return 1; 
  };
  
  
  

  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="mt--10" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <h1 className="mb-0">Mission Order</h1>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <div>
                      <h2>Details About {driverIdentityA}</h2>
                      <hr />
                      <center>
                        <div className="row">
                          <div className="col-md-4">
                          </div>

                          <div className="col-md-4">
                            <h3>UPDATE STATUS</h3>
                            <Input type="select"
                              className="status-dropdown"
                              value={status}
                              onChange={handleStatusChange}
                            >
                              <option value="waiting">Waiting</option>
                              <option value="treated">Treated</option>
                              <option value="inProgress">In Progress</option>
                              <option value="closed">Closed</option>
                            </Input>
                          </div>
                          <div className="col-md-4">
                          </div>
                        </div>
                      </center>
                      <hr />
                      <table className="mx-auto">
                        <thead>
                          <tr>
                            <Row>
                              <Col lg="2">
                                <th>Driver A</th>
                              </Col>
                              <Col lg="2">

                                <th>License A</th>
                              </Col>
                              <Col lg="2">

                                <th>Place of Damage for A</th>
                              </Col>
                              <Col lg="2">

                                <th>Circumstances A</th>
                              </Col>
                              <Col lg="2">

                                <th>Location of the Accident</th>
                              </Col>

                            </Row>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <Row>
                              <Col lg="2">

                                <td>{driverIdentityA}</td>
                              </Col>
                              <Col lg="2">

                                <td>{driver_license_a}</td>
                              </Col>
                              <Col lg="2">

                                <td>{hits_a}</td>
                              </Col>
                              <Col lg="2">

                                <td>{circumstances_a}</td>
                              </Col>
                              <Col lg="2">

                                <td>{location}</td>
                              </Col>
                              <Col lg="2">


                              </Col>

                            </Row>
                          </tr>
                          <tr>
                            <td colspan="6">
                              <hr />
                            </td>{" "}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <div></div></div>
                    <div>
                      <h2>Details About {driverIdentityB}</h2>
                      <hr />
                      <table className="mx-auto">
                        <thead>
                          <tr>
                            <Row>
                              <Col lg="2">
                                <th>Driver B</th>
                              </Col>
                              <Col lg="2">

                                <th>License B</th>
                              </Col>
                              <Col lg="2">

                                <th>Place of Damage for B</th>
                              </Col>
                              <Col lg="2">

                                <th>Circumstances B</th>
                              </Col>
                              <Col lg="2">

                                <th>Location of the Accident</th>
                              </Col>


                            </Row>

                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <Row>
                              <Col lg="2">

                                <td>{driverIdentityB}</td>
                              </Col>
                              <Col lg="2">

                                <td>{driver_license_b}</td>
                              </Col>
                              <Col lg="2">

                                <td>{hits_b}</td>
                              </Col>
                              <Col lg="2">

                                <td>{circumstances_b}</td>
                              </Col>
                              <Col lg="2">

                                <td>{location}</td>
                              </Col>


                            </Row>
                          </tr>
                          <tr>
                            <td colspan="6">
                              <hr />
                            </td>{" "}
                          </tr>
                        </tbody>
                      </table>
                    </div>


                    {showNotification && (
                      <div
                        className="notification"
                        onClick={handleNotificationClose}
                      >
                        Status has been changed.
                      </div>
                    )}

                    <hr className="my-4" />
                    <div>
                      Date of The Accident: {date}
                      <br />
                      "The specifications for experts and actuaries is a
                      document that defines the requirements and standards that
                      experts and actuaries must adhere to in the performance of
                      their duties. This specifications document is based on the
                      Law No. 83-112 of December 12, 1983, which pertains to the
                      general status of personnel in the state, local public
                      authorities, and administrative public establishments
                      (EPA), as well as Law No. 85-78 of August 5, 1985, which
                      pertains to the general status of agents of offices,
                      public establishments with industrial and commercial
                      character, and companies wholly owned by the state or
                      local public authorities (EPIC). The document also
                      includes the fee schedule for automobile experts and loss
                      assessors, as well as the requirements for actuaries. It
                      also includes forms for requests to add or change
                      specialties, requests to change quality, integration of a
                      natural person actuary into a legal entity, and requests
                      for removal from the register."
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "70px", marginBottom: "70px" }}>
                    <div className="col-md-2">

                    </div>
                    <div className="col-md-10">
                      <Button
                        type="Button"
                        onClick={(e) => handleStatement("a", e)}
                        disabled={isDisabled}
                      >
                        Decider pour {driverIdentityA}
                      </Button>
                      <Button
                        type="Button"
                        onClick={(e) => handleStatement("b", e)}
                        disabled={isDisabled}
                      >
                        Decider pour {driverIdentityB}
                      </Button>

                      {/* <Button onClick={generatePDF}>Generate PDF</Button> */}
                      <Button
                        color={showPDF ? "success" : "primary"}
                        onClick={() => setShowPDF(!showPDF)}
                      >
                        {showPDF
                          ? "Hide Downaload Pdf"
                          : "The Pdf Will Be Created Once You Press That Button"}
                      </Button>
                      {showPDF && (
                        <Button color="primary" onClick={generatePDF}>
                          Download PDF
                        </Button>
                      )}


                    </div>


                  </div>


                  <div>
                    <h3>Write A Rapport :</h3>
                  </div>
                  <Form onSubmit={(event) => handleComment(event, false)}>
                    <FormGroup>
                      <Input
                        placeholder="Write Your Notes"
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FormGroup>
                    <Button color="primary" style={{ float: "right" }} type="submit">
                      Add Comment
                    </Button>
                    <Button color="danger" style={{ float: "right", marginRight: "10px" }} onClick={(event) => handleComment(event, true)}>
                      Remove
                    </Button>
                    <div>
                      <Button
                        type="button"
                        onClick={() => setIsListening((prevState) => !prevState)}
                      >
                        {isListening ? "Stop" : "Start"} Saving Comment
                      </Button>
                      <Button type="submit" onClick={(event) => handleComment(event, false)}>
                        Save Comment
                      </Button>
                    </div>
                  </Form>
                
                  <div style={{ backgroundColor: "#eeeee4", borderRadius: "50px", textAlign: "center" }}>
                    <h2 className="mb-0">Expert Comments</h2>
                    <Card>
                      <Row>
                        <Col lg="12">
                          {commentaire}
                          <h2>{timestamp}</h2>
                        </Col>
                      </Row>
                    </Card>
                    <br /><br /><br /><br />
                  </div>



                </CardBody>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailsStatement;
