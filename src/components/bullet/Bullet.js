import "./Bullet.css"

function Stone(props) {
    const { item } = props;
    return ( 
        <div className="NFT-item">
            <h4> {item.name}</h4>
            <img className="bullet" alt="bullet-img" src='/stone.png' />
            <h4> Power: {item.power}</h4>
        </div>
    )
}

export default Stone;