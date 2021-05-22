import React from 'react';
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

const DDEX = () => {
    return (
        <>
            <br />
            <Typography color="secondary" variant="h6" gutterBottom align="left">
                M E T A D A T A
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="formatVersion"
                        name="formatVersion"
                        label="Format Version"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="totalReleases"
                        name="totalReleases"
                        label="Total Releases"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="totalTracks"
                        name="totalTracks"
                        label="Total Tracks"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
            </Grid>

            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    R E L E A S E &nbsp;&nbsp; I N F O
                </Typography>
            </Box>
            {/* #action	
#upc	
#catalog_number	
#grid	
#title	
#remix_or_version	
#user_email	
#label	
#participants	
#primary_genre
#secondary_genre	
#language	
#explicit_lyrics	
#price_category	
#digital_release	
#original_release	
#license_type	
#license_info	
#c_year	
#c_line	
#p_year	
#p_line	
#territories	
#cover_url	
#track_count	
#isrc	
#iswc	
#track_title	
#remix_or_version	
#participants	
#primary_genre	
#secondary_genre	
#language	
#explicit_lyrics	
#p_year	
#p_line	
#audio_url */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="action"
                        name="action"
                        label="Action"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="upc"
                        name="upc"
                        label="UPC"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="catalogNumber"
                        name="catalogNumber"
                        label="Catalog Number"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="grid"
                        name="grid"
                        label="Grid"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="remixOrVersion"
                        name="remixOrVersion"
                        label="Remix Or Version"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="userEmail"
                        name="userEmail"
                        label="User Email"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="label"
                        name="label"
                        label="Label"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="participants"
                        name="participants"
                        label="Participants"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="primaryGenre"
                        name="primaryGenre"
                        label="Primary Genre"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="secondaryGenre"
                        name="secondaryGenre"
                        label="Secondary Genre"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="language"
                        name="language"
                        label="Language"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="explicitLyrics"
                        name="explicitLyrics"
                        label="Explicit Lyrics"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="priceCategory"
                        name="priceCategory"
                        label="Price Category"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="digitalRelease"
                        name="digitalRelease"
                        label="Digital Release"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="originalRelease"
                        name="originalRelease"
                        label="Original Release"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="licenseType"
                        name="licenseType"
                        label="License Type"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="licenseInfo"
                        name="licenseInfo"
                        label="License Info"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="cYear"
                        name="cYear"
                        label="C Year"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="cLine"
                        name="cLine"
                        label="C Line"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="pYear"
                        name="pYear"
                        label="P Year"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="pLine"
                        name="pLine"
                        label="P Line"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="territories"
                        name="territories"
                        label="Territories"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>  
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="coverUrl"
                        name="coverUrl"
                        label="Cover URL"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="trackCount"
                        name="trackCount"
                        label="Track Count"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="isrc"
                        name="isrc"
                        label="ISRC"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="iswc"
                        name="iswc"
                        label="ISWC"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                <TextField
                        required
                        id="audioUrl"
                        name="audioUrl"
                        label="Audio URL"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
        </>
    )
}

export default DDEX
