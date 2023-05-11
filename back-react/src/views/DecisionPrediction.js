import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Label,
  Button,
} from "reactstrap";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

// "Explain things like you would to a 10 year old learning how to code."


const DecisionPrediction = () => {
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }
  const [statementId, setStatementId] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleTrainClick = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainmodel');
      //console.log(response.data);
        } catch (error) {
      console.error(error);
    }
  };

  const handlePredictClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/predict', { statementId });
      setPrediction(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Header />
      <div>
        <h1>Train and Predict</h1>
        <Button onClick={handleTrainClick}>Train Model</Button>
        <br />
        <br />
        <Label>
          Statement ID:
          <input type="text" value={statementId} onChange={(event) => setStatementId(event.target.value)} />
          
        </Label>
        <br />
        <br />
        <Button onClick={handlePredictClick}>Predict</Button>
        <br />
        <br />
        {prediction && <p>Prediction: {prediction}</p>}
      </div>
    </>
  );
};

export default DecisionPrediction;
