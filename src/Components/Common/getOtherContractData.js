import {
    u8aToString
  } from '@polkadot/util';

async function getOtherContractData(idParam, nodeApi, callback) {
    if (!idParam || !nodeApi) {
        console.log(`getOtherContractData contract id: ${idParam}`)
        console.log(`getOtherContractData api: ${nodeApi}`);
        return
    }

    const parsedId = parseInt(idParam)

    const otherContract = await nodeApi.query.crm.crmOtherContractsData(parsedId)

    const parsedContract = otherContract.isEmpty ? null: JSON.parse(u8aToString(otherContract.value))

    // console.log('getOtherContractsData parsedContract', parsedContract);

    if (callback) callback(parsedContract)
    
}

export default getOtherContractData