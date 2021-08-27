

function releaseInfoToAryElem(releaseInfoObj) {
    
    let releaseInfoAry = [];

    /* eslint-disable no-unused-vars */ 
    for (const [key, value] of Object.entries(releaseInfoObj)) {
        releaseInfoAry.push(value)
    }
    return releaseInfoAry;

}

export default releaseInfoToAryElem