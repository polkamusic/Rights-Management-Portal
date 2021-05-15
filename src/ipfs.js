import { create } from 'ipfs-http-client';

// change localhost to e.g. infuria.ipfs.io/yourStorage/
const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' })

export default ipfs;