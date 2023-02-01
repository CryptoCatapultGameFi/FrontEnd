import { NavLink } from 'react-router-dom';
import './AppHeader.css';

function AppHeader() {
  function getNavClass(navLinkProps) {
    let navClass = 'app-header-item';
    if (navLinkProps.isActive) navClass += ' app-header-item-active';
    return navClass;
  }

  return (
    <header className="app-header">
      {/* <NavLink className={getNavClass} to="/" end>Welcome</NavLink> */}
      <img className="app-header-logo" src='/catapult.png' />
      <NavLink className={getNavClass} to="home">Home</NavLink>
      <NavLink className={getNavClass} to="play">Play</NavLink>
      <NavLink className={getNavClass} to="storage">Storage</NavLink>
      <NavLink className={getNavClass} to="item">Find Item</NavLink>
      <NavLink className={getNavClass} to="marketplace">Marketplace</NavLink>
      <NavLink className={getNavClass} to="about">About Us</NavLink>
      <NavLink className="app-header-item app-header-address" to="login">Address</NavLink>
    </header>
  );
}

export default AppHeader;