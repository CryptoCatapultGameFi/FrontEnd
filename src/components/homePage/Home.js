import LayoutPage from "../../layout/LayoutPage";
import React, { useEffect, useState } from "react"; 
import "./Home.css"

function Home() {
  const [totalBullet, setTotalBullet] = useState(0);
  const [totalCatapult, setTotalCatapult] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  async function getAllNfts() {
    if(totalBullet === 0) {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/nfts/all/` + process.env.REACT_APP_ALL_NFT_ADDRESS);
      const responseJson = await response.json();
      setTotalBullet(responseJson.totalBullet)
      setTotalCatapult(responseJson.totalCatapult)
      setTotalUser(responseJson.totalUser)
    }
  }

  useEffect(() => {
    getAllNfts()
  }, )

  return (
    <LayoutPage>
      <div>
        <div className="home">
          <h2 className="home-text-head">Crypto Catapult  Statistics </h2>
          <div className="home-stat">
          <img className="home-text-img user-img" alt="logo" src='/user.jpg' />
          <h1 className="home-text number">{totalUser} </h1>
          <h1 className="home-text">Users </h1>
          </div>
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
        <div className="instruction-contract"> 
          <h2 className="home-text-head">Instruction/ContractUs </h2>
          <div className="instruction">
            <a className="inst-text more-prio" href="https://docs.google.com/document/d/1t1mMhwzs6SwVCHOi5hBrcxaFqhmyaJDaVJVyYfsvO7Y" target="_blank" rel="noopener noreferrer"> Login </a>
            <a className="inst-text" href="https://docs.google.com/document/d/1D35ZMYzVFjFW-JVNY_NTNBlXM1G5taf-sJgMf_-DlmE/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> How to get CCP token</a>
            <a className="inst-text" href="https://docs.google.com/document/d/1MYA-b1qzsprLie6j1HZM77P1NdWHOIhclODz0uLT5wE/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> How to play </a>
            <a className="inst-text" href="https://docs.google.com/document/d/1NLXiYCPwXmQ9Qv5MfmKXdz76dUY6cl6qlFndOg40L7w/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> Find Item </a>
            <a className="inst-text" href="https://docs.google.com/document/d/17R9RwxV0oT1B44iGDjclik3DOFNEnFbm2lsqR6EVz_w/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> Marketplace </a>
            <a className="inst-text" href="https://docs.google.com/document/d/1wVn70liWX78yQV75INIwzIpxuuigUSjFYhFRiyIpaos/edit?usp=sharing" target="_blank" rel="noopener noreferrer"> Swap </a>
          </div>
          <div className="contract">
            <a className="inst-text more-prio" href="https://docs.google.com/forms/d/e/1FAIpQLSfkdspQi5oq8o-nb8ZgW9bgF76lhEXs_HZyzi4W6iuTJQQ5FA/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer"> Get CCP token(first time) </a>
            <a className="inst-text" href="https://docs.google.com/forms/d/e/1FAIpQLSdUO5hV76zv2Xnkp64cuycN9PkIfocC9u8eo5yVIgOpAln-rQ/viewform" target="_blank" rel="noopener noreferrer"> Feedback </a>
            <a className="inst-text" href="https://docs.google.com/forms/d/e/1FAIpQLSfvFph_OaGe3uJZSf3S_GdnS5qVXCxv1-EdNygV8Tg1kBdV8w/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer"> Problem </a>  
          </div>
        </div>
      </div>
    </LayoutPage>
  );
}

export default Home;