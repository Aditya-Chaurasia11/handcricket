import { ethers } from "ethers";
import { createInstance, initFhevm } from "fhevmjs";
import abi from "../abi.json";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  // console.log("hi");
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setcontract] = useState();
  const [signer, setsigner] = useState();
  const [instance, setinstance] = useState();
  const [publicK, setPublic] = useState([]);


  const oldContractaddress = "0x21c0538D451B7F7fD39fB2c30B767a3d7A55E382";
  const getAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });
    setWalletAddress(accounts[0]);
    
  };
  useEffect(() => {
    getAddress();
  }, [walletAddress]);

  const getcontract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const Signer = await provider.getSigner();
    setsigner(Signer);
    const Contract = new ethers.Contract(
      "0xe74A2b7F029775F445e61296Ad6fEF31D498C431",
      abi,
      Signer //here edit signer
    );
    setcontract(Contract);
  };
  useEffect(() => {
    getcontract();
  }, []);

  const getInstance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    const publicKey = await provider.call({
      to: "0x0000000000000000000000000000000000000044",
    });
    await initFhevm();
    const Instance = await createInstance({ chainId, publicKey });
    setinstance(Instance);

    const generatedToken = Instance.generateToken({
      verifyingContract: contract.address,
    });
    setPublic(generatedToken.publicKey);
    console.log(generatedToken.publicKey);
  };

  useEffect(() => {
    contract && getInstance();
  }, [contract]);

  return (
    <GlobalContext.Provider
      value={{
        walletAddress,
        signer,
        contract,
        instance,
        publicK,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
