import LayoutPage from "../../layout/LayoutPage";
import React, { useEffect, useState } from "react"; 
import "./Home.css"

function Home() {
  const [totalBullet, setTotalBullet] = useState(0);
  const [totalCatapult, setTotalCatapult] = useState(0);

  async function getAllNfts() {
    if(totalBullet === 0) {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/all/` + process.env.REACT_APP_ALL_NFT_ADDRESS);
      const responseJson = await response.json();
      setTotalBullet(responseJson.totalBullet)
      setTotalCatapult(responseJson.totalCatapult)
    }
  }

  useEffect(() => {
    getAllNfts()
  }, )

  return (
    <LayoutPage>
      <div className="home">
        <h2 className="home-text-head">Crypto Catapult  Statistics </h2>
        <div className="home-stat">
        <img className="home-text-img" alt="logo" src='/catapult.png' />
        <h1 className="home-text number">{totalCatapult} </h1>
        <h1 className="home-text">Catapults </h1>
        </div>
        <div className="home-stat">
        <img className="home-text-img" alt="logo" src='/stone.png' />
        <h1 className="home-text number">{totalBullet} </h1>
        <h1 className="home-text">Bullets </h1>
        </div>
      </div>
    </LayoutPage>
  );
}

export default Home;