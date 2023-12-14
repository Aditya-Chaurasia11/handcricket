import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context";
import CardAvaMatches from "./CardAvaMatches";
import "./avaMatch.css";

const AvaMatches = () => {
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
    // await contract.join(ind);
    console.log(ind);
  };

  useEffect(() => {
    contract && getAllMatches();
  }, [contract]);

  return (
    <div className="avamatch_container">
      {allMatchesList.map(
        (k, ind) => {
          if (k[2][1] === zeroAddress && k[2][0] !== zeroAddress) {
            return <CardAvaMatches add={k[2][0]} id={ind} />;
          }
        }
      )}
    </div>
  );
};

export default AvaMatches;
