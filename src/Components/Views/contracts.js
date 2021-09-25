import React, { useEffect, useState } from 'react';
import {
    Tabs,
    Tab,
    Button
} from '@material-ui/core';

import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { contractsVirtualTblCol, masterCompDataVirtualTblCol, TabPanel } from "../Layout/virtualTableColumns";
import getPolmData from '../Common/proposalChanges/getProposalChangesData';

const Contracts = (props) => {

    const [tabsValue, setTabsValue] = useState(0)
    const [masterData, setMasterData] = useState(null)
    const [contracts, setContracts] = useState(null)
    const [tableContracts, setTableContracts] = useState([])


    // get contract ids from crmmasterdata table which has the user's account..ok
    useEffect(() => {
        if (!props || !props.hexAcct) return

        setMasterData([])

        // get master data by account,
        getPolmData(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

        // get ccontracts data
        getPolmData(
            `http://127.0.0.1:8080/api/crmData`,
            (response) => {
                if (response && response.length > 0) {
                    console.log('Contracts:', response)
                    setContracts(response)
                }
            },
            (err) => console.log(err))

    }, [props?.hexAcct])

    // get contracts by the filtered contract ids from master data..ok
    useEffect(() => {

        if (!masterData || masterData.length === 0) return

        const masterDataContractIDs = masterData.map(row => row.contractid)

        const tblContracts = contracts.filter(contract => masterDataContractIDs.includes[contract.id])

        // add edit / delete (non functional) in the my contracts table..ok
        tblContracts.forEach(tblContract => {
            tblContract['action'] = (
                <Button onClick={() => handleContractEdit(tableContract.id)} color="secondary" autoFocus>
                    Edit
                </Button>
            );
        })

         // set data to table just like proposals table ..ok
         console.log('Table contracts:', tblContracts);
         setTableContracts(tblContracts)

    }, [masterData])

    handleContractEdit = (id) => {
        console.log('Handle contract id:', id);
    }


    return (<>

        <Tabs
            value={tabsValue}
            // onChange={handleTabsChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab label="Contracts" />
        </Tabs>

        <TabPanel value={tabsValue} index={0}>
            <ReactVirtualizedTable
                virtualTableColumns={contractsVirtualTblCol}
                virtualTableRows={tableContracts}
            />
        </TabPanel>

    </>)
}

export default Contracts
