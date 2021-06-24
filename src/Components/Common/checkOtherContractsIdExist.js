

async function checkOtherContractsIdExist(otherContractIdParam, nodeApi, resultsCallback) {
    if (!otherContractIdParam || !nodeApi) {
        console.log(`other contract id: ${otherContractIdParam}`)
        console.log(`node api: ${nodeApi}`);
        return
    }

    const parsedId = parseInt(otherContractIdParam)

    const otherContract = await nodeApi.query.crm.crmOtherContractsData(parseId)

    console.log('other Contract', otherContract);

    otherContract ? resultsCallback(otherContract) : resultsCallback(null)
}

export default checkOtherContractsIdExist