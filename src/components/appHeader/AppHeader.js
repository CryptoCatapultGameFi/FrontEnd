import { NavLink } from 'react-router-dom';
import ConnectButton from '../connectWalletButton/ConnectWalletButton';
import { WalletContext } from "../../App";
import React, { useContext, useState } from "react";
import Cookies from 'js-cookie';
import './AppHeader.css';

function AppHeader() {
  const { account, setAccount } = useContext(WalletContext);
  const [ amountStage, setAmountStage ] = useState(false); 

  function logout() {
    Cookies.remove('accountId');
    setAccount(null)
  }
  
  
  const refectAmount = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/contracts/getAmount/` + account.accountid );
    const responseJson = await response.json()
    const userAccount = {
      accountid: account.accountid,
      amount: responseJson.result,
      selected_catapult: account.selected_catapult,
      selected_bullet:  account.selected_bullet,
      nfts: account.nfts
    }
    setAmountStage(true)
    setAccount(userAccount)
    setTimeout(() => setAmountStage(false), 5000);
  }


  function getNavClass(navLinkProps) {

    let navClass = 'app-header-item';
    if (navLinkProps.isActive) navClass += ' app-header-item-active';
    return navClass;
  }
  if (account === null) {
    return (
      <header className="app-header">
        {/* <NavLink className={getNavClass} to="/" end>Welcome</NavLink> */}
        <img className="app-header-logo" alt="logo" src='/catapult.png' />
        <NavLink className={getNavClass} to="home">Home</NavLink>
        <NavLink className={getNavClass} to="about">About Us</NavLink>
        <ConnectButton onNav={'app-header-wallet app-header-address'} />
      </header>
    );
  }
  else {
    return (
      <header className="app-header">
        {/* <NavLink className={getNavClass} to="/" end>Welcome</NavLink> */}
        <img className="app-header-logo" alt="logo" src='/catapult.png' />
        <NavLink className={getNavClass} to="home">Home</NavLink>
        <NavLink className={getNavClass} to="play">Play</NavLink>
        <NavLink className={getNavClass} to="storage">Storage</NavLink>
        <NavLink className={getNavClass} to="item">Find Item</NavLink>
        <a className={"app-header-item"}href="https://testnets.opensea.io/collection/crypto-catapult-4" >Marketplace</a>
        <a className={"app-header-item"}href="https://app.uniswap.org/" >Swap</a>
        <NavLink className={getNavClass} to="about">About Us</NavLink>

        <button className={'app-header-item app-header-address logout'} onClick={logout}> Logout</button>
        <ConnectButton onNav={'app-header-wallet app-header-address'} />
        <button  onClick={refectAmount} className={'app-header-item app-header-address'} disabled={amountStage}>{account.amount} Token  ↻</button>

      </header>
    );
  }

}

export default AppHeader;
