import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  async function connectWallet() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        console.log(accounts[0])
        setAccount(accounts[0]);
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  }

  if (account === null) {
    return (
      <div className="App">
        {isWalletInstalled ? (
          <div>
            <NavLink className={props.getNavClass} to="home">
              <button onClick={connectWallet}>Connect Wallet</button>
            </NavLink>
          </div>
        ) : (
          <p>Install Metamask wallet</p>
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
      <NavLink className="app-header-item app-header-address" to="home">Connected as: {formatAddress(account)}</NavLink>

      </div>
    );
  }
}

export default ConnectButton;
