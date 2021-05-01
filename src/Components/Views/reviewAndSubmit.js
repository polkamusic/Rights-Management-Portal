import React from 'react'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TrackArtistTbl from '../Common/trackArtistTbl';
import BasicTbl from '../Common/basicTbl';
import SoundWave0 from '../Common/soundWave0';

// writers table
function createWritersData(writer, writerIPIorCAE, isni, writersPublisher, writersRole) {
    return { writer, writerIPIorCAE, isni, writersPublisher, writersRole };
}

const writerRows = [
    createWritersData('', '', '', '', 'Music & Lyrics'),
    createWritersData('', '', '', '', ''),
    createWritersData('', '', '', '', ''),
];

const writerHeaders = ['Writer', 'Writer IPI or CAE', 'ISNI', 'Writer\'s Publisher', 'Writer\'s Role'];
const writerHeadNames = ['writer', 'writerIPIorCAE', 'isni', 'writersPublisher', 'writersRole'];


// publishers table
function createPublishersData(publisher, publisherIPIorCAE, isni) {
    return { publisher, publisherIPIorCAE, isni };
}

const publisherRows = [
    createPublishersData('testaccount45', '', ''),
    createPublishersData('', '', ''),
    createPublishersData('', '', ''),
];

const publisherHeaders = ['Publisher', 'Publisher IPI or CAE', 'ISNI'];
const publisherHeadNames = ['publisher', 'publisherIPIorCAE', 'isni'];


const ReviewAndSubmit = () => {
    return (
        <>
            <br />
            <Typography color="secondary" variant="h6" gutterBottom align="left">
                T R A C K  &nbsp;&nbsp; I N F O
            </Typography>
            <Box mt={-4}>
                <SoundWave0 />
            </Box>
            <Grid container spacing={0}>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Composition Title:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">
                            value
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={2}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        IPFS:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">
                            b76450a88b1b3edc0beaf63143b0
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Content Part of Album:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">
                            true
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Title:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Producer:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Contains Samples:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">
                            false
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Featured Artist:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Featured Artist ISNI:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Primary Genre:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Secondary Genre:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Is Content Explicit:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Number:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Volume Number:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Duration:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Release Date:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Sales Start Date:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Country of Origin:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track P Line:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        ISRC Code:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        UPC or EAN:
                        </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box fontStyle="italic" pt={0.25}>
                        <Typography variant="body2" gutterBottom align="left">

                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" gutterBottom align="left">
                        Track Artists:
                        </Typography>
                    <TrackArtistTbl />
                </Grid>
                <Grid item xs={6} sm={3}>
                </Grid>
                <Grid item xs={6} sm={3}>
                </Grid>

                <Box pt={6}>
                    <Typography color="secondary" variant="h6" gutterBottom align="left">
                        C O M P O S I T I O N &nbsp;&nbsp; I N F O
                    </Typography>
                    <Box mt={-4}>
                        <SoundWave0 />
                    </Box>
                    <Grid container spacing={0}>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Composition Title:
                        </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box fontStyle="italic" pt={0.25}>
                                <Typography variant="body2" gutterBottom align="left">
                                    fegr
                        </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Composition Title Alternate:
                        </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Box fontStyle="italic" pt={0.25}>
                                <Typography variant="body2" gutterBottom align="left">

                                </Typography>
                            </Box>
                        </Grid>


                        <Grid item xs={6} sm={3}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Composition ISWC:
                        </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Box fontStyle="italic" pt={0.25}>
                                <Typography variant="body2" gutterBottom align="left">

                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Performing Rights Organization:
                        </Typography>
                        </Grid>
                        <Grid item xs={6} sm={2}>
                            <Box fontStyle="italic" pt={0.25}>
                                <Typography variant="body2" gutterBottom align="left">

                                </Typography>
                            </Box>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Writers:
                        </Typography>
                            <BasicTbl rows={writerRows} headNames={writerHeadNames} headers={writerHeaders} />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Typography variant="subtitle1" gutterBottom align="left">
                                Publishers:
                        </Typography>
                            <BasicTbl rows={publisherRows} headNames={publisherHeadNames} headers={publisherHeaders} />
                        </Grid>


                    </Grid>
                </Box>


                <Box pt={6}>
                    <Typography color="secondary" variant="h6" gutterBottom align="left">
                        M G T &nbsp;&nbsp; &  &nbsp;&nbsp; R O Y A L T Y &nbsp;&nbsp; S P L I T S
                    </Typography>
                    <Box mt={-4}>
                        <SoundWave0 />
                    </Box>
                    <Grid container spacing={0}>
                    </Grid>
                </Box>


            </Grid>
        </>
    )
}

export default ReviewAndSubmit
