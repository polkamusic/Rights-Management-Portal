import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, Link, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    gradientButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        fontVariant: 'overline',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}))

const DDEX = (props) => {

    const classes = useStyles()
    const [csvFileUrl, setCsvFileUrl] = useState(null)
    const [csvFilename, setCsvFilename] = useState(null)
    const [simpleModeActive, setSimpleModeActive] = useState(true)
    const [advModeActive, setAdvModeActive] = useState(false)

    useEffect(() => {

        if (props.nodeFormikVal.values?.ipfsCsvHash) {

            const hash = props.nodeFormikVal?.values?.ipfsCsvHash || ''

            const fileurl = `https://gateway.pinata.cloud/ipfs/${hash}`

            setCsvFileUrl(fileurl)
            setCsvFilename(fileurl)

        }

    }, [props.nodeFormikVal?.values?.ipfsCsvHash])

    const theme = useTheme();

    const colorgreen = green[500];

    
    return (
        <>
            <br />

            <div className={classes.buttons}>
                {
                    props.nodeFormikVal?.values?.ipfsCsvHash ? '' : (<>
                        <Button
                            variant="contained"
                            onClick={() => {
                                if (simpleModeActive) return
                                console.log('simple mode on')
                                setSimpleModeActive(!simpleModeActive)
                                setAdvModeActive(false)
                            }}
                            className={simpleModeActive ? classes.button : classes.gradientButton}
                        >
                            {
                                simpleModeActive ? <CheckCircleOutlineIcon style={{ color: colorgreen }} /> : ''
                            }
                            <Box pl={1}>
                                Simple Mode
                            </Box>
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                if (advModeActive) return
                                console.log('advance mode on')
                                setAdvModeActive(!advModeActive)
                                setSimpleModeActive(false)
                            }}
                            className={advModeActive ? classes.button : classes.gradientButton}
                        >
                            {
                                advModeActive ? <CheckCircleOutlineIcon style={{ color: colorgreen }} /> : ''
                            }
                            <Box pl={1}>
                                Advance Mode
                            </Box>
                        </Button>
                    </>)
                }
            </div>
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
                                M A I N
                            </Typography>

                            <Box pb={2}>
                                <Typography variant="caption">
                                    * Required
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="songName"
                                    name="main.songName"
                                    label="Song Name"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="Contract song name"
                                    value={props.formikVal.values?.main?.songName || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="artistName"
                                    name="main.artistName"
                                    label="Artist Name"
                                    fullWidth
                                    autoComplete=""
                                    placeholder="Contract artist name"
                                    value={props.formikVal.values?.main?.artistName || ''}
                                    onChange={props.formikVal.handleChange}
                                />
                            </Grid>
                        </Grid>

                        {
                            advModeActive ?
                                (<>
                                    <Box pt={6}>
                                        <Typography color="secondary" variant="h6" gutterBottom align="left">
                                            M E T A D A T A
                                        </Typography>

                                        <Box pb={2}>
                                            <Typography variant="caption">
                                                ( Optional )
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
                                                ( Optional )
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
                                </>) : ''
                        }
                    </>)
            }
        </>
    )

}

export default DDEX
