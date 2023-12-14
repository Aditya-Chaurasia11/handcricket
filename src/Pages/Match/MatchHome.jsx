import React, { useEffect, useState } from "react";
import "./matchhome.css";
import avatar from "../../images/avatar.png";
import { useGlobalContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom/dist";
import Waiting from "../../components/Waiting";
import WaitingForMove from "../../components/WaitingForMove";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import sourceData from "./temp.json";

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

function createData(Player, Score) {
  return { Player, Score };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MatchHome = () => {
  const [pal1, setPlay1] = useState("");
  const [pal2, setPlay2] = useState("");
  const [isBat, setIsBat] = useState(false);
  const [wait, setWait] = useState(false);
  const [currPlayerIndex, setCurrPlayerIndex] = useState(0);
  const [lastPlaSr, setLastPlaSr] = useState(0);
  const [pla1TotSr, setPla1TotSr] = useState(0);
  const [pla1Wk, setPla1Wk] = useState(0);
  const [totalscorePla1, setTotalScorePla1] = useState(0);
  const [totalscorePla2, setTotalScorePla2] = useState(0);
  const [choice, setChoice] = useState(0);
  const [allPlayerScoreBatP1, setAllPlayerScoreBatP1] = useState([]);
  const [allPlayerScoreBatP2, setAllPlayerScoreBatP2] = useState([]);

  const [dataPlayer1, setDataPlyer1] = useState([]);
  const [dataPlayer2, setDataPlyer2] = useState([]);

  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const handleClick = async (e, ch) => {
    e.target.classList.add("clicked");
    setTimeout(() => {
      e.target.classList.remove("clicked");
    }, 350);

    console.log(ch);
    setChoice(ch);
    try {
      const txn = await contract.registerMove(id, ch);
      // setWait(true);
      await txn.wait();
      getMatchDetail();
      // setWait(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const { walletAddress, signer, contract, instance, publicK } =
    useGlobalContext();

  let { id } = useParams();
  const [isPlayer, setIsplayer] = useState(false);
  const [currMatch, setcurrMatch] = useState([]);

  const getMatchDetail = async () => {
    const matchDetail = await contract.getmatchesreEncrepted(publicK, id);
    console.log(matchDetail);
    setcurrMatch(matchDetail);

    console.log(walletAddress);

    const data1 = [
      {
        name: "Player 1",
        score: instance.decrypt(contract.address, matchDetail[6][0]),
      },
      {
        name: "Player 2",
        score: instance.decrypt(contract.address, matchDetail[6][1]),
      },
      {
        name: "Player 3",
        score: instance.decrypt(contract.address, matchDetail[6][2]),
      },
      {
        name: "Player 4",
        score: instance.decrypt(contract.address, matchDetail[6][3]),
      },
      {
        name: "Player 5",
        score: instance.decrypt(contract.address, matchDetail[6][4]),
      },
    ];

    setDataPlyer1(data1);

    const data2 = [
      {
        name: "Player 1",
        score: instance.decrypt(contract.address, matchDetail[7][0]),
      },
      {
        name: "Player 2",
        score: instance.decrypt(contract.address, matchDetail[7][1]),
      },
      {
        name: "Player 3",
        score: instance.decrypt(contract.address, matchDetail[7][2]),
      },
      {
        name: "Player 4",
        score: instance.decrypt(contract.address, matchDetail[7][3]),
      },
      {
        name: "Player 5",
        score: instance.decrypt(contract.address, matchDetail[7][4]),
      },
    ];

    setDataPlyer2(data2);

    setAllPlayerScoreBatP1(matchDetail[6]);
    setAllPlayerScoreBatP2(matchDetail[7]);

    // if (

    //     matchDetail[2][1] != walletAddress || matchDetail[2][0] != walletAddress

    // ) {
    //   navigate("/");
    // }
    console.log("waaw", walletAddress);
    console.log("njkbku", matchDetail[2][1].toLowerCase() == walletAddress);
    console.log("njkbku", matchDetail[2][0].toLowerCase() == walletAddress);

    if (matchDetail[2][1].toLowerCase() === walletAddress) {
      console.log("asdada", matchDetail[4][1]);
      setWait(matchDetail[4][1]);
    }
    if (matchDetail[2][0].toLowerCase() === walletAddress) {
      console.log("asdada", matchDetail[4][1]);
      setWait(matchDetail[4][0]);
    }

    if (matchDetail[2][1] !== zeroAddress) {
      setIsplayer(true);
      console.log(matchDetail[2][1]);
      setPlay1(matchDetail[2][0]);
      setPlay2(matchDetail[2][1]);

      const isPlayer1Turn = instance.decrypt(contract.address, matchDetail[1]);
      setIsBat(walletAddress === matchDetail[2][0] && isPlayer1Turn);
      console.log(walletAddress === matchDetail[2][0] && isPlayer1Turn);
      console.log(isPlayer1Turn);

      const currPlayerInd = instance.decrypt(contract.address, matchDetail[5]);
      setCurrPlayerIndex(currPlayerInd);

      //total score
      let totalscoreP1 = 0;
      for (let i = 0; i < 5; i++) {
        const temp = instance.decrypt(contract.address, matchDetail[6][i]);
        totalscoreP1 = totalscoreP1 + temp;
      }
      console.log(totalscoreP1);
      setTotalScorePla1(totalscoreP1);

      let totalscoreP2 = 0;
      for (let i = 0; i < 5; i++) {
        const temp = instance.decrypt(contract.address, matchDetail[7][i]);
        totalscoreP2 = totalscoreP2 + temp;
      }
      console.log(totalscoreP2);
      setTotalScorePla2(totalscoreP2);

      // console.log(currPlayerInd);
      if (isPlayer1Turn) {
        const score = instance.decrypt(
          contract.address,
          matchDetail[6][currPlayerInd]
        );
        console.log(score);
        setLastPlaSr(score);

        // setLastPlayerScore(matchDetail[6]);

        console.log(matchDetail[6]);
      } else {
        const score = instance.decrypt(
          contract.address,
          matchDetail[7][currPlayerInd]
        );
        // setAllPlayerScoreBatP2(matchDetail[7]);
        console.log(matchDetail[7]);
        console.log(score);
        setLastPlaSr(score);
      }
    } else {
      console.log("asdadsadad");
    }
  };

  contract?.on("playeradded", (...args) => {
    const [ind, add] = args;

    console.log("new added");
    getMatchDetail();
  });

  contract?.on("roundend", (...args) => {
    const [index] = args;

    console.log("new added", index.toNumber());
    console.log(id);
    if (index.toNumber() == id) getMatchDetail();
  });

  // const isPlayerArr = async () => {
  //   if (currMatch[2][1] !== zeroAddress) {
  //     setIsplayer(true);
  //     console.log(currMatch[2][1]);
  //   } else {
  //     console.log("asdadsadad");
  //   }
  // };

  useEffect(() => {
    // console.log("asd");
    getMatchDetail();
    // console.log("asd");
  }, [walletAddress, contract, publicK]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open2, setOpen2] = useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <>
      {isPlayer ? (
        <>
          {!wait ? (
            <div className={`matchhome_container`}>
              <>
                <div className="matchhome_container_upper">
                  <div className="matchhome_container_upper_first">
                    <div className="matchhome_container_upper_first_img">
                      <img src={avatar}></img>
                    </div>
                    <div className="matchhome_container_upper_first_run">
                      <p>{pal1?.slice(0, 5)}...</p>
                      <hr></hr>

                      <p>{totalscorePla1}/0</p>
                    </div>
                  </div>
                  <div className="matchhome_container_upper_second">
                    <div className="matchhome_container_upper_second_up">
                      <p className="para">
                        {isBat ? pal1.slice(0, 5) : pal2.slice(0, 5)}... (X)
                      </p>
                      <hr />
                      <div className="matchhome_container_upper_second_current">
                        <p>{lastPlaSr}</p>
                      </div>
                    </div>
                    <div className="matchhome_container_upper_second_down">
                      <p className="para2">
                        Player {currPlayerIndex + 1} Batting
                      </p>
                    </div>
                  </div>
                  <div className="matchhome_container_upper_third">
                    <div className="matchhome_container_upper_first_img">
                      <img src={avatar}></img>
                    </div>
                    <div className="matchhome_container_upper_first_run">
                      <p>{pal2?.slice(0, 5)}...</p>
                      <hr></hr>
                      <p>{totalscorePla2}/0</p>
                    </div>
                  </div>
                </div>
                <div className="matchhome_container_lower">
                  <div className="matchhome_container_lower_upper">
                    <p>X | {isBat ? "Batting " : "Bowling"}</p>
                  </div>
                  <div>
                    <div className="matchhome_container_lower_lower_left">
                      <button variant="outlined" onClick={handleClickOpen}>
                        view full score
                      </button>
                      <BootstrapDialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="customized-dialog-title"
                        className="dialog_box"
                        maxWidth="xl"
                      >
                        <DialogTitle
                          sx={{ m: 0, p: 2 }}
                          id="customized-dialog-title"
                        >
                          Full match score
                        </DialogTitle>

                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          <CloseIcon />
                        </IconButton>

                        <DialogContent>
                          <DialogContentText
                            id="alert-dialog-slide-description"
                            className="dialogbox_container"
                          >
                            {/* {allPlayerScoreBat.map((k) =>
                              instance.decrypt(contract.address, k)
                            )} */}

                            <TableContainer component={Paper}>
                              <p className="table_p">{pal1.slice(0, 15)}</p>
                              <hr/>
                              <Table
                                sx={{ minWidth: 400 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">Player</TableCell>
                                    <TableCell align="center">Score</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {allPlayerScoreBatP1.map((k, ind) => (
                                    <TableRow
                                      key={ind}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                      >
                                        {ind + 1}
                                      </TableCell>
                                      <TableCell align="center">
                                        {instance.decrypt(contract.address, k)}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>

                            <TableContainer component={Paper}>
                              <p className="table_p">{pal2.slice(0, 15)}</p>
                              <hr></hr>

                              <Table
                                sx={{ minWidth: 400 }}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell align="center">Player</TableCell>
                                    <TableCell align="center">Score</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {allPlayerScoreBatP2.map((k, ind) => (
                                    <TableRow
                                      key={ind}
                                      sx={{
                                        "&:last-child td, &:last-child th": {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        align="center"
                                      >
                                        {ind + 1}
                                      </TableCell>
                                      <TableCell align="center">
                                        {instance.decrypt(contract.address, k)}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </DialogContentText>
                        </DialogContent>
                      </BootstrapDialog>
                    </div>
                    <div className="matchhome_container_lower_lower headortail_container_lower">
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 1)}
                      >
                        1
                      </button>
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 2)}
                      >
                        2
                      </button>
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 3)}
                      >
                        3
                      </button>
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 4)}
                      >
                        4
                      </button>
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 5)}
                      >
                        5
                      </button>
                      <button
                        className="lifted-button"
                        onClick={(e) => handleClick(e, 6)}
                      >
                        6
                      </button>
                    </div>
                    <div className="matchhome_container_lower_lower_left">
                      <button variant="outlined" onClick={handleClickOpen2}>
                        view full score
                      </button>
                      <BootstrapDialog
                        open={open2}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="customized-dialog-title"
                      >
                        <DialogTitle
                          sx={{ m: 0, p: 2 }}
                          id="customized-dialog-title"
                        >
                          Full match score
                        </DialogTitle>

                        <IconButton
                          aria-label="close"
                          onClick={handleClose2}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                          }}
                        >
                          <CloseIcon />
                        </IconButton>

                        <DialogContent>
                          <DialogContentText id="alert-dialog-slide-description">
                            {/* {allPlayerScoreBat.map((k) =>
                              instance.decrypt(contract.address, k)
                            )} */}
                            <p style={{ textAlign: "center" }}>
                              {pal1?.slice(0, 20)}...
                            </p>

                            <ResponsiveContainer width={500} aspect={3}>
                              <BarChart
                                data={dataPlayer1}
                                width={400}
                                height={400}
                              >
                                <XAxis dataKey={"name"} />
                                <YAxis />

                                <Bar dataKey={"score"} fill="#8883d8" />
                              </BarChart>
                            </ResponsiveContainer>
                            <p style={{ textAlign: "center" }}>
                              {pal2?.slice(0, 20)}...
                            </p>

                            <ResponsiveContainer width={500} aspect={3}>
                              <BarChart
                                data={dataPlayer2}
                                width={400}
                                height={400}
                              >
                                <XAxis dataKey={"name"} />
                                <YAxis />

                                <Bar dataKey={"score"} fill="#8883d8" />
                              </BarChart>
                            </ResponsiveContainer>
                          </DialogContentText>
                        </DialogContent>
                      </BootstrapDialog>
                    </div>
                  </div>
                </div>
              </>
            </div>
          ) : (
            <WaitingForMove />
          )}
        </>
      ) : (
        <Waiting />
      )}
    </>
  );
};

export default MatchHome;
