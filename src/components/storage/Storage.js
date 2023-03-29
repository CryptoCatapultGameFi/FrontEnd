import { Navigate, Route, Routes } from "react-router-dom";
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

  async function getNft() {
    const response = await fetch(`http://localhost:5000/nfts/acc_nft/`+ account.accountid);
    const responseJson = await response.json();
    setNfts(responseJson);
  }

  async function onNFTClick(nft) {
    if (nft.metadata.type === "catapult") {
      console.log(nft.tokenId)
      const response = await fetch(`http://localhost:5000/nfts/rubber/` + account.accountid + `/` + nft.tokenId)
      const responseJson = await response.json();
      setRubber( 3 - responseJson.count)
      console.log(rubber)
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
      getNft();
  }, [])

  function GetInAppNFT(props) {
    let nonSelectNFT = 0;
    const { nfts, type } = props;
    const bulletElements = nfts.map((nft, index) => {
        if(nft.metadata === undefined) {
          nonSelectNFT++
        }
        else if(nft.metadata.type === type) {
          if(type === "bullet") {
            return <Stone key={index} item={nft} onNFTClick={onNFTClick}/>;
          }
          else if(type === "catapult") {
            return <Stick key={index} item={nft} onNFTClick={onNFTClick} />;
          }
        }
        else {
          nonSelectNFT++
        }
        
    })
    if (nonSelectNFT === nfts.length) {
      return <h4>You don't have any {type}</h4>
    }
    return bulletElements
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
