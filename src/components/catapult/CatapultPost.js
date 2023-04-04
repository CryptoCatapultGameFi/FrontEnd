import "./CatapultPost.css"
import React, { useState } from "react"; 

function CatapultPost(props) {
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
        <div className="Catapult-OnClick">
            <div className="Catapult-bg" onClick={onBgClick}/> 
            <div className="Catapult-content">
                <h1 className="Catapult-text"> {item.metadata.name}</h1>
                <img src={item.metadata.image} className="catapult" alt="catapult-img"/>
                <h2 className="Catapult-text"> Tier: {item.metadata.tier}</h2>
                <h2 className="Catapult-text"> Power: {item.metadata.power}%</h2>
                {/* <h3 className="Catapult-text"> Description: {item.metadata.description}</h3> */}
                <h3 className="Catapult-text rubber"> Rubber: {rubber}/3 </h3>
                <button onClick={checkRubberOverLimit}> Select </button>
                {errorMessage && <div className="error"> {errorMessage} </div>}
            </div>
        </div>
    )
}

export default CatapultPost;