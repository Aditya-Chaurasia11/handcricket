import React from "react";
import "./cardavamat.css";

const CardAvaMatches = ({ add, id }) => {
  const joinHandler = async (e, ind) => {
    // await contract.join(ind);
    e.target.classList.add("clicked");
    setTimeout(async () => {
      e.target.classList.remove("clicked");
    }, 350);
    console.log(ind);
  };
  return (
    <div className="card_ava_container">
      <div className="card_ava_container_upper">
        <p className="host">Host : {add.slice(0, 22)}</p>
        <div className="card_ava_container_middle">
          <p className="room">Room Code : {id}</p>
          <p>Status : Ended</p>
        </div>
      </div>
      <button className="lifted-button" onClick={(e) => joinHandler(e, id)}>
        Join now
      </button>
    </div>
  );
};

export default CardAvaMatches;
