import { web3FromSource } from '@polkadot/extension-dapp';


const getFromAcct = async (krpair, api) => {
    if (!krpair || !api) return

    const {
        address,
        meta: { source, isInjected }
      } = krpair;
      let fromAcct;

      if (isInjected) {
        console.log('getFromAcct - is injected', isInjected);
        const injected = await web3FromSource(source);
        fromAcct = address;
        api.setSigner(injected.signer);
      } else {
        fromAcct = krpair;
      }

      console.log('getFromAcct res', fromAcct);
      return fromAcct
}

export default getFromAcct