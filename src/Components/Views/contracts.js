import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ReactVirtualizedTable from '../Layout/virtualizedTable';
import { contractsVirtualTblCol } from "../Layout/virtualTableColumns";
import getPolmData from '../Common/proposalChanges/getProposalChangesData';
import { userPinList } from '../../pinata-ipfs';
import ContractGrid from '../Layout/Contracts/grid';
import axios from 'axios';

const Contracts = (props) => {

    const [masterData, setMasterData] = useState([])
    const [compositionData, setCompositionData] = useState([]);
    const [tableContracts, setTableContracts] = useState(null)


    // get contract ids from master data which has user's account
    useEffect(() => {
        if (!props || !props.hexAcct) return

        setMasterData([])
        setCompositionData([])
        setTableContracts([])

        const ourRequest = axios.CancelToken.source()

        // get master data by account,
        getPolmData(
            `http://127.0.0.1:8080/api/masterData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response) {
                    setMasterData(response)
                }
            },
            (err) => console.log(`GetPolmData for master, error: ${err}`),
            ourRequest.token)

        getPolmData(
            `http://127.0.0.1:8080/api/compositionData?account=${props?.hexAcct || ''}`,
            (response) => {
                if (response) {
                    setCompositionData(response)
                }
            },
            (err) => console.log(`GetPolmData for composition, error: ${err}`),
            ourRequest.token)

        return () => {
            ourRequest.cancel()
        }

    }, [props, props?.hexAcct])

    // get contracts by filtered contract ids from master data
    useEffect(() => {
        if (!masterData.length && !compositionData.length) return

        const ourRequest = axios.CancelToken.source()

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
                    console.log(`GetPolmData for master promises, error: ${err}`)
                    reject(err)
                })

        }));

        // get contracts by filtered contract ids from composition data
        const compositionDataContractIDs = compositionData.map(row => row?.contractid)

        const compositionPromises = compositionDataContractIDs.map(cdcId => new Promise((resolve, reject) => {
            getPolmData(
                `http://127.0.0.1:8080/api/crmData?id=${cdcId?.toString()}`,
                (response) => {
                    if (response) {
                        resolve(response);
                    }
                },
                (err) => {
                    console.log(`GetPolmData for compo promises, error: ${err}`)
                    reject(err)
                })
        }));

        let tblContracts = []

        Promise.all(contractPromises.concat(compositionPromises)).then(async (results) => {

            if (results && results.length > 0) {

                results.forEach(result => {
                    if (result) {
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
                    tblContract['artist'] = ''

                })

                // get songs initially
                if (tblContracts.length > 0) {
                    const queryparams = {
                        selectedPinStatus: 'pinned',
                        nameContains: 'polm',
                    }

                    await userPinList(queryparams,
                        (response) => {

                            if (response && (response.rows && response.rows.length > 0)) {

                                response.rows.forEach(row => {

                                    if (row) {
                                        tblContracts.forEach((tblCon, idx) => {
                                            if ((tblCon.id?.toString() === row.metadata?.keyvalues?.contractID?.toString()) ||
                                                (tblCon.ipfsHash?.toString() === row.ipfs_pin_hash?.toString())) {


                                                tblCon['song'] = row.metadata?.keyvalues?.songName || ''
                                                tblCon['artist'] = row.metadata?.keyvalues?.artistName || ''
                                            }

                                        })


                                    }
                                })
                            }
                            setTableContracts(tblContracts)
                        },
                        (error) => console.log(`Get contracts by filtered master data error: ${error}`),
                        ourRequest.token
                        )
                }

            }
        });

        return () => {
            ourRequest.cancel()
        }

    }, [masterData, compositionData])


    const handleContractEdit = (e, id) => {
        if (props && props.onContractEdit) props.onContractEdit(e, id?.toString())
    }


    return (<>
        {/* {
            tableContracts && tableContracts.length ? (
                <ReactVirtualizedTable
                    virtualTableColumns={contractsVirtualTblCol}
                    virtualTableRows={tableContracts}
                />
            ) : <CircularProgress color="secondary" />
        } */}

        {
            tableContracts && tableContracts.length ? (
                <ContractGrid contracts={tableContracts} onContractEdit={handleContractEdit} notify={props.notify} nodeApi={props.nodeApi} />
            ) : (masterData.length || compositionData.length ? <CircularProgress color="secondary" /> : '')
        }

    </>)
}

export default Contracts
