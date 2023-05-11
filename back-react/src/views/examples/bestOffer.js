import { Card, CardBody, Jumbotron } from "reactstrap";
import Header from "components/Headers/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js';
const BestOffer = () => {
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
        </>
    );
};

export default BestOffer;
