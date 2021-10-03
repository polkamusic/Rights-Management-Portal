import getRandomFromRange from "../Common/getRandomIntFromRange"



const getVerifiedContractId = async (_localCurrCrmId, _nodeApi) => {
    if (!_localCurrCrmId || !_nodeApi) return

    let verifiedContractID = _localCurrCrmId

    let crmIsEmpty = false
    do {

        const parsedId = parseInt(verifiedContractID)
        const crm = await _nodeApi.query.crm.crmData(parsedId)

        if (crm.isEmpty) {
            // no crm id exists, break, proceed
            crmIsEmpty = true
        } else {
            // try with new random id
            console.log('Contract id already in the node');
            verifiedContractID = getRandomFromRange(170, 3000)
        }

    } while (!crmIsEmpty)

    return verifiedContractID
}

export default getVerifiedContractId