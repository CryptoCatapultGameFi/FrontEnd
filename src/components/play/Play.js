import LayoutPage from "../../layout/LayoutPage";
import { WalletContext } from "../../App";
import React, { useContext } from "react";
import "./Play.css";

function Play() {
  
  const { account } = useContext(WalletContext);
  if (account === null) {
    return (
      <LayoutPage>
      <h2>Please Login</h2>
      </LayoutPage>
    );
  }



  if ((account.selected_stick === null) || (account.selected_bullet === null)) {
    let text = ""
    if (account.selected_stick === null) {
      text += "stick"
    } 
    if (account.selected_bullet === null) {
      text += " bullet"
    }
    return (
      <LayoutPage>
        <a>please select {text}</a>
      </LayoutPage>
    );
  }

  else {
    console.log(account.selected_bullet)
    return (
      <LayoutPage>
        <div className="play-page">
          <div className="play-content">
              <img className="catapult" alt="item-img" src={account.selected_stick.metadata.image} />
              <img  className="bullet" alt="bullet-img" src={account.selected_bullet.metadata.image}  />
            <a> {account.selected_stick.metadata.power} {account.selected_bullet.metadata.power}</a>
            <button type="button" class="btn btn-info entryUnity"><a href="https://cryptocatapult-f75a8.web.app/" >Let's Go</a></button>
          </div>
        </div>

      </LayoutPage>
      
    );
  }


}

export default Play;
