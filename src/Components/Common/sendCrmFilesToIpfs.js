import { pinFileToIPFS } from '../../pinata-ipfs';

const sendCrmFilesToIpfs = async (filesToSend, notify, callRegMusic) => {

    if (!filesToSend.mp3WavFile) {
        notify('Missing an mp3 or wav file, Please upload an mp3 or wav file')
        return
    }

    if (!filesToSend.artworkFile) {
        notify('Missing an artwork file, Please upload a jpg or png file for the artwork')
        return
    }

    if (!filesToSend.csvFile) {
        notify('Missing a csv file, Please contact support for technical assistance')
        return
    }

    notify('Saving the files to the ipfs server')

    try {
        let iCsvFile;
        await pinFileToIPFS(
            filesToSend.csvFile, 
            filesToSend.csvFile.name,
            (result) => iCsvFile = result,
            (err) => notify(err)
        );

        let iArtworkFile;
        await pinFileToIPFS(
            filesToSend.artworkFile, 
            filesToSend.artworkFile.name,
            (result) => iArtworkFile = result,
            (err) => notify(err)
        );

        let iMp3WavFile;
        await pinFileToIPFS(
            filesToSend.mp3WavFile, 
            filesToSend.mp3WavFile?.name || filesToSend.mp3WavFile?.path,
            (result) => iMp3WavFile = result,
            (err) => notify(err)
        );

        if (iCsvFile && iArtworkFile && iMp3WavFile) {
            notify(`CSV file ${filesToSend.csvFile.name} sent`);
            notify(`Artwork file ${filesToSend.artworkFile.name} sent`);
            notify(`Mp3/ WAV file ${filesToSend.mp3WavFile.name} sent`);

            const ifilesHash = {
                csv: iCsvFile.IpfsHash,
                artwork: iArtworkFile.IpfsHash,
                mp3Wav: iMp3WavFile.IpfsHash
            }

            const crmNewContractData = {
                crmId: filesToSend?.crmId || 0,
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
        notify(`An error occurred while saving to the ipfs server, ${err}`)
    }
}

export default sendCrmFilesToIpfs