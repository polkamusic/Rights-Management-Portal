
function metadataToAryElem(metadataObj, releaseInfoArySize) {
	let defaultAry = [];
	// start at 3 coz 1 and 2 index are for metadata 1st and 2nd column
	for (var i = 2; i < releaseInfoArySize; i++) {
		defaultAry.push('');
	}

	let metadataAry = [];

	for (const [key, value] of Object.entries(metadataObj)) {
		let tempAry = [];
		tempAry = [key, value, ...defaultAry]
		metadataAry.push(tempAry);
	}

	return metadataAry;
}

export default metadataToAryElem