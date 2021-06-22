import { create } from 'ipfs-http-client';

// change localhost to e.g. infuria.ipfs.io/yourStorage/

// pinata.cloud
const ipfs = create({ 
    url: 'https://api.pinata.cloud/pinning', 
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1MWI5ZGZkYy1lOTRjLTQ5NDgtODZjOS0wMzRhOWM0ZGE1MjEiLCJlbWFpbCI6InRpdHVzbWVuY2lhbm9AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjJhNzIxZjlkYjllNWRiMmNkY2Y0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMWIzMjQxMTQwODA5Yzk2NmE4ZGZlMTQzMDEyNmU0ODJlZGMwNjRiYWZjZDI2ZDUwOWEzNTNmYzU1NWQwYjhlMyIsImlhdCI6MTYyNDI1MjUyMX0.-gn8Bxm8FCuVoottOnEl6oSmI98oZM_ikYzvvBJ6niE',
        // pinata_api_key: 'your pinata api key',
        // pinata_secret_api_key: 'your pinata secret api key'
    } 
})


export default ipfs;