import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../Common/logo/PolkaMusic.svg';

const useStyles = makeStyles({
    root: {
        width: 175,
        height: 180,
    },
    hover: {
        cursor: 'pointer'
    }
});

function ContractItem({ ipfsHashPrivate, song, artist, onClick }) {
    const [imgSrc, setImgSrc] = useState(null);

    const classes = useStyles();

    // check artwork hash if undef or null, change imr src to polkamusic logo
    useEffect(() => {
        const artworkHash = ipfsHashPrivate?.split(',')[0] || ''

        if (!artworkHash || !ipfsHashPrivate || artworkHash === 'undefined') {
            setImgSrc(logo)
        } else {
            // check hash with first char B
            const hashFirstChar = artworkHash.charAt(0)
            if (hashFirstChar && hashFirstChar === 'B') {
                setImgSrc(logo)
            } else {
                setImgSrc(`https://gateway.pinata.cloud/ipfs/${artworkHash}`)
            }
        }


    }, [ipfsHashPrivate]);

    return (<Box p={2} onClick={onClick}>

        {/* artwork */}
        {
            ipfsHashPrivate ? (
                <Box pt={1} className={classes.hover}>
                    <Paper variant="outlined" square className={classes.root}>
                        <img
                            src={imgSrc}
                            width="175"
                            height="180"
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

