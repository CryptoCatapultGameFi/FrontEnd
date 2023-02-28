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
      const response = await fetch(`http://localhost:8080/challenge/${accounts[0]}`);
      console.log(accounts[0])
      if( response.status === 401) {
        throw new Error("This address is not registered");
      }
      const nonce = await response.text()
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [nonce, accounts[0], "secret"]
      });

      const auth = await fetch(`http://localhost:8080/auth`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ signature: signature, address: accounts[0] }),
        });
        if (auth.status === 200) {
          setAccount(accounts[0])
        } else {
          throw new Error(`The API returned ${auth.status}..`);
        }
    } catch (error) {
      alert("Something went wrong" + error);
    }

    // window.ethereum
    //   .request({
    //     method: "eth_requestAccounts",
    //   })
    //   .then((accounts) => {
    //     console.log(accounts[0])

    //     setAccount(accounts[0]); 
    //   })
    //   .catch((error) => {
    //     alert("Something went wrong");
    //   })
 

    

      // const auth = await fetch(`http://localhost:8080/auth`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" }, 
      //   body: JSON.stringify({ signature: signature, address: account }),
      // });
      // if (auth.status === 200) {
      //   console.log("Successfully authenticated.");
      // } else {
      //   throw new Error(`The API returned ${auth.status}..`);
      // }

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
      <NavLink className="app-header-item app-header-address" to="home">Connected as: {formatAddress(account)}</NavLink>
    );
  }
}

export default ConnectButton;