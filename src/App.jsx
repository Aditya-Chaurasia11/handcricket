import { useState, useEffect } from "react";
// import { ethers } from "ethers";
// import abi from "./abi.json";
// import Match from "./Pages/Match";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar.jsx";
import HeadOrTail from "./Pages/Toss/HeadOrTail.jsx";
import CoinRotate from "./Pages/Toss/CoinRotate.jsx";
import MatchHome from "./Pages/Match/MatchHome.jsx";
import { GlobalContextProvider } from "./context/index.jsx";
import Create from "./Pages/Create.jsx";
import Join from "./Pages/Join/Join.jsx";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        {/* <Navbar /> */}

        <Routes>
          <Route
            element={
              <>
                <div className="gradient__bg">
                  <Navbar />
                </div>
                <Home />
              </>
            }
            path="/"
            exact
          />

          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/create" element={<HeadOrTail />} />
          <Route path="/match/:id" element={<MatchHome />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
