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
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/contracts/getAmount/` + accounts[0] );
      console.log(accounts[0])

      const user = await fetch(process.env.REACT_APP_BACKEND_PATH + `/user/` + accounts[0] );
      const userJson = await user.json();
      if (userJson.status === "new") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const metamask = new ethers.Contract(
          process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, 
          contractAddress,
          provider.getSigner(0)
        );
        await metamask.approve(process.env.REACT_APP_MINT_NFT_ADDRESS, 1000000000000000000000n, {
          gasLimit: 1000000,
        })
        const auth = await fetch(process.env.REACT_APP_BACKEND_PATH + `/user/user/` + accounts[0], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (auth.status !== 200) {
          throw new Error(`Login accout error with status ${auth.status}..`);
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
      alert("Something went wrong of Login User please try again");
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