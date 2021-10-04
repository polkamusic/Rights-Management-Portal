import keyring from '@polkadot/ui-keyring';

const getKrPair = (addressValues, keyringAccount) => {
    if (!addressValues || !keyringAccount) return

    const krpair = keyring.getPair(keyringAccount.address);

    keyring.getAddresses().forEach(kra => {
        if (kra.address?.toString() !== krpair.address?.toString())
            keyring.saveAddress(krpair.address, { name: krpair.meta.name });
    });

    return krpair
}

export default getKrPair