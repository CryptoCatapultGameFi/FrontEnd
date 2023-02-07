import LayoutPage from "../../layout/LayoutPage";
import "./Home.css"

function Home() {
  return (
    <LayoutPage>
      <div className="home">
        <h2 className="home-text-head">Crypto Catapult  Statistics </h2>
        <div className="home-stat">
        <img className="home-text-img" alt="logo" src='/catapult.png' />
        <h1 className="home-text number">2400 </h1>
        <h1 className="home-text">Sticks </h1>
        </div>
        <div className="home-stat">
        <img className="home-text-img" alt="logo" src='/stone.png' />
        <h1 className="home-text number">3120 </h1>
        <h1 className="home-text">Bullets </h1>
        </div>
      </div>
    </LayoutPage>
  );
}

export default Home;