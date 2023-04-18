import LayoutPage from "../../layout/LayoutPage";
import { WalletContext } from "../../App";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Play.css";

function Play() {
  
  const { account } = useContext(WalletContext);
  const [isAlreadyPlayGame, setIsAlreadyPlayGame] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/storage");
  }

  useEffect(() => {
    if(account) {
      isAlreadyPlay();
    }
  },)

  async function isAlreadyPlay() {
    if (isAlreadyPlayGame === false) {
      const response = await fetch(process.env.REACT_APP_BACKEND_PATH + `/user/status/`+ account.accountid);
      const responseJson = await response.json();
      console.log(responseJson)
      setIsAlreadyPlayGame(responseJson.user_playing)
    }

  }

  async function play() {
    try {
      const body = { 
        id: account.accountid, 
        catapult:  account.selected_catapult,
        bullet: account.selected_bullet
      }
      await fetch(process.env.REACT_APP_BACKEND_PATH + "/user/play", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location.href="https://cryptocatapult-f75a8.web.app/";
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
  else if (isAlreadyPlayGame) {
    return (       
    <LayoutPage>
      <div className="play-page">
        <div className="play-content"> 
          <h2 className="already-play-text">You Already In Game</h2>
          <button type="button" className="play-button re-join-button" onClick={play}> Re Join </button>
        </div>
      </div>
  </LayoutPage>
    )
  }
  else if ((account.selected_catapult === null) || (account.selected_bullet === null)) {
    return (
      <LayoutPage>
        <div className="selectCB"> 
          <h2>Please select Catapult and Bullet</h2>
          <button className="storate-button" onClick={handleClick}> Go to storage </button>
        </div>

      </LayoutPage>
    );
  }
  else{
    return (
      <LayoutPage>
        <div className="play-page">
          <div className="play-content">
              <div className="image-content">
                <img className="catapult-play" alt="item-img" src={account.selected_catapult.metadata.image} />
                <img  className="bullet-play" alt="bullet-img" src={account.selected_bullet.metadata.image}  />
              </div>
              <div>
                <button type="button" className="play-button" onClick={play}> Play Crypto Catapult </button>
              </div>
          </div>
        </div>
  
      </LayoutPage>
    );
  }



}

export default Play;
