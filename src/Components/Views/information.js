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

const Information = () => {
    return (
        <>
            <br />
            <Typography color="secondary" variant="h6" gutterBottom align="left">
                T R A C K
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <ArtworkUpload />
                    <br />
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
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="artists"
                        name="artists"
                        label="Artists"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>

            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    A L B U M
                </Typography>
            </Box>

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
                        id="masterLabelName"
                        name="masterLabelName"
                        label="Master label name"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
            </Grid>

            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    C O M P O S I T I O N
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="secondary" />}
                        label="Did you write this yourself?"
                        labelPlacement="start"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="compositionTitle"
                        name="compositionTitle"
                        label="Composition Title"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="writers"
                        name="writers"
                        label="Writers"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>

                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="publishers"
                        name="publishers"
                        label="Publishers"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>

            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    R O Y A L T I E S
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="secondary" />}
                        label="Is the content 100% owned and managed by {insert account name}?"
                        labelPlacement="start"
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Percentage of income going to Master &#38; Composition Side
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="masterShare"
                        name="masterShare"
                        label="Master Share (%)"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box pt={4}>
                        <IosSlider ariaLabel="ios slider" defaultValue={60} valueLabelDisplay="on" />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="compositionShare"
                        name="compositionShare"
                        label="Composition Share (%)"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Master side royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="masterSideRoyaltysplit"
                        name="masterSideRoyaltysplit"
                        label="Username"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="masterAccount"
                        name="masterAccount"
                        label="Account"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    {/* add & loop */}
                    <TextField
                        required
                        id="percentageOfIncome"
                        name="percentageOfIncome"
                        label="Income %"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Composition side royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="compositionSideRoyaltysplit"
                        name="compositionSideRoyaltysplit"
                        label="Username"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="compositionAccount"
                        name="compositionAccount"
                        label="Account"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    {/* loop */}
                    <TextField
                        required
                        id="percentageOfIncome"
                        name="percentageOfIncome"
                        label="Income %"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Other contracts royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="otherContractsRoyaltysplit"
                        name="otherContractsRoyaltysplit"
                        label="ID"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {/* loop */}
                    <TextField
                        required
                        id="percentageOfIncome"
                        name="percentageOfIncome"
                        label="Percentage"
                        fullWidth
                        autoComplete=""
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Fab color="secondary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Grid>

            </Grid>

            <Box pb={3}></Box>
        </>
    )
}

export default Information
