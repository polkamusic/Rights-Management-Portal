import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Box,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@material-ui/core';

import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { crmDataVirtualTblCol, revenueSplitVirtualTblCol, otherContractsVirtualTblCol } from "../Layout/virtualTableColumns";

import getCrmDataProposalChanges from "../Common/proposalChanges/getCrmDataProposalChanges";
import getMasterDataProposalChanges from "../Common/proposalChanges/getMasterDataProposalChanges";
import getCompositionDataProposalChanges from "../Common/proposalChanges/getCompositionDataProposalChanges";
import createRevSplitDataProposalChanges from '../Common/proposalChanges/createRevSplitDataProposalChanges';
import createCrmDataProposalChanges from "../Common/proposalChanges/createCrmDataProposalChanges";
import getProposalChanges from '../Common/proposalChanges/getProposalChangesData';
import createOtherContractsDataProposalChanges from '../Common/proposalChanges/createOtherContractsDataProposalChanges';

import Alert from '@material-ui/lab/Alert';

import voteCrmDataProposal from '../Common/proposalChanges/voteCrmDataProposal';
import voteOtherContractsDataProposal from '../Common/proposalChanges/voteOtherContractsDataProposal';
import voteCompositionDataProposal from '../Common/proposalChanges/voteCompositionDataProposal';
import voteMasterDataProposal from '../Common/proposalChanges/voteMasterDataProposal';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// function a11yProps(index) {
//     return {
//         id: `scrollable-auto-tab-${index}`,
//         'aria-controls': `scrollable-auto-tabpanel-${index}`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         width: '100%',
//         backgroundColor: theme.palette.background.paper,
//     },
// }));

