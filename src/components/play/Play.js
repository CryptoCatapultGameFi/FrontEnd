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
  else {
    return (
      <button type="button" class="btn btn-info entryUnity"><a href="https://cryptocatapult-f75a8.web.app/" >Let's Go</a></button>
    );
  }


}

export default Play;
