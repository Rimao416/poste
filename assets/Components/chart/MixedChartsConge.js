import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import globalFunction from "../../services/globalFunction";
import moment from "moment";
const MixedChartsConge = ({ annee,conge }) => {
  // CHARGER LES DONNES OK
  // CHARGER LES DIX DERNIERES ANNEES

  const series = [

    {
      name: "Congés",
      type: "area",
      data: conge,
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
      },
    },

    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100],
      },
    },
    labels: annee,
    markers: {
      size: 0,
    },
    xaxis: {
      type: "date",
    },
    yaxis: {
      title: {
        text: "Points",
      },
      min: 0,
    },
  };
  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </>
  );
};

export default MixedChartsConge;
