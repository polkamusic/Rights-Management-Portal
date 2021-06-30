import {
    u8aToString
  } from '@polkadot/util';

async function checkContractsExists(idParam, nodeApi, callback) {
    if (!idParam || !nodeApi) {
        console.log(`checkContractsExists contract id: ${idParam}`)
        console.log(`checkContractsExistsnode api: ${nodeApi}`);
        return
    }

    const parsedId = parseInt(idParam)

    const otherContract = await nodeApi.query.crm.crmData(parsedId)

    const parsedContract = otherContract.isEmpty ? null: JSON.parse(u8aToString(otherContract.value))

    if (callback) callback(parsedContract)
    
}

export default checkContractsExists