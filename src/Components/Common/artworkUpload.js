import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Iframe from 'react-iframe';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
        width: 175,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 2,
    },
});

const ArtworkUpload = (props) => {
    // const [artworkFilename, setArtworkFilename] = useState('')
    const classes = useStyles();


    return (
        <>
            <Box display="flex" flexDirection="row" pb={2}>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Artwork
                <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(event) => {
                            // setArtworkFilename(event?.currentTarget?.files[0]?.name || '')
                            if (props && props.nodeFormikVal)
                                props.nodeFormikVal
                                    .setFieldValue("ipfsArtworkFile", event.currentTarget.files[0]);
                        }}
                    />
                </Button>
                {'  '}
                <span>
                    {/* {artworkFilename} */}
                    {
                        props?.nodeFormikVal?.values?.ipfsArtworkFile?.name || ''
                    }


                </span>
            </Box>

            {
                props.nodeFormikVal?.values?.ipfsArtworkFileUrl &&
                <Box pt={1}>
                    <Link target="_blank" rel="noreferrer" href={
                        `${props.nodeFormikVal?.values?.ipfsArtworkFileUrl || ''}`
                    } download="artwork.png">
                        {`${props.nodeFormikVal?.values?.ipfsArtworkFileUrl || ''}`}
                    </Link>

                    <Paper variant="outlined" square className={classes.root}>
                        <img
                            src={props.nodeFormikVal?.values?.ipfsArtworkFileUrl}
                            width="175px"
                            height="175px"
                            alt="ipfs Artwork File"
                        />
                    </Paper>

                </Box>
            }
        </>
    )
}

export default ArtworkUpload
