import "./Catapult.css"

function Catapult(props) {
    const { item , onNFTClick, selectText} = props;
    return ( 
        <div className="NFT-item" onClick={() => onNFTClick(item)} >
            <h4> {item.metadata.name}</h4>
            <img className="catapult" alt="item-img" src={item.metadata.image} />
            <h4> Power: {item.metadata.power}% </h4>
            {selectText && <h4 className="selectNFT"> {selectText} </h4>}
        </div>
    )
}

export default Catapult;