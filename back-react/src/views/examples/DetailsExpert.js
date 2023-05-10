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
  Form,
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
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Swal from "sweetalert2";

function DetailsExpert() {
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
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState([]);
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [timestamp, settimestamp] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [savedcommentaire, setcommentaire] = useState([]);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [savedNotes, setSavedNotes] = useState([]);
  const [phonenumber, setphonenumber] = useState([]);
  const [scoreshow, setScoreshow] = useState("");
  const [avg, setAvg] = useState();

  const [phonenumber_b, setphonenumber_b] = useState([]);

  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const handlePrediction = async (id) => {
    const response = await axios.post("http://localhost:5000/calc", {
      id: id,
    });

    const score = response.data.sub;

    const reviewstemp = reviews;
    let reviewtemp = reviewstemp.find((elem) => elem._id == id);
    const reviewtempindex = reviewstemp.findIndex((elem) => elem._id == id);
    reviewtemp.score = score;
    reviewstemp[reviewtempindex] = reviewtemp;
    setReviews(reviewstemp);

    console.log(score);
    setScoreshow(score);
    console.log(reviewtemp);
    console.log(reviews);
  };

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");


  useEffect(() => {
    const search = window.location.search;
    const expertid = new URLSearchParams(search).get("id");
    console.log(expertid);

    const fetchUsers = async () => {
      try {
        //get experts
        const experts = (await axios.get("http://localhost:5000/getallexperts"))
          .data.experts;
        const expert = experts.find((e) => e._id == expertid);
        //filter one


        setFirstName(expert.first_name);
        setLastName(expert.last_name);
        setEmail(expert.email);
        setPhone(expert.phone_number);
        setAddress(expert.address);
        setImage(expert.image);


        const allreviews = (
          await axios.get("http://localhost:5000/get_all_reviews")
        ).data.reviews;

        const allexpertreview = allreviews.filter(
          (e) => e.id_expert == expertid
        );
        console.log(allexpertreview);
        setReviews(allexpertreview);

        //get all reviews
        //filter expert
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();

    const id_statement = new URLSearchParams(search).get("id");

    async function get_specificstatement(id) {
      try {
        //   const statement = (
        //     await axios.get("http://127.0.0.1:5000/get_specificstatement/" + id)
        //   ).data.statement;
      } catch (err) {}
    }

    get_specificstatement(id_statement);
  }, []);

  const handleComment = async (event, isRemove = false) => {
    event.preventDefault();
    const id_expert = new URLSearchParams(window.location.search).get("id");

    try {
      await axios.post("http://127.0.0.1:5000/add_review/", {
        id_expert: id_expert,
        review: review,
      });

      setComment("");
      setSavedNotes([]); // clear saved notes
      window.location.reload(); // Reload the page
    } catch (error) {}
  };

  const DetectFraudButton = ({ statementId }) => {
    const handleButtonClick = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fraud_detection/` + statementId
        );
        const { fraudLevel } = response.data;
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while detecting fraud.");
      }
    };
  };

  const Algorithme_prediction = async (e) => {
    e.preventDefault();
    const search = window.location.search;
    const idexpert = new URLSearchParams(search).get("id");

    try {
      const response = await axios.post(`http://localhost:5000/calcavg/`, {
        expertId: idexpert,
      });
      const { avg } = response.data;
      console.log(avg);
      setAvg(avg);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="mt--10" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <div>
                      <h2>Reviews of {firstName +   " " + lastName}</h2>
                      <hr />
                      
                    </div>
                    <div>
                      <div></div>
                    </div>
                    <div>
                      <hr />
                    </div>

                    <div className="text-center">

                      <h3>Sentiment</h3>

                      <Button
                        onClick={Algorithme_prediction}
                        style={{
                          backgroundColor: "#FF5722",
                          color: "#FFF",
                          fontSize: "24px",
                          padding: "16px 32px",
                        }}
                      >
                        Get average sentiment
                      </Button>
                      <h2>{avg && avg + "%"}</h2>
                    </div>
                  </div>

                 

                  <div className="text-center">
                    <h3>Write a review :</h3>
                  </div>
                  <Form onSubmit={(event) => handleComment(event, false)}>
                    <FormGroup>
                      <Input
                        placeholder="Write Your Notes"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </FormGroup>
                    <Button
                      color="primary"
                      style={{ float: "right" }}
                      type="submit"
                    >
                      Add Comment
                    </Button>

                    <div></div>
                  </Form>
                  <br></br>
                  <br></br>
                  <div
                    style={{
                      backgroundColor: "#eeeee4",
                      borderRadius: "50px",
                      textAlign: "center",
                    }}
                  >
                    <h2 className="mb-0">Expert reviews</h2>
                    <Card>
                      {reviews.map((elem) => {
                        return (
                          <Row key={elem._id}>
                            <Col lg="12">
                              <p>{elem.review}</p>{" "}
                              <Button
                                onClick={() => handlePrediction(elem._id)}
                              >
                                Sentiment
                              </Button>
                              <h1>{elem.score && elem.score + "%"}</h1>
                              <hr />
                            </Col>
                          </Row>
                        );
                      })}
                    </Card>
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

export default DetailsExpert;
