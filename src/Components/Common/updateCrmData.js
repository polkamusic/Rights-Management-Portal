import isEqual from 'lodash.isequal'
import { pinFileToIPFS } from '../../pinata-ipfs'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'
import { ddexInitVal } from "../Common/ddexInitVal";
import getRandomFromRange from './getRandomIntFromRange'
import { web3FromAddress } from '@polkadot/extension-dapp';

const updateCrmData = async (
  changeID, // is the contract id, not the changeId param
  capturedCrmData,
  formikValues, // frm csv/ddex form
  formikValuesInit = ddexInitVal,
  csvFile,
  nodeFormikValues,
  api,
  addressValues,
  keyringAccount,
  notifyCallback,
  otherCallback = null
) => {

  if (!capturedCrmData || !api) return

  const newNodeFormikValues = {
    ipfsArtworkFile: nodeFormikValues?.ipfsArtworkFile,
    ipfsMp3WavFile: nodeFormikValues?.ipfsMp3WavFile,
    ipfsOtherValues: nodeFormikValues?.ipfsOtherValues,
  }

  if (isEqual(capturedCrmData.ipfsOtherValues, nodeFormikValues.ipfsOtherValues) &&
    isEqual(nodeFormikValues.ipfsCsvHash, capturedCrmData.ipfsCsvHash) &&
    isEqual(nodeFormikValues.ipfsMp3WavHash, capturedCrmData.ipfsMp3WavHash) &&
    isEqual(nodeFormikValues.ipfsArtworkHash, capturedCrmData.ipfsArtworkHash)) {
    console.log(`No changes in crm data with ID ${changeID}`)
    return
  }

  let updated = false

  notifyCallback(`Updating crm data with ID ${changeID}`)

  // convert to crmData parameter format
  const crmDataParam = {
    crmid: parseInt(changeID),
    ipfshash: nodeFormikValues.ipfsCsvHash, // replace hash if change detected
    ipfshashprivateTemp: [
      { artworkHash: nodeFormikValues.ipfsArtworkHash }, // replace hash if change detected
      { mp3WavHash: nodeFormikValues.ipfsMp3WavHash } // replace hash if change detected
    ],
    ipfshashprivate: `${nodeFormikValues.ipfsArtworkHash},${nodeFormikValues.ipfsMp3WavHash}`,
    globalquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.globalquorum || 0),
    mastershare: parseInt(newNodeFormikValues.ipfsOtherValues?.mastershare || 0),
    masterquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.masterquorum || 0),
    compositionshare: parseInt(newNodeFormikValues.ipfsOtherValues?.compositionshare || 0),
    compositionquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.compositionquorum || 0),
    othercontractsshare: parseInt(newNodeFormikValues.ipfsOtherValues?.othercontractsshare || 0),
    othercontractsquorum: parseInt(newNodeFormikValues.ipfsOtherValues?.othercontractsquorum || 0)
  }


  // get hashes from uploaded files in ipfs server
  try {
    // check ddex/csv form is changed, if it did, then get hash
    if (!isEqual(formikValuesInit, formikValues)) {
      let iCsvFile;
      await pinFileToIPFS(
        csvFile,
        csvFile.name,
        (result) => iCsvFile = result,
        (err) => notifyCallback(`${err}`, 'error')
      );
      crmDataParam['ipfshash'] = iCsvFile.IpfsHash
    }

    // check if we have uploaded an artwork
    if (newNodeFormikValues.ipfsArtworkFile &&
      (newNodeFormikValues.ipfsArtworkFile?.name ||
        newNodeFormikValues.ipfsArtworkFile?.path)) {
      let iArtworkFile;
      await pinFileToIPFS(
        newNodeFormikValues.ipfsArtworkFile,
        newNodeFormikValues.ipfsArtworkFile?.path ||
        newNodeFormikValues.ipfsArtworkFile.name,
        (result) => iArtworkFile = result,
        (err) => notifyCallback(err?.toString(), 'error')
      );
      crmDataParam.ipfshashprivateTemp[0]['artworkHash'] = iArtworkFile.IpfsHash
    }

    // check if we have uploaded a mp3/wav
    if (newNodeFormikValues.ipfsMp3WavFile &&
      (newNodeFormikValues.ipfsMp3WavFile?.path ||
        newNodeFormikValues.ipfsMp3WavFile.name)) {
      let iMp3WavFile;
      await pinFileToIPFS(
        newNodeFormikValues.ipfsMp3WavFile,
        newNodeFormikValues.ipfsMp3WavFile?.path ||
        newNodeFormikValues.ipfsMp3WavFile.name,
        (result) => iMp3WavFile = result,
        (err) => notifyCallback(err?.toString(), 'error')
      );
      crmDataParam.ipfshashprivateTemp[1]['mp3WavHash'] = iMp3WavFile.IpfsHash
    }

  } catch (err) {
    notifyCallback(`Ipfs save error, ${err}`, 'error')
  }

  // delete ipfs hash private temp, transfer hashes to main ipfshashprivate field
  crmDataParam['ipfshashprivate'] = `${crmDataParam.ipfshashprivateTemp[0].artworkHash},${crmDataParam.ipfshashprivateTemp[1].mp3WavHash}`
  delete crmDataParam['ipfshashprivateTemp']

  // get kr pair
  const krPair = getKrPair(addressValues, keyringAccount)

  // get from account/ wallet
  let frmAcct;
  if (!krPair) {
    notifyCallback('Keyring pair not found, aborting crm data update', 'error')
    return
  }

  await getFromAcct(krPair, api, (response) => frmAcct = response)

  // check wallet(frmAcct type is string) or dev acct
  let nonceAndSigner = { nonce: -1 };

  if (typeof frmAcct === 'string') {
    const injector = await web3FromAddress(frmAcct).catch(console.error);
    nonceAndSigner['signer'] = injector?.signer
  }

  // get unique/random int for change id
  const uniqueRandId = getRandomFromRange(300, 4000)
  const parsedUniqRandId = parseInt(uniqueRandId)

  // transact
  const crmDataUpdate = api.tx.crm.changeProposalCrmdata(
    parsedUniqRandId, // should be random/unique at range
    JSON.stringify(crmDataParam)
  )

  // handle sign and send status
  await crmDataUpdate.signAndSend(
    frmAcct,
    nonceAndSigner,
    ({ status, events }) => {
      signAndSendEventsHandler(
        events,
        notifyCallback,
        api,
        `CRM Data with ID ${changeID} update success!`)
    }
  );

  if (otherCallback) otherCallback({ updateArea: 'crm', changeId: parsedUniqRandId, crmUpdateData: crmDataParam })

  updated = true
  return updated

}

export default updateCrmData