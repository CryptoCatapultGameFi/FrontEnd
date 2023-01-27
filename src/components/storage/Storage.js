import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import './Storage.css';

function getNavClass(navLinkProps) {
    let navClass = 'select-buttom';
    if (navLinkProps.isActive) navClass += ' select-buttom-active';
    return navClass;
  }

function Storage() {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={
              <>
                <h3>Stick</h3>
              </>
            }
          />
          <Route
            path="bullet"
            element={
              <>
                <h3>Bullet</h3>
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default Storage;