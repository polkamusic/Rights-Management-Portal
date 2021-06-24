import {
    u8aToString
  } from '@polkadot/util';

async function checkCrmById(idParam, nodeApi, resultsCallback) {
    if (!idParam || !nodeApi) {
        console.log(`id: ${idParam}`)
        console.log(`node api: ${nodeApi}`);
        return
    }

    console.log('id param', idParam);

    const parsedId = parseInt(idParam)

    const crm = await nodeApi.query.crm.crmData(parsedId)

    console.log('crm data', crm);
    console.log('parsed crm', u8aToString(crm.value));

    const parsedcrm = crm.isEmpty ? null: JSON.parse(u8aToString(crm.value))

    if (resultsCallback) resultsCallback(parsedcrm)
    
}

export default checkCrmById