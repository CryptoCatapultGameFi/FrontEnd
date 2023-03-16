import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext, useEffect, useState } from "react";
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


function GetStick(props) {
  const { nfts } = props;
  if (sticks.length === 0) {
    return <h4>You don't have any stick</h4>
  }
  const stickElements = sticks.map((stick, index) => {
    return <Item key={index} item={stick} />;
  })
  return stickElements
}

function GetBullet(props) {
  const { nfts } = props;
  if (nfts.length === 0) {
    return <h4>You don't have any bullet</h4>
  }
  const bulletElements = nfts.map((bullet, index) => {
      return <Stone key={index} item={bullet} />;

  })
  return bulletElements
}


function Storage() {

  const [nfts, setNfts] = useState([]);

  const { account } = useContext(WalletContext);

  async function getNft() {
    const response = await fetch(`http://localhost:5000/nfts/acc_nft/0x3da06950A8f5EB43c97A11F560C22eDAcF5444C0`);
    const responseJson = await response.json();
    setNfts(responseJson);
  }

  useEffect(() => {
      getNft();
  }, [])

  // const nftElements = nfts.map(nft => {
  //   return (

  //   )
  // })


  if (account === null) {
    return (
      <LayoutPage>
      <h2>Please Login</h2>
      </LayoutPage>
    );
  }
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={ 
              <div className="NFT-div">
                <GetStick nfts={nfts}/>
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <>
              <div className="NFT-div">
                <GetBullet nfts={nfts}/>
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
