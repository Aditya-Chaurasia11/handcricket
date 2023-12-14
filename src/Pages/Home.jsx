import React, { useEffect } from "react";
import video from "../images/planet-71428-Original--unscreen.gif";
import "./home.css";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Home = () => {
  const Navigate = useNavigate();

  const { walletAddress, signer, contract, instance } = useGlobalContext();
  const checkmatches = async () => {
    const matchidx = await contract.mapaddress(walletAddress);
    console.log(matchidx?.toNumber());

    if (matchidx?.toNumber() !== 0) Navigate(`/match/${matchidx?.toNumber()}`);
  };
  useEffect(() => {
    checkmatches();
  }, [contract, walletAddress]);
  return (
    <div className="home_container">
      <img src={video}></img>
      <h1>
        Cricket,Social Media & <br></br>The Power of Decentraliztion
      </h1>
      <p>GET STARTED</p>
      <div className="home_container_button">
        <Link to="/create">
          <button className="home_container_button_first">Create Game</button>
        </Link>
        <button className="home_container_button_second">Join Game</button>
      </div>
    </div>
  );
};

export default Home;
