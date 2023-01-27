import { NavLink } from "react-router-dom";
import './SelectButtom.css';

function getNavClass(navLinkProps) {
    let navClass = 'select-buttom';
    if (navLinkProps.isActive) navClass += ' select-buttom-active';
    return navClass;
  }


  function SelectButtom() {
    return (
        <div className="div-buttom">
        <p>
          <NavLink className={getNavClass} to="stick">Stick</NavLink>
          <NavLink className={getNavClass} to="bullet">Bullet</NavLink>
        </p>
        </div>
    );
  }
  
  export default SelectButtom;