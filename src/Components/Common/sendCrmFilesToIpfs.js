import ipfs from '../../ipfs';

const sendCrmFilesToIpfs = async (filesToSend, notify, callRegMusic) => {
    // send to ipfs, get/set ipfsPath
    console.log('files to send', filesToSend);
    if (!filesToSend) return;
    if (!filesToSend.mp3WavFile || !filesToSend.artworkFile) {
        notify('Missing mp3 or artwork')
        return
    }
    try {
        const iCsvFile = await ipfs.add(filesToSend.csvFile);
        console.log('ipfs csv file', iCsvFile);

        const iArtworkFile = await ipfs.add(filesToSend.artworkFile);
        console.log('ipfs artwork file', iArtworkFile);

        const iMp3WavFile = await ipfs.add(filesToSend.mp3WavFile);
        console.log('ipfs mp3 wav file', iMp3WavFile);

        if (iCsvFile && iArtworkFile && iMp3WavFile) {
            notify(`CSV file ${filesToSend.csvFile.name} sent`);
            notify(`Artwork file ${filesToSend.artworkFile.name} sent`);
            notify(`Mp3/ WAV file ${filesToSend.mp3WavFile.name} sent`);

            console.log('mp3 hash ', iMp3WavFile.cid.toString());
            const ifilesHash = {
                csv: iCsvFile.path,
                artwork: iArtworkFile.path,
                mp3Wav: iMp3WavFile.cid.toString()
            }

            const crmNewContractData = {
                crmId: 0,
                crmData: {
                    ipfshash: ifilesHash.csv,
                    ipfshashprivate: [
                        { artworkHash: ifilesHash.artwork },
                        { mp3WavHash: ifilesHash.mp3Wav }
                    ],
                    globalquorum: filesToSend.ipfsOtherValues.globalquorum,
                    mastershare: filesToSend.ipfsOtherValues.mastershare,
                    masterquorum: filesToSend.ipfsOtherValues.masterquorum,
                    compositionshare: filesToSend.ipfsOtherValues.compositionshare,
                    compositionquorum: filesToSend.ipfsOtherValues.compositionquorum,
                    othercontractsshare: filesToSend.ipfsOtherValues.othercontractsshare,
                    othercontractsquorum: filesToSend.ipfsOtherValues.othercontractsquorum
                },
                crmMaster: filesToSend?.crmMaster || {},
                crmComposition: filesToSend?.crmComposition || {},
                crmOtherContracts: filesToSend?.crmOtherContracts || {}
            }
            callRegMusic(crmNewContractData).catch(console.error);
        }
    } catch (err) {
        notify(`Ipfs send error ${err}`)
    }
}

export default sendCrmFilesToIpfs