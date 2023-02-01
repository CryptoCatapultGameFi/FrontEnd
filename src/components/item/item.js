import "./Item.css"

function Item(props) {
    const { item } = props;
    return ( 
        <div className="NFT-item">
            <h4> {item.name}</h4>
            <img className="catapult" src='/catapult1.png' />
            <h4> Power: {item.power}</h4>
            <h4 className="rubber"> Rubber: {item.rubber}/5</h4>
        </div>
    )
}

export default Item;