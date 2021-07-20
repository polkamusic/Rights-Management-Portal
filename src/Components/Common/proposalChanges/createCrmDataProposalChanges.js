
const createCrmDataProposalChanges = (
    contractid, 
    ipfshash,
    ipfshashprivate,
    globalquorum,
    mastershare,
    masterquorum,
    compositionshare,
    compositionquorum,
    othercontractsshare,
    othercontractsquorum
    ) => {
    return {
        contractid, 
        ipfshash,
        ipfshashprivate,
        globalquorum,
        mastershare,
        masterquorum,
        compositionshare,
        compositionquorum,
        othercontractsshare,
        othercontractsquorum
    }
}

export default createCrmDataProposalChanges