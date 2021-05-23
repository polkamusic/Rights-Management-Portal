
function ddexHeadersToAryElem(header, releaseInfoArySize) {
    let defaultAry = [];
	for (var i = 0; i < releaseInfoArySize; i++) {
		defaultAry.push('');
	}
    defaultAry[0] = header?.toString()
    return defaultAry
}

export default ddexHeadersToAryElem