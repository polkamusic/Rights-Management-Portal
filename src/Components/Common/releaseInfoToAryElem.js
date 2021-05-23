

function releaseInfoToAryElem(releaseInfoObj) {
    let releaseInfoAry = [];
    for (const [key, value] of Object.entries(releaseInfoObj)) {
        releaseInfoAry.push(value)
    }
    return releaseInfoAry;
}

export default releaseInfoToAryElem