import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { contractsVirtualTblCol } from "../Layout/virtualTableColumns";
import getPolmData from '../Common/proposalChanges/getProposalChangesData';
import { userPinList } from '../../pinata-ipfs';

const Contracts = (props) => {

    const [masterData, setMasterData] = useState([])
    const [tableContracts, setTableContracts] = useState(null)

    // get contract ids from master data which has user's account
    useEffect(() => {
        if (!props || !props.hexAcct) return

        setMasterData([])

        // get master data by account,
        getPolmData(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response) {
                    // console.log('Master data by account:', response)
                    setMasterData(response)
                }
            },
            (err) => console.log(err))

    }, [props, props?.hexAcct])

    // get contracts by filtered contract ids from master data
    useEffect(() => {
        if (masterData.length === 0) return

        const masterDataContractIDs = masterData.map(row => row?.contractid)

        const contractPromises = masterDataContractIDs.map(mdcId => new Promise((resolve, reject) => {

            getPolmData(
                `http://127.0.0.1:8080/api/crmData?id=${mdcId?.toString()}`,
                (response) => {
                    if (response) {
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

            if (results && results.length > 0) {

                results.forEach(result => {
                    if (result) {
                        // console.log('contract result:', result)
                        result.forEach(res => {
                            tblContracts.push(res)
                        })

                    }
                })


                // add edit in the my contracts table action column
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
                    tblContract['song'] = ''
                })

                setTableContracts(tblContracts)
            }
        });

    }, [masterData])

    // get song names from hex account, thru metadata account in ipfs
    useEffect(() => {
        if (!props || !props.hexAcct || !tableContracts || tableContracts?.length === 0) return

        console.log('account:', props.hexAcct)

        const queryparams = {
            selectedPinStatus: 'pinned',
            nameContains: props.hexAcct
        }


        let tblContracts = JSON.parse(JSON.stringify(tableContracts))

        async function getSongNames(qparams) {

            await userPinList(qparams,
                (response) => {
                    // set response to tableContracts.songName
                    console.log('getSongNnames response:', response)

                    if (response && (response.rows && response.rows.length > 0)) {

                        response.rows.forEach(row => {
                                console.log('response row:', row)

                                if (row) {
                                    tblContracts.forEach((tblCon, idx) => {
                                    if (tblCon.ipfshash?.toString() === row.ipfs_pin_hash?.toString()) {
                                     
                                        console.log('contract found:', row.metadata.keyvalues.songName)
                                     
                                       tblCon['song'] = row.metadata.keyvalues.songName
                                    }

                                })
                               

                                }
                            })
                    }

                },
                (error) => props.notify ? props.notify(`${error}`, 'error') : console.log(error)
            )
        }

        getSongNames(queryparams)
            .catch(err => {
            if (props.notify) {
                props.notify(`An error occured while getting the song names`, 'error')
            } else {
                console.log(`An error occured while getting the song names`)
            }
        })


    }, [props, props?.hexAcct])

    const handleContractEdit = (e, id) => {
        if (props && props.onContractEdit) props.onContractEdit(e, id?.toString())
    }


    return (<>
        <ReactVirtualizedTable
            virtualTableColumns={contractsVirtualTblCol}
            virtualTableRows={tableContracts}
        />
    </>)
}

export default Contracts
