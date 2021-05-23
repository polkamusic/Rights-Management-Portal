
function releaseInfoToArySubHeaders(releaseInfoObj) {
    let tempAry = [];
    for (const [key, value] of Object.entries(releaseInfoObj)) {
        tempAry.push(key)
    }
    return tempAry;
}

export default releaseInfoToArySubHeaders