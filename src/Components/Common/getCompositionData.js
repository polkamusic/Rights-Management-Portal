import {
    u8aToString
  } from '@polkadot/util';

async function getCompositionData(idParam, nodeApi, callback) {
    if (!idParam || !nodeApi) {
        console.log(`getCompositionData contract id: ${idParam}`)
        console.log(`getCompositionData api: ${nodeApi}`);
        return
    }

    const parsedId = parseInt(idParam)

    const compositionContract = await nodeApi.query.crm.crmCompositionData(parsedId)

    const parsedContract = compositionContract.isEmpty ? null: JSON.parse(u8aToString(compositionContract.value))

    if (callback) callback(parsedContract)
    
}

export default getCompositionData