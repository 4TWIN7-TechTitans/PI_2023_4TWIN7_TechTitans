import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from "reactstrap";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const Index = () => {
  function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

  const [accidentsCount, setAccidentsCount] = useState({});
  const [topLocations, setTopLocations] = useState([]);

useEffect(() => {
  const fetchStatements = async () => {
    try {
      const response = await fetch("http://localhost:5000/getstatements");
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);
      if (!Array.isArray(data)) {
        throw new Error("Data is not an array");
      }
  
      const formattedData = data.data
      .filter((d) => d.location !== "") // Remove records without a location
      .map((d) => ({ date: new Date(d.date), location: d.location }));
    
  
      // Count the number of accidents per location
      const accidentsCount = formattedData.reduce((counts, d) => {
        counts[d.location] = (counts[d.location] || 0) + 1;
        return counts;
      }, {});
  
      // Get the top 10 locations with the highest number of accidents
      const topLocations = Object.entries(accidentsCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
  
      setAccidentsCount(accidentsCount);
      setTopLocations(topLocations);
    } catch (error) {
      console.error("Error fetching statements:", error);
    }
  };
  

  fetchStatements();
}, []);

  
  

  const chartData = {
    labels: topLocations.map((l) => l[0]),
    datasets: [
      {
        label: "Nombre d'accidents",
        data: topLocations.map((l) => l[1]),
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
      },
    ],
  };


  return (
    <>
      <Header />
      <Card className="shadow"></Card>

      <div>
        <h2>Les 10 emplacements les plus accidentogènes</h2>
        <Bar
          data={chartData}
          options={{
            title: {
              display: true,
              text: "Les 10 emplacements les plus accidentogènes",
              fontSize: 20,
            },
            legend: {
              display: true,
            },
          }}
        />
      </div>
    </>
  );

}

export default Index;