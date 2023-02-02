import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
 import Item from "../item/item";
import Stone from "../bullet/Bullet";
import './Storage.css'


const sticks = [
  {
    name: "Stick1",
    power: "90",
    rubber: "5"
  },
  {
    name: "Stick2",
    power: "120",
    rubber: "3"
  }
]
const bullets = [
  {
    name: "Stone",
    power: "none"
  }
]


function GetStick() {
  if (sticks.length === 0) {
    return <h4>You don't have any stick</h4>
  }
  const stickElements = sticks.map((stick, index) => {
    return <Item key={index} item={stick} />;
  })
  return stickElements
}

function GetBullet() {
  if (bullets.length === 0) {
    return <h4>You don't have any bullet</h4>
  }
  const stickElements = bullets.map((bullet, index) => {
    return <Stone key={index} item={bullet} />;
  })
  return stickElements
}


function Storage() {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={ 
              <div className="NFT-div">
                <GetStick />
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <>
              <div className="NFT-div">
                <GetBullet />
              </div>
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default Storage;
