
const setQuorumAndShareInput = (nodeFormikVal, crmData) => {

    nodeFormikVal.setFieldValue('ipfsOtherValues.mastershare', crmData?.mastershare?.toString() || '')
    nodeFormikVal.setFieldValue('ipfsOtherValues.masterquorum', crmData?.masterquorum?.toString() || '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.compositionshare', crmData?.compositionshare?.toString() || '')
    nodeFormikVal.setFieldValue('ipfsOtherValues.compositionquorum', crmData?.compositionquorum?.toString() || '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.othercontractsshare', crmData?.othercontractsshare?.toString() || '')
    nodeFormikVal.setFieldValue('ipfsOtherValues.othercontractsquorum', crmData?.othercontractsquorum?.toString() || '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.globalquorum', crmData?.globalquorum?.toString() || '')
}

export default setQuorumAndShareInput
