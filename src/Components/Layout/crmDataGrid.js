import React from 'react';
import {
    Grid,
    Typography,
    Box
} from '@material-ui/core';

const crmDataGrid = (crmData) => {
    return (<>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                IPFS Hash
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.ipfshash || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                IPFS Hash Private (artwork)
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.ipfshashprivate?.split(',')[0] || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                IPFS Hash Private (mp3 or wav)
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.ipfshashprivate?.split(',')[1] || ''}
            </Typography>
        </Grid>

        <Box pt={2}>{" "}</Box>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Master Share
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.mastershare}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Master Quorum
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.masterquorum}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Composition Share
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.compositionshare}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Composition Quorum
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.compositionquorum}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Other Contracts Share
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.othercontractsshare}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Other Contracts Quorum
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.othercontractsquorum}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Global Quorum
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {crmData?.globalquorum}
            </Typography>
        </Grid>

    </>)
}

export default crmDataGrid