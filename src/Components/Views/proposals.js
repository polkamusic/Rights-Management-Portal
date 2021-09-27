import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Tooltip,
    Box,
} from '@material-ui/core';

import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { crmDataChangePropVirtualTblCol, revenueSplitVirtualTblCol, otherContractsVirtualTblCol } from "../Layout/virtualTableColumns";

import getCrmDataProposalChanges from "../Common/proposalChanges/getCrmDataProposalChanges";
import getMasterDataProposalChanges from "../Common/proposalChanges/getMasterDataProposalChanges";
import getCompositionDataProposalChanges from "../Common/proposalChanges/getCompositionDataProposalChanges";
import createRevSplitDataProposalChanges from '../Common/proposalChanges/createRevSplitDataProposalChanges';
import createCrmDataProposalChanges from "../Common/proposalChanges/createCrmDataProposalChanges";
import getProposalChanges from '../Common/proposalChanges/getProposalChangesData';
import createOtherContractsDataProposalChanges from '../Common/proposalChanges/createOtherContractsDataProposalChanges';

import Alert from '@material-ui/lab/Alert';
import TabPanel from "../Layout/tabPanel";

import voteCrmDataProposal from '../Common/proposalChanges/voteCrmDataProposal';
import voteOtherContractsDataProposal from '../Common/proposalChanges/voteOtherContractsDataProposal';
import voteCompositionDataProposal from '../Common/proposalChanges/voteCompositionDataProposal';
import voteMasterDataProposal from '../Common/proposalChanges/voteMasterDataProposal';

import {
    IconButton
} from '@material-ui/core';
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';


