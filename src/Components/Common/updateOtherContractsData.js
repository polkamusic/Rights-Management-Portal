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
    otherCallback = null
) => {

    if (!capturedOtherContractsData || !api) return
    if (isEqual(capturedOtherContractsData, nodeFormikOtherContractsValues)) {
        console.log(`No changes in other contracts data with ID ${changeID}`)
        return
    }

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
        nonceAndSigner['signer'] = injector?.signer
    }

    const uniqueRandId = getRandomFromRange(300, 4000)
    const parsedUniqRandId = parseInt(uniqueRandId)

    // parse ids to int
    nodeFormikOtherContractsValues.forEach(val => {
        val['id'] = parseInt(val.id)
        val['percentage'] = parseInt(val.percentage)
    })
   
    // transact, crmid is the changeid or contract id
    const crmOtherConstractsDataUpdate = api.tx.crm.changeProposalCrmOthercontractsdata(
        parsedUniqRandId,
        JSON.stringify({ crmid: parseInt(changeID), othercontracts: nodeFormikOtherContractsValues })
    )

    await crmOtherConstractsDataUpdate.signAndSend(
        frmAcct,
        nonceAndSigner,
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `CRM Other Contracts Data with ID ${changeID} update success!`)
        }
    );

    if (otherCallback) otherCallback({
        updateArea: 'otherContracts', changeId: parsedUniqRandId, otherContractsUpdateData: {
            crmid: parseInt(changeID), othercontracts: nodeFormikOtherContractsValues
        }
    })
    updated = true
    return updated


}

export default updateOtherContractsData