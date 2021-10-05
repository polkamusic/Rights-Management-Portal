import axios from 'axios';


const ipfsFiledownload = (hash='', callback, errCallback) => {
    const url = `https://gateway.pinata.cloud/ipfs/${hash}`

    axios({
        url,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
         const csvfile = window.URL.createObjectURL(new Blob([response.data]));

         if (callback) callback(csvfile)
      }).catch(errCallback(console.error));

}

export default ipfsFiledownload