
function releaseInfoToArySubHeaders(releaseInfoObj) {
    let tempAry = [];
    /* eslint-disable no-unused-vars */
    for (const [key, value] of Object.entries(releaseInfoObj)) {
        tempAry.push(key)
    }
    return tempAry;
}

export default releaseInfoToArySubHeaders