import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
import { revenueSplitVirtualTblCol, otherContractsVirtualTblCol } from "../Layout/virtualTableColumns";

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
import { u8aToString } from '@polkadot/util';
import { encodeAddress } from '@polkadot/util-crypto';
import { SplitAccountHeader, splitAccountRow } from '../Layout/royaltySplitAccountGrid';
import { OtherContractsHeader, otherContractsRow } from '../Layout/otherContractsGrid';
import CrmDataGrid from '../Layout/crmDataGrid';
import { userPinList } from '../../pinata-ipfs';
import ProposalContractGrid from '../Layout/Proposals/contracts/grid';


const Proposals = (props) => {

    const [tabsValue, setTabsValue] = useState(0)

    const [masterData, setMasterData] = useState(null)

    const [compositionDataFoundChanges, setCompositionDataFoundChanges] = useState(null)
    const [masterDataFoundChanges, setMasterDataFoundChanges] = useState(null)
    const [crmDataFoundChanges, setCrmDataFoundChanges] = useState(null)
    const [otherContractsDataFoundChanges, setOtherContractsDataFoundChanges] = useState(null)

    const [changesToBeVoted, setChangesToBeVoted] = useState(null)
    const [changeProposalData, setChangeProposalData] = useState(null)

    const [tableLoading, setTableLoading] = useState(false)

    const [proposalVoted, setProposalVoted] = useState(false)

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

        const ourRequest = axios.CancelToken.source()

        // get master data by account,
        getProposalChanges(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    setMasterData(response)
                } else {
                    setTableLoading(false)
                }
            },
            (err) => console.log(`GetProposalChanges for master, error: ${err}`),
            ourRequest.token)

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

                    if (props && props.api) {
                        getOnChainProposals('master', response, props.api.query.crm.crmMasterDataChangeProposal)
                            .then(async (changeProposals) => {
                                let onChainProposals = []

                                if (changeProposals && changeProposals.length) {

                                    for (const changeprop of changeProposals) {
                                        if (changeprop && !changeprop.noChangeProposal) {
                                            onChainProposals.push(changeprop.changeData)
                                        }
                                    }

                                    // set contract songs and unvoted proposals
                                    try {
                                        const _onChainProposals = await setContractSongs(onChainProposals, ourRequest.token)
                                        getUnvotedProposals('master', _onChainProposals, props.api.query.crm.crmMasterDataChangeVoteCasted, setMasterDataFoundChanges)

                                    } catch (err) {
                                        // if (props?.notify) props.notify(`${err}`, 'error')
                                    }
                                }
                            })
                    }

                }
            },
            (err) => console.log(`GetProposalChanges for master data changes, error: ${err}`),
            ourRequest.token)


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

                    if (props && props.api)
                        getOnChainProposals('composition', response, props.api.query.crm.crmCompositionDataChangeProposal)
                            .then(async (changeProposals) => {
                                let onChainProposals = []

                                if (changeProposals && changeProposals.length) {
                                    changeProposals.forEach(changeprop => {
                                        if (changeprop && !changeprop.noChangeProposal) {
                                            onChainProposals.push(changeprop.changeData)
                                        }
                                    })

                                    // set contract songs and unvoted proposals
                                    try {
                                        const _onChainProposals = await setContractSongs(onChainProposals, ourRequest.token)
                                        getUnvotedProposals('composition', _onChainProposals, props.api.query.crm.crmCompositionDataChangeVoteCasted, setCompositionDataFoundChanges)
                                    } catch (err) {
                                        // if (props?.notify) props.notify(`${err}`, 'error')
                                    }
                                }
                            })
                }
            },
            (err) => console.log(`GetProposalChanges for composition data changes, error: ${err}`),
            ourRequest.token)

        return () => {
            ourRequest.cancel()
        }

    }, [props, props?.hexAcct, proposalVoted])

    // check crm data changes includes current user's master data changes' contract ids
    useEffect(() => {

        if (!masterData || masterData.length === 0) return

        const ourRequest = axios.CancelToken.source()

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
                },
                ourRequest.token)

        }));

        let userCrmDataChangesProposals = []

        Promise.all(cPromises).then(results => {

            if (results && results.length) {
                // set user crm data changes proposals
                for (const result of results) {
                    if (result && result.length > 0) {
                        result.forEach(res => {
                            userCrmDataChangesProposals.push(res)
                        })
                    }
                }
                // get on chain crm proposals
                if (props && props.api)
                    getOnChainProposals('crm', userCrmDataChangesProposals, props.api.query.crm.crmDataChangeProposal)
                        .then(async (changeProposals) => {

                            let onChainProposals = []

                            if (changeProposals && changeProposals.length) {
                                changeProposals.forEach(changeprop => {
                                    if (changeprop && !changeprop.noChangeProposal) onChainProposals.push(changeprop.changeData)
                                })
                            }

                            // add edit in the my contracts table
                            onChainProposals.forEach(proposal => {
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
                                proposal['actionChangeObj'] = { changeId: proposal.id, proposalType: "contracts", contractId: proposal.contractid }
                                proposal['song'] = ""
                                proposal['artist'] = ''

                            })

                            // get song names from ipfs
                            if (onChainProposals.length) {

                                const queryparams = {
                                    selectedPinStatus: 'pinned',
                                    nameContains: 'polm'
                                }

                                try {
                                    await userPinList(queryparams,
                                        (response) => {

                                            if (response && (response.rows && response.rows.length)) {

                                                response.rows.forEach(row => {

                                                    if (row) {
                                                        onChainProposals.forEach(ocp => {
                                                            if (ocp.ipfshash?.toString() === row.ipfs_pin_hash?.toString()) {
                                                                ocp['song'] = row.metadata?.keyvalues?.songName?.split(' ')?.join('_') || ''
                                                                ocp['artist'] = row.metadata?.keyvalues?.artistName || ''
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                            getUnvotedProposals('crm', onChainProposals, props.api.query.crm.crmDataChangeVoteCasted, setCrmDataFoundChanges)
                                        },
                                        (error) => console.log(`Crm proposals pin list error: ${error}`),
                                        ourRequest.token
                                    )
                                } catch (err) {
                                    console.log(`Crm proposals pin list error: ${err}`)
                                }
                            }

                        })
            }
        });

        return () => {
            ourRequest.cancel()
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterData])


    // check other contracts includes current user's master data changes contract ids
    useEffect(() => {
        if (!masterData || masterData.length === 0) return

        const ourRequest = axios.CancelToken.source()

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
                }, 
                ourRequest.token)

        }));

        let userCrmOtherContractsDataChangesProposals = []

        Promise.all(promises).then(results => {

            if (results && results.length) {

                // set user crm other contracts proposals
                results.forEach(result => {
                    if (result && result.length) {
                        result.forEach(res => {
                            userCrmOtherContractsDataChangesProposals.push(res)
                        })
                    }
                })

                // get on chain other contract proposals
                if (props && props.api)
                    getOnChainProposals('otherContracts', userCrmOtherContractsDataChangesProposals, props.api.query.crm.crmOtherContractsDataChangeProposal)
                        .then(async (changeProposals) => {

                            let onChainProposals = []

                            if (changeProposals && changeProposals.length) {
                                changeProposals.forEach(changeprop => {
                                    if (changeprop && !changeprop.noChangeProposal) onChainProposals.push(changeprop.changeData)
                                })
                            }

                            // add edit in the my contracts table
                            onChainProposals.forEach(proposal => {
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

                            // unvoted 
                            try {
                                const _onChainProposals = await setContractSongs(onChainProposals, ourRequest.token)
                                getUnvotedProposals('otherContracts', _onChainProposals, props.api.query.crm.crmOtherContractsDataChangeVoteCasted, setOtherContractsDataFoundChanges)
                            } catch (err) {
                                // if (props?.notify) props.notify(`${err}`, 'error')
                                //    console.log(`Unvoted other contracts error: ${err}`);
                            }
                        })
            }
        });

        // set table loading false, after few sec, after found changes (other contracts)
        setTimeout(() => {
            setTableLoading(false)
        }, 3000);

        return () => {
            ourRequest.cancel()
        }

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [masterData])

    // set contract songs for master, composition and other contracts proposals
    const setContractSongs = async (onchainProposals, _ourRequestToken) => {
        if (!onchainProposals || !onchainProposals.length) return

        const queryparams = {
            selectedPinStatus: 'pinned',
            nameContains: 'polm',
            // keyvalues: { contractID: { value: ocp?.contractid || 0, op: "eq" } }
        }


        await userPinList(queryparams,
            (response) => {

                if (response && (response.rows && response.rows.length)) {

                    response.rows.forEach(row => {

                        if (row) {
                            onchainProposals.forEach(_ocp => {
                                if (_ocp.contractid?.toString() === row.metadata?.keyvalues?.contractID?.toString()) {
                                    _ocp['song'] = row.metadata?.keyvalues?.songName?.split(' ')?.join('_') || ''
                                }
                            })
                        }
                    })
                }

            },
            (error) => console.log(`SetContractSongs pin list error: ${error}`),
            _ourRequestToken
        )


        return onchainProposals

    }

    // setVoteStatusInDialog
    const setVoteStatusInDialog = async (_values, area, _changeObj, apiQueryFunc) => {

        if (!_values || !area || !_changeObj || !apiQueryFunc) return null

        let values = _values

        for (const proposal of values[area?.toLowerCase()]) {

            if (area?.toLowerCase() !== 'othercontracts') {
                if (proposal.account !== props?.hexAcct) {
                    try {
                        // convert address
                        const polkadotAddr = encodeAddress(proposal?.account || '')
                        // get account and query voteCasted()
                        const voted = await apiQueryFunc(polkadotAddr, _changeObj.changeId)
                        // check results if isNone = Pending, 
                        if (voted && voted.value && !voted.value.isNone) {
                            // if with value and ifTrue = voted 'Yes', if ifFalse = voted 'No'  
                            if (voted.value && voted.value.isTrue) proposal['vote'] = 'Yes'
                            if (voted.value && voted.value.isFalse) proposal['vote'] = 'Against'
                        }

                        if (voted && voted.isNone) {
                            proposal['vote'] = 'Pending'
                        }
                    } catch (err) {
                        if (props && props.notify) props.notify('Something went wrong while getting the votes', 'error')
                        return null
                    }
                } else {
                    proposal['vote'] = 'Pending'
                }
            }
            else {
                // other contracts
                try {
                    const voted = await apiQueryFunc(props?.hexAcct, _changeObj.changeId)
                    if (voted && voted.value && !voted.value.isNone) {
                        // if with value and ifTrue = voted 'Yes', if ifFalse = voted 'No'  
                        if (voted.value && voted.value.isTrue) proposal['vote'] = 'Yes'
                        if (voted.value && voted.value.isFalse) proposal['vote'] = 'Against'
                    }

                    if (voted && voted.isNone) {
                        proposal['vote'] = 'Pending'
                    }
                } catch (err) {
                    if (props && props.notify) props.notify('Something went wrong while getting the votes', 'error')
                    return null
                }
            }
        }

        return values
    }

    // unvoted proposals
    const getUnvotedProposals = (area, foundChanges, apiQuery, setChangesFunc) => {
        if (!area || !foundChanges || !foundChanges.length || !apiQuery || !setChangesFunc) return

        const address = props?.addressValues['wallet-addresses'] || ''

        const promises = foundChanges.map(data => new Promise(async (resolve, reject) => {
            if (area === 'crm') {
                if (data && data.id) {
                    const voteCasted = await apiQuery(address, data.id)
                    voteCasted.isNone ?
                        resolve({ area, noVoteCasted: voteCasted.isNone, changeData: data }) :
                        resolve({ noVoteCasted: voteCasted.isNone })
                }
            } else {
                if (data && data.changeid) {
                    const voteCasted = await apiQuery(address, data.changeid)
                    voteCasted.isNone ?
                        resolve({ area, noVoteCasted: voteCasted.isNone, changeData: data }) :
                        resolve({ noVoteCasted: voteCasted.isNone })
                }
            }
        }))

        let unvotedProposals = []

        Promise.all(promises).then(results => {
            if (results && results.length > 0) {
                results.forEach(result => {
                    if (result && result.noVoteCasted) {
                        unvotedProposals.push(result.changeData)
                    }
                })

                // set to changes proposal changes
                setChangesFunc(unvotedProposals)
            }
        })
    }

    // get on chain proposals
    const getOnChainProposals = (area, foundChanges, apiQueryFunc) => {
        if (!area || !foundChanges || !apiQueryFunc) return

        const promises = foundChanges.map(data => new Promise(async (resolve, reject) => {
            if (area === 'crm') {
                if (data && data.id) {
                    const crmChangeProposal = await apiQueryFunc(data.id)
                    crmChangeProposal.isNone ?
                        resolve({ noChangeProposal: crmChangeProposal.isNone }) :
                        resolve({ noChangeProposal: crmChangeProposal.isNone, changeData: data })
                }
            } else {
                if (data && data.changeid) {
                    const otherChangeProposal = await apiQueryFunc(data.changeid)
                    otherChangeProposal.isNone ?
                        resolve({ noChangeProposal: otherChangeProposal.isNone }) :
                        resolve({ noChangeProposal: otherChangeProposal.isNone, changeData: data })
                }
            }
        }))

        return Promise.all(promises)
    }

    const [openVote, setOpenVote] = useState(false);

    const handleOpenVote = (changeObj) => {

        if (changeObj.proposalType && changeObj.proposalType.toLowerCase() === 'contracts') {
            return
        }

        setOpenVote(true)
        setChangesToBeVoted(changeObj)

        // query changes data from node, then display on Dialog
        handleQueryChangeProposals(changeObj)

    };

    const handleQueryChangeProposals = async (changeObj) => {
        if (!changeObj || !props.api) return
        setChangeProposalData(null)

        const changeProposalType = changeObj.proposalType?.toLowerCase()


        switch (changeProposalType) {
            case 'crm':
                const qcrmdata = await props.api.query.crm.crmDataChangeProposal(changeObj.changeId)
                const lcr = JSON.parse(u8aToString(qcrmdata.value))
                setChangeProposalData(lcr)
                break;

            case 'master':
                const qmasterdata = await props.api.query.crm.crmMasterDataChangeProposal(changeObj.changeId)
                const lmd = JSON.parse(u8aToString(qmasterdata.value))
                const newLmd = await setVoteStatusInDialog(lmd, changeProposalType, changeObj, props.api.query.crm.crmMasterDataChangeVoteCasted)
                setChangeProposalData(newLmd ?? lmd)
                break;

            case 'composition':
                const qcompdata = await props.api.query.crm.crmCompositionDataChangeProposal(changeObj.changeId)
                const lcd = JSON.parse(u8aToString(qcompdata.value));
                const newLcd = await setVoteStatusInDialog(lcd, changeProposalType, changeObj, props.api.query.crm.crmCompositionDataChangeVoteCasted)
                setChangeProposalData(newLcd ?? lcd)
                break;

            case 'other contracts':
                const qocdata = await props.api.query.crm.crmOtherContractsDataChangeProposal(changeObj.changeId)
                const loc = JSON.parse(u8aToString(qocdata.value));
                const newLoc = await setVoteStatusInDialog(loc, 'othercontracts', changeObj, props.api.query.crm.crmOtherContractsDataChangeVoteCasted)
                setChangeProposalData(newLoc ?? loc)
                break;

            default:
                if (props.notify) props.notify('An error occured while getting change proposal data', 'error')
                break;
        }
    }

    const handleCloseVote = (hasAgreed, _actionChangeObj = null) => {

        let vote = false;
        hasAgreed ? vote = true : vote = false

        // reset proposal voted
        setProposalVoted(false)

        // for contracts that has action change obj
        if (_actionChangeObj && _actionChangeObj.proposalType === 'contracts') {
            voteCrmDataProposal(
                _actionChangeObj.changeId,
                vote,
                props.notify,
                props.api,
                props.addressValues,
                props.keyringAccount,
                (response) => setProposalVoted(response))
            setOpenVote(false)
            return
        }

        switch (changesToBeVoted?.proposalType) {
            case "crm":
                voteCrmDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount,
                    (response) => setProposalVoted(response))
                break;
            case "master":
                voteMasterDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount,
                    (response) => setProposalVoted(response))

                break;
            case "composition":
                voteCompositionDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount,
                    (response) => setProposalVoted(response))
                break;
            case "other contracts":
                voteOtherContractsDataProposal(
                    changesToBeVoted?.changeId,
                    vote,
                    props.notify,
                    props.api,
                    props.addressValues,
                    props.keyringAccount,
                    (response) => setProposalVoted(response))
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
                            (changesToBeVoted && changesToBeVoted.proposalType === 'crm' && changeProposalData) ? <CrmDataGrid crmData={changeProposalData} /> : ''

                        }

                        {/* Master data changes */}
                        {
                            // (changesToBeVoted && changesToBeVoted.proposalType === 'master' &&
                            (changeProposalData && changeProposalData.master && changeProposalData.master.length > 0) && (<SplitAccountHeader />)
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
                        Close
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
                    crmDataFoundChanges && crmDataFoundChanges.length ?
                        // (<ReactVirtualizedTable
                        //     virtualTableColumns={crmDataChangePropVirtualTblCol}
                        //     virtualTableRows={crmDataFoundChanges}
                        // />)
                        (<ProposalContractGrid contracts={crmDataFoundChanges} onCloseVote={handleCloseVote} notify={props.notify} nodeApi={props.nodeApi} />)
                        : tableLoading ? <CircularProgress color="secondary" /> : ''
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
