

function formatAddress(address) {
    const walletAddress = address.toString();
    return `${walletAddress.substring(0,3)}...${walletAddress.substring(38)}`;
}

export default formatAddress;