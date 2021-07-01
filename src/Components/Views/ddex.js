import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArtworkUpload from '../Common/artworkUpload';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IosSlider from '../Common/iosSlider';
import { Box } from '@material-ui/core';
import Link from '@material-ui/core/Link';
// import ipfsFiledownload from '../Common/ipfsFileDownload';

const DDEX = (props) => {
    const [csvFileUrl, setCsvFileUrl] = useState(null)
    const [csvFilename, setCsvFilename] = useState(null)

    useEffect(() => {

        console.log('props.nodeFormikVal?.values?.ipfsCsvHash', props.nodeFormikVal?.values?.ipfsCsvHash);
        if (props.nodeFormikVal?.values?.ipfsCsvHash) {

            // ipfsFiledownload(
            //     props.nodeFormikVal?.values?.ipfsCsvHash,
            //     (response) => {
            //         setCsvFileUrl(response)
            //         setCsvFilename(response?.name || '')
            //     },
            //     (err) => { console.log(err) })
            const hash = props.nodeFormikVal?.values?.ipfsCsvHash
            const fileurl = `https://gateway.pinata.cloud/ipfs/${hash}`
            console.log('fileurl', fileurl);
            setCsvFileUrl(fileurl)
            setCsvFilename(fileurl)
        }

        // return () => {

        // }
    }, [props.nodeFormikVal?.values?.ipfsCsvHash])

    return (
        <>
            <br />
            {
                props.nodeFormikVal?.values?.ipfsCsvHash &&
                <>
                    <Typography color="secondary" variant="h6" gutterBottom align="left">
                        F I L E S
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Link href={csvFileUrl} download="ddex.csv">
                                {csvFilename || ''}
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {" "}
                        </Grid>
                    </Grid>
                </>
            }


            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    M E T A D A T A
            </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="description"
                        name="metadata.description"
                        label="Description"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.metadata?.description || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="formatVersion"
                        name="metadata.formatVersion"
                        label="Format Version"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.metadata?.formatVersion || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="totalReleases"
                        name="metadata.totalReleases"
                        label="Total Releases"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.metadata?.totalReleases || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="totalTracks"
                        name="metadata.totalTracks"
                        label="Total Tracks"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.metadata?.totalTracks || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
            </Grid>

            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    R E L E A S E &nbsp;&nbsp; I N F O
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="action"
                        name="releaseInfo.action"
                        label="Action"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.action || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="upc"
                        name="releaseInfo.upc"
                        label="UPC"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.upc || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="catalogNumber"
                        name="releaseInfo.catalogNumber"
                        label="Catalog Number"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.catalogNumber || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="grid"
                        name="releaseInfo.grid"
                        label="Grid"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.grid || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="releaseInfo.title"
                        label="Title"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.title || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="remixOrVersion"
                        name="releaseInfo.remixOrVersion"
                        label="Remix Or Version"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.remixOrversion || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userEmail"
                        name="releaseInfo.userEmail"
                        label="User Email"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.userEmail || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="label"
                        name="releaseInfo.label"
                        label="Label"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.label || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="participants"
                        name="releaseInfo.participants"
                        label="Participants"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.participants || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="primaryGenre"
                        name="releaseInfo.primaryGenre"
                        label="Primary Genre"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.primaryLanguage || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="secondaryGenre"
                        name="releaseInfo.secondaryGenre"
                        label="Secondary Genre"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.secondaryGenre || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="language"
                        name="releaseInfo.language"
                        label="Language"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.language || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="explicitLyrics"
                        name="releaseInfo.explicitLyrics"
                        label="Explicit Lyrics"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.explicitLyrics || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="priceCategory"
                        name="releaseInfo.priceCategory"
                        label="Price Category"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.priceCategory || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="digitalRelease"
                        name="releaseInfo.digitalRelease"
                        label="Digital Release"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.digitalRelease || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="originalRelease"
                        name="releaseInfo.originalRelease"
                        label="Original Release"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.originalRelease || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="licenseType"
                        name="releaseInfo.licenseType"
                        label="License Type"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.licenseType || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="licenseInfo"
                        name="releaseInfo.licenseInfo"
                        label="License Info"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.licenseInfo || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cYear"
                        name="releaseInfo.cYear"
                        label="C Year"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.cYear || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cLine"
                        name="releaseInfo.cLine"
                        label="C Line"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.cLine || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="pYear"
                        name="releaseInfo.pYear"
                        label="P Year"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.pYear || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="pLine"
                        name="releaseInfo.pLine"
                        label="P Line"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.pLine || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="territories"
                        name="releaseInfo.territories"
                        label="Territories"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.territories || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="coverUrl"
                        name="releaseInfo.coverUrl"
                        label="Cover URL"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.coverUrl || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="trackCount"
                        name="releaseInfo.trackCount"
                        label="Track Count"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.trackCount || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="isrc"
                        name="releaseInfo.isrc"
                        label="ISRC"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.isrc || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="iswc"
                        name="releaseInfo.iswc"
                        label="ISWC"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.iswc || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="audioUrl"
                        name="releaseInfo.audioUrl"
                        label="Audio URL"
                        fullWidth
                        autoComplete=""
                        value={props.formikVal.values?.releaseInfo?.audioUrl || ''}
                        onChange={props.formikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
        </>
    )
}

export default DDEX
