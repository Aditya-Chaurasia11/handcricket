import React, { useEffect } from "react";
import { useGlobalContext } from "../context";

const Match = () => {
  const { signer, contract, instance, publicK } = useGlobalContext();
  let { id } = useParams();

  console.log(id);

  const getMatchDetail = async () => {
    const matchDetail = await contract.getmatchesreEncrepted(publicK, id);
    console.log(matchDetail);
  };

  useEffect(() => {
    console.log("asd");
    getMatchDetail();
    console.log("asd");
  }, [contract]);


  return (
    <>
      <div id="main">
        <div class="score">
          <div class="score1">
            <img
              src="https://www.handcricket.in/static/media/male1.f4c8924a6705ca629a11.png"
              class="img-profile"
            />
            <div>
              <div class="profile-name-container">
                <h6 class="player-name">Adaadd</h6>
                <p class="run-profile">0</p>
              </div>{" "}
              <span id="score">0/0</span>
            </div>
          </div>
          <div class="middle-container">
            <div class="run-display-container">
              <div class="run-display-name">
                Adaadd
                <span class="run-bat">
                  (
                  <svg
                    stroke-width="6"
                    version="1.1"
                    x="0px"
                    y="0px"
                    width="211.4px"
                    class="run-bat"
                    height="212.6px"
                    viewBox="0 0 211.4 212.6"
                  >
                    <path
                      class="st0"
                      d="M0.5,175.1L128,47.4l4.7,5.1c0,0,4.9,3,12.3,1.2c16.5-15.4,53.8-53.2,53.8-53.2s8.4,1,11.9,12.2
 c-14.5,15.2-51.7,52.8-51.7,52.8s-3,8.6,1.4,14.5c3.5,3.9,3.5,3.9,3.5,3.9L37.2,211.7c0,0-5.4,1.7-10.5-1.9s-24-13.4-26.2-34.3"
                    ></path>
                    <path
                      class="st0"
                      d="M145.7,53.7c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M141.3,54.5c0.7,2,2.4,6.3,6.6,10.1c4,3.6,8.2,4.8,10.3,5.3"
                    ></path>
                    <path
                      class="st0"
                      d="M131.5,51.8c1,3.3,3.6,10.2,9.6,16.6c0.5,0.5,1.1,1.1,1.6,1.6c6.8,6.4,14,8.7,17.4,9.5"
                    ></path>
                    <path
                      class="st0"
                      d="M151.6,47c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M158.2,41.4c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M164.1,34.7c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M170.4,28.8c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M176.6,22.6c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M182.6,16.2c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M188.8,10.1c1.7,1.6,14.8,10.4,14.8,10.4"
                    ></path>
                    <path
                      class="st0"
                      d="M193,6.5c0.8,0.4,1.6,0.9,2.5,1.4c1.9,1.2,3.6,2.4,5,3.6c1,0.9,2.3,2.4,3.3,4.3c0.5,1,0.9,1.9,1.2,2.8"
                    ></path>
                    <path
                      class="st0"
                      d="M140.8,68.6c-34.6,34.3-67.6,67.3-102.6,103.3c-10,10-25,6-36.3,1.1"
                    ></path>
                    <path
                      class="st0"
                      d="M143,70.7c-57.1,56.3-98.2,98-100.8,101.4c-0.1,0.2-0.9,1.2-3.3,4.5c-3,4-3.2,4.3-3.6,5
 c-1.5,3-1.4,5.9-1.4,7.9c0.1,3.1,0.8,5.4,1.2,6.9c0.9,3.3,2.1,8.1,2.8,14.6"
                    ></path>
                  </svg>
                  )
                </span>
              </div>
              <div class="run zero">0</div>
            </div>
            <h5 class="over-count">over:0.0</h5>
          </div>
          <div class="score1">
            {/* <img
              src="/static/media/female1.719d2eb8e24df4c2de83.png"
              class="img-profile"
            /> */}
            <div>
              <div class="profile-name-container">
                <h6 class="player-name">Guess </h6>
                <p class="run-profile">0</p>
              </div>{" "}
              <span id="score">0/0</span>
            </div>
          </div>
        </div>
        <div class="container-container">
          <div class="timeout-margin">
            <div class="timer-container">
              <p class="timer">2</p>
              <svg>
                <circle
                  id="circle1"
                  cx="25"
                  cy="25"
                  r="15"
                  style="stroke-dasharray: 93.6405; stroke-dashoffset: 84.2764;"
                ></circle>
              </svg>
            </div>
          </div>

          <div id="buttons">
            <button class="button" fdprocessedid="2nxh">
              <span class="button-span  run-button-span null">
                <span>1</span>
              </span>
            </button>
            <button class="button" fdprocessedid="q4gqzg">
              <span class="button-span  run-button-span null">
                <span>2</span>
              </span>
            </button>
            <button class="button" fdprocessedid="ha4hqn">
              <span class="button-span  run-button-span null">
                <span>3</span>
              </span>
            </button>
            <button class="button" fdprocessedid="50to8q">
              <span class="button-span  run-button-span null">
                <span>4</span>
              </span>
            </button>
            <button class="button" fdprocessedid="ldjx7a">
              <span class="button-span  run-button-span null">
                <span>5</span>
              </span>
            </button>
            <button class="button" fdprocessedid="aha4y8">
              <span class="button-span  run-button-span null">
                <span>6</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Match;
