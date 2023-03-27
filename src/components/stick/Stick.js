import "./Stick.css"

function Stick(props) {
    const { item , onNFTClick} = props;
    return ( 
        <div className="NFT-item" onClick={() => onNFTClick(item)} >
            <h4> {item.metadata.name}</h4>
            <img className="catapult" alt="item-img" src={item.metadata.image} />
            <h4> Power: {item.metadata.power}% </h4>
        </div>
    )
}

export default Stick;