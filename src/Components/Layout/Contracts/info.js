import React, { useState, useEffect } from 'react';
import CrmDataGrid from '../../Layout/crmDataGrid';
import TabPanel from "../../Layout/tabPanel";
import { parse } from "papaparse";

import { bool, func, number, shape, string } from 'prop-types';
import {
    Tabs,
    Tab,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    // DialogContentText,
    DialogTitle,
    Button,
    Box,
    Typography
} from '@material-ui/core';
import DDEXDataGrid from './ddexDataGrid';

const toggleDialog = (state, openFunc, notify) => (event) => {

    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    if (openFunc) openFunc(state)
};

function ContractInfo({ contract, openInfo, openFunc, onContractEdit, notify }) {
    const [tabsValue, setTabsValue] = useState(0)
    const [DDEXdata, setDDEXdata] = useState(null);

    const handleTabChange = (event, newValue) => {
        setTabsValue(newValue);
    };

    // get ddex file
    useEffect(() => {
        if (!contract || !contract.ipfshash) return 

        const url = `https://gateway.pinata.cloud/ipfs/${contract?.ipfshash}`
        parse(url, {
            download: true,
            complete: function (results, file) {
                console.log("Parsing complete:", results, file);
                // next is format
                if (results && results.data && results.data.length) {
                    const description = results.data[3][1] // description location
                    const ddexData = {
                        description
                    }
                    setDDEXdata(ddexData)
                }
            },
            error: function (results, file) {
                console.log("Parsing error:", results, file);
            },
        })

    }, [contract]);

    return (<>
        <Dialog
            open={openInfo}
            onClose={toggleDialog(false, openFunc)}
            aria-labelledby="contract-info-dialog-title"
            aria-describedby="contract-info-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="contract-info-dialog-title">{"Contract Information"}</DialogTitle>
            <DialogContent>
                <Tabs
                    value={tabsValue}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Contract" />
                    <Tab label="DDEX" />
                </Tabs>

                <TabPanel value={tabsValue} index={0}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Box pb={1}>
                                <Typography variant="h6">
                                    {`Contract ID ${contract?.id}`}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <Typography variant="subtitle2">
                                Song
                            </Typography>
                        </Grid>
                        <Grid item xs={9} sm={9}>
                            <Typography variant="subtitle1">
                                {contract?.song || ''}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} sm={3}>
                            <Typography variant="subtitle2">
                                Artist
                            </Typography>
                        </Grid>
                        <Grid item xs={9} sm={9}>
                            <Typography variant="subtitle1">
                                {contract?.artist || ''}
                            </Typography>
                        </Grid>
                        <Box pt={2} pb={2}>{" "}</Box>
                        <CrmDataGrid crmData={contract} />
                    </Grid>
                </TabPanel>

                <TabPanel value={tabsValue} index={1}>
                    <Grid container spacing={1}>
                        <DDEXDataGrid ddexData={DDEXdata} song={contract?.song} artist={contract?.artist} />
                    </Grid>
                </TabPanel>


            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => onContractEdit(e, contract?.id)}>
                    Update
                </Button>
                <Button onClick={() => openFunc(false)} color="secondary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

ContractInfo.propTypes = {
    contract: shape({
        id: number,
        ipfshash: string,
        ipfshashprivate: string,
        globalquorum: number,
        mastershare: number,
        masterquorum: number,
        compositionshare: number,
        compositionquorum: number,
        othercontractsshare: number,
        othercontractsquorum: number,
        song: string,
        artist: string
    }),
    openInfo: bool,
    openFunc: func
}

export default ContractInfo;