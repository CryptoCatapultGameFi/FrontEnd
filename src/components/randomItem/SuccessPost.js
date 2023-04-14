import "./SuccessPost.css"

function SuccessPost(props) {
    const { onBgClick } = props;
    return (
        <div className="Success-OnClick">
            <div className="Success-bg" onClick={onBgClick}/>
            <div className="Success-content">
                <h1 className="success-head"> Random Success 🗸 </h1>
                <h3> Please wait your transtion for 1-2 minutes </h3>
                <h4> Check your transtion in Metamask Wallet</h4>
                <h4> Check your NFT in Storage after transtion success </h4>
                <h4 className="unsccess-ints unsccess-header"> If transtion fail ✗ </h4>
                <h4 className="unsccess-ints"> Try ReApprove</h4>
                <h4 className="unsccess-ints"> Check CCP and Matric token are enough </h4>
            </div>
        </div>
    )
}

export default SuccessPost;