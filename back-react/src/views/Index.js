import { Card, CardBody ,Jumbotron } from "reactstrap";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js';
const Index = () => {
  const [locationsData, setLocationsData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/accidentogene");
        const data = response.data.result;
        setLocationsData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (locationsData) {
      const labels = ["High Danger Zones", "Medium Danger Zones", "Less Danger Zones"];
      const totalAccidents = locationsData.high_danger_zones.length + locationsData.medium_danger_zones.length + locationsData.less_danger_zones.length;
      const data = [
        locationsData.high_danger_zones.length / totalAccidents * 100,
        locationsData.medium_danger_zones.length / totalAccidents * 100,
        locationsData.less_danger_zones.length / totalAccidents * 100
      ];

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Percentage of Accidents",
            data: data,
            backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
            borderWidth: 1
          }
        ]
      });
    }
  }, [locationsData]);
  /* train model */
  const [bestSite, setBestSite] = useState(null); // add state for best site name
  const [model, setModel] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      const response = await axios.get('http://localhost:5000/get_train_offer');
      setModel(response.data.model);
      setBestSite(response.data.bestSite); // set the best site name
    };

    fetchModel();
  }, []);

  useEffect(() => {
    if (model) {
      const chartData = {
        labels: [],
        datasets: [{
          label: 'TF-IDF Scores',
          data: [],
          backgroundColor: '#36a2eb',
        }],
      };

      Object.entries(model).forEach(([offerId, tfidfScores]) => {
        const offerName = tfidfScores && Object.keys(tfidfScores)[0];
        const score = tfidfScores && Object.values(tfidfScores)[0];
        if (offerName && score) {
          chartData.labels.push(offerName);
          chartData.datasets[0].data.push(score);
        }
      });

      const ctx = document.getElementById('chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    }
  }, [model]);

  /* fin train offer */
  return (
    <>
      <Header />
      <div className="container mt--5">
        <div className="row">
          <div className="col">
            <Card className="shadow">
              <CardBody>
              <Jumbotron><center><h1>Most Accident-Prone Locations : </h1></center></Jumbotron>
               
                <p>Below is a breakdown of the most dangerous locations with respect to the percentage of accidents that occurred there:</p>
                <div style={{ height: "500px" }}>
                  {chartData && (
                    <Bar
                      data={chartData}
                      options={{
                        responsive: true,
                        scales: {
                          yAxes: [{
                            ticks: {
                              beginAtZero: true,
                              precision: 0,
                              callback: (value) => `${value}%`
                            },
                            scaleLabel: {
                              display: true,
                              labelString: "Percentage of Accidents"
                            }
                          }],
                          xAxes: [{
                            scaleLabel: {
                              display: true,
                              labelString: "Location"
                            }
                          }]
                        },
                        legend: {
                          display: true,
                          position: "top"
                        }
                      }}
                    />
                  )}
                </div>
              </CardBody>
            </Card>
            {/* train offer */}
            <div className="row mt-5">
              <div className="col">
                <Card className="shadow">
                  <CardBody>
                    <h3>Train Offer Analysis</h3>
                    <p>Below is a bar chart of the train offer at different sites based on the TF-IDF scores:</p>
                    <div>
                      <h1>Trained Offers</h1>
                      <div>
                        <canvas id="chart" />
                      </div>
                    </div>
                    {bestSite && (
                      
                      <Jumbotron><center><h1>Best Offer is :  {bestSite}</h1></center></Jumbotron>
                    )}
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
