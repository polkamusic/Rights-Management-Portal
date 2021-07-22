import React, { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { crmDataVirtualTblCol, revenueSplitVirtualTblCol, otherContractsVirtualTblCol } from "../Layout/virtualTableColumns";
import getCrmDataProposalChanges from "../Common/proposalChanges/getCrmDataProposalChanges";
import getMasterDataProposalChanges from "../Common/proposalChanges/getMasterDataProposalChanges";
import getCompositionDataProposalChanges from "../Common/proposalChanges/getCompositionDataProposalChanges";

import createRevSplitDataProposalChanges from '../Common/proposalChanges/createRevSplitDataProposalChanges';
import createCrmDataProposalChanges from "../Common/proposalChanges/createCrmDataProposalChanges";
import getProposalChanges from '../Common/proposalChanges/getProposalChangesData';
import createOtherContractsDataProposalChanges from '../Common/proposalChanges/createOtherContractsDataProposalChanges';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

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
                    {/* <Typography>{children}</Typography> */}
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const Proposals = (props) => {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [crmDataRows, setCrmDataRows] = useState(null)
    const [masterDataRows, setMasterDataRows] = useState(null)
    const [compositionDataRows, setCompositionDataRows] = useState(null)
    const [otherContractsDataRows, setOtherContractsDataRows] = useState(null)
    const [compositionDataFoundChanges, setCompositionDataFoundChanges] = useState(null)
    const [masterDataFoundChanges, setMasterDataFoundChanges] = useState(null)

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

        // find master or composition proposal changes by account, then alert/ warn ui
        getProposalChanges(
            `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?account=${props?.walletAddress || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // console.log('master changes find by account', response);
                    setMasterDataFoundChanges(response)
                }
            },
            (err) => console.log(err))

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
        console.log('crm data rows', crmDataRows);
        if (!crmDataRows || crmDataRows.length === 0) return

        const crmDataContractIds = crmDataRows.map(cdata => cdata.contractid)

        const promises = crmDataContractIds.map(cid => new Promise((resolve, reject) => {

            getProposalChanges(
                `http://127.0.0.1:8080/api/crmMasterDataChangeProposal?contractid=${cid}`,
                (response) => {
                    if (response && response.length > 0) {
                        resolve(response);
                    }
                },
                (err) => {
                    console.log(err)
                    reject(err)
                })

        }));

        Promise.all(promises).then(results => {
            console.log('promises results', results);
        });

    }, [crmDataRows])

    // check otherContracts includes current user

    return (
        <>
            {(masterDataFoundChanges && masterDataFoundChanges.length > 0) &&
                masterDataFoundChanges.map((md, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Master data proposal found with contract id ${md.contractid} and nickname ${md.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() => alert('open modal master data vote modal')}>here</span>
                        </Alert>
                    </Grid>)
                })}


            {(compositionDataFoundChanges && compositionDataFoundChanges.length > 0) &&
                compositionDataFoundChanges.map((cd, idx) => {
                    return (<Grid item xs={12} sm={12} key={idx}>
                        <Alert severity="info">
                            {`Composition data proposal found with contract id ${cd.contractid} and nickname ${cd.nickname}. Vote`}
                            {" "} <span style={{ color: "#f50057", cursor: "pointer" }} onClick={() => alert('open modal composition data vote modal')}>here</span>
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
