import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
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
        setTableContracts([])

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

        Promise.all(contractPromises).then( async (results) => {

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

                console.log('Contracts, tblContrats:', tblContracts);
                // get songs initially
                if (tblContracts.length > 0) {
                    // console.log('tblContracts init:', tblContracts);

                    const queryparams = {
                        selectedPinStatus: 'pinned',
                        nameContains: 'polm',
                    }

                    await userPinList(queryparams,
                        (response) => {
                            console.log('Contracts, User pin list response:', response);

                            if (response && (response.rows && response.rows.length > 0)) {

                                response.rows.forEach(row => {

                                    if (row) {
                                        tblContracts.forEach((tblCon, idx) => {
                                            if (tblCon.id?.toString() === row.metadata?.keyvalues?.contractID?.toString()) {

                                                console.log('Contracts, contract found:', row.metadata.keyvalues.songName)

                                                tblCon['song'] = row.metadata?.keyvalues?.songName?.split(' ')?.join('_') || ''
                                            }

                                        })


                                    }
                                })
                            }

                            console.log('user pin list, tbl con:', tblContracts)

                            setTableContracts(tblContracts)
                        },
                        (error) => props.notify ? props.notify(`${error}`, 'error') : console.log(error)
                    )
                }

            }
        });

    }, [masterData])

    const handleContractEdit = (e, id) => {
        if (props && props.onContractEdit) props.onContractEdit(e, id?.toString())
    }


    return (<>
        {
            (tableContracts && tableContracts.length > 0) ? (
                <ReactVirtualizedTable
                    virtualTableColumns={contractsVirtualTblCol}
                    virtualTableRows={tableContracts}
                />
            ) : <CircularProgress color="secondary" />
        }

    </>)
}

export default Contracts
