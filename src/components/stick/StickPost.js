import "./StickPost.css"
import React, { useState } from "react"; 

function StickPost(props) {
    const { item , onBgClick, onSelectClick, rubber } = props;
    const [errorMessage, setErrorMessage] = useState("");

    function checkRubberOverLimit() {
        if (rubber > 0) {
            onSelectClick()
        }
        else {
            setErrorMessage("Rubber Already Run out!")
        }
    }

    return (
        <div className="Stick-OnClick">
            <div className="Stick-bg" onClick={onBgClick}/>
            <div className="Stick-content">
                <h1 className="Stick-text"> {item.metadata.name}</h1>
                <img src={item.metadata.image} className="stick" alt="stick-img"/>
                <h2 className="Bullet-text"> Tier: {item.metadata.tier}</h2>
                <h2 className="Stick-text"> Power: {item.metadata.power}%</h2>
                {/* <h3 className="Stick-text"> Description: {item.metadata.description}</h3> */}
                <h3 className="Stick-text rubber"> Rubber: {rubber}/3 </h3>
                <button onClick={checkRubberOverLimit}> Select </button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </div>
        </div>
    )
}

export default StickPost;