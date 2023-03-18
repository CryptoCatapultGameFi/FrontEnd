import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../../App";
import formatAddress from "../../util/formatAddress";

function ConnectButton(props) {
  // const networks = {
  //   polygonTestnet: {
  //     chainId: 80001,
  //     chainName: "Mumbai Testnet",
  //     nativeCurrency: {
  //       name: "MATIC",
  //       symbol: "MATIC",
  //       decimals: 18,
  //     },
  //     rpcUrls: ["https://rpc-mumbai.matic.today"],
  //     blockExplorerUrls: ["https://mumbai.polygonscan.com/ "],
  //   },
  // };

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  // state for keeping track of current connected account.
  const {account, setAccount} = useContext(WalletContext);
 
  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const response = await fetch(`http://localhost:5000/contracts/getAmount/` + accounts[0] );
      console.log(accounts[0])  
      const userAmount = await response.json();
      console.log(userAmount.result)
      const userAccount = {
        accountid: accounts[0],
        amount: userAmount.result
      }
      setAccount(userAccount)
    } catch (error) {
      alert("Something went wrong" + error);
    }
  }


  if (account === null) {
    if (isWalletInstalled) {
      return <NavLink className={props.onNav} to="home">
      <button onClick={connectWallet}>Connect Wallet</button>
    </NavLink>
    }
    else { 
      return <p className="app-header-item app-header-address">Plase Install Metamask wallet</p>
    }

  } else {
    return (
      <NavLink className="app-header-item app-header-address" to="home">Connected as: {formatAddress(account.accountid)}</NavLink>
    );
  }
}

export default ConnectButton;