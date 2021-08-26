import axios from 'axios';

export const pinFileToIPFS = (file, filename, successCallback=null, errorCallback=null) => {

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const token = process.env.REACT_APP_PINATA_TOKEN;
    
    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', file, filename);
    
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