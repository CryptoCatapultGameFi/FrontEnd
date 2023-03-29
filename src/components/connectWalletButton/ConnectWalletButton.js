import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../../App";
import formatAddress from "../../util/formatAddress";
import { ethers } from 'ethers';
import contractAddress from '../../json/contract-address.json';

function ConnectButton(props) {

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
      const auth = await fetch(`http://localhost:5000/user/user/` + accounts[0], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (auth.status !== 200) {
        throw new Error(`Login accout error with status ${auth.status}..`);
      }
      const user = await auth.json();
      if (user.status === "new") {
        try{
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const metamask = new ethers.Contract(
            "0x2f908f39f01eE4B07246A8582Ba49aFfeCF0Dc2F", 
            contractAddress,
            provider.getSigner(0)
          );
          await metamask.approve("0xB429cf6C5904829Fd69e99507533d900dC487423", 1000000000000000000000n, {
            gasLimit: 1000000,
          })
        } catch (err) {
          console.error(err.message);
      }
      }
      
      const userAmount = await response.json();
      const userAccount = {
        accountid: accounts[0],
        amount: userAmount.result,
        selected_stick: null,
        selected_bullet: null
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
      return <a className="app-header-item app-header-address" href="https://metamask.io/download/"> Plase Install Metamask wallet</a>
    }

  } else {
    return (
      <NavLink className="app-header-item app-header-address" to="home">Connected as: {formatAddress(account.accountid)}</NavLink>
    );
  }
}

export default ConnectButton;