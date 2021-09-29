import axios from 'axios';

export const pinFileToIPFS = (file, filename, successCallback = null, errorCallback = null, contractSongName = '', userAccount = '') => {

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const token = process.env.REACT_APP_PINATA_TOKEN;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', file);

    // check if we have an account then add to metadata
    if (userAccount && contractSongName) {
        const metadata = JSON.stringify({
            name: userAccount,
            keyvalues: {
                songName: contractSongName
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
            }
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

export const userPinList = async (queryParams, successCallback = null, errorCallback = null) => {

    const token = process.env.REACT_APP_PINATA_TOKEN;

    let queryString = '?';

    // if (queryParams.hashContains) {
    //     queryString = queryString + `hashContains=${queryParams.hashContains}&`;
    // }

    if (queryParams.selectedPinStatus) {
        queryString = queryString + `status=${queryParams.selectedPinStatus}&`;
    }

    if (queryParams.nameContains) {
        queryString = queryString + `metadata[name]=${queryParams.nameContains}&`;
    }

    const url = `https://api.pinata.cloud/data/pinList${queryString}`;

    return await axios
        .get(url, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(function (response) {
            console.log('User pin list response:', response);
            if (response && response.statusText === "OK") {
                if (successCallback) successCallback(response.data)
            }
        })
        .catch(function (error) {
            if (errorCallback) errorCallback(error)
        });

};

