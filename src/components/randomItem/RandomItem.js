import "./RandomItem.css"
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";

function RandomItem() {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img" />
                <h2 className="box-text">Common50%  Uncommon25%    Rare13%  UltraRare7%</h2>
                <p className="box-text random-buttom">500 Token</p>
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img"/>
                <h2 className="box-text">Uncommon60%    Rare30%  UltraRare10%</h2>
                <p className="box-text random-buttom">300 Token</p>
              </div>

            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default RandomItem;