import getFromAcct from '../getFromAcct'
import getKrPair from '../getKrPair'
import signAndSendEventsHandler from '../signAndSendEventsHandler'
import { web3FromAddress } from '@polkadot/extension-dapp';

const voteOtherContractsDataProposal = async (
    changeId,
    vote,
    notifyCallback,
    api,
    addressValues,
    keyringAccount,
    resultsCb
) => {
    if (!changeId) {
        notifyCallback ?
            notifyCallback(`Change id is missing for other contracts data`) :
            console.log('Change id is missing for other contracts data');
        return
    }

    if (!api || !addressValues || !keyringAccount) {
        notifyCallback("Node api or Wallet info is missing")
        return
    }

    notifyCallback(`Voting for proposal of other contracts data with change ID ${changeId}`)

    // get kr pair
    const krPair = getKrPair(addressValues, keyringAccount)

    // get from account/ wallet
    let frmAcct;
    if (!krPair) {
        notifyCallback('Keyring pair not found, aborting other contracts data update')
        return
    }
    await getFromAcct(krPair, api, (response) => frmAcct = response)

      // finds an injector for an address
    let nonceAndSigner = { nonce: -1 };

    if (typeof frmAcct === 'string') {
        const injector = await web3FromAddress(frmAcct).catch(console.error);
        nonceAndSigner['signer'] = injector?.signer
    }

    // transact
    const otherContractsDataProposalVote = api.tx.crm.voteProposalCrmOthercontractsdata(
        parseInt(changeId),
        vote
    )

    // handle sign and send status
    await otherContractsDataProposalVote.signAndSend(
        frmAcct,
        nonceAndSigner,
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `Other contracts data proposal with change ID ${changeId}, Vote success!`,
                (response) => resultsCb ? resultsCb(response) : console.log('callback missing'))
        }
    );
}

export default voteOtherContractsDataProposal