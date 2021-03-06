import React, { useState } from 'react';

import ContractItem from './item';
import ContractInfo from './info';
import { number, shape, string, arrayOf, func } from 'prop-types';

function ContractGrid({ contracts, onContractEdit, notify, nodeApi }) {
    const [openInfo, setOpenInfo] = useState(false);
    const [displayContract, setDisplayContract] = useState(null);

    return (<>
        {/* list */}
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {
                (contracts && contracts.length) &&
                contracts.map((contract, idx) => (<ContractItem
                    key={idx}
                    ipfsHashPrivate={contract?.ipfshashprivate}
                    song={contract?.song}
                    artist={contract?.artist}
                    onClick={() => {
                        setOpenInfo(!openInfo)
                        setDisplayContract(contract)
                    }}
                    notify={notify}
                />))
            }
        </div>
        {/* Dialog */}
        <ContractInfo 
            contract={displayContract} 
            openInfo={openInfo} 
            openFunc={setOpenInfo} 
            onContractEdit={onContractEdit}
            notify={notify}
            nodeapi={nodeApi}
        />
    </>);
}

ContractGrid.propTypes = {
    contracts: arrayOf(shape({
        id: number,
        ipfshash: string,
        ipfshashprivate: string,
        globalquorum: number,
        mastershare: number,
        masterquorum: number,
        compositionshare: number,
        compositionquorum: number,
        othercontractsshare: number,
        othercontractsquorum: number,
        song: string,
        artist: string,
    })),
    onContractEdit: func
}

export default ContractGrid;
