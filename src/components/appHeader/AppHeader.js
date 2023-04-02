import { NavLink } from 'react-router-dom';
import ConnectButton from '../connectWalletButton/ConnectWalletButton';
import { WalletContext } from "../../App";
import React, { useContext } from "react";
import Cookies from 'js-cookie';
import './AppHeader.css';

function AppHeader() {
  const { account, setAccount } = useContext(WalletContext);
  
  function logout() {
    Cookies.remove('accountId');
    setAccount(null)
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
        <NavLink className={getNavClass} to="marketplace">Marketplace</NavLink>
        <a className={"app-header-item"}href="https://app.uniswap.org/"  to="about">Swap</a>
        <NavLink className={getNavClass} to="about">About Us</NavLink>

        <button className={'app-header-item app-header-address logout'} onClick={logout}> Logout</button>
        <ConnectButton onNav={'app-header-wallet app-header-address'} />
        <a href="#/" className={'app-header-item app-header-address'} to="about">{account.amount} Token</a>

      </header>
    );
  }

}

export default AppHeader;
