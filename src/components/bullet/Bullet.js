import "./Bullet.css"

function Stone(props) {
    const { item , onNFTClick } = props;
    return ( 
        <div className="NFT-item" onClick={() => onNFTClick(item)} >
            <h4> {item.metadata.name}</h4>
            <img src={item.metadata.image} className="bullet" alt="bullet-img"  />
            <h4> Power: {item.metadata.power}</h4>
        </div>
    )
}

export default Stone;