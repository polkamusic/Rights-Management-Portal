import React, { useState, useEffect } from 'react';
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
import RemoveIcon from '@material-ui/icons/Remove';
import IosSlider from '../Common/iosSlider';
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';



const Information = (props) => {
    const [otherContracts, setOtherContracts] = useState([])
    const [compositionSides, setCompositionSides] = useState([])
    const [masterSides, setMasterSides] = useState([])

    const [royaltySplitValidity, setRoyaltySplitValidity] = useState(null)
    const [quorumAndShareValidity, setQuorumAndShareValidity] = useState(null)

    const newMasterSide = (i = 0) => (
        <>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id="masterSideRoyaltysplit"
                    name={`masterValues.master[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField
                    required
                    id="masterAccount"
                    name={`masterValues.master[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="percentageOfIncome"
                    name={`masterValues.master[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                {" "}
            </Grid>
        </>
    )

    const newCompositionSide = (i = 0) => (
        <>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id="compositionSideRoyaltysplit"
                    name={`compositionValues.composition[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField
                    required
                    id="compositionAccount"
                    name={`compositionValues.composition[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="percentageOfIncome"
                    name={`compositionValues.composition[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                {" "}
            </Grid>
        </>
    );

    const newOtherContract = (i = 0) => (
        <>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="otherContractsRoyaltysplit"
                    name={`otherContractsValues.otherContracts[${i}].id`}
                    label="ID"
                    fullWidth
                    autoComplete=""
                    value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.id || ''}
                    onChange={props.nodeFormikVal.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                {/* loop */}
                <TextField
                    required
                    id="otherContractsPercentage"
                    name={`otherContractsValues.otherContracts[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.percentage || ''}
                    onChange={props.nodeFormikVal.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                {" "}
            </Grid>
        </>
    );

    const lastMasterSideEl = (i = 0) => (
        <>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id="masterSideRoyaltysplit"
                    name={`masterValues.master[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField
                    required
                    id="masterAccount"
                    name={`masterValues.master[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                {/* add & loop */}
                <TextField
                    required
                    id="percentageOfIncome"
                    name={`masterValues.master[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.masterValues?.master[i]?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Fab
                    onClick={() => {
                        if (masterSides.length === 0) return
                        if (masterSides.length === 1) {
                            setMasterSides([])
                        } else {
                            console.log('master sides', masterSides);
                            const lastEl = masterSides.length - 1
                            masterSides.splice(lastEl, 1)
                            const remaining = masterSides
                            setMasterSides([...remaining])
                        }
                    }}
                    color="secondary"
                    aria-label="remove">
                    <RemoveIcon />
                </Fab>
            </Grid>
        </>
    )

    const lastCompositionSideEl = (i = 0) => (
        <>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id="compositionSideRoyaltysplit"
                    name={`compositionValues.composition[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={5}>
                <TextField
                    required
                    id="compositionAccount"
                    name={`compositionValues.composition[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id="percentageOfIncome"
                    name={`compositionValues.composition[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props?.nodeFormikVal?.values?.compositionValues?.composition[i]?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Fab
                    onClick={() => {
                        if (compositionSides.length === 0) return
                        if (compositionSides.length === 1) {
                            setCompositionSides([])
                        } else {
                            console.log('composition sides', compositionSides);
                            const lastEl = compositionSides.length - 1
                            compositionSides.splice(lastEl, 1)
                            const remaining = compositionSides
                            setCompositionSides([...remaining])
                        }
                    }}
                    color="secondary"
                    aria-label="remove">
                    <RemoveIcon />
                </Fab>
            </Grid>
        </>
    );

    const lastOtherContractEl = (i = 0) => (
        <>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id="otherContractsRoyaltysplit"
                    name={`otherContractsValues.otherContracts[${i}].id`}
                    label="ID"
                    fullWidth
                    autoComplete=""
                    value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.id || ''}
                    onChange={props.nodeFormikVal.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                {/* loop */}
                <TextField
                    required
                    id="otherContractsPercentage"
                    name={`otherContractsValues.otherContracts[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.percentage || ''}
                    onChange={props.nodeFormikVal.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Fab
                    onClick={() => {
                        if (otherContracts.length === 0) return
                        if (otherContracts.length === 1) {
                            setOtherContracts([])
                        } else {
                            const lastEl = otherContracts.length - 1
                            otherContracts.splice(lastEl, 1)
                            const remaining = otherContracts
                            setOtherContracts([...remaining])
                        }
                    }}
                    color="secondary"
                    aria-label="remove">
                    <RemoveIcon />
                </Fab>
            </Grid>
        </>
    );

    useEffect(() => {
        console.log('effect compositionSides ', compositionSides)
    }, [compositionSides])

    return (
        <>
            <br />
            <Typography color="secondary" variant="h6" gutterBottom align="left">
                T R A C K
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <ArtworkUpload nodeFormikVal={props.nodeFormikVal} />
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


                {
                    royaltySplitValidity &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error">
                                Error - Royalty split percentage must be equal to or below 100%
                    </Alert>
                        </Grid>
                    )
                }
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Master side royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="masterSideRoyaltysplit"
                        name="masterValues.master[0].nickname"
                        label="Nickname"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.masterValues?.master[0]?.nickname || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="masterAccount"
                        name="masterValues.master[0].account"
                        label="Account"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.masterValues?.master[0]?.account || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        required
                        id="percentageOfIncome"
                        name="masterValues.master[0].percentage"
                        label="Income %"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.masterValues?.master[0]?.percentage || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Fab
                        onClick={() => setMasterSides([...masterSides, newMasterSide])}
                        color="secondary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
                {
                    masterSides.length > 0 &&
                    masterSides.map((masterSide, idx) => {
                        return idx.toString() !== (masterSides.length - 1).toString() ?
                            (newMasterSide(idx + 1)) :
                            (lastMasterSideEl(idx + 1))
                    })
                }


                {/* Composition */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Composition side royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        id="compositionSideRoyaltysplit"
                        name="compositionValues.composition[0].nickname"
                        label="Nickname"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.compositionValues?.composition[0]?.nickname || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="compositionAccount"
                        name="compositionValues.composition[0].account"
                        label="Account"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.compositionValues?.composition[0]?.account || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    {/* loop */}
                    <TextField
                        required
                        id="percentageOfIncome"
                        name="compositionValues.composition[0].percentage"
                        label="Income %"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.compositionValues?.composition[0]?.percentage || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Fab
                        onClick={() => setCompositionSides([...compositionSides, newCompositionSide])}
                        color="secondary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
                {
                    compositionSides.length > 0 &&
                    compositionSides.map((compositionSide, idx) => {
                        return idx.toString() !== (compositionSides.length - 1).toString() ?
                            (newCompositionSide(idx + 1)) :
                            (lastCompositionSideEl(idx + 1))
                    })
                }

                {/* Other Contracts */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Other contracts royalty split
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="otherContractsRoyaltysplit"
                        name="otherContractsValues.otherContracts[0].id"
                        label="ID"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.id || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    {/* loop */}
                    <TextField
                        required
                        id="otherContractsPercentage"
                        name="otherContractsValues.otherContracts[0].percentage"
                        label="Income %"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.otherContractsValues?.otherContracts[0]?.percentage || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Fab
                        onClick={() =>
                            setOtherContracts([...otherContracts, newOtherContract])}
                        color="secondary"
                        aria-label="add"
                    >
                        <AddIcon />
                    </Fab>
                </Grid>
                {
                    otherContracts.length > 0 &&
                    otherContracts.map((otherContract, idx) => {
                        return idx.toString() !== (otherContracts.length - 1).toString() ?
                            (newOtherContract(idx + 1)) :
                            (lastOtherContractEl(idx + 1))
                    })
                }


                {/* Quorum and Shares */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Quorum & Shares
                    </Typography>
                </Grid>
                {
                    quorumAndShareValidity &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error">  
                                Error - Quorum and Share percentage must be equal to or below 100%
                    </Alert>
                        </Grid>
                    )
                }


                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="masterShare"
                        name="ipfsOtherValues.mastershare"
                        label="Master Share"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.ipfsOtherValues?.mastershare || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="masterQuorum"
                        name="ipfsOtherValues.masterquorum"
                        label="Master Quorum"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.ipfsOtherValues?.masterquorum || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="compositionShare"
                        name="ipfsOtherValues.compositionshare"
                        label="Composition Share"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.ipfsOtherValues?.compositionshare || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="compositionQuorum"
                        name="ipfsOtherValues.compositionquorum"
                        label="Composition Quorum"
                        fullWidth
                        autoComplete=""
                        value={props.nodeFormikVal.values?.ipfsOtherValues?.compositionquorum || ''}
                        onChange={props.nodeFormikVal.handleChange}
                    />
                </Grid>

                {
                    props.nodeFormikVal.values.otherContractsValues?.otherContracts[0]?.id &&
                    (
                        <>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="otherContractsShare"
                                    name="ipfsOtherValues.othercontractsshare"
                                    label="Other Contracts Share"
                                    fullWidth
                                    autoComplete=""
                                    value={props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsshare || ''}
                                    onChange={props.nodeFormikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="otherContractsQuorum"
                                    name="ipfsOtherValues.othercontractsquorum"
                                    label="Other Contracts Quorum"
                                    fullWidth
                                    autoComplete=""
                                    value={props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsquorum || ''}
                                    onChange={props.nodeFormikVal.handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    error={true}
                                    id="globalQuorum"
                                    name="ipfsOtherValues.globalquorum"
                                    label="Global Quorum"
                                    fullWidth
                                    autoComplete=""
                                    value={props.nodeFormikVal.values?.ipfsOtherValues?.globalquorum || ''}
                                    onChange={props.nodeFormikVal.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {" "}
                            </Grid>
                        </>
                    )
                }


            </Grid>

            <Box pb={3}></Box>
        </>
    )
}

export default Information
