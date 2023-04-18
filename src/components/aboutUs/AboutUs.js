import LayoutPage from "../../layout/LayoutPage";
import "./AboutUs.css"

function AboutUs() {
  return (
    <LayoutPage>
      <h1 className="text-head">About Us</h1>
      <div className="div-grid">
        <div className="gameFi">
          <h1 className="text-sub-head">What is GameFi</h1>
          <h2 className="text-font-italic">Game + Finance</h2>
          <h4 className="text">Typically, players pay to play traditional games, while in GameFi, players invest in virtual assets or engage in game-related activities that can generate returns or profits, creating a new paradigm for gaming and finance.</h4>
          <h1 className="text-sub-head">About Crypto Catapult</h1>
          <h4 className="text">This Crypto Catapult is a decentralized game that allows players to compete in skills based on three stages and to earn rewards. This game leverages blockchain technology to ensure fair play and secure transactions. The players earn rewards based on their performance and their equipment in the game.</h4>
        </div>
        <div className="person">
          <h1 className="text-sub-head">About developer</h1>
          <img className="person-picture" src='/setthanat.jpeg' alt="box-img" />
          <h3 className="text-name">Name: Setthanat Kladee</h3>
          <h4 className="text-role">Role: Blockchain and Unity Developer </h4>
          <img className="person-picture" src='/auttakrit.png' alt="box-img" />
          <h3 className="text-name">Name: Auttakrit Wongsarawit</h3>
          <h4 className="text-role">Role: Backend and Frontend Developer </h4>
        </div>
      </div>
      

    </LayoutPage>
  );
}

export default AboutUs;