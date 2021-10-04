import getFromAcct from '../getFromAcct'
import getKrPair from '../getKrPair'
import signAndSendEventsHandler from '../signAndSendEventsHandler'
import { web3FromAddress } from '@polkadot/extension-dapp';

const voteMasterDataProposal = async (
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
            notifyCallback(`Change id is missing for master data`) :
            console.log('Change id is missing for master data');
        return
    }

    if (!api || !addressValues || !keyringAccount) {
        notifyCallback ? notifyCallback("Node api or Wallet info is missing") :
            console.log("Node api or Wallet info is missing")
        return
    }

    notifyCallback(`Voting for proposal of master data with change ID ${changeId}`)

    // get kr pair
    const krPair = getKrPair(addressValues, keyringAccount)

    // get from account/ wallet
    let frmAcct;
    if (!krPair) {
        notifyCallback('Keyring pair not found, aborting master data update')
        return
    }

    await getFromAcct(krPair, api, (response) => frmAcct = response)

    // finds an injector for an address, check wallet(frmAcct type is string) or dev acct
    let nonceAndSigner = { nonce: -1 };

    if (typeof frmAcct === 'string') {
        const injector = await web3FromAddress(frmAcct).catch(console.error);
        nonceAndSigner['signer'] = injector?.signer
    }

    // transact
    const masterDataProposalVote = api.tx.crm.voteProposalCrmMasterdata(
        parseInt(changeId),
        vote
    )

    // sign and send , nonce and signer param
    console.log('nonceAndSigner', nonceAndSigner)

    // handle sign and send status
    await masterDataProposalVote.signAndSend(
        frmAcct, // frmAcct, // hexFormatAcct?.toString(),
        nonceAndSigner,
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `Master data proposal with change ID ${changeId}, Vote success!`,
                (response) => resultsCb ? resultsCb(response) : console.log('callback missing'))
        }
    );
}

export default voteMasterDataProposal