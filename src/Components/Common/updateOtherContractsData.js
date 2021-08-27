import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'
import getRandomFromRange from './getRandomIntFromRange'
import { web3FromAddress } from '@polkadot/extension-dapp';

const updateOtherContractsData = async (
    changeID,
    capturedOtherContractsData,
    nodeFormikOtherContractsValues,
    api,
    addressValues,
    keyringAccount,
    notifyCallback,
    pageLoadFunc
) => {

    if (!capturedOtherContractsData || !api) return
    if (isEqual(capturedOtherContractsData, nodeFormikOtherContractsValues)) {
        console.log(`No changes in other contracts data with ID ${changeID}`)
        return
    }

    let updated = false

    console.log('==========================')
    console.log('Update other contracts data area')
    // console.log(typeof changeID, changeID)
    console.log('NodeFormikOtherContractsValues update', nodeFormikOtherContractsValues);
    console.log('CapturedOtherContractsData update', capturedOtherContractsData);
    console.log('==========================')

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

    // parse ids to int
    nodeFormikOtherContractsValues.forEach(val => {
        val['id'] = parseInt(val.id)
        val['percentage'] = parseInt(val.percentage)
    })
    console.log('update other contracts payload', 
    JSON.stringify({ crmid: parseInt(changeID), othercontracts: nodeFormikOtherContractsValues }, null, 2));

    // transact, crmid is the changeid or contract id
    const crmOtherConstractsDataUpdate = api.tx.crm.changeProposalCrmOthercontractsdata(
        parseInt(uniqueRandId),
        JSON.stringify({ crmid: parseInt(changeID), othercontracts: nodeFormikOtherContractsValues })
    )

    await crmOtherConstractsDataUpdate.signAndSend(
        frmAcct,
        { nonce: -1, signer: injector.signer },
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `CRM Other Contracts Data with ID ${changeID}, update success!`)
        }
    );

    // if (pageLoadFunc) pageLoadFunc(false)
    updated = true
    return updated


}

export default updateOtherContractsData