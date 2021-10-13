import React, { useState, useEffect } from 'react';
import CrmDataGrid from '../../../Layout/crmDataGrid';
import TabPanel from "../../../Layout/tabPanel";
import { parse } from "papaparse";

import { bool, func, number, shape, string, oneOfType } from 'prop-types';
import {
    Tabs,
    Tab,
    Grid,
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    Typography
} from '@material-ui/core';
import DDEXDataGrid from '../../Contracts/ddexDataGrid';
// import { SplitAccountHeader, splitAccountRow } from '../royaltySplitAccountGrid';
import getMasterData from '../../../Common/getMasterData';

const toggleDialog = (state, openFunc, notify) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    if (openFunc) openFunc(state)
};

function ContractInfo({ contract, openInfo, openFunc, onCloseVote, notify, nodeApi }) {
    const [tabsValue, setTabsValue] = useState(0)
    const [DDEXdata, setDDEXdata] = useState(null);
    const [masterData, setMasterData] = useState(null);

    // For tab 3, master of contract
    useEffect(() => {
        if (!contract || !contract?.id) return

        getMasterData(contract.id, nodeApi, (response) => setMasterData(response))

    }, [contract]);

    const handleTabChange = (event, newValue) => {
        setTabsValue(newValue);
    };

    // get ddex file
    useEffect(() => {
        setTabsValue(0)
        if (!contract || !contract.ipfshash) return

        const url = `https://gateway.pinata.cloud/ipfs/${contract?.ipfshash}`
        parse(url, {
            download: true,
            complete: function (results, file) {
                if (results && results.data && results.data.length) {

                    try {
                        const description = results.data[3][1] // description location
                        const formatVersion = results.data[4][1]
                        const totalReleases = results.data[5][1]
                        const totalTracks = results.data[6][1]
                        // release info
                        const action = results.data[9][0]
                        const upc = results.data[9][1]
                        const catalogNumber = results.data[9][2]
                        const grid = results.data[9][3]
                        const title = results.data[9][4]
                        const remixOrVersion = results.data[9][5]
                        const userEmail = results.data[9][6]
                        const label = results.data[9][7]
                        const participants = results.data[9][8]
                        const primaryLanguage = results.data[9][9]
                        const secondaryLanguage = results.data[9][10]
                        const language = results.data[9][11]
                        const explicitLyrics = results.data[9][12]
                        const priceCategory = results.data[9][13]
                        const digitalRelease = results.data[9][14]
                        const originalRelease = results.data[9][15]
                        const licenseType = results.data[9][16]
                        const licenseInfo = results.data[9][17]
                        const cYear = results.data[9][18]
                        const cLine = results.data[9][19]
                        const pYear = results.data[9][20]
                        const pLine = results.data[9][21]
                        const territories = results.data[9][22]
                        const coverUrl = results.data[9][23]
                        const trackCount = results.data[9][24]
                        const isrc = results.data[9][25]
                        const iswc = results.data[9][26]
                        const audioUrl = results.data[9][27]

                        const ddexData = {
                            description,
                            formatVersion,
                            totalReleases,
                            totalTracks,
                            action,
                            upc,
                            catalogNumber,
                            grid,
                            title,
                            remixOrVersion,
                            userEmail,
                            label,
                            participants,
                            primaryLanguage,
                            secondaryLanguage,
                            language,
                            explicitLyrics,
                            priceCategory,
                            digitalRelease,
                            originalRelease,
                            licenseType,
                            licenseInfo,
                            cYear,
                            cLine,
                            pYear,
                            pLine,
                            territories,
                            coverUrl,
                            trackCount,
                            isrc,
                            iswc,
                            audioUrl
                        }
                        setDDEXdata(ddexData)

                    } catch (error) {
                        console.log(error);
                    }
                }
            },
            error: function (results, file) {
                if (notify) notify(results, 'error');
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
            maxWidth="lg"
        >
            <DialogTitle id="contract-info-dialog-title">{"Contract Information"}</DialogTitle>
            <DialogContent>
                <Tabs
                    value={tabsValue}
                    onChange={handleTabChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="fullWidth"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Contract" />
                    <Tab label="DDEX" />
                    {/* <Tab label="Master" /> */}
                </Tabs>

                <TabPanel value={tabsValue} index={0}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <Box pb={1}>
                                <Typography variant="h6">
                                    {`Contract ID ${contract?.actionChangeObj?.contractId || ''}`}
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
                        <DDEXDataGrid
                            ddexData={DDEXdata}
                            song={contract?.song}
                            artist={contract?.artist}
                            coverUrl={`https://gateway.pinata.cloud/ipfs/${contract?.ipfshashprivate?.split(',')[0] || ''}`}
                            audioUrl={`https://gateway.pinata.cloud/ipfs/${contract?.ipfshashprivate?.split(',')[1] || ''}`}
                        />
                    </Grid>
                </TabPanel>

                {/* <TabPanel value={tabsValue} index={2}>
                    <Grid container spacing={1}>
                        <SplitAccountHeader />
                        {
                            (masterData && masterData.master.length) && masterData.master.map((row, idx) => {
                                return splitAccountRow(row, idx)
                            })
                        }
                    </Grid>
                </TabPanel> */}

                <Box ml={2}>
                    <DialogContentText id="alert-dialog-description">
                        {`Click 'Yes' to vote for changes or 'No' to vote against changes. For contracts proposal data 
                            with contract ID ${contract?.actionChangeObj?.contractId || ''} and change ID ${contract?.actionChangeObj?.changeId || ''}`}

                    </DialogContentText>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onCloseVote(true, contract?.actionChangeObj)} color="secondary" autoFocus>
                    Yes
                </Button>

                <Button onClick={() => onCloseVote(false, contract?.actionChangeObj)} >
                    No
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
        artist: string,
        actionChangeObj: shape({
            changeId: oneOfType([
                string,
                number
            ]),
            proposalType: string,
            contractId: oneOfType([
                string,
                number
            ])
        })
    }),
    openInfo: bool,
    openFunc: func,
    onCloseVote: func,
}

export default ContractInfo;