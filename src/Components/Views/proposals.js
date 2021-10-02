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
    Typography,
    CircularProgress,
} from '@material-ui/core';

import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { crmDataChangePropVirtualTblCol, revenueSplitVirtualTblCol, otherContractsVirtualTblCol } from "../Layout/virtualTableColumns";

import getProposalChanges from '../Common/proposalChanges/getProposalChangesData';

import TabPanel from "../Layout/tabPanel";

import voteCrmDataProposal from '../Common/proposalChanges/voteCrmDataProposal';
import voteOtherContractsDataProposal from '../Common/proposalChanges/voteOtherContractsDataProposal';
import voteCompositionDataProposal from '../Common/proposalChanges/voteCompositionDataProposal';
import voteMasterDataProposal from '../Common/proposalChanges/voteMasterDataProposal';

import {
    IconButton
} from '@material-ui/core';
import HowToVoteOutlinedIcon from '@material-ui/icons/HowToVoteOutlined';
import { u8aToString, isNull, isBoolean, isInstanceOf } from '@polkadot/util';
import { SplitAccountHeader, splitAccountRow } from '../Layout/royaltySplitAccountGrid';
import { OtherContractsHeader, otherContractsRow } from '../Layout/otherContractsGrid';
import crmDataGrid from '../Layout/crmDataGrid';
import { userPinList } from '../../pinata-ipfs';


