import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
import CrmDataGrid from '../../Layout/crmDataGrid';
import { array, bool, func, number, shape, string } from 'prop-types';

const toggleDialog = (state, openFunc) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    openFunc(state)
};

function ContractInfo({ contract, openInfo, openFunc }) {

    return (<>
        <Dialog
            open={openInfo}
            onClose={toggleDialog(false, openFunc)}
            aria-labelledby="contract-info-dialog-title"
            aria-describedby="contract-info-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="contract-info-dialog-title">{"Contract Information"}</DialogTitle>
            <DialogContent>
                <CrmDataGrid crmData={contract} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => console.log('handle contract update')}>
                    Update
                </Button>
                <Button onClick={() => openInfo(false)} color="secondary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

ContractInfo.propTypes = {
    contract: shape({
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
        song: string
    }),
    openInfo: bool,
    openFunc: func
}

export default ContractInfo;