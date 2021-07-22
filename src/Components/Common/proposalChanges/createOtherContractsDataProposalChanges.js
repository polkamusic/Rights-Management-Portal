const createOtherContractsDataProposalChanges = (data) => {
    return data.map(d => {
        return {
            changeid: d.changeid,
            contractid: d.contractid,
            othercontractid: d.othercontractid,
            percentage: d.percentage
        }
    })
}

export default createOtherContractsDataProposalChanges
