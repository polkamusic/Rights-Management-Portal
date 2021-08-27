import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'
import getRandomFromRange from './getRandomIntFromRange'
import { web3FromAddress } from '@polkadot/extension-dapp';

const updateMasterData = async (
    changeID,
    capturedMasterData,
    nodeFormikMasterValues,
    api,
    addressValues,
    keyringAccount,
    notifyCallback,
    pageLoadFunc=null
) => {
  
    if (!capturedMasterData || !api) return
    if (isEqual(capturedMasterData, nodeFormikMasterValues)) {
        console.log(`No changes in master data with ID ${changeID}`)
        return
    }

    // logs
    console.log('==========================')
    console.log('Update master data area')
    console.log('NodeFormikMasterValues:', nodeFormikMasterValues);
    console.log('CapturedMasterData:', capturedMasterData);
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
    const crmMasterDataUpdate = api.tx.crm.changeProposalCrmMasterdata(
        parseInt(uniqueRandId),
        JSON.stringify({ crmid: parseInt(changeID), master: nodeFormikMasterValues })
    )

    await crmMasterDataUpdate.signAndSend(
        frmAcct,
        { nonce: -1, signer: injector.signer },
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `CRM Master Data with ID ${changeID}, Change proposal success!`)
        }
    );

    // if (pageLoadFunc) pageLoadFunc(false)
    updated = true
    return updated
}

export default updateMasterData