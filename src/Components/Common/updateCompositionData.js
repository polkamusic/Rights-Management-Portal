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
  pageLoadFunc = null
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
    notifyCallback('Keyring pair not found, aborting crm data update')
    return
  }
  await getFromAcct(krPair, api, (response) => frmAcct = response)

  const injector = await web3FromAddress(frmAcct).catch(console.error);

  const uniqueRandId = getRandomFromRange(300, 4000)

  // transact
  const crmCompositionDataUpdate = api.tx.crm.changeProposalCrmCompositiondata(
    parseInt(uniqueRandId),
    JSON.stringify({ crmid: parseInt(changeID), composition: nodeFormikCompositionValues })
  )

  await crmCompositionDataUpdate.signAndSend(
    frmAcct,
    { nonce: -1, signer: injector.signer },
    ({ status, events }) => {
      signAndSendEventsHandler(
        events,
        notifyCallback,
        api,
        `CRM Composition Data with ID ${changeID}, update success!`)
    }
  );

  updated = true
  return updated

}

export default updateCompositionData