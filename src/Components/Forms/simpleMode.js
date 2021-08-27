import React, { useEffect, useState, useRef } from 'react';

// common
import UploadFile from '../Common/fileUpload';
import SimpleSelect from '../Common/simpleSelect';
import dataToCsvFile from '../Common/dataToCsvFile';
import ddexHeadersToAryElem from '../Common/ddexHeadersToAryElem';
import metadataToAryElem from '../Common/metadataToAryElem';
import releaseInfoToArySubHeaders from '../Common/releaseInfoToArySubHeaders';
import { ddexInitVal } from '../Common/ddexInitVal';
import { nodeInitVal } from '../Common/nodeInitVal';
import releaseInfoToAryElem from '../Common/releaseInfoToAryElem';
import sendCrmFilesToIpfs from '../Common/sendCrmFilesToIpfs';
import getRandomFromRange from '../Common/getRandomIntFromRange';
import checkContractsExists from '../Common/checkContractsExists';
import setQuorumAndShareInput from '../Common/setQuorum&SharesInput';
import unsetQuorumAndShareInput from '../Common/unsetQuorum&ShareInput';
import getMasterData from '../Common/getMasterData';
import getCompositionData from '../Common/getCompositionData';
import getOtherContractData from '../Common/getOtherContractData';
import updateCrmData from '../Common/updateCrmData';
import updateMasterData from '../Common/updateMasterData';
import updateCompositionData from '../Common/updateCompositionData';
import updateOtherContractsData from '../Common/updateOtherContractsData';
import PolkamusicLogo from '../Common/polmLogo';

// views
import Information from '../Views/information';
import DDEX from '../Views/ddex';
import Proposals from '../Views/proposals';

// icons
import Check from '@material-ui/icons/Check';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// core
import {
  IconButton,
  MenuItem,
  Box,
  TextField,
  Drawer,
  Divider,
  Link,
  Button,
  StepLabel,
  Step,
  Stepper,
  StepConnector,
  Paper,
  Toolbar,
  AppBar,
  CssBaseline,
  Typography
} from '@material-ui/core';

// polkadot
import { web3FromSource } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { u8aToHex } from '@polkadot/util';

// others
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty'
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import LoadingOverlay from "react-loading-overlay";

const drawerWidth = 240;

const customTypes = {
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress",
};

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#f50057',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#f50057',
    },
  },
  line: {
    borderColor: '#eaf0f0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaf0f0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#f50057',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#f50057',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const Copyright = () => {
  return (
    <Typography color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        POLKAMUSIC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(800 + theme.spacing(3) * 3)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(9), // 6
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  gradientButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    fontVariant: 'overline',
  },
  // for side drawer
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  title: {
    flexGrow: 1,
  },
}));

const steps = ['Upload MP3 or WAV', 'Information', 'DDEX & Submit'];

const getStepContent = (
  step,
  formikVal,
  nodeFormikVal,
  onCheckInvalid = null,
  nodeApi = null,
  handlePageLoading = null,
  notify = null,
  handleExistingOcIds = null,
  handleDeleteMasterData = null,
  handleAddMasterData = null,
  handleDeleteCompositionData = null,
  handleAddCompositionData = null,
  handleDeleteOtherContractsData = null,
  handleAddOtherContractsData = null

) => {

  switch (step) {
    case 0:
      return <UploadFile nodeFormikVal={nodeFormikVal} />;
    case 1:
      return <Information
        nodeFormikVal={nodeFormikVal}
        onCheckInvalid={onCheckInvalid}
        nodeApi={nodeApi}
        handlePageLoading={handlePageLoading}
        notify={notify}
        handleExistingOcIds={handleExistingOcIds}
        handleDeleteMasterData={handleDeleteMasterData}
        handleAddMasterData={handleAddMasterData}
        handleDeleteCompositionData={handleDeleteCompositionData}
        handleAddCompositionData={handleAddCompositionData}
        handleDeleteOtherContractsData={handleDeleteOtherContractsData}
        handleAddOtherContractsData={handleAddOtherContractsData}
      />;
    case 2:
      return <DDEX
        formikVal={formikVal}
        nodeFormikVal={nodeFormikVal}
      />;

    default:
      throw new Error('Unknown step');
  }
};

