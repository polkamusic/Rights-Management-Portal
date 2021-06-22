import axios from 'axios';

export const pinFileToIPFS = (file, filename, successCallback=null, errorCallback=null) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MWI5ZGZkYy1lOTRjLTQ5NDgtODZjOS0wMzRhOWM0ZGE1MjEiLCJlbWFpbCI6InRpdHVzbWVuY2lhbm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJhNzIxZjlkYjllNWRiMmNkY2Y0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMWIzMjQxMTQwODA5Yzk2NmE4ZGZlMTQzMDEyNmU0ODJlZGMwNjRiYWZjZDI2ZDUwOWEzNTNmYzU1NWQwYjhlMyIsImlhdCI6MTYyNDI1MjUyMX0.-gn8Bxm8FCuVoottOnEl6oSmI98oZM_ikYzvvBJ6niE';

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