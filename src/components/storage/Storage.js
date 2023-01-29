import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import Item from "../item/Item";
import './Storage.css'


const sticks = [
  {
    name: "stick1",
    stat: "15"
  },
  {
    name: "stick2",
    stat: "16"
  }
]
const bullets = []


function GetStick() {
  if (sticks.length === 0) {
    console.log("test");
    return <h4>You don't have any stick</h4>
  }
  const stickElements = sticks.map((stick, index) => {
    return <Item key={index} item={stick} />;
  })
  return stickElements
}

function GetBullet() {
  if (bullets.length === 0) {
    console.log("test");
    return <h4>You don't have any bullet</h4>
  }
  // const stickElements = sticks.map((stick, index) ==> {
  //   return <
  // })
  // return  
}


function Storage() {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={ 
              <div className="NFT-item">
                <GetStick />
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <>
                <h3>Bullet</h3>
                <GetBullet />
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default Storage;
