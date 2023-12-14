import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useScratch } from "react-use";
import AvaMatches from "../../components/AvaMatches";
import AllMatches from "../../components/AllMatches";
import './join.css'


const Join = () => {
  const zeroAddress = "0x0000000000000000000000000000000000000000";
  const { walletAddress, signer, contract, instance, publicK } =
    useGlobalContext();

  const [allMatchesList, setAllMatchesList] = useState([]);

  const getAllMatches = async () => {
    const getAllMatches = await contract.getallmatches();
    console.log(getAllMatches);
    setAllMatchesList(getAllMatches);
  };

  const joinMatchHandler = async (ind) => {
    await contract.join(ind);
    console.log(ind);
  };

  useEffect(() => {
    contract && getAllMatches();
  }, [contract]);

  const [activeComponent, setActiveComponent] = useState("component1");

  const showComponent = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="join_container">
      <h1>Join matches</h1>

      <div className="join_container_body">
        <div id="nav1" className="home_nav_div_container">
          <p
            onClick={() => showComponent("component1")}
            className={activeComponent === "component1" ? "active join_nav" : "inactive join_nav"}
          >
            Availabe matches
          </p>
          <p
            onClick={() => showComponent("component2")}
            className={activeComponent === "component2" ? "active join_nav" : "inactive join_nav"}
          >
            All matches
          </p>
        </div>

        <div
          id="component1"
          style={{
            display: activeComponent === "component1" ? "block" : "none",
          }}
        >
          <AvaMatches />
        </div>

        <div
          id="component2"
          style={{
            display: activeComponent === "component2" ? "block" : "none",
          }}
        >
          <AllMatches />
        </div>
      </div>

      
    </div>
  );
};

export default Join;
