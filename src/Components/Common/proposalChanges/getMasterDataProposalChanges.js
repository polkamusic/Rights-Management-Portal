import axios from 'axios';

const getMasterDataProposalChanges = async (responseCallback=null, errorCallback=null) => {
    const url = `http://127.0.0.1:8080/api/crmMasterDataChangeProposal`;
    
    return await axios
        .get(url)
        .then(function (response) {
            console.log('get master data response', response);
            if (response && response.statusText === "OK") {
                if (responseCallback) responseCallback(response.data)
            }
        })
        .catch(function (error) {
            if (errorCallback) errorCallback(error)
        });
};

export default getMasterDataProposalChanges