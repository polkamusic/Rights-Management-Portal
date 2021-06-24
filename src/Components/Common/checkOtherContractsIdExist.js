import {
    u8aToString
  } from '@polkadot/util';

async function checkOtherContractsIdExist(otherContractIdParam, nodeApi, resultsCallback) {
    if (!otherContractIdParam || !nodeApi) {
        console.log(`other contract id: ${otherContractIdParam}`)
        console.log(`node api: ${nodeApi}`);
        return
    }

    // console.log('icp id ', otherContractIdParam);

    const parsedId = parseInt(otherContractIdParam)

    const otherContract = await nodeApi.query.crm.crmOtherContractsData(parsedId)

    // console.log('other Contract', otherContract);
    // console.log('parsed o c', u8aToString(otherContract.value));

    const parsedOtherContract = otherContract.isEmpty ? null: JSON.parse(u8aToString(otherContract.value))

    if (resultsCallback) resultsCallback(parsedOtherContract)
    
}

export default checkOtherContractsIdExist