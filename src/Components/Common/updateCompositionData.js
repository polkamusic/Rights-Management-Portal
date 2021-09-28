import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'
import getRandomFromRange from './getRandomIntFromRange'
import { web3FromAddress } from '@polkadot/extension-dapp';

const updateCompositionData = async (
  changeID,
  capturedCompositionData,
  nodeFormikCompositionValues,
  api,
  addressValues,
  keyringAccount,
  notifyCallback,
  otherCallback = null
) => {

  if (!capturedCompositionData || !api) return
  if (isEqual(capturedCompositionData, nodeFormikCompositionValues)) {
    console.log(`No changes in composition data with ID ${changeID}`)
    return
  }

  console.log('==========================')
  console.log('Update composition data area');
  console.log('NodeFormikCompositionValues update', nodeFormikCompositionValues);
  console.log('CapturedCompositionData update', capturedCompositionData);
  console.log('==========================')

  let updated = false

  // get kr pair
  const krPair = getKrPair(addressValues, keyringAccount)

  // get from account/ wallet
  let frmAcct;
  if (!krPair) {
    notifyCallback('Keyring pair not found, aborting crm data update', 'error')
    return
  }
  await getFromAcct(krPair, api, (response) => frmAcct = response)

  // const injector = await web3FromAddress(frmAcct).catch(console.error);
  // check wallet(frmAcct type is string) or dev acct
  let nonceAndSigner = { nonce: -1 };

  if (typeof frmAcct === 'string') {
    const injector = await web3FromAddress(frmAcct).catch(console.error);
    console.log('Injector signer', injector?.signer);
    nonceAndSigner['signer'] = injector?.signer
  }

  console.log('NonceAndSigner', nonceAndSigner)
  console.log('==========================')

  const uniqueRandId = getRandomFromRange(300, 4000)
  const parsedUniqRandId = parseInt(uniqueRandId)

  // transact
  const crmCompositionDataUpdate = api.tx.crm.changeProposalCrmCompositiondata(
    parsedUniqRandId,
    JSON.stringify({ crmid: parseInt(changeID), composition: nodeFormikCompositionValues })
  )

  await crmCompositionDataUpdate.signAndSend(
    frmAcct,
    nonceAndSigner,
    ({ status, events }) => {
      signAndSendEventsHandler(
        events,
        notifyCallback,
        api,
        `CRM Composition Data with ID ${changeID} update success!`)
    }
  );

  if (otherCallback) otherCallback({
    updateArea: 'composition', changeId: parsedUniqRandId, compositionUpdateData: {
      crmid: parseInt(changeID), composition: nodeFormikCompositionValues
    }
  })
  updated = true
  return updated

}

export default updateCompositionData