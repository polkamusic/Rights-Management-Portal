import React, { useState, useEffect, useRef } from 'react';
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
import { Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import checkOtherContractsIdExist from '../Common/checkOtherContractsIdExist';
import isValidAddressPolkadotAddress from '../Common/isValidAddressPolkadotAddress';


const Information = (props) => {

    const [otherContracts, setOtherContracts] = useState([])
    const [compositionSides, setCompositionSides] = useState([])
    const [masterSides, setMasterSides] = useState([])

    const [masterSplitInvalid, setMasterSplitInvalid] = useState(false)
    const [masterAccountsInvalid, setMasterAccountsInvalid] = useState(false)
    const [masterAcctFldInvalidIdx, setMasterAcctFldInvalidIdx] = useState(null)

    const [compositionSplitInvalid, setCompositionSplitInvalid] = useState(false)
    const [compositionAccountsInvalid, setCompositionAccountsInvalid] = useState(false)

    const [otherContractsSplitInvalid, setOtherContractsSplitInvalid] = useState(false)
    const [quorumAndShareInvalid, setQuorumAndShareInvalid] = useState(null)

    const timeoutRef = useRef(null)
    const [otherContractsIDResults, setOtherContractsIDResults] = useState('')
    const [otherContractsID, setOtherContractsID] = useState('')
    const [otherContractIdInputColor, setOtherContractIdInputColor] = useState(null)

    const [showOtherContractsQuorumAlertUI, setShowOtherContractsQuorumAlertUI] = useState(false)
    const [showGlobalQuorumAlertUI, setShowGlobalQuorumAlertUI] = useState(false)

    const masterSideComp = (element, i) => (
        <React.Fragment key={`${i}`}>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id={`masterSideRoyaltysplit${i}`}
                    name={`masterValues.master[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={element?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id={`masterAccount${i}`}
                    name={`masterValues.master[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={element?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id={`masterPercentageOfIncome${i}`}
                    name={`masterValues.master[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={element?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            {
                props.nodeFormikVal?.values.masterValues.master.length > 1 &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={() => {
                            if (props.handleDeleteMasterData) props.handleDeleteMasterData(element, i)
                        }}
                        color="secondary"
                        aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Grid>
            }

            {
                (i === (props.nodeFormikVal?.values.masterValues.master.length - 1)) &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={props.handleAddMasterData}
                        color="secondary"
                        aria-label="remove">
                        <AddIcon />
                    </Fab>
                </Grid>
            }
        </React.Fragment>
    )

    const compositionSideComp = (element, i) => (
        <React.Fragment key={`${i}`}>
            <Grid item xs={12} sm={3}>
                <TextField
                    required
                    id={`compositionSideRoyaltysplit${i}`}
                    name={`compositionValues.composition[${i}].nickname`}
                    label="Nickname"
                    fullWidth
                    autoComplete=""
                    value={element?.nickname || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id={`compositionAccount${i}`}
                    name={`compositionValues.composition[${i}].account`}
                    label="Account"
                    fullWidth
                    autoComplete=""
                    value={element?.account || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={2}>
                <TextField
                    required
                    id={`compositionPercentageOfIncome${i}`}
                    name={`compositionValues.composition[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={element?.percentage || ''}
                    onChange={props?.nodeFormikVal?.handleChange}
                />
            </Grid>
            {
                props.nodeFormikVal?.values.compositionValues.composition.length > 1 &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={() => {
                            if (props.handleDeleteCompositionData) props.handleDeleteCompositionData(element, i)
                        }}
                        color="secondary"
                        aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Grid>
            }

            {
                (i === (props.nodeFormikVal?.values.compositionValues.composition.length - 1)) &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={props.handleAddCompositionData}
                        color="secondary"
                        aria-label="remove">
                        <AddIcon />
                    </Fab>
                </Grid>
            }
        </React.Fragment>
    )

    const otherContractsComp = (element, i) => (
        <React.Fragment key={`${i}`}>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id={`otherContractsRoyaltysplit${i}`}
                    name={`otherContractsValues.otherContracts[${i}].id`}
                    label="ID"
                    fullWidth
                    autoComplete=""
                    color={otherContractIdInputColor}
                    value={element?.id || ''}
                    onChange={(e) => handleCheckOtherContractId(e)}
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    required
                    id={`otherContractsPercentage${i}`}
                    name={`otherContractsValues.otherContracts[${i}].percentage`}
                    label="Income %"
                    fullWidth
                    autoComplete=""
                    value={element?.percentage || ''}
                    onChange={props.nodeFormikVal.handleChange}
                />
            </Grid>
            {
                props.nodeFormikVal?.values.otherContractsValues.otherContracts.length > 1 &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={() => {
                            if (props.handleDeleteOtherContractsData) props.handleDeleteOtherContractsData(element, i)
                        }}
                        color="secondary"
                        aria-label="remove">
                        <RemoveIcon />
                    </Fab>
                </Grid>
            }

            {
                (i === (props.nodeFormikVal?.values.otherContractsValues.otherContracts.length - 1)) &&
                <Grid item xs={12} sm={1}>
                    <Fab
                        onClick={props.handleAddOtherContractsData}
                        color="secondary"
                        aria-label="remove">
                        <AddIcon />
                    </Fab>
                </Grid>
            }
        </React.Fragment>
    );


    // royalty split validation,
    useEffect(() => {

        // master
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values?.masterValues?.master) {
            // reduce master's total percentage 
            const masterValues = props?.nodeFormikVal?.values?.masterValues?.master || []
            const masterPercentSum = masterValues.reduce((sum, cur) =>
                sum + (cur?.percentage === '' ? 0 : parseInt(cur?.percentage || 0)), 0)
            const masterStringSum = masterValues.reduce((sum, cur) =>
                sum + cur?.percentage, '')

            // ,check if below or equal to 100    
            if (masterPercentSum === 100 || masterStringSum === '') {
                setMasterSplitInvalid(false)
                if (props.onCheckInvalid &&
                    !compositionSplitInvalid &&
                    !otherContractsSplitInvalid &&
                    !quorumAndShareInvalid &&
                    otherContractIdInputColor !== 'secondary' &&
                    masterStringSum !== '')
                    props.onCheckInvalid(false);
            } else {
                setMasterSplitInvalid(true)
                if (props.onCheckInvalid) props.onCheckInvalid(true);
            }
        }

    }, [
        props.nodeFormikVal?.values?.masterValues?.master
    ])

    useEffect(() => {

        // check master account fields are valid
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values.masterValues?.master) {
            let masterAccountFieldsInvalid = false;
            let masterAcctFldIdx;
            props.nodeFormikVal.values.masterValues.master.every((element, idx) => {
                const isValid = isValidAddressPolkadotAddress(element.account)
                if (!isValid) {
                    masterAccountFieldsInvalid = true
                    if (props.onCheckInvalid) props.onCheckInvalid(true);
                    return false
                }

                return true
            });
            const foundAllEmpty = props.nodeFormikVal.values.masterValues.master.find(element => {
                return (!element.nickname && !element.account && !element.percentage)
            })
            if (foundAllEmpty) {
                setMasterAccountsInvalid(false)
                if (props.onCheckInvalid &&
                    !compositionSplitInvalid &&
                    !otherContractsSplitInvalid &&
                    !quorumAndShareInvalid &&
                    otherContractIdInputColor !== 'secondary')
                    props.onCheckInvalid(false);
            } else setMasterAccountsInvalid(masterAccountFieldsInvalid)

        }
    }, [
        props.nodeFormikVal.values?.masterValues?.master
    ])

    useEffect(() => {

        // composition
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values?.compositionValues?.composition) {

            // reduce composition's total percentage 
            const compositionValues = props?.nodeFormikVal?.values?.compositionValues?.composition || []
            const compositionPercentSum = compositionValues.reduce((sum, cur) =>
                sum + (cur?.percentage === '' ? 0 : parseInt(cur?.percentage || 0)), 0)
            const compositionStringSum = compositionValues.reduce((sum, cur) =>
                sum + cur?.percentage, '')

            // ,check if equal to 100    
            if (compositionPercentSum === 100 || compositionStringSum === '') {
                setCompositionSplitInvalid(false)
                if (props.onCheckInvalid &&
                    !masterSplitInvalid &&
                    !otherContractsSplitInvalid &&
                    !quorumAndShareInvalid &&
                    otherContractIdInputColor !== 'secondary' &&
                    compositionStringSum !== '')
                    props.onCheckInvalid(false);
            } else {
                setCompositionSplitInvalid(true)
                if (props.onCheckInvalid) props.onCheckInvalid(true);
            }
        }

    }, [
        props.nodeFormikVal?.values?.compositionValues?.composition
    ])

    useEffect(() => {

        // check composition account fields are valid
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values.compositionValues?.composition) {
            let compositionAccountFieldsInvalid = false;
            let compositionAcctFldIdx;
            props.nodeFormikVal.values.compositionValues.composition.every((element, idx) => {
                const isValid = isValidAddressPolkadotAddress(element.account)
                if (!isValid) {
                    compositionAccountFieldsInvalid = true
                    if (props.onCheckInvalid) props.onCheckInvalid(true);
                    return false
                }

                return true
            });
            const foundAllEmpty = props.nodeFormikVal.values.compositionValues.composition.find(element => {
                return (!element.nickname && !element.account && !element.percentage)
            })
            if (foundAllEmpty) {
                setCompositionAccountsInvalid(false)
                if (props.onCheckInvalid &&
                    !masterSplitInvalid &&
                    !otherContractsSplitInvalid &&
                    !quorumAndShareInvalid &&
                    otherContractIdInputColor !== 'secondary')
                    props.onCheckInvalid(false);
            } else setCompositionAccountsInvalid(compositionAccountFieldsInvalid)

        }
    }, [
        props.nodeFormikVal.values?.compositionValues?.composition
    ])

    useEffect(() => {

        // other contracts
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values?.otherContractsValues?.otherContracts) {
            // reduce other contract's total percentage 
            const otherContractsValues = props?.nodeFormikVal?.values?.otherContractsValues?.otherContracts || []
            const otherContractsPercentSum = otherContractsValues.reduce((sum, cur) =>
                sum + (cur?.percentage === '' ? 0 : parseInt(cur?.percentage || 0)), 0)
            const otherContractsStrings = otherContractsValues.reduce((sum, cur) =>
                sum + cur?.percentage, '')

            // ,check if equal to 100    
            if (otherContractsPercentSum === 100 || otherContractsStrings === '') {
                setOtherContractsSplitInvalid(false)
                if (props.onCheckInvalid &&
                    !masterSplitInvalid &&
                    !compositionSplitInvalid &&
                    !quorumAndShareInvalid &&
                    (otherContractIdInputColor !== 'secondary') &&
                    otherContractsStrings !== '')
                    props.onCheckInvalid(false);
            } else {
                setOtherContractsSplitInvalid(true)
                if (props.onCheckInvalid) props.onCheckInvalid(true);
            }
        }

    }, [
        props.nodeFormikVal?.values?.otherContractsValues?.otherContracts
    ])


    // quorum and shares validation
    useEffect(() => {
        if (props.nodeFormikVal.values
            && props.nodeFormikVal.values?.ipfsOtherValues) {

            const masterShareValue =
                parseInt(props.nodeFormikVal.values?.ipfsOtherValues?.mastershare || 0)
            const compositionShareValue =
                parseInt(props.nodeFormikVal.values?.ipfsOtherValues?.compositionshare || 0)
            const otherContractsShareValue =
                parseInt(props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsshare || 0)


            const masterShareStr =
                props.nodeFormikVal.values?.ipfsOtherValues?.mastershare
            const compositionShareStr =
                props.nodeFormikVal.values?.ipfsOtherValues?.compositionshare
            const otherContractsShareStr =
                props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsshare


            const quorumAndSharePercentSum =
                masterShareValue + compositionShareValue + otherContractsShareValue
            const quorumAndShareStringSum =
                masterShareStr + compositionShareStr + otherContractsShareStr

            // ,check if below or equal to 100    
            if (quorumAndSharePercentSum === 100 || quorumAndShareStringSum === '') {
                setQuorumAndShareInvalid(false)
                if (props.onCheckInvalid &&
                    !masterSplitInvalid &&
                    !compositionSplitInvalid &&
                    !otherContractsSplitInvalid &&
                    otherContractIdInputColor !== 'secondary' &&
                    quorumAndShareStringSum !== '')
                    props.onCheckInvalid(false);
            } else {
                setQuorumAndShareInvalid(true)
                if (props.onCheckInvalid) props.onCheckInvalid(true);
            }

        }

    }, [props.nodeFormikVal?.values?.ipfsOtherValues])

    // other contracts quorum validation
    useEffect(() => {

        const otherContractsQuorumValue = props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsquorum
        const ocQuorumIntVal = !otherContractsQuorumValue || otherContractsQuorumValue === '0' ? 0 : parseInt(otherContractsQuorumValue)

        // check not empty string, must be frm 0-100, and other quorum values are valid else invalid
        if ((!otherContractsQuorumValue || otherContractsQuorumValue !== '0') && (ocQuorumIntVal > 0 && ocQuorumIntVal <= 100) && !quorumAndShareInvalid) {
            props.onCheckInvalid(false)
            setShowOtherContractsQuorumAlertUI(false)
        } else {
            setShowOtherContractsQuorumAlertUI(true)
            if (props.onCheckInvalid) props.onCheckInvalid(true)
        }

    }, [props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsquorum])

    // global quorum validation 
    useEffect(() => {

        const globalQuorumValue = props.nodeFormikVal.values?.ipfsOtherValues?.globalquorum
       
        const globalQuorumIntVal = isNaN(parseInt(globalQuorumValue)) ? 0 : parseInt(globalQuorumValue)

        if ( (globalQuorumIntVal > 0 && globalQuorumIntVal <= 100) && !quorumAndShareInvalid ) {
            props.onCheckInvalid(false)
            setShowGlobalQuorumAlertUI(false)
        } else {
            setShowGlobalQuorumAlertUI(true)
            if (props.onCheckInvalid) props.onCheckInvalid(true)
        }


    }, [props.nodeFormikVal.values?.ipfsOtherValues?.globalquorum])

    // handle changes
    const handleCheckOtherContractId = (e) => {
        if (props.nodeFormikVal.handleChange)
            props.nodeFormikVal.handleChange(e)

        if (!e.target.value) {
            setOtherContractsIDResults('')
            setOtherContractIdInputColor(null)
            return
        }

        setOtherContractsID(e.target.value)

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {

            // check id against crm otherContractsdata, temp
            if (props.handlePageLoading) props.handlePageLoading(true)
            checkOtherContractsIdExist(
                e.target.value,
                props.nodeApi,
                (res) => {
                    setOtherContractsIDResults(res)

                    if (res === null) {
                        setOtherContractIdInputColor('secondary')
                        if (props.onCheckInvalid) props.onCheckInvalid(true);

                        if (props.notify)
                            props.notify(`Other contract id ${e.target.value} does'nt exist, 
                                Please enter a valid contract ID`)
                    } else {
                        setOtherContractIdInputColor('primary')

                        if (props.handleExistingOcIds) props.handleExistingOcIds(e.target.value)
                        if (props.onCheckInvalid &&
                            !masterSplitInvalid &&
                            !compositionSplitInvalid &&
                            !otherContractsSplitInvalid &&
                            !quorumAndShareInvalid)
                            props.onCheckInvalid(false);
                    }
                },
            ).then(() => {
                if (props.handlePageLoading) props.handlePageLoading(false)
            })
        }, 1000)
    }

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
                    <Typography variant="caption">
                        Make sure that your artwork is at least 700x700 pixels. Optimal resolution is 1200x1200 pixels.
                    </Typography>

                </Grid>

            </Grid>



            <Box pt={6}>
                <Typography color="secondary" variant="h6" gutterBottom align="left">
                    R O Y A L T I E S
                </Typography>
            </Box>

            <Grid container spacing={4}>

                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Master side royalty split
                    </Typography>
                </Grid>
                {
                    masterSplitInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning -
                                {masterSplitInvalid ? ' Master ' : ''}
                                split percentage must be equal to 100%
                            </Alert>
                        </Grid>
                    )
                }
                {
                    masterAccountsInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning - Account must not be empty and in substrate or polkadot format
                            </Alert>
                        </Grid>
                    )
                }


                {
                    props.nodeFormikVal.values.masterValues &&
                    props.nodeFormikVal.values.masterValues.master.map((el, idx) => (masterSideComp(el, idx)))
                }


                {/* Composition */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Composition side royalty split
                    </Typography>
                </Grid>
                {
                    compositionSplitInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning -
                                {compositionSplitInvalid ? ' Composition ' : ''}
                                split percentage must be equal to 100%
                            </Alert>
                        </Grid>
                    )
                }
                {
                    compositionAccountsInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning - Account must not be empty and in substrate or polkadot format
                            </Alert>
                        </Grid>
                    )
                }


                {
                    props.nodeFormikVal.values.compositionValues &&
                    props.nodeFormikVal.values.compositionValues.composition.map((el, idx) => (compositionSideComp(el, idx)))
                }

                {/* Other Contracts */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Other contracts royalty split
                    </Typography>
                </Grid>
                {
                    otherContractsSplitInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning -
                                {otherContractsSplitInvalid ? ' Other contracts ' : ''}
                                split percentage must be equal to 100%
                            </Alert>
                        </Grid>
                    )
                }

                {
                    otherContractsIDResults === null &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error">
                                Error -
                                Other contract id {otherContractsID} does'nt exist,
                                Please enter a valid contract ID
                            </Alert>
                        </Grid>
                    )
                }

                {
                    props.nodeFormikVal.values.otherContractsValues &&
                    props.nodeFormikVal.values.otherContractsValues.otherContracts.map((el, idx) => (otherContractsComp(el, idx)))
                }




                {/* Quorum and Shares */}
                <Grid item xs={12} sm={12}>
                    <Typography align="left" variant="subtitle1">
                        Quorum & Shares
                    </Typography>
                </Grid>
                {
                    quorumAndShareInvalid &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning - Share percentage must be equal to 100%
                            </Alert>
                        </Grid>
                    )
                }

                {
                    (props.nodeFormikVal.values.otherContractsValues?.otherContracts[0]?.id &&
                        showOtherContractsQuorumAlertUI) &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning - Other contracts quorum must be from 1 to 100
                            </Alert>
                        </Grid>
                    )
                }

                {
                    (props.nodeFormikVal.values.ipfsOtherValues?.masterquorum && showGlobalQuorumAlertUI) &&
                    (
                        <Grid item xs={12} sm={12}>
                            <Alert severity="warning">
                                Warning - Global quorum must be from 1 to 100
                            </Alert>
                        </Grid>
                    )
                }



                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="ipfsOtherValuesMasterShare"
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
                        id="ipfsOtherValuesMasterQuorum"
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
                        id="ipfsOtherValuesCompositionShare"
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
                        id="ipfsOtherValuesCompositionQuorum"
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
                                    id="ipfsOtherValuesOtherContractsShare"
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
                                    id="ipfsOtherValuesOtherContractsQuorum"
                                    name="ipfsOtherValues.othercontractsquorum"
                                    label="Other Contracts Quorum"
                                    fullWidth
                                    autoComplete=""
                                    value={props.nodeFormikVal.values?.ipfsOtherValues?.othercontractsquorum || ''}
                                    onChange={props.nodeFormikVal.handleChange}
                                />
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="ipfsOtherValuesGlobalQuorum"
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


            </Grid>

            <Box pb={3}></Box>
        </>
    )
}

export default Information
