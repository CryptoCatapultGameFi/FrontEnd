import LayoutPage from "../../layout/LayoutPage";
import { WalletContext } from "../../App";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import "./Play.css";

function Play() {
  
  const { account } = useContext(WalletContext);
  const navigate = useNavigate();

  const handleClick = () => {
      navigate("/storage");
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
  else if ((account.selected_catapult === null) || (account.selected_bullet === null)) {
    return (
      <LayoutPage>
        <h2>Please select Catapult and Bullet</h2>
        <button onClick={handleClick}> Go to storage </button>
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
