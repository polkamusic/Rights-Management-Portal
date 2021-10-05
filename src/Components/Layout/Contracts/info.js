import React from 'react';
import CrmDataGrid from '../../Layout/crmDataGrid';
import { bool, func, number, shape, string } from 'prop-types';
import {
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    // DialogContentText,
    DialogTitle,
    Button,
    Box,
    Typography,
} from '@material-ui/core';

const toggleDialog = (state, openFunc) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    if (openFunc) openFunc(state)
};

function ContractInfo({ contract, openInfo, openFunc, onContractEdit }) {

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
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                        <Box pb={1}>
                            <Typography variant="h6">
                                {`Contract ID ${contract?.id}`}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="subtitle2">
                            Song
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                        <Typography variant="subtitle1">
                            {contract?.song || ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Typography variant="subtitle2">
                            Artist
                        </Typography>
                    </Grid>
                    <Grid item xs={9} sm={9}>
                        <Typography variant="subtitle1">
                            {contract?.artist || ''}
                        </Typography>
                    </Grid>
                    <Box pt={2} pb={2}>{" "}</Box>
                    <CrmDataGrid crmData={contract} />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) =>  onContractEdit(e, contract?.id)}>
                    Update
                </Button>
                <Button onClick={() => openFunc(false)} color="secondary" autoFocus>
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
        song: string,
        artist: string
    }),
    openInfo: bool,
    openFunc: func
}

export default ContractInfo;