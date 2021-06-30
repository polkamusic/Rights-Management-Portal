
const unsetQuorumAndShareInput = (nodeFormikVal) => {

    nodeFormikVal.setFieldValue('ipfsOtherValues.mastershare','')
    nodeFormikVal.setFieldValue('ipfsOtherValues.masterquorum', '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.compositionshare', '')
    nodeFormikVal.setFieldValue('ipfsOtherValues.compositionquorum', '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.othercontractsshare', '')
    nodeFormikVal.setFieldValue('ipfsOtherValues.othercontractsquorum', '')

    nodeFormikVal.setFieldValue('ipfsOtherValues.globalquorum', '')
}

export default unsetQuorumAndShareInput