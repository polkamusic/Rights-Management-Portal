import {
    u8aToString
  } from '@polkadot/util';

async function getMasterData(idParam, nodeApi, callback) {
    if (!idParam || !nodeApi) {
        console.log(`getMasterData contract id: ${idParam}`)
        console.log(`getMasterData api: ${nodeApi}`);
        return
    }

    const parsedId = parseInt(idParam)

    const otherContract = await nodeApi.query.crm.crmMasterData(parsedId)

    const parsedContract = otherContract.isEmpty ? null: JSON.parse(u8aToString(otherContract.value))

    if (callback) callback(parsedContract)
    
}

export default getMasterData