import React, { useState, useEffect } from "react";
import "./headortail.css";
import coin from "../../images/coin-tail-removebg-preview.png";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useGlobalContext } from "../../context";
import { Navigate, useNavigate } from "react-router-dom/dist";
import { ethers } from "ethers";

const HeadOrTail = () => {
  //   const [select, useSelect] = useState(false);
  const { signer, contract, instance, publicK } = useGlobalContext();

  const { width, height } = useWindowSize();

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [toss, setToss] = useState(false);
  const [name, setName] = useState(1);
  const [choose, setChoose] = useState(false);
  const [win, setWin] = useState(0);
  const [wait, setWait] = useState(false);
  const [id, setId] = useState(0);

  const navigate = useNavigate();

  const handleClick = async (choice, e) => {
    e.target.classList.add("clicked");
    try {
      setTimeout(async () => {
        e.target.classList.remove("clicked");
        setName(choice);
        setToss(true);

        console.log("asda", publicK);

        if (signer && contract && publicK.length > 0) {
          const txn = await contract.createGame(choice);
          await txn.wait();
          console.log("successful");
          // const provider = new ethers.providers.Web3Provider(window.ethereum);

          // const publicKey = await provider.call({
          //   to: "0x0000000000000000000000000000000000000044",
          // });
          const lastMatchDetail = await contract.getlastToss(publicK);

          console.log(lastMatchDetail);
          const iswon = instance.decrypt(contract.address, lastMatchDetail);
          console.log("sdgsd", iswon);
          setWin(iswon);

          // display 1sec toss result and then redirect to game page

          const matchidx = await contract.getnoofmatches();

          // use navigate to /Match/id
          console.log(matchidx.toNumber());
          setId(matchidx.toNumber() - 1);
          setChoose(true);
        }
      }, 350);
      console.log(choice);

      // setTimeout(() => {
      //   setChoose(true);
      // }, 4200);
    } catch (error) {
      console.log(error);
    }
  };

  const startgameHandler = (e) => {
    e.target.classList.add("clicked");
    setTimeout(() => {
      e.target.classList.remove("clicked");
      navigate(`/match/${id}`);
    }, 350);
  };

  const text = "...";
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        setDisplayText(""); // Clear the text to restart typing
        setCurrentIndex(0);
      }
    }, 600);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [currentIndex, text]);

  return (
    <div className="headortail_container">
      <div className="headortail_container_card">
        {!toss ? (
          <>
            <div className="headortail_container_upper">
              <h1>What do you call?</h1>
            </div>
            <div className="headortail_container_lower">
              <button
                className="lifted-button"
                onClick={(e) => handleClick(1, e)}
              >
                Heads
              </button>
              <button
                className="lifted-button"
                onClick={(e) => handleClick(0, e)}
              >
                Tails
              </button>
            </div>
          </>
        ) : !choose ? (
          <div className="coin_container">
            <h1>You choose {name}</h1>
            <div className="coin rotate">
              <img className="front" src={coin}></img>
            </div>
          </div>
        ) : (
          <div className="result_container">
            <Confetti width={width} height={height} />
            <h1>{win ? "You won the game " : "you losse"}</h1>

            <div className="result_container_lower">
              <button
                className="lifted-button"
                onClick={(e) => startgameHandler(e)}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeadOrTail;
