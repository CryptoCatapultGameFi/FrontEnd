import "./Stick.css"

function Stick(props) {
    const { stick } = props;
    return ( 
        <div className="NFT-item">
            <h4> {stick.name}</h4>
            <img className="catapult" alt="item-img" src='/catapult1.png' />
            <h4> Power: {stick.power}</h4>
            <h4 className="rubber"> Rubber: 3/3</h4>
            {/* <h4 className="rubber"> Rubber: {stick.rubber}/5</h4> */}
        </div>
    )
}

export default Stick;