import axios from 'axios';

export const pinFileToIPFS = (
    file,
    filename,
    successCallback = null,
    errorCallback = null,
    contractSongName = '',
    userAccount = '', accounts = '',
    contractID = 0, artistName = '',
    canceltoken=null) => {

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const token = process.env.REACT_APP_PINATA_TOKEN;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', file);

    // extract ddex info to key-value(string) pair

    // check if we have an account then add to metadata
    if (contractSongName && contractID) {
        const metadata = JSON.stringify({
            name: 'polm',
            keyvalues: {
                songName: contractSongName,
                accounts,
                creatorAccount: userAccount,
                contractID,
                artistName
            }
        });
        data.append('pinataMetadata', metadata);
    }

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                authorization: `Bearer ${token}`,
            },
            cancelToken: canceltoken
        })
        .then(function (response) {
            if (response && response.statusText === "OK") {
                if (successCallback) successCallback(response.data)
            }
        })
        .catch(function (error) {
            if (errorCallback) errorCallback(error)
        });

};

export const userPinList = (queryParams, successCallback = null, errorCallback = null, canceltoken=null) => {

    const token = process.env.REACT_APP_PINATA_TOKEN;

    let queryString = '?';

    if (queryParams.selectedPinStatus) {
        queryString = queryString + `status=${queryParams.selectedPinStatus}&`;
    }

    if (queryParams.nameContains) {
        queryString = queryString + `metadata[name]=${queryParams.nameContains}&`;
    }

    //Make sure keyvalues are properly formatted as described earlier in the docs.
    if (queryParams.keyvalues) {
        const stringKeyValues = JSON.stringify(queryParams.keyvalues);
        queryString = queryString + `metadata[keyvalues]=${stringKeyValues}`;
    }

    const url = `https://api.pinata.cloud/data/pinList${queryString}`;

    return axios
        .get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            },
            cancelToken: canceltoken
        })
        .then(function (response) {
            if (response && response.statusText === "OK") {
                if (successCallback) successCallback(response.data)
            }
        })
        .catch(function (error) {
            if (errorCallback) errorCallback(error)
        });

};

