import isEqual from 'lodash.isequal'
import { pinFileToIPFS } from '../../pinata-ipfs'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'

const updateCrmData = async (
  changeID,
  capturedCrmData,
  formikValues, // frm csv/ddex form
  csvFile,
  nodeFormikValues,
  api,
  addressValues,
  keyringAccount,
  notify
) => {
  console.log('nodeFormikValues update', nodeFormikValues);
  console.log('capturedCrmData update', capturedCrmData);

  if (!capturedCrmData || !api) return

  const newNodeFormikValues = {
    ipfsArtworkFile: nodeFormikValues?.ipfsArtworkFile,
    ipfsMp3WavFile: nodeFormikValues?.ipfsMp3WavFile,
    formikCsvValues: formikValues,
    ipfsOtherValues: nodeFormikValues?.ipfsOtherValues,
  }

  if (isEqual(capturedCrmData, newNodeFormikValues)) return

  // convert to crmData parameter format
  const crmDataParam = {
    ipfshash: nodeFormikValues.ipfsCsvHash, // replace hash if change detected
    ipfshashprivate: [
      { artworkHash: nodeFormikValues.ipfsArtworkHash }, // replace hash if change detected
      { mp3WavHash: nodeFormikValues.ipfsMp3WavHash } // replace hash if change detected
    ],
    globalquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.globalquorum || 0),
    mastershare: parseInt(newNodeFormikValues.ipfsOtherValues?.mastershare || 0),
    masterquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.masterquorum || 0),
    compositionshare: parseInt(newNodeFormikValues.ipfsOtherValues?.compositionshare || 0),
    compositionquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.compositionquorum || 0),
    othercontractsshare: parseInt(newNodeFormikValues.ipfsOtherValues?.othercontractsshare || 0),
    othercontractsquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.othercontractsquorum || 0)
  }

  //  if (is not equal, capturedData vs formikValues) change
  // if (!isEqual(capturedCrmData, newNodeFormikValues)) {

    // get hashes from uploaded files in ipfs server
    try {

      if (!isEqual(capturedCrmData.formikCsvValues, formikValues)) {
        let iCsvFile;
        await pinFileToIPFS(
          csvFile,
          csvFile.name,
          (result) => iCsvFile = result,
          (err) => notify(err)
        );
        crmDataParam['ipfshash'] = iCsvFile.IpfsHash
      }

      if (capturedCrmData.ipfsArtworkFile.name?.toString() !==
        newNodeFormikValues.ipfsArtworkFile?.name?.toString()) {
        let iArtworkFile;
        await pinFileToIPFS(
          newNodeFormikValues.artworkFile,
          newNodeFormikValues.artworkFile.name,
          (result) => iArtworkFile = result,
          (err) => notify(err)
        );
        crmDataParam.ipfshashprivate[0]['artworkHash'] = iArtworkFile.IpfsHash
      }

      if (capturedCrmData.ipfsMp3WavFile.name?.toString() !==
        newNodeFormikValues.ipfsMp3WavFile?.name?.toString()) {
        let iMp3WavFile;
        await pinFileToIPFS(
          newNodeFormikValues.mp3WavFile,
          newNodeFormikValues.mp3WavFile.name,
          (result) => iMp3WavFile = result,
          (err) => notify(err)
        );
        crmDataParam.ipfshashprivate[0]['mp3WavHash'] = iMp3WavFile.IpfsHash
      }

    } catch (err) {
      notify(`Ipfs save error, ${err}`)
    }

    // get kr pair
    const krPair = getKrPair(addressValues, keyringAccount)

    // get from account/ wallet
    const frmAcct = getFromAcct(krPair, api)

    // transact
    const crmDataUpdate = api.tx.crm.changeProposalCrmdata(
      changeID,
      crmDataParam
    )

    // handle sign and send status
    await crmDataUpdate.signAndSend(
      frmAcct,
      { nonce: -1 },
      ({ status, events }) => {
        signAndSendEventsHandler(
          events,
          notify,
          api,
          `CRM Data with ID ${changeID}, update success!`)
      }
    );
  // }
}

export default updateCrmData