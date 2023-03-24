import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext, useEffect, useState } from "react"; 
import BulletPost from "../bullet/BulletPost";
import Stone from "../bullet/Bullet";
import './Storage.css'
import Stick from "../stick/Stick";


// const sticks = [
//   {
//     name: "Stick1",
//     power: "90",
//     rubber: "5"
//   },
//   {
//     name: "Stick2",
//     power: "120",
//     rubber: "3"
//   }
// ]







function Storage() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nfts, setNfts] = useState([]);
  const { account } = useContext(WalletContext);

  async function getNft() {
    const response = await fetch(`http://localhost:5000/nfts/acc_nft/0x3da06950A8f5EB43c97A11F560C22eDAcF5444C0`);
    const responseJson = await response.json();
    setNfts(responseJson);
  }

  function onNFTClick(nft) {
    setSelectedNFT(nft);
  }

  function onNFTCloseClick() {
    setSelectedNFT(null);
  }


  useEffect(() => {
      getNft();
  }, [])

  function GetStick(props) {
    let nonStick = 0;
    const { nfts } = props;
    const stickElements = nfts.map((stick, index) => {
      if(stick.name === "Stick") {
        return <Stick key={index} item={stick} onNFTClick={onNFTClick} />;
      }
      nonStick++
  })
  if (nonStick === nfts.length) {
    return <h4>You don't have any stick</h4>
  }
  
    return stickElements
  }

  function GetBullet(props) {
    let nonBullet = 0;
    const { nfts } = props;
    const bulletElements = nfts.map((bullet, index) => {
        if(bullet.name === "Bullet") {
          return <Stone key={index} item={bullet} onNFTClick={onNFTClick}/>;
        }
        nonBullet++
    })
    if (nonBullet === nfts.length) {
      return <h4>You don't have any bullet</h4>
    }
    return bulletElements
  }


  let NFTPost = null;
  if (!!selectedNFT) {
    NFTPost = <BulletPost item={selectedNFT} onBgClick={onNFTCloseClick} />;
  }

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
              <>
              <div className="NFT-div">
                <GetStick nfts={nfts}/>
              </div>
              {NFTPost}
              </>
            }
          />
          <Route
            path="bullet"
            element={
              <>
              <div className="NFT-div">
                <GetBullet nfts={nfts}/>
              </div>
              {NFTPost}
              </>
            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }
  
  export default Storage;
