import React from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';

export const OtherContractsHeader = () => (<>
    <Grid item xs={2} sm={2}>
        <Typography variant="subtitle2">
            No.
        </Typography>
    </Grid>

    <Grid item xs={5} sm={5}>
        <Typography noWrap variant="subtitle2">
            ID
        </Typography>
    </Grid>

    <Grid item xs={5} sm={5}>
        <Typography variant="subtitle2">
            Percent
        </Typography>
    </Grid>

</>)

export const otherContractsRow = (row, idx) => {
    return (<React.Fragment key={idx}>
        <Grid item xs={2} sm={2}>
            <Typography variant="subtitle1">{idx + 1}</Typography>
        </Grid>

        <Grid item xs={5} sm={5}>
            <Typography noWrap variant="subtitle1">{row?.id || ''}</Typography>
        </Grid>

        <Grid item xs={5} sm={5}>
            <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
        </Grid>

    </React.Fragment>)
}