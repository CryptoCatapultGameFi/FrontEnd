import "./Item.css"

function Item(props) {
    const { item } = props;
    return ( 
        <div className="NFT">
            <h4>{item.name}</h4>
            <h4>{item.stat}</h4>
        </div>
    )
}

export default Item;