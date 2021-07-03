import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'

const updateCompositionData = async (
    changeID,
    capturedCompositionData,
    nodeFormikCompositionValues,
    api,
    addressValues,
    keyringAccount,
    notify
) => {
    console.log('nodeFormikCompositionValues update', nodeFormikCompositionValues);
    console.log('capturedCompositionData update', capturedCompositionData);

    if (!capturedCompositionData || !api) return
    if (isEqual(capturedCompositionData, nodeFormikCompositionValues)) return

     // get kr pair
     const krPair = getKrPair(addressValues, keyringAccount)

     // get from account/ wallet
     const frmAcct = getFromAcct(krPair, api)
 
     // transact
     const crmCompositionDataUpdate = api.tx.crm.changeProposalCrmCompositiondata(
       changeID,
       { composition: nodeFormikCompositionValues }
     )

     await crmCompositionDataUpdate.signAndSend(
        frmAcct,
        { nonce: -1 },
        ({ status, events }) => {
          signAndSendEventsHandler(
            events,
            notify,
            api,
            `CRM Composition Data with ID ${changeID}, update success!`)
        }
      );

}

export default updateCompositionData