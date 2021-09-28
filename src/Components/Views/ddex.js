import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Link } from '@material-ui/core';

const DDEX = (props) => {

    const [csvFileUrl, setCsvFileUrl] = useState(null)
    const [csvFilename, setCsvFilename] = useState(null)

    useEffect(() => {

        if (props.nodeFormikVal.values?.ipfsCsvHash) {

            const hash = props.nodeFormikVal?.values?.ipfsCsvHash || ''

            const fileurl = `https://gateway.pinata.cloud/ipfs/${hash}`

            setCsvFileUrl(fileurl)
            setCsvFilename(fileurl)

        }

    }, [props.nodeFormikVal?.values?.ipfsCsvHash])

    return (
        <>
            <br />
            {
                props.nodeFormikVal?.values?.ipfsCsvHash ?
                    (<>
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
                    </>) :

                    (<>
                        <Box pt={6}>
                            <Typography color="secondary" variant="h6" gutterBottom align="left">
                                M E T A D A T A
                            </Typography>

                            <Box pb={2}>
                                <Typography variant="caption">
                                    * Optional 
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="description"
                                    name="metadata.description"
                                    label="Description"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="Test"
                                    value={props.formikVal.values?.metadata?.description || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="formatVersion"
                                    name="metadata.formatVersion"
                                    label="Format Version"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="4.1.1"
                                    value={props.formikVal.values?.metadata?.formatVersion || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="totalReleases"
                                    name="metadata.totalReleases"
                                    label="Total Releases"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="1"
                                    value={props.formikVal.values?.metadata?.totalReleases || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="totalTracks"
                                    name="metadata.totalTracks"
                                    label="Total Tracks"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="12"
                                    value={props.formikVal.values?.metadata?.totalTracks || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Box pt={6}>
                            <Typography color="secondary" variant="h6" gutterBottom align="left">
                                R E L E A S E &nbsp;&nbsp; I N F O
                            </Typography>

                            <Box pb={2}>
                                <Typography variant="caption">
                                    * Optional 
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
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
                                    disabled
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
                                    disabled
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
                                    id="iswc"
                                    name="releaseInfo.iswc"
                                    label="ISWC"
                                    fullWidth
                                    autoComplete=""
                                    value={props.formikVal.values?.releaseInfo?.iswc || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>{" "}</Grid>
                        </Grid>
                    </>)
            }
        </>
    )

}

export default DDEX