const Proposals = (props) => {

    const [tabsValue, setTabsValue] = useState(0)

    const [masterData, setMasterData] = useState(null)

    const [compositionDataFoundChanges, setCompositionDataFoundChanges] = useState(null)
    const [masterDataFoundChanges, setMasterDataFoundChanges] = useState(null)
    const [crmDataFoundChanges, setCrmDataFoundChanges] = useState(null)
    const [otherContractsDataFoundChanges, setOtherContractsDataFoundChanges] = useState(null)

    const [changesToBeVoted, setChangesToBeVoted] = useState(null)
    const [changeProposalData, setChangeProposalData] = useState(null)

    const [tableLoading, setTableLoading]= useState(false)

    const handleChange = (event, newValue) => {
        setTabsValue(newValue);
    };

    // get proposal changes
    useEffect(() => {
        if (!props.hexAcct) return

        setTableLoading(true)
        setMasterData([])
        setCrmDataFoundChanges([])
        setMasterDataFoundChanges([])
        setCompositionDataFoundChanges([])
        setOtherContractsDataFoundChanges([])
    
        // get master data by account,
        getProposalChanges(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

        // get master data proposal changes by account
        getProposalChanges(
            `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // add edit / delete (non functional) in the my contracts table
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
                       // set table loading false, after few sec, after found changes (other contracts)
                    getUnvotedProposals('master', response, props.api.query.crm.crmMasterDataChangeVoteCasted, setMasterDataFoundChanges)
                }
            },
            (err) => console.log(err))


        // find composition proposal changes by account acct
        setCompositionDataFoundChanges([])

        getProposalChanges(
            `http://127.0.0.1:8080/api/crmCompositionDataChangeProposal?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // add edit / delete (non functional) in the my contracts table
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

                    // getUnvotedProposals('composition', response, props.api.query.crm.crmCompositionDataChangeVoteCasted, setCompositionDataFoundChanges)
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

        Promise.all(cPromises).then(async (results) => {
            // find current user account /address is in the results' accounts
            if (results && results.length > 0) {

                for (const result of results) {

                    if (result && result.length > 0) {
                        result.forEach(res => {
                            userCrmDataChangesProposals.push(res)
                        })


                        // add edit / delete (non functional) in the my contracts table
                        userCrmDataChangesProposals.forEach(proposal => {
                            proposal['action'] = (
                                <>
                                    <Tooltip title="Click to vote" placement="top-start">
                                        <IconButton
                                            color="inherit"
                                            aria-label="vote crm data proposal"
                                            edge="end"
                                            onClick={(e) => handleOpenVote({ changeId: proposal.id, proposalType: "crm", contractId: proposal.contractid })}
                                        >
                                            <HowToVoteOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            );
                            proposal['song'] = ""
                        })

                        if (userCrmDataChangesProposals.length > 0) {

                            const queryparams = {
                                selectedPinStatus: 'pinned',
                                nameContains: props.hexAcct
                            }

                            // get song names from ipfs
                            await userPinList(queryparams,
                                (response) => {

                                    if (response && (response.rows && response.rows.length > 0)) {

                                        response.rows.forEach(row => {

                                            if (row) {
                                                userCrmDataChangesProposals.forEach((tblCon, idx) => {
                                                    if (tblCon.ipfshash?.toString() === row.ipfs_pin_hash?.toString()) {

                                                        // console.log('contract found:', row.metadata.keyvalues.songName)
                                                        tblCon['song'] = row.metadata?.keyvalues?.songName?.split(' ')?.join('_') || ''
                                                    }

                                                })


                                            }
                                        })
                                    }

                                    // getUnvotedProposals('crm', userCrmDataChangesProposals, props.api.query.crm.crmDataChangeVoteCasted, setCrmDataFoundChanges)
                                },
                                (error) => props.notify ? props.notify(`${error}`, 'error') : console.log(error)
                            )
                        }
                    }
                }
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
            // find current user account /address is in the results' accounts
            if (results && results.length > 0) {

                results.forEach(result => {

                    if (result && result.length > 0) {
                        result.forEach(res => {
                            userCrmOtherContractsDataChangesProposals.push(res)
                        })

                        // add edit in the my contracts table
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

                getUnvotedProposals('otherContracts', userCrmOtherContractsDataChangesProposals, props.api.query.crm.crmOtherContractsDataChangeVoteCasted, setOtherContractsDataFoundChanges)
            }
        });

        // set table loading false, after few sec, after found changes (other contracts)
        setTimeout(() => {
            setTableLoading(false)
        }, 3000);

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterData])


    // generic unvoted proposals
    const getUnvotedProposals = (area, foundChanges, apiQuery, setChangesFunc) => {
        if (foundChanges.length === 0) return

        const address = props?.addressValues['wallet-addresses'] || ''

        const promises = foundChanges.map(data => new Promise(async (resolve, reject) => {
            if (area === 'crm') {
                if (data && data.id) {
                    const voteCasted = await apiQuery(address, data.id)
                    resolve({ voteCastedState: voteCasted, changeData: data })
                }
            } else {
                if (data && data.changeid) {
                    const voteCasted = await apiQuery(address, data.changeid)
                    resolve({ voteCastedState: voteCasted, changeData: data })
                }
            }
        }))

        let unvotedProposals = []

        Promise.all(promises).then(results => {
            console.log('results length:', results.length);
            if (results && results.length > 0) {
                results.forEach(result => {
                    console.log('result:', result);

                    if (result && result.voteCastedState && result.voteCastedState.isNone) {
                       unvotedProposals.push(result.changeData)
                        
                    }
                })

                // set to changes proposal changes
                console.log(`Unvoted in ${area} :`, unvotedProposals.filter(Boolean));
                const _unvotedProposals = unvotedProposals.filter(Boolean);
                setChangesFunc(_unvotedProposals)
            }
        })
    }


    const [openVote, setOpenVote] = useState(false);

    const handleOpenVote = (changeObj) => {

        setOpenVote(true)
        setChangesToBeVoted(changeObj)

        // query changes data from node, then display on Dialog
        handleQueryCrmChangeProposals(changeObj)
    };

    const handleEmptyProposalData = (data) => {
        if (!data) return

        let state = false

        if (data.isEmpty) {
            if (props.notify) props.notify('Change proposal data not found!', 'error')
            setOpenVote(false)
            state = true
        }

        return state
    }

    const handleQueryCrmChangeProposals = async (changeObj) => {
        if (!changeObj || !props.api) return

        setChangeProposalData(null)

        const changeProposalType = changeObj.proposalType?.toLowerCase()

        switch (changeProposalType) {
            case 'crm':
                const qcrmdata = await props.api.query.crm.crmDataChangeProposal(changeObj.id)

                const crmempty = handleEmptyProposalData(qcrmdata)
                if (crmempty) return

                const lcr = JSON.parse(u8aToString(qcrmdata.value))
                setChangeProposalData(lcr)
                break;

            case 'master':
                const qmasterdata = await props.api.query.crm.crmMasterDataChangeProposal(changeObj.changeId)

                const mempty = handleEmptyProposalData(qmasterdata)
                if (mempty) return

                const lmd = JSON.parse(u8aToString(qmasterdata.value))
                setChangeProposalData(lmd)
                break;

            case 'composition':
                const qcompdata = await props.api.query.crm.crmCompositionDataChangeProposal(changeObj.changeId)

                const cempty = handleEmptyProposalData(qcompdata)
                if (cempty) return

                const lcd = JSON.parse(u8aToString(qcompdata.value));
                setChangeProposalData(lcd)
                break;

            case 'other contracts':
                const qocdata = await props.api.query.crm.crmOtherContractsDataChangeProposal(changeObj.changeId)

                const ocempty = handleEmptyProposalData(qocdata)
                if (ocempty) return

                const loc = JSON.parse(u8aToString(qocdata.value));
                setChangeProposalData(loc)
                break;

            default:
                if (props.notify) props.notify('An error occured while getting change proposal data', 'error')
                break;
        }
    }

    const handleCloseVote = (hasAgreed) => {

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

    const toggleDialog = (stat) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenVote(stat)
    };


    return (
        <>
            <Dialog
                open={openVote}
                onClose={toggleDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">{"Vote Polkamusic's proposal changes?"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Box pb={1}>
                                <Typography variant="h6">
                                    Change proposal data
                                </Typography>
                            </Box>
                        </Grid>

                        {changeProposalData ? '' : <CircularProgress color="secondary" />}

                        {/* crm data changes */}
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'crm' && changeProposalData) ? crmDataGrid(changeProposalData) : ''

                        }

                        {/* Master data changes */}
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'master' &&
                                changeProposalData && changeProposalData.master && changeProposalData.master.length > 0) && (<SplitAccountHeader />)
                        }
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'master' &&
                                changeProposalData && changeProposalData.master && changeProposalData.master.length > 0)
                            && changeProposalData.master.map((row, idx) => {
                                return splitAccountRow(row, idx)
                            })
                        }

                        {/* Composition data changes */}
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'composition' &&
                                changeProposalData && changeProposalData.composition && changeProposalData.composition.length > 0) && (<SplitAccountHeader />)
                        }
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'composition' &&
                                changeProposalData && changeProposalData.composition && changeProposalData.composition.length > 0)
                            && changeProposalData.composition.map((row, idx) => {
                                return splitAccountRow(row, idx)
                            })
                        }

                        {/* other contracts data changes */}
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'other contracts' &&
                                changeProposalData && changeProposalData.othercontracts && changeProposalData.othercontracts.length > 0) && (<OtherContractsHeader />)
                        }
                        {
                            (changesToBeVoted && changesToBeVoted.proposalType === 'other contracts' &&
                                changeProposalData && changeProposalData.othercontracts && changeProposalData.othercontracts.length > 0)
                            && changeProposalData.othercontracts.map((row, idx) => {
                                return otherContractsRow(row, idx)
                            })
                        }

                    </Grid>
                    <Box pt={2}>{""}</Box>
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
                    (crmDataFoundChanges && crmDataFoundChanges.length > 0) ?
                        (<ReactVirtualizedTable
                            virtualTableColumns={crmDataChangePropVirtualTblCol}
                            virtualTableRows={crmDataFoundChanges}
                        />) : tableLoading ? <CircularProgress color="secondary" /> : ''
                }
            </TabPanel>

            <TabPanel value={tabsValue} index={1}>
                {
                    (masterDataFoundChanges && masterDataFoundChanges.length > 0) ?
                    (<ReactVirtualizedTable
                        virtualTableColumns={revenueSplitVirtualTblCol}
                        virtualTableRows={masterDataFoundChanges}
                    />) : tableLoading ? <CircularProgress color="secondary" /> : ''
                }

            </TabPanel>

            <TabPanel value={tabsValue} index={2}>
                {
                    (compositionDataFoundChanges && compositionDataFoundChanges.length > 0) ?
                    (<ReactVirtualizedTable
                        virtualTableColumns={revenueSplitVirtualTblCol}
                        virtualTableRows={compositionDataFoundChanges}
                    />) : tableLoading ? <CircularProgress color="secondary" /> : ''
                }

            </TabPanel>

            <TabPanel value={tabsValue} index={3}>
                {
                    (otherContractsDataFoundChanges && otherContractsDataFoundChanges.length > 0) ?
                    (<ReactVirtualizedTable
                        virtualTableColumns={otherContractsVirtualTblCol}
                        virtualTableRows={otherContractsDataFoundChanges}
                    />) : tableLoading ? <CircularProgress color="secondary" /> : ''
                }

            </TabPanel>
        </>
    )
}

export default Proposals
