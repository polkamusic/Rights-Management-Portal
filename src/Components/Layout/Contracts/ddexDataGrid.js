import React from 'react';
import {
    Grid,
    Typography,
    Box,
    Link
} from '@material-ui/core';
import Iframe from 'react-iframe';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: 175,
    }
});


const DDEXDataGrid = ({ ddexData, song, artist, audioUrl, coverUrl }) => {

    const classes = useStyles();

    return (<>
        <Grid item xs={12} sm={12}>
            <Box pb={1}>
                <Typography variant="h6">
                    Metadata
                </Typography>
            </Box>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Song
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {song || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Artist
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {artist || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Description
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.description || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Format Version
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.formatVersion || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Total Releases
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.totalReleases || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Total Tracks
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.totalTracks || ''}
            </Typography>
        </Grid>

        <Box pt={6}>{" "}</Box>

        <Grid item xs={12} sm={12}>
            <Box pb={1}>
                <Typography variant="h6">
                    Release Info
                </Typography>
            </Box>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Action
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.action || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                UPC
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.upc || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Catalog Number
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.catalogNumber || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Grid
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.grid || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Title
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.title || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Remix or Version
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.remixOrVersion || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                User Email
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.userEmail || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                label
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.label || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Participants
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.participants || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Primary Language
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.primaryLanguage || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Secondary Language
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.secondaryLanguage || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Language
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.language || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Explicit Lyrics
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.explicitLyrics || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Price Category
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.priceCategory || ''}
            </Typography>
        </Grid>


        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Digital Release
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.digitalRelease || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Original Release
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.originalRelease || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                License Type
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.licenseType || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                License Info
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.licenseInfo || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                C Year
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.cYear || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                C Line
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.cLine || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                P Year
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.pYear || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                P Line
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.pLine || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Territories
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.territories || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Cover Url
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                <Link href={coverUrl} target="_blank" rel="noopener noreferrer">
                    {coverUrl || ''}
                </Link>
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Track Count
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.trackCount || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                ISRC
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.isrc || ''}
            </Typography>
        </Grid>

        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                ISWC
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                {ddexData?.iswc || ''}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Audio URL
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            <Typography variant="subtitle1">
                <Link href={audioUrl} target="_blank" rel="noopener noreferrer">
                    {audioUrl || ''}
                </Link>
                {/* {
                    audioUrl &&
                    <Box p={0}>
                        <audio controlsList="nodownload" controls>
                            <source src={audioUrl} type="audio/mpeg" />
                        </audio>
                    </Box>
                } */}
            </Typography>
        </Grid>
        <Grid item xs={3} sm={3}>
            <Typography variant="subtitle2">
                Audio Playback
            </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
            {
                audioUrl &&
                <Box p={0}>
                    <audio controlsList="nodownload" controls>
                        <source src={audioUrl} type="audio/mpeg" />
                    </audio>
                </Box>
            }
        </Grid>

    </>)
}

export default DDEXDataGrid