const Proposals = (props) => {

    const [tabsValue, setTabsValue] = useState(0)

    const [masterData, setMasterData] = useState(null)

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
        setTabsValue(newValue);
    };

    // get proposal changes
    useEffect(() => {
        if (!props.hexAcct) return

        // find master proposal changes by account/ then hex acct, then alert/ warn ui
        setMasterDataFoundChanges([])
        setMasterData([])

        // get master data by account,
        getProposalChanges(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

        getProposalChanges(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

        getProposalChanges(
            `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Master data changes find by account:', response);


                    // add edit / delete (non functional) in the my contracts table
                    // { changeId: cd.changeid, proposalType: "composition", contractId: cd.contractid })
                    response.forEach(res => {
                        res['action'] = (
                            <>
                                <Tooltip title="Click to vote" placement="top-start">
                                    <IconButton
                                        color="inherit"
                                        aria-label="vote master proposal"
                                        edge="end"
                                        onClick={(e) => handleOpenVote({ changeId: res.changeid, proposalType: "master", contractId: res.contractid })}
                                    >
                                        <HowToVoteOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        );
                    })


                    setMasterDataFoundChanges(response)
                }
            },
            (err) => console.log(err))




        // find composition proposal changes by account/ then hex acct, then alert/ warn ui
        setCompositionDataFoundChanges([])

        getProposalChanges(
            `http://127.0.0.1:8080/api/crmCompositionDataChangeProposal?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Composition data changes find by account:', response);

                    // add edit / delete (non functional) in the my contracts table
                    // { changeId: cd.changeid, proposalType: "composition", contractId: cd.contractid })
                    response.forEach(res => {
                        res['action'] = (
                            <>
                                <Tooltip title="Click to vote" placement="top-start">
                                    <IconButton
                                        color="inherit"
                                        aria-label="vote composition proposal"
                                        edge="end"
                                        onClick={(e) => handleOpenVote({ changeId: res.changeid, proposalType: "composition", contractId: res.contractid })}
                                    >
                                        <HowToVoteOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                        );
                    })

                    setCompositionDataFoundChanges(response)
                }
            },
            (err) => console.log(err))

    }, [props, props?.hexAcct])

    // check crm data changes includes current user's master data changes' contract ids
    useEffect(() => {

        if (!masterData || masterData.length === 0) return

        const masterDataContractIDs = masterData.map(mdfc => mdfc.contractid)

        const cPromises = masterDataContractIDs.map(mdcId => new Promise((resolve, reject) => {

            getProposalChanges(
                `http://127.0.0.1:8080/api/crmDataChangeProposals?contractid=${mdcId}`,
                (response) => {
                    if (response) {
                        resolve(response);
                    } 
                },
                (err) => {
                    reject(err)
                })

        }));

        let userCrmDataChangesProposals = []

        Promise.all(cPromises).then(results => {
            console.log('promises results', results);

            // find current user account /address is in the results' accounts
            if (results && results.length > 0) {

                results.forEach(result => {
                    

                    if (result && result.length > 0) {
                        console.log('promises result > res:', result);
                        result.forEach(res => {
                            userCrmDataChangesProposals.push(res)
                        })


                        // add edit / delete (non functional) in the my contracts table
                        // { changeId: md.changeId, proposalType: "crm", contractId: md.contractid }                    
                        userCrmDataChangesProposals.forEach(proposal => {
                            proposal['action'] = (
                                <>
                                    <Tooltip title="Click to vote" placement="top-start">
                                        <IconButton
                                            color="inherit"
                                            aria-label="vote crm data proposal"
                                            edge="end"
                                            onClick={(e) => handleOpenVote({ changeId: proposal.changeid, proposalType: "crm", contractId: proposal.contractid })}
                                        >
                                            <HowToVoteOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            );
                        })
                    }
                })


                // console.log(userCrmDataChangesProposals);
                setCrmDataFoundChanges(userCrmDataChangesProposals)

            }
        });

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterData])


    // check other contracts includes current user's master data changes contract ids
    useEffect(() => {
        if (!masterData || masterData.length === 0) return

        const masterDataContractIDs = masterData.map(mdfc => mdfc.contractid)

        const promises = masterDataContractIDs.map(mdcId => new Promise((resolve, reject) => {

            getProposalChanges(
                `http://127.0.0.1:8080/api/crmOtherContractsDataChangeProposal?contractid=${mdcId}`,
                (response) => {
                    if (response) {
                        resolve(response);
                    }
                },
                (err) => {
                    reject(err)
                })

        }));

        let userCrmOtherContractsDataChangesProposals = []

        Promise.all(promises).then(results => {
            console.log(' OtherContractsData Proposals promises results', results);

            // find current user account /address is in the results' accounts
            if (results && results.length > 0) {

                results.forEach(result => {
                    console.log('promises results > result:', result);

                    if (result && result.length > 0) {
                        result.forEach(res => {
                            userCrmOtherContractsDataChangesProposals.push(res)
                        })


                        // add edit / delete (non functional) in the my contracts table
                        // { changeId: ocd.changeid, proposalType: "other contracts", contractId: ocd.contractid }                
                        userCrmOtherContractsDataChangesProposals.forEach(proposal => {
                            proposal['action'] = (
                                <>
                                    <Tooltip title="Click to vote" placement="top-start">
                                        <IconButton
                                            color="inherit"
                                            aria-label="vote other contracts data proposal"
                                            edge="end"
                                            onClick={(e) => handleOpenVote({ changeId: proposal.changeid, proposalType: "other contracts", contractId: proposal.contractid })}
                                        >
                                            <HowToVoteOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            );
                        })
                    }
                })


                console.log(userCrmOtherContractsDataChangesProposals);
                setOtherContractsDataFoundChanges(userCrmOtherContractsDataChangesProposals)

            }
        });

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterData])

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
                props.notify ? props.notify("Unable to run proposal voting", 'error') :
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

                    <Button onClick={() => handleCloseVote(true)} color="secondary" autoFocus>
                        Yes
                    </Button>

                    <Button onClick={() => handleCloseVote(false)} >
                        No
                    </Button>

                    <Button onClick={() => setOpenVote(false)} color="secondary" autoFocus>
                        Exit
                    </Button>

                </DialogActions>
            </Dialog>


            <Tabs
                value={tabsValue}
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

            <TabPanel value={tabsValue} index={0}>
                {
                    (crmDataFoundChanges && crmDataFoundChanges.length > 0) &&
                    <ReactVirtualizedTable
                        virtualTableColumns={crmDataChangePropVirtualTblCol}
                        virtualTableRows={crmDataFoundChanges}
                    />
                }
            </TabPanel>

            <TabPanel value={tabsValue} index={1}>
                {
                    (masterDataFoundChanges && masterDataFoundChanges.length > 0) &&
                    <ReactVirtualizedTable
                        virtualTableColumns={revenueSplitVirtualTblCol}
                        virtualTableRows={masterDataFoundChanges}
                    />
                }

            </TabPanel>

            <TabPanel value={tabsValue} index={2}>
                {
                    (compositionDataFoundChanges && compositionDataFoundChanges.length > 0) &&
                    <ReactVirtualizedTable
                        virtualTableColumns={revenueSplitVirtualTblCol}
                        virtualTableRows={compositionDataFoundChanges}
                    />
                }

            </TabPanel>

            <TabPanel value={tabsValue} index={3}>
                {
                    (otherContractsDataFoundChanges && otherContractsDataFoundChanges.length > 0) &&
                    <ReactVirtualizedTable
                        virtualTableColumns={otherContractsVirtualTblCol}
                        virtualTableRows={otherContractsDataFoundChanges}
                    />
                }

            </TabPanel>
        </>
    )
}

export default Proposals
