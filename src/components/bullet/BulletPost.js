import "./BulletPost.css"

function BulletPost(props) {
    const { item , onBgClick, onSelectClick } = props;
    return (
        <div className="Bullet-OnClick">
            <div className="Bullet-bg" onClick={onBgClick}/>
            <div className="Bullet-content">
                <h1 className="Bullet-text bullet-name"> {item.metadata.name}</h1>
                <img src={item.metadata.image} className="bullet" alt="bullet-img"  />
                <h2 className="Bullet-text bullet-tier"> Tier: {item.metadata.tier}</h2>
                <h2 className="Bullet-text"> Power: {item.metadata.power}</h2>
                {/* <h3 className="Bullet-text"> Description: {item.metadata.description}</h3> */}
                <button onClick={onSelectClick} className="nft-post-select"> Select </button>
            </div>
        </div>
    )
}

export default BulletPost;