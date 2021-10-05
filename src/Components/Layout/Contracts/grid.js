import React from 'react';
import {
    Box,
} from '@material-ui/core';
import ContractItem from './item';
import ContractInfo from './info';
import { array, number, shape, string, arrayOf } from 'prop-types';

function ContractGrid({ contracts }) {
    const [openInfo, setOpenInfo] = useState(false);
    const [displayContract, setDisplayContract] = useState(null);

    return (<>
        {/* list */}
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {
                (contracts && contracts.length) &&
                contracts.map(contract => (<ContractItem
                    ipfsHashPrivate={contract?.ipfshashprivate}
                    song={contract?.song}
                    artist={contract?.artist}
                    onClick={() => {
                        setOpenInfo(!openInfo)
                        setDisplayContract(contract)
                    }}
                />))
            }
        </Box>
        {/* Dialog */}
        <ContractInfo contract={displayContract} openInfo={openInfo} openFunc={setOpenInfo} />
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
        action: array,
        song: string,
        artist: string,
    }))
}

export default ContractGrid;
