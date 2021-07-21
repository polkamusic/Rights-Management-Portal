
const createRevSplitDataProposalChanges = (data) => {
    return data.map(d => {
        return {
            changeid: d.changeid,
            contractid: d.contractid,
            nickname: d.nickname,
            account: d.account,
            percentage: d.percentage
        }
    })
}

export default createRevSplitDataProposalChanges