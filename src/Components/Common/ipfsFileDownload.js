import axios from 'axios';


const ipfsFiledownload = (hash='', callback, errCallback) => {
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`

    axios({
        url,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        console.log(response.data);
         const fileurl = window.URL.createObjectURL(new Blob([response.data]));

         console.log('ipfs file dl url', fileurl);
         if (callback && fileurl) callback(fileurl)
      }).catch(errCallback(console.error));

}

export default ipfsFiledownload