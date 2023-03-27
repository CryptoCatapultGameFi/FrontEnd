import "./StickPost.css"

function StickPost(props) {
    const { item , onBgClick, onSelectClick } = props;
    return (
        <div className="Stick-OnClick">
            <div className="Stick-bg" onClick={onBgClick}/>
            <div className="Stick-content">
                <h1 className="Stick-text"> {item.metadata.name}</h1>
                <img src={item.metadata.image} className="stick" alt="stick-img"/>
                <h2 className="Stick-text"> Power: {item.metadata.power}%</h2>
                <h3 className="Stick-text"> Description: {item.metadata.description}</h3>
                <h3 className="Stick-text rubber"> Rubber: 3/3 </h3>
                <button onClick={onSelectClick}> Select </button>
            </div>
        </div>
    )
}

export default StickPost;