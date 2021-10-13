import axios from 'axios';

const getProposalChanges = async (
    url=null, 
    responseCallback=null, 
    errorCallback=null,
    _cancelToken=null) => {
    if (!url) return

    return await axios
        .get(url, { cancelToken: _cancelToken })
        .then(function (response) {
            // console.log('get data response', response);
            if (response && response.statusText === "OK") {
                if (responseCallback) responseCallback(response.data)
            }
        })
        .catch(function (error) {
            if (errorCallback) errorCallback(error)
        });
};

export default getProposalChanges