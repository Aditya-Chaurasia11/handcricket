import React, { useContext, useEffect, useState } from "react";
import HeadOrTail from "./Toss/HeadOrTail";
import { useGlobalContext } from "../context";

const Create = () => {
  const { walletAddress, signer, contract, instance } = useGlobalContext();

  

  const [wait, setwait] = useState(false);
  return (
    <>
      <HeadOrTail />
    </>
  );
};

export default Create;
