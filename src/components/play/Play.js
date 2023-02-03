import LayoutPage from "../../layout/LayoutPage";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./Play.css";

function Play() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/BuildGl2.loader.js",
    dataUrl: "Build/BuildGl2.data",
    frameworkUrl: "Build/BuildGl2.framework.js",
    codeUrl: "Build/BuildGl2.wasm",
  });
  return (
    <Unity
      unityProvider={unityProvider}
      className="unityComponent"
      // style={{ width: 1200, height: 600}}
    />
  );
}

export default Play;
