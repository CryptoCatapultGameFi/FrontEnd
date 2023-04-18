import "./Bullet.css"

function Stone(props) {
    const { item , onNFTClick, selectText } = props;
    let  ButtonCss = "selectNFT"
    if (selectText === "Selected") {
        ButtonCss = "selectNFT selectedNFT"
    }
    return ( 
        <div className="NFT-item" onClick={() => onNFTClick(item)} >
            <h4 className="bullet-name"> {item.metadata.name}</h4>
            <img src={item.metadata.image} className="bullet" alt="bullet-img"  />
            <h4 className="bullet-tier"> Tier: {item.metadata.tier}</h4>
            <h4> Power: {item.metadata.power}</h4>
            {selectText && <h4 className={ButtonCss}> {selectText} </h4>}
        </div>
    )
}

export default Stone;