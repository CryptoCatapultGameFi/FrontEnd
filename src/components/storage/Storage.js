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
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [rubber, setRubber] = useState(3);
  const { account , setAccount } = useContext(WalletContext);
  const [isNoNFT,  setIsNoNFT] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/item");
  }

  async function getNft() {
    const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/acc_nft/`+ account.accountid);
    const responseJson = await response.json();
    setNfts(responseJson);
  }

  async function onNFTClick(nft) {
    if (nft.metadata.type === "catapult") {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/rubber/` + account.accountid + `/` + nft.tokenId)
      const responseJson = await response.json();
      setRubber( 3 - responseJson.count)

    }
    setSelectedNFT(nft);
  }

  function onNFTCloseClick() {
    setSelectedNFT(null);
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
        selected_bullet: selectedNFT
      }
      setAccount(userAccount)
    }
    else if (selectedNFT.metadata.type === "catapult") {
      if(rubber > 0) {
        userAccount = {
          accountid: account.accountid,
          amount: account.amount,
          selected_stick: selectedNFT,
          selected_bullet: account.selected_bullet
        }
        setAccount(userAccount)
      }
    }
    setSelectedNFT(null)
  }

  useEffect(() => {
    if(account !== null) {
      getNft();
    }
  }, )

  function GetInAppNFT(props) {
    let nonSelectNFT = 0;
    setIsNoNFT(false);
    const { nfts, type } = props;
    const nftElements = nfts.map((nft, index) => {
        let selectText = "Select"
        if(nft.metadata === undefined) {
          nonSelectNFT++
        }
        else if(nft.metadata.type === type) {
          if(type === "bullet") {
            if (account.selected_bullet !== null) {
              if (account.selected_bullet.tokenId === nft.tokenId) {
                selectText = "Selected"
              }
            }
            return <Stone key={index} item={nft} onNFTClick={onNFTClick} selectText={selectText}/>;
          }
          else if(type === "catapult") {
            if (account.selected_stick !== null) {
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
    if (nonSelectNFT === nfts.length) {
      setIsNoNFT(true);
    }
    return nftElements
  }


  let NFTPost = null;
  if (!!selectedNFT) {
    if(selectedNFT.metadata.type === "bullet") {
      NFTPost = <BulletPost item={selectedNFT} onBgClick={onNFTCloseClick} onSelectClick={() => onSelectClick(selectedNFT)} />;
    }
    else if(selectedNFT.metadata.type === "catapult") {
      NFTPost = <CatapultPost item={selectedNFT} onBgClick={onNFTCloseClick} onSelectClick={() => onSelectClick(selectedNFT)} rubber={rubber}/>;
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
        <SelectButtom />
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
                <GetInAppNFT nfts={nfts} type={"catapult"}/>
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
                <GetInAppNFT nfts={nfts} type={"bullet"}/>
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
