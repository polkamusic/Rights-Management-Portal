import axios from 'axios';


const ipfsFiledownload = (hash = '', callback, errCallback) => {
  const url = `https://gateway.pinata.cloud/ipfs/${hash}`

  return axios({
    url,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    if (response) {
      
       const _file = window.URL.createObjectURL(new Blob([response.data]));
      const x = new Blob([response.data])
      if (callback) callback(x)
    }
  }).catch(errCallback(console.error));

}

export default ipfsFiledownload