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
  const yourSignedContractObject = new ethers.Contract(
    "0xB429cf6C5904829Fd69e99507533d900dC487423", 
    NFTContractAddress,
    provider.getSigner(0)
  );

  async function RandomCatapult() {
    const response = await fetch(`http://localhost:5000/nfts/random/catapult`);
    const res = await response.json()
    console.log(res.id)
    console.log(res.catapult_gateway)
    const tx = yourSignedContractObject.purchaseToMintCatapult(res.id, res.catapult_gateway, {
      gasLimit: 1000000,
    })

  }

  async function RandomBullet() {
    const response = await fetch(`http://localhost:5000/nfts/random/bullet`);
    const res = await response.json()
    const tx = yourSignedContractObject.purchaseToMintBullet(res.id, res.bullet_gateway, {
      gasLimit: 1000000,
    })
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
                <h2 className="box-text">Common50%  Uncommon25%    Rare13%  UltraRare7%</h2>
                <button onClick={RandomCatapult} className="box-text random-buttom" >500 Token</button>
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img"/>
                <h2 className="box-text">Uncommon60%    Rare30%  UltraRare10%</h2>
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