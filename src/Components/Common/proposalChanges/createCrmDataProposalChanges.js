
const createCrmDataProposalChanges = (data) => {
    return data.map(d => {
        return {
            contractid: d.contractid,
            ipfshash: d.ipfshash,
            ipfshashprivate: d.ipfshashprivate,
            globalquorum: d.globalquorum,
            mastershare: d.mastershare,
            masterquorum: d.masterquorum,
            compositionshare: d.compositionshare,
            compositionquorum: d.compositionquorum,
            othercontractsshare: d.othercontractsshare,
            othercontractsquorum: d.othercontractsquorum
        }
    })
}

export default createCrmDataProposalChanges