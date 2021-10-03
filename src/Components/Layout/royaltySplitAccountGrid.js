
import React from 'react';
import {
    Grid,
    Typography,
} from '@material-ui/core';

export const SplitAccountHeader = () => (<>
    <Grid item xs={1} sm={1}>
        <Typography variant="subtitle2">
            No.
        </Typography>
    </Grid>

    <Grid item xs={1} sm={1}>
        <Typography noWrap variant="subtitle2">
            Name
        </Typography>
    </Grid>

    <Grid item xs={8} sm={8}>
        <Typography noWrap variant="subtitle2">
            Account
        </Typography>
    </Grid>

    <Grid item xs={1} sm={1}>
        <Typography variant="subtitle2">
            Percent
        </Typography>
    </Grid>

    <Grid item xs={1} sm={1}>
        <Typography variant="subtitle2">
            Vote 
        </Typography>
    </Grid>
</>)

export const splitAccountRow = (row, idx) => {
    return (<React.Fragment key={idx}>
        <Grid item xs={1} sm={1}>
            <Typography variant="subtitle1">{idx + 1}</Typography>
        </Grid>

        <Grid item xs={1} sm={1}>
            <Typography noWrap variant="subtitle1">{row?.nickname || ''}</Typography>
        </Grid>

        <Grid item xs={8} sm={8}>
            <Typography noWrap variant="subtitle1">{row?.account || ''}</Typography>
        </Grid>

        <Grid item xs={1} sm={1}>
            <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
        </Grid>

        <Grid item xs={1} sm={1}>
            <Typography variant="subtitle1">{row?.vote || ''}</Typography>
        </Grid>
    </React.Fragment>)
    }