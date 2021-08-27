import getFromAcct from '../getFromAcct'
import getKrPair from '../getKrPair'
import signAndSendEventsHandler from '../signAndSendEventsHandler'
import { web3FromAddress } from '@polkadot/extension-dapp';
// import { u8aToHex } from '@polkadot/util';

const voteMasterDataProposal = async (
    changeId,
    vote,
    notifyCallback,
    api,
    addressValues,
    keyringAccount,
) => {
    console.log('vote master data proposal area');
    console.log(changeId, vote)
    if (!changeId) {
        notifyCallback ?
            notifyCallback(`Change id is missing for master data`) :
            console.log('Change id is missing for master data');
        return
    }

    if (!api || !addressValues || !keyringAccount) {
        notifyCallback("Node api or Wallet info is missing")
        return
    }

    notifyCallback(`Voting for proposal of master data with change ID ${changeId}`)

    // get kr pair
    const krPair = getKrPair(addressValues, keyringAccount)
    console.log('kr Pair', krPair);

    // get from account/ wallet
    let frmAcct;
    if (!krPair) {
        notifyCallback('Keyring pair not found, aborting master data update')
        return
    }
    // const hexFormatAcct = u8aToHex(krPair?.publicKey)
    // console.log('hex format acct simple mode 2', hexFormatAcct);

    await getFromAcct(krPair, api, (response) => frmAcct = response)
    // console.log('update master frmAcct', frmAcct);

    // finds an injector for an address
    const injector = await web3FromAddress(frmAcct).catch(console.error);
    // console.log('injector', injector.signer);

    // transact
    console.log('master data proposal vote payload', JSON.stringify(
        {
            changeIdValue: parseInt(changeId),
            voteValue: vote
        }
    ));
    const masterDataProposalVote = api.tx.crm.voteProposalCrmMasterdata(
        parseInt(changeId),
        vote
    )

    // handle sign and send status
    await masterDataProposalVote.signAndSend(
        frmAcct, // frmAcct, // hexFormatAcct?.toString(),
        { nonce: -1, signer: injector.signer },
        ({ status, events }) => {
            signAndSendEventsHandler(
                events,
                notifyCallback,
                api,
                `Master data proposal with change ID ${changeId}, Vote success!`)
        }
    );
}

export default voteMasterDataProposal