import React, { useState } from "react";
import "./CoinFlip.css";
import coin from "../../images/coin-tail-removebg-preview.png";

const CoinRotate = () => {
  return (
    <div className="coin rotate">
      <img className="front" src={coin}></img>
    </div>
  );
};

export default CoinRotate;