const SimpleMode = (props) => {

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [selectAddresses, setSelectAddresses] = useState([])
  const [addressValues, setAddressValues] = useState({
    address: '',
    name: 'wallet-addresses'
  })
  const [modeValues, setModeValues] = useState({
    mode: '',
    name: 'input-mode'
  })
  const [keyringAccount, setKeyringAccount] = useState(null)
  const [nodeApi, setNodeApi] = useState(null);
  const [checkInvalid, setCheckInvalid] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  // const [pageLoadingText, setPageLoadingText] = useState(null)
  const [localCurrCrmId, setLocalCurrCrmId] = useState(150)
  const [existingOcIds, setExistingOcIds] = useState([])
  const timeoutRef = useRef(null)
  const [changeId, setChangeId] = useState(null)
  const [newContractId, setNewContractId] = useState(null)
  const [newContractHash, setNewContractHash] = useState('')

  // capture loaded data, into each state, then compare later with new values
  const [capturedContract, setCapturedContract] = useState({
    capturedCrmData: null,
    capturedMasterData: null,
    capturedCompositionData: null,
    capturedOtherContractsData: null
  })

  // proposal page route
  const [proposalsPage, setProposalsPage] = useState(false)
  const [hexAcctFormat, setHexAcctFormat] = useState(null)

  const notify = (msg) => {
    toast(<PolkamusicLogo msg={msg} />)
  };

  // new contract function
  async function callRegisterMusic(crmNewContract) {

    if (!nodeApi) {
      notify('Chain api is missing, Please check if the chain is connected')
      return
    }

    if (!addressValues || !keyringAccount) {
      notify('Account info is missing, Please check if your wallet is connected')
      return
    }

    if (!crmNewContract) {
      notify('New contract data is missing, Please check that you have completed the form')
      return
    }


    // copy ipfs hash private data
    const ipfshashprivateCopy = JSON.parse(JSON.stringify(crmNewContract.crmData.ipfshashprivate));
    // console.log('ipfs hash private copy', ipfshashprivateCopy);

    notify('Saving form data to the node')

    const krpair = keyring.getPair(keyringAccount.address);
    // console.log('reg krpair', krpair);
    keyring.getAddresses().forEach(kra => {
      if (kra.address?.toString() === krpair.address?.toString()) {
        console.log('Keyring address already saved...');
      } else {
        keyring.saveAddress(krpair.address, { name: krpair.meta.name });
      }
    });

    // signer is from Polkadot-js browser extension
    const {
      address,
      meta: { source, isInjected }
    } = krpair;
    let fromAcct;

    if (isInjected) {
      const injected = await web3FromSource(source);
      fromAcct = address;
      nodeApi.setSigner(injected.signer);
    } else {
      fromAcct = krpair;
    }

    let locCurrCrmId = crmNewContract?.crmId || 0

    let crmIsEmpty = false
    do {

      const parsedId = parseInt(locCurrCrmId)
      const crm = await nodeApi.query.crm.crmData(parsedId)

      if (crm.isEmpty) {
        // no crm id exists, break, proceed
        crmIsEmpty = true
      } else {
        // try with new random id
        locCurrCrmId = getRandomFromRange(170, 3000)
      }

    } while (!crmIsEmpty)

    // check other contracts without data
    if (crmNewContract.crmOtherContracts?.otherContracts?.length === 1 &&
      crmNewContract.crmOtherContracts?.otherContracts[0]?.id === '') {

      crmNewContract.crmOtherContracts = {}
      crmNewContract.crmData['othercontractsquorum'] = 0
      crmNewContract.crmData['othercontractsshare'] = 0

    }

    // transfer hashes to main ipfshashprivate field
    delete crmNewContract.crmData.ipfshashprivate

    crmNewContract.crmData['ipfshashprivate'] = `${ipfshashprivateCopy[0].artworkHash},${ipfshashprivateCopy[1].mp3WavHash}`

    crmNewContract.crmMaster.master.forEach(m => m['account'] = m.account?.trim())

    crmNewContract.crmComposition.composition.forEach(c => c['account'] = c.account?.trim())

    // console.log('Crm new contract', JSON.stringify(crmNewContract, null, 2))

    const transfer = nodeApi.tx.crm.newContract(
      parseInt(locCurrCrmId), // crm id, need to get a good soln
      JSON.stringify(crmNewContract.crmData), // crm data, ipfs hashes, etc
      JSON.stringify(crmNewContract.crmMaster), // master share data
      JSON.stringify(crmNewContract.crmComposition), // composition share data
      JSON.stringify(crmNewContract.crmOtherContracts), // other contracts data
    )

    // Sign and send the transaction using our account
    await transfer.signAndSend(fromAcct, { nonce: -1 }, ({ status, events }) => {

      events
        // find/filter for failed events
        .filter(({ event }) =>
          nodeApi.events.system.ExtrinsicFailed.is(event)
        )
        // we know that data for system.ExtrinsicFailed is
        // (DispatchError, DispatchInfo)
        .forEach(({ event: { data: [error, info] } }) => {
          if (error.isModule) {
            // for module errors, we have the section indexed, lookup
            const decoded = nodeApi.registry.findMetaError(error.asModule);
            const { documentation, method, section } = decoded;

            notify(`${section}.${method}: ${documentation.join(' ')}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            notify(error.toString());
          }
        });

      // success
      events.filter(({ event }) =>
        nodeApi.events.system.ExtrinsicSuccess.is(event)
      ).forEach(({ event: { data: [info] } }) => {
        if (info) {
          notify('Registered music success!');
          // increment local state/storage curr crm id, rand temp
          const randInc = Math.floor(Math.random() * 10) + 1;
          const crmIdPlusRandom = randInc + locCurrCrmId
          setLocalCurrCrmId(crmIdPlusRandom)
          localStorage.setItem("currCrmId", crmIdPlusRandom)
        }
      });

      // status
      if (status && status.isFinalized) {
        console.log(`Transaction finalized at blockHash ${status.asFinalized}`);
        setNewContractHash(status.asFinalized)
        // transfer();
      }

    });

  }

  // connecting wallet
  useEffect(() => {
    // get accounts where meta data field has source
    // meta: { source: data }, indicates account from a wallet address
    const walletAccounts = props.keyringAccts.filter(
      krAcct => !!krAcct.meta.source);
    // console.log('wallet accounts', walletAccounts);
    if (walletAccounts && walletAccounts.length > 0) {
      // set first address as initial address value
      setAddressValues(oldValues => ({
        ...oldValues,
        'wallet-addresses': walletAccounts[0].address
      }));

      // set addresses for selection/ dropdown/ select options
      const addressesOptions = walletAccounts.map(account => ({
        'addressValue': account.address,
        'addressDisplay':
          `${account.address.toString().toString().slice(0, 5)}...${walletAccounts[0].address.toString().slice(account.address.toString().length - 5)}`
      }));
      setSelectAddresses(addressesOptions);

      const initialAddr = walletAccounts[0].address;

      // find keyring account, set to keyring account state
      // for future use e.g. adding to keyring addresses, etc
      if (props.keyringAccts && initialAddr) {
        props.keyringAccts.forEach(krAcct => {
          if (krAcct.address?.toString() === initialAddr.toString()) {
            if (krAcct) setKeyringAccount(krAcct);
          }
        })
      }
    } else {
      notify('Account info is missing, Please check if your wallet is connected')

    }

  }, [props?.keyringAccts]);

  // connecting to the node
  useEffect(() => {

    async function callConnectToNode() {
      const localProviderUrl = 'ws://127.0.0.1:9944'
      const testnetProviderUrl = 'wss://testnet.polkamusic.io'

      // change if prod/staging
      let wsProviderUrl = localProviderUrl
      if (process.env.NODE_ENV !== 'development') wsProviderUrl = testnetProviderUrl

      const provider = new WsProvider(wsProviderUrl)

      // Create the API and wait until ready
      const api = new ApiPromise({
        provider,
        types: customTypes,
      })
      .on('error', function(e) { 
        notify('An error occured while connecting to the chain. Please refresh or contact technical support') 
      })

      await api.isReady

      // Retrieve the chain & node information information via rpc calls
      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ])

      console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

      if (api.isConnected) setNodeApi(api);
    }

    callConnectToNode()
      .catch(err => {
      console.log(`An error occured while connecting to the chain, ${err}`);
      notify(`An error occured while connecting to the chain, ${err}`)
    })

  }, []);

  // set key pair else add address in keyring
  useEffect(() => {
    if (!addressValues['wallet-addresses']) return;
    if (!props.keyringAccts || props.keyringAccts?.length === 0) return;
    let krVal;

    props.keyringAccts.forEach(krAcct => {
      if (krAcct.address?.toString() === addressValues['wallet-addresses'].toString()) {
        if (krAcct) krVal = krAcct;
      }
    });

    if (krVal) {
      // console.log('keyring account', krVal);
      const hexFormatAcct = u8aToHex(krVal?.publicKey)

      // console.log('hex account', hexFormatAcct);

      setHexAcctFormat(hexFormatAcct)

      setKeyringAccount(krVal);
    }
  }, [addressValues, props?.keyringAccts]);

  // init localstorage for crm id, temporary
  useEffect(() => {

    let lsCurrCrmid = localStorage.getItem("currCrmId");
    // console.log('contract id', lsCurrCrmid);

    if (lsCurrCrmid) {
      let parsedLsCurrCrmid = parseInt(lsCurrCrmid)
      setLocalCurrCrmId(parsedLsCurrCrmid)
    } else {
      // get random id 
      const randId = getRandomFromRange(170, 3000)
      localStorage.setItem("currCrmId", randId);
    }

  }, [])


  // ddex ipfs formik, submit form
  const formik = useFormik({
    initialValues: ddexInitVal,
    enableReinitialize: true,
    onSubmit: (values, actions) => {

      setPageLoading(true)

      // console.log('==========================')
      // console.log('Submit form area');
      // console.log('keyring address here');
      // console.log(keyringAccount, addressValues);
      // console.log('formik/ddex values', JSON.stringify(values, null, 2));
      // console.log('node values', JSON.stringify(nodeFormik.values, null, 2));
      // console.log('==========================')

      var size = Object.keys(values.releaseInfo).length;
      // console.log('size', size);

      const metadataAryElem = metadataToAryElem(formik.values.metadata, size)
      const metadataHeaderElem = ddexHeadersToAryElem('metadata', size);
      const metadataAry = [
        metadataHeaderElem,
        ...metadataAryElem
      ]

      const releaseInfoAryElems = releaseInfoToAryElem(formik.values.releaseInfo)
      const releaseInfoArySubHeaders = releaseInfoToArySubHeaders(formik.values.releaseInfo)
      const releaseInfoHeaderElem = ddexHeadersToAryElem('release_info', size);
      const releaseInfoAry = [
        releaseInfoHeaderElem,
        releaseInfoArySubHeaders,
        releaseInfoAryElems
      ]

      const ddexRowData = metadataAry.concat(releaseInfoAry);
      // console.log('ddex rows', ddexRowData);
      const csvfile = dataToCsvFile(ddexRowData, localCurrCrmId);

      // ipfs other values conversions
      const newMasterValues = JSON.parse(JSON.stringify(nodeFormik.values.masterValues.master))
      const newCompositionValues = JSON.parse(JSON.stringify(nodeFormik.values.compositionValues.composition))
      newMasterValues.splice(0, 1); // remove first
      newCompositionValues.splice(0, 1); // remove first
     
      // nodeFormik.values.otherContractValues.otherContracts?.splice(0,1) ; // remove first
      // parse percentages
      nodeFormik.values.masterValues.master.forEach(m => {
        if (nodeFormik.values?.masterValues?.master?.length === 1 && 
          nodeFormik.values?.masterValues?.master[0].nickname &&
          !nodeFormik.values?.masterValues?.master[0].percentage) {
            m['percentage'] = 100
        }
        else m['percentage'] = parseInt(m.percentage)
      })
     
      nodeFormik.values.compositionValues.composition.forEach(c => {
        if (nodeFormik.values?.compositionValues?.composition?.length === 1 && 
          nodeFormik.values?.compositionValues?.composition[0].nickname &&
          !nodeFormik.values?.compositionValues?.composition[0].percentage) {
            c['percentage'] = 100
        }
        else c['percentage'] = parseInt(c.percentage)
      })
    
      nodeFormik.values.otherContractsValues.otherContracts.forEach(oc => {
        oc['percentage'] = !oc.percentage ? '' : parseInt(oc.percentage)
        oc['id'] = !oc.id ? '' : parseInt(oc.id)
      })
     
      for (const [key, value] of Object.entries(nodeFormik.values.ipfsOtherValues)) {
        nodeFormik.values.ipfsOtherValues[key] = parseInt(value)
      }

      // check each captured data, -> if found/not null, then update that part
      // else new contract
      let contractDataHasChanged = false

      let timeOutSec = 1000
      const updateCrmdata = updateCrmData(
        changeId,
        capturedContract['capturedCrmData'],
        values,
        ddexInitVal,
        csvfile,
        nodeFormik.values,
        nodeApi,
        addressValues,
        keyringAccount,
        (response) => notify(response))

      updateCrmdata.then((updated) => {
        updated ? timeOutSec = 8000 : timeOutSec = 1000
        setTimeout(() => {

          const updateMasterdata = updateMasterData(changeId, capturedContract['capturedMasterData'], nodeFormik.values.masterValues.master, nodeApi,
            addressValues, keyringAccount, (response) => notify(response))

          updateMasterdata.then((updated) => {
            updated ? timeOutSec = 8000 : timeOutSec = 1000
            setTimeout(() => {
              const updateCompositiondata = updateCompositionData(changeId, capturedContract['capturedCompositionData'], nodeFormik.values.compositionValues.composition, nodeApi,
                addressValues, keyringAccount, (response) => notify(response))

              updateCompositiondata.then((updated) => {
                updated ? timeOutSec = 8000 : timeOutSec = 1000
                setTimeout(() => {

                  const updateOtherContractsdata = updateOtherContractsData(changeId, capturedContract['capturedOtherContractsData'], nodeFormik.values.otherContractsValues.otherContracts, nodeApi,
                    addressValues, keyringAccount, (response) => notify(response))

                  updateOtherContractsdata.then((updated) => {
                    updated ? timeOutSec = 8000 : timeOutSec = 1000
                    setTimeout(() => {
                      setPageLoading(false)
                      contractDataHasChanged = true
                    }, timeOutSec)
                  })

                }, timeOutSec)

              })
            }, timeOutSec);

          })

        }, timeOutSec);

      })

      if (!contractDataHasChanged) {
        // send artwork , mp3 to ipfs, other ipfs values, send data to node
        const filesTosend = {
          artworkFile: nodeFormik.values.ipfsArtworkFile,
          mp3WavFile: nodeFormik.values.ipfsMp3WavFile,
          ipfsOtherValues: nodeFormik.values.ipfsOtherValues,
          csvFile: csvfile,
          crmId: localCurrCrmId,
          crmMaster: nodeFormik.values.masterValues,
          crmComposition: nodeFormik.values.compositionValues,
          crmOtherContracts: nodeFormik.values?.otherContractsValues || {}
        }

        setNewContractId(localCurrCrmId)
        setChangeId(null)
        sendCrmFilesToIpfs(filesTosend, notify, callRegisterMusic)
          .then(() => {
            setPageLoading(false)
          })
          .catch((err) => {
            console.log('Send crm and register error:', err)
            setPageLoading(false)
          })
      } else {
        setNewContractId(null)
        setTimeout(() => {
          if (pageLoading) setPageLoading(false)
        }, 5000);
      }

    }
  });

  // node extrinsic formik
  const nodeFormik = useFormik({
    initialValues: nodeInitVal,
    enableReinitialize: true,
    onSubmit: values => { console.log('node formik values', values) }
  })

  // handle changes
  const handleNext = (e) => {
    // check validations on step info
    if (activeStep === 1) {
      if (checkInvalid) {
        notify("Invalid input detected, Please check the form.")
        e.preventDefault()
        return
      }
    }

    setActiveStep(activeStep + 1);

    // handle submit
    if (activeStep === steps.length - 1) {
      formik.handleSubmit(e);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  // for side drawers
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // for wallet address selection
  const handleWalletChange = (event) => {
    setAddressValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  // for input mode selection
  const handleModeChange = (event) => {
    console.log(event.target);
    setModeValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  // for form input validation
  const handleCheckInvalid = (status) => {
    setCheckInvalid(status)
  }

  // for loading ,async etc
  const handlePageLoading = (status) => setPageLoading(status);

  const handleExistingOcIds = (res) => {
    setExistingOcIds([...existingOcIds, res])
  }

  // for drawer functions
  const toggleDrawer = (stat) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(stat)
  };

  // for master, composition, other contract shares input 
  const handleDeleteMasterData = (element, idx) => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      masterValues: {
        master: nodeFormik.values.masterValues?.master?.filter((el, i) => i !== idx)
      }
    })
    // setMasterSplitChanged(true)
  }

  const handleAddMasterData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      masterValues: {
        master: [...nodeFormik.values.masterValues.master, { nickname: '', account: '', percentage: '' }]
      }
    })
    // setMasterSplitChanged(true)
  }

  const handleDeleteCompositionData = (element, idx) => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      compositionValues: {
        composition: nodeFormik.values.compositionValues?.composition?.filter((el, i) => i !== idx)
      }
    })
    // setCompositionSplitChanged(true)
  }

  const handleAddCompositionData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      compositionValues: {
        composition: [...nodeFormik.values.compositionValues.composition, { nickname: '', account: '', percentage: '' }]
      }
    })
    // setCompositionSplitChanged(true)
  }

  const handleDeleteOtherContractsData = (element, idx) => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      otherContractsValues: {
        otherContracts: nodeFormik.values.otherContractsValues?.otherContracts?.filter((el, i) => i !== idx)
      }
    })
    // setOtherContractsSplitChanged(true)
  }

  const handleAddOtherContractsData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      otherContractsValues: {
        otherContracts: [...nodeFormik.values.otherContractsValues.otherContracts, { id: '', percentage: '' }]
      }
    })
  }

  const theme = useTheme();

  return (
    <React.Fragment>
      <LoadingOverlay
        active={pageLoading}
        spinner
        // text={pageLoadingText}
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(0, 0, 0, 0.08)",
          }),
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          color="transparent"
          // className={classes.appBar}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Box
              mr={0.5}
              onClick={() => {
                setProposalsPage(false)
                setActiveStep(0)
              }}
              style={{ cursor: "pointer" }}
            >
              <PolkamusicLogo />
            </Box>

            <Typography
              className={classes.title}
              variant="h6"
              onClick={() => {
                setProposalsPage(false)
                setActiveStep(0)
              }}
              style={{ cursor: "pointer" }}
              noWrap
            >
              POLKA<span style={{ color: '#f50057' }}><b>MUSIC</b></span>
            </Typography>

            <Box mr={2} onClick={() => setProposalsPage(!proposalsPage)} style={{ cursor: "pointer" }}>
              <Typography className={classes.title} variant="h6" color="secondary" noWrap>
                Proposals
              </Typography>
            </Box>


            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          {
            proposalsPage ?
              (<Paper className={classes.paper}>
                <Typography align="left">
                  <Button
                    variant="contained"
                    onClick={() => setProposalsPage(false)}
                    className={classes.gradientButton}
                  >
                    BACK
                  </Button>
                </Typography>


                <Typography color="secondary" variant="h4" align="center">
                  PROPOSALS
                </Typography>

                <Box mt={6}>
                  <Proposals
                    walletAddress={addressValues['wallet-addresses']}
                    notify={notify}
                    api={nodeApi}
                    keyringAccount={keyringAccount}
                    addressValues={addressValues}
                    hexAcct={hexAcctFormat}
                  />
                </Box>

              </Paper>) :

              (<Paper className={classes.paper}>
                <Typography color="secondary" variant="h4" align="center">
                  RIGHTS MANAGEMENT
                </Typography>
                <Stepper activeStep={activeStep} connector={<QontoConnector />} className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                        Thank you for filling up.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your form with contract id {newContractId ?? changeId} is submitted. If there's no error or the form is filled,
                        We will send your info to our ipfs and node servers.
                        {newContractHash ? ` You can also check the transaction with this hash ${newContractHash}` : ' Loading transaction hash...'}
                      </Typography>
                    </React.Fragment>
                  ) : (<React.Fragment>
                    {getStepContent(
                      activeStep,
                      formik,
                      nodeFormik,
                      handleCheckInvalid,
                      nodeApi,
                      handlePageLoading,
                      notify,
                      handleExistingOcIds,
                      handleDeleteMasterData,
                      handleAddMasterData,
                      handleDeleteCompositionData,
                      handleAddCompositionData,
                      handleDeleteOtherContractsData,
                      handleAddOtherContractsData
                    )}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        className={classes.gradientButton}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                  )}
                </React.Fragment>
              </Paper>)
          }

          <Copyright />
        </main>

        <Drawer
          className={classes.drawer}
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <LoadingOverlay
            active={pageLoading}
            spinner
            // text={pageLoadingText}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(0, 0, 0, 0.08)",
              }),
            }}
          >
            <Box p={1}>
              {/* Select Wallet */}
              {/* props, inputPropsId, inputPropsName, inputLabel, value, onChange, children */}
              <SimpleSelect
                inputPropsId="wallet-addresses-simple"
                inputPropsName="wallet-addresses"
                inputLabel="Select a Wallet"
                value={addressValues['wallet-addresses'] ?? ''}
                onChange={handleWalletChange}
              >
                {
                  selectAddresses.length > 0 && selectAddresses.map((selectAddress, idx) => (
                    <MenuItem key={idx} value={selectAddress.addressValue}>{selectAddress.addressDisplay}</MenuItem>
                  ))
                }
              </SimpleSelect>
            </Box>

            {/* Select Mode */}
            <Box pt={4}>
              <Box p={1}>
                <SimpleSelect
                  inputPropsId="input-mode-simple"
                  inputPropsName="input-mode"
                  inputLabel="Select a Mode"
                  value={modeValues['input-mode'] ?? ''}
                  onChange={handleModeChange}
                >
                  <MenuItem value="advance">Advance Mode</MenuItem>
                  <MenuItem value="simple">Simple Mode</MenuItem>
                </SimpleSelect>
              </Box>
            </Box>

            {/* Query CRM */}
            <Box pt={4}>
              <Box p={2}>
                <TextField
                  required
                  id="queryCrmTextbox"
                  name="queryCrmData"
                  label="Search Contract"
                  fullWidth
                  autoComplete=""
                  color="secondary"
                  value={nodeFormik.values?.queryCrmData || ''}
                  placeholder="Enter contract id"
                  onChange={(e) => {
                    nodeFormik.handleChange(e)

                    if (!e.target.value) return

                    setChangeId(parseInt(e.target.value))

                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                      console.log('query crm id', e.target.value);

                      handlePageLoading(true)
                      // get crm data
                      checkContractsExists(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          if (response === null) {

                            notify(`Contract ID ${e.target.value} does'nt exist, Please enter a valid contract ID`)
                            nodeFormik.setFieldValue('ipfsMp3WavFileUrl', null)
                            nodeFormik.setFieldValue('ipfsArtworkFileUrl', null)
                            unsetQuorumAndShareInput(nodeFormik)

                            // unset csv or ipfs hash
                            nodeFormik.setFieldValue('ipfsCsvHash', null)

                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedCrmData'] = null
                            setCapturedContract(capturedData)

                          } else {

                            // Load and populate, inputs and file containers
                            notify(`Contract with ID: ${e.target.value} retrieved`)
                            console.log('crm data response', response)
                            // get ipfs mp3 and artwork hashes
                            let ipfsHashPrivateAry = []
                            if (response.ipfshashprivate)
                              ipfsHashPrivateAry = response.ipfshashprivate.split(',');

                            // set data to nodeFormik
                            nodeFormik.setFieldValue(
                              'ipfsMp3WavFileUrl',
                              `https://gateway.pinata.cloud/ipfs/${ipfsHashPrivateAry[1]}`);
                            nodeFormik.setFieldValue(
                              'ipfsArtworkFileUrl',
                              `https://gateway.pinata.cloud/ipfs/${ipfsHashPrivateAry[0]}`)

                            setQuorumAndShareInput(nodeFormik, response)

                            // set captured ipfs hashes
                            nodeFormik.setFieldValue('ipfsCsvHash', response.ipfshash)
                            nodeFormik.setFieldValue('ipfsArtworkHash', ipfsHashPrivateAry[0] || '')
                            nodeFormik.setFieldValue('ipfsMp3WavHash', ipfsHashPrivateAry[1] || '')

                            let capturedData = capturedContract
                            capturedData['capturedCrmData'] = {
                              ipfsArtworkFile: null,
                              ipfsMp3WavFile: null,
                              // formikCsvValues: null,
                              ipfsOtherValues: {
                                globalquorum: parseInt(response?.globalquorum || 0),
                                mastershare: parseInt(response?.mastershare || 0),
                                masterquorum: parseInt(response?.masterquorum || 0),
                                compositionshare: parseInt(response?.compositionshare || 0),
                                compositionquorum: parseInt(response?.compositionquorum || 0),
                                othercontractsshare: parseInt(response?.othercontractsshare || 0),
                                othercontractsquorum: parseInt(response?.othercontractsquorum || 0)
                              }
                            }
                            setCapturedContract(capturedData)

                          }
                        },
                      ).catch(console.error);

                      // master share data
                      getMasterData(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          if (response === null) {
                            notify(`Master data ID ${e.target.value} does'nt exist, Please enter a valid master data ID`)
                            nodeFormik.setFieldValue('masterValues.master', [{ nickname: '', account: '', percentage: '' }])

                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedMasterData'] = null
                            setCapturedContract(capturedData)

                          } else {
                            console.log('master data response', response);
                            nodeFormik.setFieldValue('masterValues.master', response.master)

                            let capturedData = capturedContract
                            capturedData['capturedMasterData'] = response.master
                            setCapturedContract(capturedData)
                          }

                        }
                      ).then(() => handlePageLoading(false)).catch(console.error);

                      // composition share data
                      getCompositionData(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          if (response === null) {
                            notify(`Composition data ID ${e.target.value} does'nt exist, Please enter a valid master data ID`)
                            nodeFormik.setFieldValue('compositionValues.composition', [{ nickname: '', account: '', percentage: '' }])
                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedCompositionData'] = null
                            setCapturedContract(capturedData)
                          } else {
                            console.log('composition data response', response);
                            nodeFormik.setFieldValue('compositionValues.composition', response.composition)
                            let capturedData = capturedContract
                            capturedData['capturedCompositionData'] = response.composition
                            setCapturedContract(capturedData)
                          }

                        }
                      ).then(() => handlePageLoading(false)).catch(console.error);

                      // other contracts share data
                      getOtherContractData(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          if (response === null) {
                            notify(`Other contract data ID ${e.target.value} does'nt exist, Please enter a valid master data ID`)
                            nodeFormik.setFieldValue('otherContractsValues.otherContracts', [{ id: '', percentage: '' }])
                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedOtherContractsData'] = null

                            setCapturedContract(capturedData)
                          } else {
                            console.log('other contracts response sempty?', isEmpty(response));
                            let capturedData = capturedContract


                            if (isEmpty(response)) {
                              nodeFormik.setFieldValue('otherContractsValues.otherContracts', [{ id: '', percentage: '' }])
                              capturedData['capturedOtherContractsData'] = [{ id: '', percentage: '' }]

                            } else {
                              nodeFormik.setFieldValue('otherContractsValues.otherContracts', response.otherContracts)
                              capturedData['capturedOtherContractsData'] = response.otherContracts

                            }
                            setCapturedContract(capturedData)

                          }

                        }
                      ).then(() => handlePageLoading(false)).catch(console.error);
                      // csv/ ddex form data.. not needed atm
                    }, 1000)

                  }}
                />
              </Box>
            </Box>
          </LoadingOverlay>

        </Drawer>
      </LoadingOverlay>
    </React.Fragment>
  )
}

export default SimpleMode
