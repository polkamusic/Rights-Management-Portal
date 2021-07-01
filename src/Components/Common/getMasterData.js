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

    const masterContract = await nodeApi.query.crm.crmMasterData(parsedId)

    const parsedContract = masterContract.isEmpty ? null: JSON.parse(u8aToString(masterContract.value))

    if (callback) callback(parsedContract)
    
}

export default getMasterData