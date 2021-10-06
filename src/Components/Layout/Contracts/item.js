import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: 175,
    },
    hover: {
        cursor: 'pointer'
    }
});

function ContractItem({ ipfsHashPrivate, song, artist, onClick, onContractEdit }) {
    const classes = useStyles();

    // check hash with first char B

    return (<Box p={2} onClick={onClick}>
        {/* artwork */}
        {
            ipfsHashPrivate ? (
                <Box pt={1} className={classes.hover}>
                <Paper variant="outlined" square className={classes.root}>
                    <img
                        src={`https://gateway.pinata.cloud/ipfs/${ipfsHashPrivate.split(',')[0]}`}
                        width="175px"
                        height="175px"
                        alt="Artwork"
                    />
                </Paper>
            </Box>
            ) : <CircularProgress />
        }
       

        {/* song */}
        <Box pt={1}>
        <Typography variant="subtitle2">
            {song || ''}
        </Typography>
        </Box>

        {/* artist */}
        <Box pt={1}>
        <Typography variant="body2">
            {artist || ''}
        </Typography>
        </Box>
 

    </Box>);
}

export default ContractItem;

