import React from "react";
import "./FeaturedInfo.css";
import { Bar } from "react-chartjs-2";

export default function FeaturedInfo({ title, chiffre, stat, onClick }) {
  return (
    <>
      <div className="featuredItem" onClick={onClick}>
        <span className="featuredTitle">{title}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{chiffre}</span>
        </div>
        <span className="featuredSub">+{stat}</span>
      </div>
    </>
  );
}
