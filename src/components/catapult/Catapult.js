import "./Catapult.css"

function Catapult(props) {
    const { item , onNFTClick, selectText} = props;
    let  ButtonCss = "selectNFT"
    if (selectText === "Selected") {
        ButtonCss = "selectNFT selectedNFT"
    }
    return ( 
        <div className="NFT-item" onClick={() => onNFTClick(item)} >
            <h4 className="catapult-name"> {item.metadata.name}</h4>
            <img className="catapult" alt="item-img" src={item.metadata.image} />
            <h4 className="catapult-tier"> Tier: {item.metadata.tier}</h4>
            <h4> Power: {item.metadata.power}% </h4>
            {selectText && <h4 className={ButtonCss}> {selectText} </h4>}
        </div>
    )
}

export default Catapult;