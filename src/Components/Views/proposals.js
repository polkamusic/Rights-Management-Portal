import React, { useEffect, useState } from 'react';
import { Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { crmDataVirtualTblCol, revenueSplitVirtualTblCol } from "../Layout/virtualTableColumns";
import getCrmDataProposalChanges from "../Common/proposalChanges/getCrmDataProposalChanges";
import getMasterDataProposalChanges from "../Common/proposalChanges/getMasterDataProposalChanges";
import createRevSplitDataProposalChanges from '../Common/proposalChanges/createRevSplitDataProposalChanges';
import createCrmDataProposalChanges from "../Common/proposalChanges/createCrmDataProposalChanges";

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
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

        // getCompositionDataProposalChanges(
        //     (response) => {
        //         if (response && response.length > 0) {
        //             const compositionDataRowsTemp = createRevSplitDataProposalChanges(response)
        //             setMasterDataRows(compositionDataRowsTemp)
        //         }
        //     },
        //     (err) => console.log(err))
    }, [])

    return (
        <>
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
                {/* <ReactVirtualizedTable
                    virtualTableColumns={revenueSplitVirtualTblCol}
                    virtualTableRows={compositionDataRows}
                /> */}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {/* <ReactVirtualizedTable
                    virtualTableColumns={revenueSplitVirtualTblCol}
                    virtualTableRows={compositionDataRows}
                /> */}
            </TabPanel>
        </>
    )
}

export default Proposals
