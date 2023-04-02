import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";

function MultipleRows() {
  const [offres, setOffres] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    speed: 1500,
    rows: 2,
    slidesPerRow: 2,
  };
  const getData = async () => {
    const response = await axios.get("http://127.0.0.1:5000/getlalloffres");
    setOffres(response.data.offres);
    console.log(offres);
  };

  const getHostname = (link) => {
    const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/i;
    const match = link.match(regex);
    const domainWithEnding = match[1];
    const domainWithoutEnding = domainWithEnding
      .split(".")
      .slice(0, -1)
      .join(".");
    return domainWithoutEnding;
  };
  return (
    <div>
      <Slider {...settings}>
        {offres.map((elem) => {
          return (
            <div key={elem.societe} class="card-stats mb-4 mb-xl-0 card">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                      <span class="h2 font-weight-bold mb-0">{elem.societe}</span>
                  </div>
                  <div class="col-auto col"></div>
                </div>
                <p class="mt-3 mb-0 text-muted text-sm">
                  <i class="ni ni-mobile-button"></i>
                  <span class="text-success mr-2">{elem.phone}</span>{" "}
                  <i class="ni ni-email-83"></i>
                  <span class="text-nowrap"> {elem.site}</span>
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default MultipleRows;
