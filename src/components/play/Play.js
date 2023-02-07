import LayoutPage from "../../layout/LayoutPage";
import { Unity, useUnityContext } from "react-unity-webgl";
import { WalletContext } from "../../App";
import React, { useContext } from "react";
import "./Play.css";

function Play() {
  const { account } = useContext(WalletContext);
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/BuildGl2.loader.js",
    dataUrl: "Build/BuildGl2.data",
    frameworkUrl: "Build/BuildGl2.framework.js",
    codeUrl: "Build/BuildGl2.wasm",
  });
  if (account === null) {
    return (
      <LayoutPage>
      <h2>Please Login</h2>
      </LayoutPage>
    );
  }
  else {
    return (
      <Unity
        unityProvider={unityProvider}
        className="unityComponent"
        // style={{ width: 1200, height: 600}}
      />
    );
  }


}

export default Play;
