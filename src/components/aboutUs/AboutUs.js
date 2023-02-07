import LayoutPage from "../../layout/LayoutPage";
import "./AboutUs.css"

function AboutUs() {
  return (
    <LayoutPage>
      <h1>About Us</h1>
      <div className="div-grid">
        <div className="person">
            <img className="person-picture" src='/auttakrit.png' alt="box-img" />
            <h1 className="text-name">Auttakrit Wongsarawit</h1>
        </div>
        <div className="person">
            <img className="person-picture" src='/setthanat.png' alt="box-img" />
            <h1 className="text-name">Setthanat Kladee</h1>
        </div>
      </div>
      

    </LayoutPage>
  );
}

export default AboutUs;