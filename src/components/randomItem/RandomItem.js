import "./RandomItem.css"
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext } from "react";
import { ethers } from 'ethers';
import NFTContractAddress from "../../json/nft-contract-address.json"

function RandomItem() {
  const { account } = useContext(WalletContext);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.REACT_APP_MINT_NFT_ADDRESS, 
    NFTContractAddress,
    provider.getSigner(0)
  );
  async function RandomCatapult() {
    try{
      if (account.amount < 500) {
    
        alert("You don't have enough CCP Token to random Catapult")
      }
      else {
        const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/random/catapult`);
        const res = await response.json()
        console.log(res)
        const tx = await contract.purchaseToMintCatapult(res.id, res.catapult_gateway, {
          gasLimit: 1000000,
        })
        console.log(tx)
      }
    } catch (err) {
      console.error(err.message);
    }


  }

  async function RandomBullet() {
    try{
      if (account.amount < 300) {
        alert("You don't have enough CCP Token to random Bullet")
      }
      else {
        const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/random/bullet`);
        const res = await response.json()
        const tx = await contract.purchaseToMintBullet(res.id, res.bullet_gateway, {
          gasLimit: 1000000,
        })
        console.log(tx)
      }

    } catch (err) {
      console.error(err.message);
    }
  }

  if (account === null) {
    return (
      <LayoutPage>
      <h2>Please Login</h2>
      </LayoutPage>
    );
  }
  else {
    return (
      <LayoutPage>
        <SelectButtom />
        <Routes>
          <Route
            path="stick"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img" />
                <h2 className="box-text">Common60%    Rare30%  SuperRare10%</h2>
                <button onClick={RandomCatapult} className="box-text random-buttom" >500 Token</button>
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img"/>
                <h2 className="box-text">Common60%    Rare30%  SuperRare10%</h2>
                <button onClick={RandomBullet} className="box-text random-buttom" >300 Token</button>
              </div>

            }
          />
          <Route path="/" element={<Navigate to="stick" replace={true} />} />
        </Routes>
      </LayoutPage>
    );
  }


}
  
  export default RandomItem;