const Proposals = (props) => {
    // const classes = useStyles();

    const [value, setValue] = useState(0);
    const [crmDataRows, setCrmDataRows] = useState(null)
    const [masterDataRows, setMasterDataRows] = useState(null)
    const [compositionDataRows, setCompositionDataRows] = useState(null)
    const [otherContractsDataRows, setOtherContractsDataRows] = useState(null)
    const [compositionDataFoundChanges, setCompositionDataFoundChanges] = useState(null)
    const [compositionDataFoundChangesByHexAcct, setCompositionDataFoundChangesByHexAcct] = useState(null)

    const [masterDataFoundChanges, setMasterDataFoundChanges] = useState(null)
    const [masterDataFoundChangesByHexAcct, setMasterDataFoundChangesByHexAcct] = useState(null)

    const [crmDataFoundChanges, setCrmDataFoundChanges] = useState(null)
    const [otherContractsDataFoundChanges, setOtherContractsDataFoundChanges] = useState(null)
    const [changesToBeVoted, setChangesToBeVoted] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // get proposal changes
    useEffect(() => {
        if (!props.walletAddress) return

        getCrmDataProposalChanges(
            (response) => {
                if (response && response.length > 0) {
                    const crmDataRowsTemp = createCrmDataProposalChanges(response)
                    setCrmDataRows(crmDataRowsTemp)
                }
            },
            (err) => console.log(err))

        getMasterDataProposalChanges(
            (response) => {
                if (response && response.length > 0) {
                    const masterDataRowsTemp = createRevSplitDataProposalChanges(response)
                    setMasterDataRows(masterDataRowsTemp)
                }
            },
            (err) => console.log(err))

        getCompositionDataProposalChanges(
            (response) => {
                if (response && response.length > 0) {
                    const compositionDataRowsTemp = createRevSplitDataProposalChanges(response)
                    setCompositionDataRows(compositionDataRowsTemp)
                }
            },
            (err) => console.log(err))

        getProposalChanges(
            `http://127.0.0.1:8080/api/crmOtherContractsDataChangeProposal`,
            (response) => {
                if (response && response.length > 0) {
                    const otherContractsDataRowsTemp = createOtherContractsDataProposalChanges(response)
                    setOtherContractsDataRows(otherContractsDataRowsTemp)
                }
            },
            (err) => console.log(err))

        // find master proposal changes by account/ then hex acct, then alert/ warn ui
        setMasterDataFoundChanges([])
        getProposalChanges(
            `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?account=${props?.walletAddress || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    setMasterDataFoundChanges(response)
                }
            },
            (err) => console.log(err))



        // find composition proposal changes by account/ then hex acct, then alert/ warn ui
        setCompositionDataFoundChanges([])
        getProposalChanges(
            `http://127.0.0.1:8080/api/crmCompositionDataChangeProposal?account=${props?.walletAddress || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // console.log('composition changes find by account', response);
                    setCompositionDataFoundChanges(response)
                }
            },
            (err) => console.log(err))
    }, [props?.walletAddress])

    // check crm data changes includes current user
    useEffect(() => {
        // console.log('crm data rows', crmDataRows);
        if (!crmDataRows || crmDataRows.length === 0) return

        const crmDataContracts = crmDataRows.map(cdata => ({ crmContractId: cdata.contractid, crmChangeId: cdata.changeid }))

        const promises = crmDataContracts.map(c => new Promise((resolve, reject) => {

            getProposalChanges(
                `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?contractid=${c.crmContractId}`,
                (response) => {
                    if (response && response.length > 0) {
                        resolve({ data: response, changeId: c?.crmChangeId || '' });
                    }
                },
                (err) => {
                    // console.log(err)
                    reject(err)
                })

        }));

        Promise.all(promises).then(results => {
            // console.log('promises results', results);

            // find current user account /address is in the results' accounts
            let currentUserAry = []
            if (results && results.length > 0) {
                results.forEach(result => {
                    if (result && result.data) {
                        const foundAry = result.data.find(r => (r.account?.toString() === props.walletAddress?.toString() ||
                            r.account?.toString() === props?.hexAcct?.toString()))
                        if (foundAry) {
                            foundAry['changeId'] = result?.changeId || ''
                            currentUserAry.push(foundAry)
                        }
                    }
                })
                // console.log(currentUserAry);
                setCrmDataFoundChanges(currentUserAry)
            }
        });
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [crmDataRows])

    useEffect(() => {
        if (!props.hexAcct) return
        setMasterDataFoundChangesByHexAcct([])

        getProposalChanges(
            `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?account=${props?.hexAcct?.toString() || ''}`,
            (responseHex) => {
                if (responseHex && responseHex.length > 0) {
                    setMasterDataFoundChangesByHexAcct(responseHex)
                }
            },
            (err) => console.log(err))


        setCompositionDataFoundChangesByHexAcct([])
        getProposalChanges(
            `http://127.0.0.1:8080/api/crmCompositionDataChangeProposal?account=${props?.hexAcct?.toString() || ''}`,
            (responseHex) => {
                if (responseHex && responseHex.length > 0) {
                    setCompositionDataFoundChangesByHexAcct(responseHex)
                }
            },
            (err) => console.log(err))

    }, [props?.hexAcct])

    // check otherContracts includes current user
    useEffect(() => {
        // console.log('crm data rows', crmDataRows);
        if (!otherContractsDataRows || otherContractsDataRows.length === 0) return

        const ocDataContracts = otherContractsDataRows.map(ocdata => ({ ocContractId: ocdata.contractid, ocChangeId: ocdata.changeid }))

        const promises = ocDataContracts.map(oc => new Promise((resolve, reject) => {

            getProposalChanges(
                `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?contractid=${oc.ocContractId}`,
                (response) => {
                    if (response && response.length > 0) {
                        resolve({ data: response, changeId: oc.ocChangeId });
                    }
                },
                (err) => {
                    // console.log(err)
                    reject(err)
                })

        }));

        Promise.all(promises).then(results => {
            // console.log('promises results', results);

            // find current user account /address is in the results' accounts
            let currentUserAry = []
            if (results && results.data.length > 0) {
                results.forEach(result => {
                    if (result && result.data) {
                        const foundAry = result.data.find(r => (r.account?.toString() === props.walletAddress?.toString() ||
                            r.account?.toString() === props?.hexAcct.toString()))
                        if (foundAry) {
                            foundAry['changeId'] = result?.changeId || ''
                            currentUserAry.push(foundAry)
                        }
                    }
                })
                // console.log(currentUserAry);
                setOtherContractsDataFoundChanges(currentUserAry)
            }
        });
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [otherContractsDataRows])

    const [openVote, setOpenVote] = useState(false);

    const handleOpenVote = (changeObj) => {
        // console.log('changes', changeObj)
        setOpenVote(true)
        setChangesToBeVoted(changeObj)
    };

    const handleCloseVote = (hasAgreed) => {
        // console.log(hasAgreed, changesToBeVoted?.proposalType)
        let vote = false;
        hasAgreed ? vote = true : vote = false

        switch (changesToBeVoted?.proposalType) {
            case "crm":
                voteCrmDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount)
                break;
            case "master":
                voteMasterDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount)

                break;
            case "composition":
                voteCompositionDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount)
                break;
            case "other contracts":
                voteOtherContractsDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount)
                break;

            default:
                props.notify ? props.notify("Unable to run proposal voting") :
                    console.log("Unable to run proposal voting", changesToBeVoted?.proposalType)
                break;
        }

        setOpenVote(false)
    };




    return (
        <>
            <Dialog
                open={openVote}
                onClose={handleCloseVote}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Vote Polkamusic's proposal changes?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Click 'Yes' to vote for changes or 'No' to vote against changes. For ${changesToBeVoted?.proposalType} data 
                            with contract ID ${changesToBeVoted?.contractId} and change ID ${changesToBeVoted?.changeId}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseVote(false)} >
                        No
                    </Button>
                    <Button onClick={() => handleCloseVote(true)} color="secondary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>


            {(crmDataFoundChanges && crmDataFoundChanges.length > 0) &&
                crmDataFoundChanges.map((md, idx) => {
                    // md.changeid is changeid of master data proposals, while md.changeId is the changeid of crm data
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`CRM data proposal found with contract id ${md.contractid} and change id ${md.changeId}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: md.changeId, proposalType: "crm", contractId: md.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            {(masterDataFoundChanges && masterDataFoundChanges.length > 0) &&
                masterDataFoundChanges.map((md, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Master data proposal found with contract id ${md.contractid} and nickname ${md.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: md.changeid, proposalType: "master", contractId: md.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            {/* // masterDataFoundChangesByHexAcct */}
            {(masterDataFoundChangesByHexAcct && masterDataFoundChangesByHexAcct.length > 0) &&
                masterDataFoundChangesByHexAcct.map((md, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Master data proposal found with contract id ${md.contractid} and nickname ${md.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: md.changeid, proposalType: "master", contractId: md.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            {(compositionDataFoundChanges && compositionDataFoundChanges.length > 0) &&
                compositionDataFoundChanges.map((cd, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Composition data proposal found with contract id ${cd.contractid} and nickname ${cd.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: cd.changeid, proposalType: "composition", contractId: cd.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            {(compositionDataFoundChangesByHexAcct && compositionDataFoundChangesByHexAcct.length > 0) &&
                compositionDataFoundChangesByHexAcct.map((cd, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Composition data proposal found with contract id ${cd.contractid} and nickname ${cd.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: cd.changeid, proposalType: "composition", contractId: cd.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            {(otherContractsDataFoundChanges && otherContractsDataFoundChanges.length > 0) &&
                otherContractsDataFoundChanges.map((ocd, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Other contracts data proposal found with contract id ${ocd.contractid} and change id ${ocd.changeId}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() =>
                                handleOpenVote({ changeId: ocd.changeid, proposalType: "other contracts", contractId: ocd.contractid })}>here</span>
                        </Alert>
                    </Grid>)
                })}

            <br />

            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="CRM" />
                <Tab label="Master" />
                <Tab label="Composition" />
                <Tab label="Other Contracts" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ReactVirtualizedTable
                    virtualTableColumns={crmDataVirtualTblCol}
                    virtualTableRows={crmDataRows}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReactVirtualizedTable
                    virtualTableColumns={revenueSplitVirtualTblCol}
                    virtualTableRows={masterDataRows}
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ReactVirtualizedTable
                    virtualTableColumns={revenueSplitVirtualTblCol}
                    virtualTableRows={compositionDataRows}
                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <ReactVirtualizedTable
                    virtualTableColumns={otherContractsVirtualTblCol}
                    virtualTableRows={otherContractsDataRows}
                />
            </TabPanel>
        </>
    )
}

export default Proposals
