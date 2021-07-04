import keyring from '@polkadot/ui-keyring';

const getKrPair = (addressValues, keyringAccount) => {
    if (!addressValues || !keyringAccount) return


    const krpair = keyring.getPair(keyringAccount.address);
    console.log('get kr pair res', krpair);
    
    keyring.getAddresses().forEach(kra => {
        if (kra.address?.toString() === krpair.address?.toString()) {
            console.log('getKrPair - kr address already saved');
        } else {
            keyring.saveAddress(krpair.address, { name: krpair.meta.name });
        }
    });

    console.log('getKrPair - kr addresses', keyring.getAddresses());
    return krpair
}

export default getKrPair