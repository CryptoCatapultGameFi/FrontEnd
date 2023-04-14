import "./RandomItem.css"
import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPage from "../../layout/LayoutPage";
import SelectButtom from "../../util/selectButtom/SelectButtom";
import { WalletContext } from "../../App";
import React, { useContext, useState } from "react";
import { ethers } from 'ethers';
import contractAddress from '../../json/contract-address.json';
import NFTContractAddress from "../../json/nft-contract-address.json"

function RandomItem() {
  const { account, setAccount } = useContext(WalletContext);
  const [randomStage, setRandomStage] = useState(false);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    process.env.REACT_APP_MINT_NFT_ADDRESS, 
    NFTContractAddress,
    provider.getSigner(0)
  );

  async function approveMetamask() {
    try{
    setRandomStage(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const metamask = new ethers.Contract(
      process.env.REACT_APP_TOKEN_CONTRACT_ADDRESS, 
      contractAddress,
      provider.getSigner(0)
    );
    await metamask.approve(process.env.REACT_APP_MINT_NFT_ADDRESS, 1000000000000000000000n, {
      gasLimit: 1000000,
    })
    setTimeout(() => setRandomStage(false), 1000);
    } catch (err) {
      setRandomStage(false)
      console.error(err.message);
    }
  }

  async function getAmount() {
    const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/contracts/getAmount/` + account.accountid );
    const amount = await response.json()
    const userAccount = {
      accountid: account.accountid,
      amount: amount.result,
      selected_catapult: account.selected_catapult,
      selected_bullet:  account.selected_bullet,
      nfts: account.nfts
    }
    setAccount(userAccount)
    return amount;
  }
  async function RandomCatapult() {
    try{
      setRandomStage(true)
      const amount = getAmount()
      if (amount < 500) {
        alert("You don't have enough CCP Token to random Catapult")
      }
      else {
        const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/random/catapult`);
        const res = await response.json()
        const tx = await contract.purchaseToMintCatapult(res.id, res.catapult_gateway, {
          gasLimit: 1000000,
        })
      }
      setTimeout(() => setRandomStage(false), 1000);
    } catch (err) {
      setRandomStage(false)
      console.error(err.message);
    }


  }

  async function RandomBullet() {
    try{
      setRandomStage(true)
      const amount = getAmount()
      if (amount < 300) {
        alert("You don't have enough CCP Token to random Bullet")
      }
      else {
        const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/random/bullet`);
        const res = await response.json()
        const tx = await contract.purchaseToMintBullet(res.id, res.bullet_gateway, {
          gasLimit: 1000000,
        })
      }
      setTimeout(() => setRandomStage(false), 1000);
    } catch (err) {
      setRandomStage(false)
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
            path="catapult"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img" />
                <h2 className="box-text">Common60%    Rare30%  SuperRare10%</h2>
                <button onClick={RandomCatapult} disabled={randomStage} className="box-text random-buttom" >500 Token</button>
              </div>
            }
          />
          <Route
            path="bullet"
            element={
              <div className="box-item">
                <img className="box" src='/box.png' alt="box-img"/>
                <h2 className="box-text">Common60%    Rare30%  SuperRare10%</h2>
                <button onClick={RandomBullet} disabled={randomStage} className="box-text random-buttom" >300 Token</button>
              </div>

            }
          />
          <Route path="/" element={<Navigate to="catapult" replace={true} />} />
        </Routes>
        <div className="approve-contect">
          <button onClick={approveMetamask} disabled={randomStage} className="re-approve" >ReApprove</button>
        </div>
      </LayoutPage>
    );
  }


}
  
  export default RandomItem;