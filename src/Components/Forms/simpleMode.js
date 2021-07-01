import React, { useEffect, useState, useRef } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import UploadFile from '../Common/fileUpload';
import Information from '../Views/information';
import ReviewAndSubmit from '../Views/reviewAndSubmit';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { web3FromSource } from '@polkadot/extension-dapp';
import SimlpeSelect from '../Common/simpleSelect';
import { MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { toast } from 'react-toastify';
import dataToCsvFile from '../Common/dataToCsvFile';
import DDEX from '../Views/ddex';
import { useFormik } from 'formik';
import ddexHeadersToAryElem from '../Common/ddexHeadersToAryElem';
import metadataToAryElem from '../Common/metadataToAryElem';
import releaseInfoToArySubHeaders from '../Common/releaseInfoToArySubHeaders';
import { ddexInitVal } from '../Common/ddexInitVal';
import { nodeInitVal } from '../Common/nodeInitVal';
import releaseInfoToAryElem from '../Common/releaseInfoToAryElem';
import sendCrmFilesToIpfs from '../Common/sendCrmFilesToIpfs';
import LoadingOverlay from "react-loading-overlay";
import getRandomFromRange from '../Common/getRandomIntFromRange';
import checkOtherContractsIdExist from '../Common/checkOtherContractsIdExist';
import checkContractsExists from '../Common/checkContractsExists';
import setQuorumAndShareInput from '../Common/setQuorum&SharesInput';
import unsetQuorumAndShareInput from '../Common/unsetQuorum&ShareInput';
import getMasterData from '../Common/getMasterData';

const drawerWidth = 240;

const customTypes = {
  "Address": "MultiAddress",
  "LookupSource": "MultiAddress"
  // "SongName": "Vec<u8>",
  // "ArtistName": "Vec<u8>",
  // "Composer": "Vec<u8>",
  // "Lyricist": "Vec<u8>",
  // "YOR": "Vec<u8>",
  // "TestData": {
  //   "name": "SongName",
  //   "artist": "ArtistName",
  //   "composer": "Composer",
  //   "lyricist": "Lyricist",
  //   "year": "YOR"
  // },
  // "SrcId": "Vec<u8>",
  // "SongId": "Vec<u8>",
  // "MusicData": {
  //   "src_id": "SrcId",
  //   "owner": "AccountId",
  //   "song_id": "SongId",
  //   "props": "Option<Vec<TestData>>",
  //   "registered": "Moment"
  // }
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
    <Typography variant="body2" color="textSecondary" align="center">
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

const steps = ['Upload MP3 or WAV', 'Information', 'DDEX', 'Review & Submit'];

const getStepContent = (
  step,
  formikVal,
  nodeFormikVal,
  onCheckInvalid,
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
    case 3:
      return <ReviewAndSubmit />;
    default:
      throw new Error('Unknown step');
  }
};

const SimpleMode = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectAddresses, setSelectAddresses] = useState([]);
  const [addressValues, setAddressValues] = useState({
    address: '',
    name: 'wallet-addresses'
  });
  const [modeValues, setModeValues] = useState({
    mode: '',
    name: 'input-mode'
  });
  const [apiState, setApiState] = useState(null);
  const [keyringAccount, setKeyringAccount] = useState(null);
  const [nodeApi, setNodeApi] = useState(null);
  const [checkInvalid, setCheckInvalid] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [pageLoadingText, setPageLoadingText] = useState(null)
  const [localCurrCrmId, setLocalCurrCrmId] = useState(150)
  const [existingOcIds, setExistingOcIds] = useState([])
  const timeoutRef = useRef(null)

  const notify = (msg) => {
    toast(`🦄 ${msg}`);
  };

  async function callRegisterMusic(crmNewContract) {
    console.log('crm New Contract', crmNewContract);
    if (addressValues && keyringAccount && nodeApi && crmNewContract) {
      notify('Saving form data to the node')
      // Create a extrinsic, register music
      // console.log('keyring account', keyringAccount);
      const krpair = keyring.getPair(keyringAccount.address);
      console.log('reg krpair', krpair);
      keyring.getAddresses().forEach(kra => {
        // console.log('get address', kra);
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
        console.log('is injected', isInjected);
        const injected = await web3FromSource(source);
        fromAcct = address;
        nodeApi.setSigner(injected.signer);
      } else {
        fromAcct = krpair;
      }

      // const nodeCrmIDs = await nodeApi.query.crm.crmData(null);

      // console.log('crm data ', nodeCrmIDs);

      // ipfs hash needs to be saved somewhere
      // const transfer = nodeApi.tx.rightsMgmtPortal
      //   .registerMusic(
      //     stringToHex('polkaMusic38'),
      //     stringToHex('polkaMusic38'),
      //     fromAcct,
      //     null
      //   );

      // check local crm id, while not empty get random
      // else break, proceed
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

      console.log('loc curr crm id loop', fromAcct);


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

      });

    }
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
    }

  }, []);

  // connecting to the node
  useEffect(() => {
    // call once should be redux state
    console.log('api State', apiState);
    if (apiState) return;

    async function callConnectToNode() {
      // Initialise the provider to connect to the local node
      // const provider = new WsProvider('ws://127.0.0.1:9944'); // change if prod/staging
      const provider = new WsProvider('wss://testnet.polkamusic.io'); // change if prod/staging

      // Create the API and wait until ready
      const api = await ApiPromise.create({
        provider,
        types: customTypes,
      })

      // Retrieve the chain & node information information via rpc calls
      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ]);

      console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

      setNodeApi(api);
    }

    callConnectToNode()
      .catch(console.error)
      .finally(() => setApiState("READY"));
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
      console.log('we got the keyring acct value', krVal);
      setKeyringAccount(krVal);
    }
  }, [addressValues]);

  // init localstorage for crm id, temporary
  useEffect(() => {
    let lsCurrCrmid = localStorage.getItem("currCrmId");
    console.log('local curr crm id', lsCurrCrmid);
    if (lsCurrCrmid) {
      let parsedLsCurrCrmid = parseInt(lsCurrCrmid)
      setLocalCurrCrmId(parsedLsCurrCrmid)
    } else {
      // get random id 
      const randId = getRandomFromRange(170, 3000)
      localStorage.setItem("currCrmId", randId);
    }
  }, [])


  // ddex ipfs formik
  const formik = useFormik({
    initialValues: ddexInitVal,
    enableReinitialize: true,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));

      var size = Object.keys(values.releaseInfo).length;
      console.log('size', size);
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
      console.log('ddex rows', ddexRowData);
      const csvfile = dataToCsvFile(ddexRowData, localCurrCrmId);
      // ipfs other values conversions
      const newMasterValues = JSON.parse(JSON.stringify(nodeFormik.values.masterValues.master))
      const newCompositionValues = JSON.parse(JSON.stringify(nodeFormik.values.compositionValues.composition))
      newMasterValues.splice(0, 1); // remove first
      newCompositionValues.splice(0, 1); // remove first
      // nodeFormik.values.otherContractValues.otherContracts?.splice(0,1) ; // remove first
      // parse percentages
      nodeFormik.values.masterValues.master.forEach(m => {
        m['percentage'] = parseInt(m.percentage)
      })
      nodeFormik.values.compositionValues.composition.forEach(c => {
        c['percentage'] = parseInt(c.percentage)
      })
      nodeFormik.values.otherContractsValues.otherContracts.forEach(oc => {
        oc['percentage'] = parseInt(oc.percentage)
      })
      for (const [key, value] of Object.entries(nodeFormik.values.ipfsOtherValues)) {
        // console.log(`${key}: ${value}`);
        nodeFormik.values.ipfsOtherValues[key] = parseInt(value)
      }

      // filter other contract ids to submit
      // let newOtherContractsValues = []
      // if (existingOcIds.length > 0) {
      //   nodeFormik.values.otherContractsValues.otherContracts.forEach(oc => {
      //     if (existingOcIds.includes(oc.id?.toString())) {
      //       newOtherContractsValues.push(oc)
      //     }
      //   })
      // }
      // console.log('newOtherContractsValues', newOtherContractsValues);
      // nodeFormik.values.otherContractsValues['otherContracts'] = newOtherContractsValues
      // // send artwork , mp3 to ipfs, send data to node
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
      // sendCsvFileToIpfs(csvfile, notify, callRegisterMusic);
      sendCrmFilesToIpfs(filesTosend, notify, callRegisterMusic)
    }
  });

  // node extrinsic formik
  const nodeFormik = useFormik({
    initialValues: nodeInitVal,
    enableReinitialize: true,
    onSubmit: values => { console.log('node formik values', values) }
  })

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
      // setSubmitting
      // nodeFormik.handleSubmit(e)
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
    // console.log('invalid stat', status);
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
  }

  const handleAddMasterData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      masterValues: {
        master: [...nodeFormik.values.masterValues.master, { nickname: '', account: '', percentage: '' }]
      }
    })
  }

  const handleDeleteCompositionData = (element, idx) => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      compositionValues: {
        composition: nodeFormik.values.compositionValues?.composition?.filter((el, i) => i !== idx)
      }
    })
  }

  const handleAddCompositionData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      compositionValues: {
        composition: [...nodeFormik.values.compositionValues.composition, { nickname: '', account: '', percentage: '' }]
      }
    })
  }

  const handleDeleteOtherContractsData = (element, idx) => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      otherContractsValues: {
        otherContracts: nodeFormik.values.otherContractsValues?.otherContracts?.filter((el, i) => i !== idx)
      }
    })
  }

  const handleAddOtherContractsData = () => {
    nodeFormik.setValues({
      ...nodeFormik.values,
      otherContractsValues: {
        otherContracts: [...nodeFormik.values.otherContractsValues.otherContracts, { nickname: '', account: '', percentage: '' }]
      }
    })
  }

  const theme = useTheme();

  return (
    <React.Fragment>
      <LoadingOverlay
        active={pageLoading}
        spinner
        text={pageLoadingText}
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
          className={classes.appBar}
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Typography className={classes.title} component="h6" noWrap>POLKA<span style={{ color: '#f50057' }}><b>MUSIC</b></span></Typography>
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
          <Paper className={classes.paper}>
            <Typography color="secondary" component="h1" variant="h4" align="center">
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
                    Your form is submitted. If there's no error, We will send your info to our ipfs and node servers,
                    and will send you an update when your info has been verified.
                </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
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
                      // color="secondary"
                      onClick={handleNext}
                      className={classes.gradientButton}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>

        <Drawer
          className={classes.drawer}
          // variant="persistent"
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
            text={pageLoadingText}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(0, 0, 0, 0.08)",
              }),
            }}
          >
            <Box p={1}>
              {/* Select Wallet */}
              {/* props, inputPropsId, inputPropsName, inputLabel, value, onChange, children
 */}
              <SimlpeSelect
                inputPropsId="wallet-addresses-simple"
                inputPropsName="wallet-addresses"
                inputLabel="Select a Wallet"
                value={addressValues['wallet-addresses'] ?? ''}
                onChange={handleWalletChange}
              >
                {
                  selectAddresses.length > 0 && selectAddresses.map(selectAddress => (
                    <MenuItem value={selectAddress.addressValue}>{selectAddress.addressDisplay}</MenuItem>
                  ))
                }
              </SimlpeSelect>
            </Box>

            {/* Select Mode */}
            <Box pt={4}>
              <Box p={1}>
                <SimlpeSelect
                  inputPropsId="input-mode-simple"
                  inputPropsName="input-mode"
                  inputLabel="Select a Mode"
                  value={modeValues['input-mode'] ?? ''}
                  onChange={handleModeChange}
                >
                  <MenuItem value="advance">Advance Mode</MenuItem>
                  <MenuItem value="simple">Simple Mode</MenuItem>
                </SimlpeSelect>
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

                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    timeoutRef.current = setTimeout(() => {
                      console.log('query crm id', e.target.value);

                      handlePageLoading(true)
                      // crm data
                      checkContractsExists(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          // setOtherContractsIDResults(res)

                          if (response === null) {
                            // setOtherContractIdInputColor('secondary')
                            // if (props.notify)
                            notify(`Contract ID ${e.target.value} does'nt exist, Please enter a valid contract ID`)
                            nodeFormik.setFieldValue('ipfsMp3WavFileUrl', null)
                            nodeFormik.setFieldValue('ipfsArtworkFileUrl', null)
                            unsetQuorumAndShareInput(nodeFormik)

                            // unset csv or ipfs hash
                            nodeFormik.setFieldValue('ipfsCsvHash', null)

                          } else {
                            // setOtherContractIdInputColor('primary')
                            // Load and populate, inputs and file containers
                            notify(`Loading contract with ID: ${e.target.value}`)
                            console.log('crm data response', response)
                            // set data to nodeFormik
                            nodeFormik.setFieldValue(
                              'ipfsMp3WavFileUrl',
                              `https://gateway.pinata.cloud/ipfs/${response.ipfshashprivate[1]?.mp3WavHash}`);
                            nodeFormik.setFieldValue(
                              'ipfsArtworkFileUrl',
                              `https://gateway.pinata.cloud/ipfs/${response.ipfshashprivate[0]?.artworkHash}`)

                            setQuorumAndShareInput(nodeFormik, response)

                            // set csv or ipfs hash
                            nodeFormik.setFieldValue('ipfsCsvHash', response.ipfshash)

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
                            nodeFormik.setFieldValue('masterValues.master', [])

                          } else {
                            console.log('master data response', response);
                            nodeFormik.setFieldValue('masterValues.master', response.master)
                          }

                        }
                      ).then(() => handlePageLoading(false)).catch(console.error);

                      // composition share data

                      // other contracts share data

                      // csv/ ddex form data


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
