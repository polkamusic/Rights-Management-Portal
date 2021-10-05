import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

function ContractItem({ ipfsHashPrivate, song, artist }) {

    return (<Box>
        {/* artwork */}
        <Box pt={1}>
            <Paper variant="outlined" square className={classes.root}>
                <img
                    src={ipfsHashPrivate.split(',')[0]}
                    width="175px"
                    height="175px"
                    alt="Artwork"
                />
            </Paper>
        </Box>
        {/* song */}
        <Typography variant="subtitle2">
            {song || ''}
        </Typography>
        {/* artist */}
        <Typography variant="subtitle1">
            {artist || ''}
        </Typography>
    </Box>);
}

export default ContractItem;

