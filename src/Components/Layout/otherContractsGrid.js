import React from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';

export const OtherContractsHeader = () => (<>
    <Grid item xs={3} sm={3}>
        <Typography variant="subtitle2">
            No.
        </Typography>
    </Grid>

    <Grid item xs={3} sm={3}>
        <Typography noWrap variant="subtitle2">
            ID
        </Typography>
    </Grid>

    <Grid item xs={3} sm={3}>
        <Typography variant="subtitle2">
            Percent
        </Typography>
    </Grid>

    <Grid item xs={3} sm={3}>
        <Typography variant="subtitle2">
            Vote
        </Typography>
    </Grid>

</>)

export const otherContractsRow = (row, idx) => {
    return (<React.Fragment key={idx}>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle1">{idx + 1}</Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography noWrap variant="subtitle1">{row?.id || ''}</Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle1">{row?.vote || ''}</Typography>
        </Grid>
    </React.Fragment>)
}