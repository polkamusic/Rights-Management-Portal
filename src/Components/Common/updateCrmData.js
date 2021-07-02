import isEqual from 'lodash.isequal'

const updateCrmData = async (
    capturedCrmData, 
    nodeFormikValues, 
    api,

    ) => {
    if (!capturedCrmData || !api) return

    const newNodeFormikValues = {
        ipfsArtworkFile: nodeFormikValues?.ipfsArtworkFile,
        ipfsArtworkFileUrl: nodeFormikValues?.ipfsArtworkFileUrl,
        ipfsMp3WavFile: nodeFormikValues?.ipfsMp3WavFile,
        ipfsMp3WavFileUrl: nodeFormikValues?.ipfsMp3WavFileUrl,
        ipfsCsvHash: nodeFormikValues?.ipfsCsvHash,
        ipfsOtherValues: nodeFormikValues?.ipfsOtherValues,
      }

    //  if (is not equal, capturedData vs formikValues) change
    if (!isEqual(capturedCrmData, newNodeFormikValues)) {


    }
}

export default updateCrmData