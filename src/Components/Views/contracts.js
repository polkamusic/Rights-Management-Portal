import React, { useEffect, useState } from 'react';
import {
    // Tabs,
    // Tab,
    // Button,
    IconButton
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { contractsVirtualTblCol } from "../Layout/virtualTableColumns";
// import TabPanel from "../Layout/tabPanel";
import getPolmData from '../Common/proposalChanges/getProposalChangesData';

const Contracts = (props) => {

    // const [tabsValue, setTabsValue] = useState(0)
    const [masterData, setMasterData] = useState([])
    // const [contracts, setContracts] = useState([])
    const [tableContracts, setTableContracts] = useState(null)


    // get contract ids from crm master data table which has the user's account
    useEffect(() => {
        if (!props || !props.hexAcct) return

        setMasterData([])

        // get master data by account,
        getPolmData(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    // console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

        // get ccontracts data
        // getPolmData(
        //     `http://127.0.0.1:8080/api/crmData`,
        //     (response) => {
        //         if (response && response.length > 0) {
        //             // console.log('Contracts:', response)
        //             setContracts(response)
        //         }
        //     },
        //     (err) => console.log(err))

    }, [props, props?.hexAcct])

    // get contracts by the filtered contract ids from master data
    useEffect(() => {
        if (masterData.length === 0) return

        const masterDataContractIDs = masterData.map(row => row?.contractid)
        // console.log('masterDataContractsIDS:', masterDataContractIDs);
        // const tblContracts = contracts.filter(contract => masterDataContractIDs.includes(contract?.id))

        const contractPromises = masterDataContractIDs.map(mdcId => new Promise((resolve, reject) => {

            getPolmData(
                `http://127.0.0.1:8080/api/crmData?id=${mdcId?.toString()}`,
                (response) => {
                    if (response && response.length > 0) {
                        resolve(response);
                    }
                },
                (err) => {
                    if (props && props.notify) props.notify(err)
                    reject(err)
                })

        }));

        let tblContracts = []

        Promise.all(contractPromises).then(results => {
        
        // console.log('results []:', results);
            if (results && results.length > 0) {

                results.forEach(result => {
                    if (result) {
                        console.log('contract result:', result)
                        result.forEach(res => {
                            tblContracts.push(res)
                        })
                        
                    }
                })


                // add edit / delete (non functional) in the my contracts table
                tblContracts.forEach(tblContract => {
                    tblContract['action'] = (
                        <IconButton
                            color="inherit"
                            aria-label="edit contract"
                            edge="end"
                            onClick={(e) => handleContractEdit(e, tblContract.id)}
                        >
                            <EditIcon />
                        </IconButton>
                    );
                })

                // console.log('tbl contracts:', tblContracts);
                setTableContracts(tblContracts)
            }
        });

    }, [masterData])

    const handleContractEdit = (e, id) => {
        console.log('Handle contract event:', e);
        console.log('Handle contract id:', id);
        if (props && props.onContractEdit) props.onContractEdit(e, id?.toString())
    }


    return (<>

        {/* <Tabs
            value={tabsValue}
            onChange={handleTabsChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab label="" />
        </Tabs> */}

        {/* <TabPanel value={tabsValue} index={0}> */}
        <ReactVirtualizedTable
            virtualTableColumns={contractsVirtualTblCol}
            virtualTableRows={tableContracts}
        />
        {/* </TabPanel> */}

    </>)
}

export default Contracts
