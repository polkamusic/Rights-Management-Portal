import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'

const updateMasterData = async (
    changeID,
    capturedMasterData,
    nodeFormikMasterValues,
    api,
    addressValues,
    keyringAccount,
    notify
) => {
    console.log('nodeFormikMasterValues update', nodeFormikMasterValues);
    console.log('capturedMasterData update', capturedMasterData);

    if (!capturedMasterData || !api) return
    if (isEqual(capturedMasterData, nodeFormikMasterValues)) return

     // get kr pair
     const krPair = getKrPair(addressValues, keyringAccount)

     // get from account/ wallet
     const frmAcct = getFromAcct(krPair, api)
 
     // transact
     const crmMasterDataUpdate = api.tx.crm.changeProposalCrmMasterdata(
       changeID,
       { master: nodeFormikMasterValues }
     )

     await crmMasterDataUpdate.signAndSend(
        frmAcct,
        { nonce: -1 },
        ({ status, events }) => {
          signAndSendEventsHandler(
            events,
            notify,
            api,
            `CRM Master Data with ID ${changeID}, update success!`)
        }
      );

}

export default updateMasterData