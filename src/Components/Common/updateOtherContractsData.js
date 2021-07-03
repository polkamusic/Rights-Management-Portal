import isEqual from 'lodash.isequal'
import getFromAcct from './getFromAcct'
import getKrPair from './getKrPair'
import signAndSendEventsHandler from './signAndSendEventsHandler'

const updateOtherContractsData = async (
    changeID,
    capturedOtherContractsData,
    nodeFormikOtherContractsValues,
    api,
    addressValues,
    keyringAccount,
    notify
) => {
    console.log('nodeFormikOtherContractsValues update', nodeFormikOtherContractsValues);
    console.log('capturedOtherContractsData update', capturedOtherContractsData);

    if (!capturedOtherContractsData || !api) return
    if (isEqual(capturedOtherContractsData, nodeFormikOtherContractsValues)) return

     // get kr pair
     const krPair = getKrPair(addressValues, keyringAccount)

     // get from account/ wallet
     const frmAcct = getFromAcct(krPair, api)
 
     // transact
     const crmOtherConstractsDataUpdate = api.tx.crm.changeProposalCrmOtherContractsdata(
       changeID,
       { otherContracts: nodeFormikOtherContractsValues }
     )

     await crmOtherConstractsDataUpdate.signAndSend(
        frmAcct,
        { nonce: -1 },
        ({ status, events }) => {
          signAndSendEventsHandler(
            events,
            notify,
            api,
            `CRM Other Contracts Data with ID ${chainID}, update success!`)
        }
      );

}

export default updateOtherContractsData