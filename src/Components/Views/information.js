import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ArtworkUpload from '../Common/artworkUpload';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';

const Information = () => {
    return (
        <>
            <Typography variant="h6" gutterBottom align="center">
                Track
      </Typography>
            <Divider variant="middle" />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <ArtworkUpload />
                    <br />
                    <Typography variant="caption" component="body1">
                        Make sure that your artwork is at least 700x700 pixels. Optimal resolution is 1200x1200 pixels.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="trackTitle"
                        name="trackTitle"
                        label="Track title"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="trackTitle"
                        name="trackTitle"
                        label="Artists"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <></>
                </Grid>

            </Grid>

            <br />
            <br />
            <Typography variant="h6" gutterBottom align="center">
                Album
      </Typography>
            <Divider variant="middle" />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="secondary" />}
                        label="Is this part of an album?"
                        labelPlacement="start"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="trackTitle"
                        name="trackTitle"
                        label="Master label name"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Information
