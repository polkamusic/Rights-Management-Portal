import ipfs from '../../ipfs';

const sendCsvFileToIpfs = async (csvFile, notify, callRegMusic) => {
    // send to ipfs, get/set ipfsPath
    console.log('csv file', csvFile);
    if (!csvFile) return;
    try {
        const ifile = await ipfs.add(csvFile);
        console.log('ipfs file', ifile);
        if (ifile) {
            notify(`CSV file ${csvFile.name} sent`);
            callRegMusic(ifile.path).catch(console.error);
        }
    } catch (err) {
        notify(`Ipfs send error ${err}`)
    }
}

export default sendCsvFileToIpfs