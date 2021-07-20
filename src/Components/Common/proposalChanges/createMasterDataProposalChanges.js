
const createMasterDataProposalChanges = (
    changeid,
    contractid,
    nickname,
    account,
    percentage
) => {
    return {
        changeid,
        contractid,
        nickname,
        account,
        percentage
    }
}

export default createMasterDataProposalChanges