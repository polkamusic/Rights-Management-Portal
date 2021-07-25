import getFromAcct from '../getFromAcct'
import getKrPair from '../getKrPair'
import signAndSendEventsHandler from '../signAndSendEventsHandler'
import { web3FromAddress } from '@polkadot/extension-dapp';

const voteCompositionDataProposal = async (
    changeId,
    vote,
    notifyCallback,
    api,
    addressValues,
    keyringAccount,
) => {
    console.log(changeId, vote)
    if (!changeId) {
        notifyCallback ?
            notifyCallback(`Change id is missing for composition data`) :
            console.log('Change id is missing for composition data');
        return
    }

    if (!api || !addressValues || !keyringAccount) {
        notifyCallback("Node api or Wallet info is missing")
        return
    }

    notifyCallback(`Voting for proposal of composition data with change ID ${changeId}`)

    // get kr pair
    const krPair = getKrPair(addressValues, keyringAccount)
    // console.log(typeof krPair, krPair);

    // get from account/ wallet
    let frmAcct;
    if (!krPair) {
        notifyCallback('Keyring pair not found, aborting composition data update')
        return
    }
    await getFromAcct(krPair, api, (response) => frmAcct = response)
    // console.log('update composition frmAcct', frmAcct);

    // finds an injector for an address
    const injector = await web3FromAddress(frmAcct).catch(console.error);

    // transact
    const compositionDataProposalVote = api.tx.crm.voteProposalCrmCompositiondata(
        parseInt(changeId), 
        vote
    )

    // handle sign and send status
    await compositionDataProposalVote.signAndSend(
        frmAcct,
        { nonce: -1, signer: injector.signer },
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `Composition data proposal with change ID ${changeId}, Vote success!`)
        }
    );
}

export default voteCompositionDataProposal