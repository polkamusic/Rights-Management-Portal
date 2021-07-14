import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { keyring } from '@polkadot/ui-keyring';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

cryptoWaitReady()
  .then(() => {
    // keyring.loadAll({ isDevelopment: true });
    try {
      async function getAccounts() {
        await web3Enable('PolkaMusic');
        let allAccounts = await web3Accounts();
        allAccounts = allAccounts.map(({ address, meta }) =>
          ({ address, meta: { ...meta, name: `${meta.name} (${meta.source})` } }));
        keyring.loadAll({ isDevelopment: true }, allAccounts);
        const krAccts = keyring.getAccounts();
        ReactDOM.render(<App keyringAccts={krAccts} />, document.getElementById('root'));
      }
      getAccounts();
    } catch (err) {
      console.log(err);
    }
  })
  .catch(console.error);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
