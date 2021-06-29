import {
    u8aToString
  } from '@polkadot/util';

async function checkContractsExists(idParam, nodeApi, resultsCallback) {
    if (!idParam || !nodeApi) {
        console.log(`contract id: ${idParam}`)
        console.log(`node api: ${nodeApi}`);
        return
    }

    // console.log('icp id ', idParam);

    const parsedId = parseInt(idParam)

    const otherContract = await nodeApi.query.crm.crmData(parsedId)

    // console.log('other Contract', otherContract);
    // console.log('parsed o c', u8aToString(otherContract.value));

    const parsedOtherContract = otherContract.isEmpty ? null: JSON.parse(u8aToString(otherContract.value))

    if (resultsCallback) resultsCallback(parsedOtherContract)
    
}

export default checkContractsExists