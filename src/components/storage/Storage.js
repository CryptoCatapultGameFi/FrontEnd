import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext, useEffect, useState } from "react"; 
import BulletPost from "../bullet/BulletPost";
import CatapultPost from "../stick/StickPost";
import Stone from "../bullet/Bullet";
import './Storage.css'
import Stick from "../stick/Stick";


function Storage() {
  const [selectedScreenNFT, setSelectedScreenNFT] = useState(null);
  const [rubber, setRubber] = useState(3);
  const { account , setAccount } = useContext(WalletContext);
  const [isNoNFT,  setIsNoNFT] = useState(null);
  // const [isNoStick,  setIsNoStick] = useState(null);
  // const [isNoBullet,  setIsNoNFT] = useState(null);
  const [randomStage, setRandomStage] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if(account) {
      getNft();
    }
  },)


  const handleClick = () => {
      navigate("/item");
  }

  const refresh = () => {
    const userAccount = {
      accountid: account.accountid,
      amount: account.amount,
      selected_stick: account.selected_stick,
      selected_bullet:  account.selected_bullet,
      nfts: null
    }
    setRandomStage(true)
    setAccount(userAccount)
    navigate("/storage");

    setTimeout(() => setRandomStage(false), 2000);
  }
  async function getNft() {
    if(account.nfts === null) {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/acc_nft/`+ account.accountid);
      const responseJson = await response.json();
      const userAccount = {
        accountid: account.accountid,
        amount: account.amount,
        selected_stick: account.selected_stick,
        selected_bullet:  account.selected_bullet,
        nfts: responseJson
      }
      setAccount(userAccount)
    }
  }

  async function onNFTClick(nft) {
    if (nft.metadata.type === "catapult") {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/rubber/` + account.accountid + `/` + nft.tokenId)
      const responseJson = await response.json();
      setRubber( 3 - responseJson.count)

    }
    setSelectedScreenNFT(nft);
  }

  function onNFTCloseClick() {
    setSelectedScreenNFT(null);
  }

  function onSelectClick(selectedNFT) {
    let userAccount = null;
    if(selectedNFT.metadata === undefined) {
    }
    else if(selectedNFT.metadata.type === "bullet") {
      userAccount = {
        accountid: account.accountid,
        amount: account.amount,
        selected_stick: account.selected_stick,
        selected_bullet: selectedNFT,
        nfts: account.nfts
      }
      setAccount(userAccount)
    }
    else if (selectedNFT.metadata.type === "catapult") {
      if(rubber > 0) {
        userAccount = {
          accountid: account.accountid,
          amount: account.amount,
          selected_stick: selectedNFT,
          selected_bullet: account.selected_bullet,
          nfts: account.nfts
        }
        setAccount(userAccount)
      }
    }
    setSelectedScreenNFT(null)
  }


  function GetInAppNFT(props) {
    let nonSelectNFT = 0;
    const { type } = props;
    if (account.nfts) {
      setIsNoNFT(false);
      const nftElements = account.nfts.map((nft, index) => {
        let selectText = "Select"
        if(nft.metadata === undefined) {
          nonSelectNFT++
        }
        else if(nft.metadata.type === type) {
          if(type === "bullet") {
            if (account.selected_bullet) {
              if (account.selected_bullet.tokenId === nft.tokenId) {
                selectText = "Selected"
              }
            }
            return <Stone key={index} item={nft} onNFTClick={onNFTClick} selectText={selectText}/>;
          }
          else if(type === "catapult") {
            if (account.selected_stick) {
              if (account.selected_stick.tokenId === nft.tokenId) {
                selectText = "Selected"
              }
            }
            return <Stick key={index} item={nft} onNFTClick={onNFTClick} selectText={selectText}/>;
          }
        }
        else {
          nonSelectNFT++
        }
      return null
        
    })
      if (nonSelectNFT === account.nfts.length) {
        setIsNoNFT(true);
      }
      return nftElements
    }
  }

  // function GetStick() {
  //   let nonSelectStick = 0;
  // }


  let NFTPost = null;
  if (!!selectedScreenNFT) {
    if(selectedScreenNFT.metadata.type === "bullet") {
      NFTPost = <BulletPost item={selectedScreenNFT} onBgClick={onNFTCloseClick} onSelectClick={() => onSelectClick(selectedScreenNFT)} />;
    }
    else if(selectedScreenNFT.metadata.type === "catapult") {
      NFTPost = <CatapultPost item={selectedScreenNFT} onBgClick={onNFTCloseClick} onSelectClick={() => onSelectClick(selectedScreenNFT)} rubber={rubber}/>;
    }

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
        <div className="storageTitle">
          <SelectButtom />
          <button  onClick={refresh} disabled={randomStage}> refresh</button>
        </div>
        <Routes>
          <Route
            path="stick"
            element={ 
              <>
              {isNoNFT && 
              <div>
                <h2> You don't have any Stick </h2>
                <button onClick={handleClick}> Let's Random </button>
              </div>}
              <div className="NFT-div">
                <GetInAppNFT type={"catapult"}/>
              </div>
              {NFTPost}
              </>
            }
          />
          <Route
            path="bullet"
            element={
              <>
              {isNoNFT && 
              <div>
                <h2> You don't have any Bullet </h2>
                <button onClick={handleClick}> Let's Random </button>
              </div>}
              <div className="NFT-div">
                <GetInAppNFT type={"bullet"}/>
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
