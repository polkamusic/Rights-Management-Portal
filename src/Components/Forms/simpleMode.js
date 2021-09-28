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
import ErrorLogo from '../Layout/errorLogo';
import SuccessLogo from '../Layout/successLogo';
import InfoLogo from '../Layout/infoLogo';
import WarningLogo from '../Layout/warningLogo';

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
  Typography,
  CircularProgress,
  Grid,
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
import { toast, ToastContainer as SingleToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import LoadingOverlay from "react-loading-overlay";
import Contracts from '../Views/contracts';
import 'react-toastify/dist/ReactToastify.css';
import ReviewAndSubmit from '../Views/reviewAndSubmit';

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

const newContractLink = (hash) => (
  <React.Fragment>
    <a
      href={`https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftestnet.polkamusic.io#/explorer/query/${hash}`}
      target="_blank"
      rel="noreferrer noopener"
      style={{ textDecoration: 'none', color: '#F50057' }}
    >
      here
    </a>
  </React.Fragment>
)

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
  contractsLayout: {
    width: 'auto',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1400 + theme.spacing(3) * 3)]: {
      width: 1400,
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
    // return <ReviewAndSubmit />
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
  // const [modeValues, setModeValues] = useState({
  //   mode: '',
  //   name: 'input-mode'
  // })
  const [nodeValue, setNodeValue] = useState('testnet')
  const [keyringAccount, setKeyringAccount] = useState(null)
  const [nodeApi, setNodeApi] = useState(null);

  const [checkInvalid, setCheckInvalid] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  // const [pageLoadingText, setPageLoadingText] = useState(null)
  const [localCurrCrmId, setLocalCurrCrmId] = useState(150)
  const [existingOcIds, setExistingOcIds] = useState([])
  const timeoutRef = useRef(null)
  const acctTimeoutRef = useRef(null)
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

  // temp page routes
  const [proposalsPage, setProposalsPage] = useState(false)
  const [contractsPage, setContractsPage] = useState(false)

  // hex account
  const [hexAcctFormat, setHexAcctFormat] = useState(null)

  // api connection error
  // const [connectionError, setConnectionError] = useState(false)

  // contract info or files and data to send
  const [contractInfo, setContractInfo] = useState(null)

  // update data by area e.g. updateArea = 'master'
  const [updateData, setUpdateData] = useState(null)

  const notify = (msg, type = "default") => {

    // toast(<PolkamusicLogo msg={msg} />)
    switch (type) {
      case 'error':
        toast.error(<ErrorLogo text={msg} />)
        break;

      case 'success':
        toast.success(<SuccessLogo text={msg} />)
        break;

      case 'warning':
        toast.warning(<WarningLogo text={msg} />)
        break;

      default:
        toast(<InfoLogo text={msg} />)
        break;
    }
  };

  // new contract function
  async function callRegisterMusic(crmNewContract) {

    if (!nodeApi) {
      notify('Chain api is missing, Please check if the chain is connected', 'error')
      return
    }

    if (!addressValues || !keyringAccount) {
      notify('Account info is missing, Please check if your wallet is connected', 'error')
      return
    }

    if (!crmNewContract) {
      notify('New contract data is missing, Please check that you have completed the form', 'error')
      return
    }

    // copy ipfs hash private data
    const ipfshashprivateCopy = JSON.parse(JSON.stringify(crmNewContract.crmData.ipfshashprivate));
    // console.log('ipfs hash private copy', ipfshashprivateCopy);

    notify('Saving form data to the node')

    const krpair = keyring.getPair(keyringAccount.address);

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
      crmNewContract.crmData['othercontractsquorum'] = 51
      crmNewContract.crmData['othercontractsshare'] = 0

    }

    // transfer hashes to main ipfshashprivate field
    crmNewContract.crmData['ipfshashprivate'] = `${ipfshashprivateCopy[0].artworkHash},${ipfshashprivateCopy[1].mp3WavHash}`

    crmNewContract.crmMaster.master.forEach(m => m['account'] = m.account?.trim())

    crmNewContract.crmComposition.composition.forEach(c => c['account'] = c.account?.trim())

    console.log('Crm new contract', JSON.stringify(crmNewContract, null, 2))

    const transfer = nodeApi.tx.crm.newContract(
      parseInt(locCurrCrmId), // crm id, need to get a good soln
      JSON.stringify(crmNewContract.crmData), // crm data, ipfs hashes, etc
      JSON.stringify(crmNewContract.crmMaster), // master share data
      JSON.stringify(crmNewContract.crmComposition), // composition share data
      JSON.stringify(crmNewContract.crmOtherContracts) // other contracts data
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

            console.log(`${section}.${method}: ${documentation.join(' ')}`);
          } else {
            // Other, CannotLookup, BadOrigin, no extra info
            notify(error.toString(), 'error');
          }
        });

      // success
      events.filter(({ event }) =>
        nodeApi.events.system.ExtrinsicSuccess.is(event)
      ).forEach(({ event: { data: [info] } }) => {
        if (info) {
          notify('Registered music success!', 'success');
          // increment local state/storage curr crm id, rand temp
          const randInc = Math.floor(Math.random() * 10) + 1;
          const crmIdPlusRandom = randInc + locCurrCrmId
          setLocalCurrCrmId(crmIdPlusRandom)
          localStorage.setItem("currCrmId", crmIdPlusRandom)
        }
      });

      // status
      if (status && status.isFinalized) {
        // console.log('Transacation status', status)
        console.log(`Transaction finalized at blockHash ${JSON.stringify(status.asFinalized)}`);
        setNewContractHash(`${status?.asFinalized || ''}`)
        // transfer();
      }

    });

  }

  // connect wallet
  useEffect(() => {
    // get accounts where meta data field has source
    // meta: { source: data }, indicates account from a wallet address
    const walletAccounts = process.env.NODE_ENV === 'development' ? props.keyringAccts : props.keyringAccts.filter(
      krAcct => !!krAcct.meta.source);

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
      notify('Account is missing, Please check if your wallet is connected', 'error')

    }

  }, [props?.keyringAccts]);

  // connect node
  useEffect(() => {

    setNodeApi(null)

    async function callConnectToNode(wsProvider) {


      const provider = new WsProvider(wsProvider)

      // Create the API and wait until ready
      const api = new ApiPromise({
        provider,
        types: customTypes,
      })

      api.on('error', function (e) {
        console.log(`An error occured while connecting to the ${nodeValue} node, ${e.target.url}`, 'error')
        provider.unsubscribe()
        provider.disconnect()
        // console.log('has-sub:', provider.hasSubscriptions);

      })

      await api.isReadyOrError.then(r => {
        console.log('api-roerr:', r)
      })

      setNodeApi(api)

      if (api.isConnected) {
        notify(`You are connected to the ${nodeValue} node, ${wsProvider}`, 'success')
      }
    }

    let wsProviderUrl = 'wss://testnet.polkamusic.io'

    if (nodeValue && nodeValue === 'local') {
      wsProviderUrl = 'ws://127.0.0.1:9944'
    }

    if (nodeValue && nodeValue === 'testnet') {
      wsProviderUrl = 'wss://testnet.polkamusic.io'
    }

    callConnectToNode(wsProviderUrl)
      .catch(err => {
        console.log('err-cctn:', err);
        notify(`An error occured while connecting to the node ${err.target.url}`, 'error');
      })


  }, [nodeValue]);

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
        notify,
        (data) => setUpdateData(data)
      )

      updateCrmdata.then((updated) => {

        updated ? timeOutSec = 8000 : timeOutSec = 1000

        setTimeout(() => {

          const updateMasterdata = updateMasterData(changeId, capturedContract['capturedMasterData'], nodeFormik.values.masterValues.master, nodeApi,
            addressValues, keyringAccount, notify, (updateData) => setUpdateData(updateData))

          updateMasterdata.then((updated) => {

            updated ? timeOutSec = 8000 : timeOutSec = 1000

            setTimeout(() => {
              const updateCompositiondata = updateCompositionData(changeId, capturedContract['capturedCompositionData'], nodeFormik.values.compositionValues.composition, nodeApi,
                addressValues, keyringAccount, notify, (data) => setUpdateData(data))

              updateCompositiondata.then((updated) => {

                updated ? timeOutSec = 8000 : timeOutSec = 1000

                setTimeout(() => {

                  const updateOtherContractsdata = updateOtherContractsData(changeId, capturedContract['capturedOtherContractsData'], nodeFormik.values.otherContractsValues.otherContracts, nodeApi,
                    addressValues, keyringAccount, notify, (data) => setUpdateData(data))

                  updateOtherContractsdata.then((updated) => {
                    updated ? timeOutSec = 8000 : timeOutSec = 1000

                    setTimeout(() => {
                      setPageLoading(false)
                    }, timeOutSec)
                  })

                }, timeOutSec)

              })
            }, timeOutSec);

          })

        }, timeOutSec);

      })

      // no change id, shoudl be new contract 
      if (!changeId) {
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

        // for submit contract info
        console.log('csv file:', typeof csvfile);
        const filesTosendCopy = JSON.parse(JSON.stringify(filesTosend))
        filesTosendCopy['artworkFile'] = nodeFormik.values?.ipfsArtworkFile?.name || '';
        filesTosendCopy['csvFile'] = csvfile?.name || ''

        setContractInfo(filesTosendCopy)

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
    // check mp3 or wav upload page
    if (activeStep === 0) {
      if (nodeFormik.values && !nodeFormik.values.ipfsMp3WavFile && !changeId) {
        notify('Missing an mp3 or wav file, Please upload an mp3 or wav file', 'error')
        e.preventDefault()
        return
      }
    }

    // check validations on step, information page
    if (activeStep === 1) {

      if (nodeFormik.values && !nodeFormik.values.ipfsArtworkFile && !changeId) {
        notify('Missing an artwork file, Please upload a jpg or png file for the artwork', 'error')
        e.preventDefault()
        return
      }


      if (checkInvalid) {
        notify("Invalid input detected, Please check the form.", 'error')
        e.preventDefault()
        return
      }

    }

    setActiveStep(activeStep + 1);

    // handle submit page
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
  // const handleModeChange = (event) => {
  //   setModeValues(oldValues => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //   }));
  // }

  // for input node selection
  const handleNodeChange = (event) => {
    setNodeValue(event.target.value);
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
        text="Loading.."
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
          color="inherit"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          {/* need react router.. */}
          <Toolbar>
            <Box
              mr={0.5}
              onClick={() => {
                setProposalsPage(false)
                setContractsPage(false)
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
                setContractsPage(false)
                setActiveStep(0)
              }}
              style={{ cursor: "pointer" }}
              noWrap
            >
              POLKA<span style={{ color: '#f50057' }}><b>MUSIC</b></span>
            </Typography>


            <Box mr={2} onClick={() => {
              if (open) setOpen(false)
              else setOpen(true)
            }} style={{ cursor: "pointer" }}>
              <Typography className={classes.title} variant="h6" color="secondary" noWrap>
                Public Key
              </Typography>
            </Box>

            <Box mr={2} onClick={() => {
              setContractsPage(!contractsPage)
              setProposalsPage(false)
            }} style={{ cursor: "pointer" }}>
              <Typography className={classes.title} variant="h6" color="secondary" noWrap>
                My Contracts
              </Typography>
            </Box>

            <Box mr={2} onClick={() => {
              setProposalsPage(!proposalsPage)
              setContractsPage(false)
            }} style={{ cursor: "pointer" }}>
              <Typography className={classes.title} variant="h6" color="secondary" noWrap>
                My Proposals
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
        <main className={contractsPage || proposalsPage ? classes.contractsLayout : classes.layout}>

          {
            contractsPage &&
            (<Paper className={classes.paper}>
              <Typography align="left">
                <Button
                  variant="contained"
                  onClick={() => setContractsPage(false)}
                  className={classes.gradientButton}
                >
                  MAIN
                </Button>
              </Typography>


              <Typography color="secondary" variant="h4" align="center">
                CONTRACTS
              </Typography>

              <Box mt={6}>
                <Contracts
                  hexAcct={hexAcctFormat}
                  onContractEdit={(e, id) => {
                    // close contracts or proposals pages
                    setContractsPage(false)
                    setProposalsPage(false)

                    nodeFormik.setFieldValue('queryCrmData', id)

                    if (!id) return

                    console.log('id:', id);
                    // change id here is contract
                    setChangeId(parseInt(id))

                    // if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    // timeoutRef.current = setTimeout(() => {
                    // console.log('query crm id', id);

                    handlePageLoading(true)
                    // get crm data
                    checkContractsExists(
                      id,
                      nodeApi,
                      (response) => {
                        if (response === null) {

                          notify(`Contract ID ${id} does'nt exist, Please enter a valid contract ID`, 'error')
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
                          notify(`Contract with ID: ${id} retrieved`, 'success')
                          // console.log('crm data response', response)
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
                      id,
                      nodeApi,
                      (response) => {
                        if (response === null) {
                          notify(`Master data ID ${id} does'nt exist, Please enter a valid master data ID`, 'error')
                          nodeFormik.setFieldValue('masterValues.master', [{ nickname: '', account: '', percentage: '' }])

                          // unset captured crm data
                          let capturedData = capturedContract
                          capturedData['capturedMasterData'] = null
                          setCapturedContract(capturedData)

                        } else {
                          // console.log('master data response', response);
                          nodeFormik.setFieldValue('masterValues.master', response.master)

                          let capturedData = capturedContract
                          capturedData['capturedMasterData'] = response.master
                          setCapturedContract(capturedData)
                        }

                      }
                    ).then(() => handlePageLoading(false)).catch(console.error);

                    // composition share data
                    getCompositionData(
                      id,
                      nodeApi,
                      (response) => {
                        if (response === null) {
                          notify(`Composition data ID ${id} does'nt exist, Please enter a valid master data ID`, 'error')
                          nodeFormik.setFieldValue('compositionValues.composition', [{ nickname: '', account: '', percentage: '' }])
                          // unset captured crm data
                          let capturedData = capturedContract
                          capturedData['capturedCompositionData'] = null
                          setCapturedContract(capturedData)
                        } else {
                          // console.log('composition data response', response);
                          nodeFormik.setFieldValue('compositionValues.composition', response.composition)
                          let capturedData = capturedContract
                          capturedData['capturedCompositionData'] = response.composition
                          setCapturedContract(capturedData)
                        }

                      }
                    ).then(() => handlePageLoading(false)).catch(console.error);

                    // other contracts share data
                    getOtherContractData(
                      id,
                      nodeApi,
                      (response) => {
                        if (response === null) {
                          notify(`Other contract data ID ${id} does'nt exist, Please enter a valid master data ID`, 'error')
                          nodeFormik.setFieldValue('otherContractsValues.otherContracts', [{ id: '', percentage: '' }])
                          // unset captured crm data
                          let capturedData = capturedContract
                          capturedData['capturedOtherContractsData'] = null

                          setCapturedContract(capturedData)
                        } else {
                          // console.log('other contracts response sempty?', isEmpty(response));
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

                    // }, 1000)

                  }}
                  notify={notify}
                />
              </Box>

            </Paper>)

          }

          {
            proposalsPage &&
            (<Paper className={classes.paper}>
              <Typography align="left">
                <Button
                  variant="contained"
                  onClick={() => setProposalsPage(false)}
                  className={classes.gradientButton}
                >
                  MAIN
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

            </Paper>)

          }

          {/* Main Page */}
          {
            !proposalsPage && !contractsPage &&
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

                    {/* For new contract */}
                    {
                      changeId ? '' :

                        !newContractHash ?
                          <CircularProgress /> :
                          (
                            <>
                              <Typography variant="h4" gutterBottom>
                                Thank you for submitting the details.
                              </Typography>

                              <Typography variant="h5">
                                Here's the contract id

                                <span style={{ color: '#f50057', fontWeight: 'bold' }}>
                                  {" "}
                                  {newContractId}
                                  {" "}
                                </span>
                              </Typography>

                              <Box pt={8}>{""}
                              </Box>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={12}>
                                  <Box pb={1}>
                                    <Typography variant="h5">
                                      Contract info
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Artwork file
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">
                                    {contractInfo?.artworkFile || ''}
                                  </Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Mp3 or wav file
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.mp3WavFile?.path || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Csv file
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.csvFile || ''}</Typography>
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                  <Box pb={1} pt={1}>
                                    {""}
                                  </Box>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Master Share
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.mastershare || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Master Quorum
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.masterquorum || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Composition Share
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1"> {contractInfo?.ipfsOtherValues?.compositionshare || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Composition Quorum
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.compositionquorum || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Other Contracts Share
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.othercontractsshare || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Other Contracts Quorum
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.othercontractsquorum || ''}</Typography>
                                </Grid>

                                <Grid item xs={3} sm={3}>
                                  <Typography variant="subtitle2">
                                    Global Quorum
                                  </Typography>
                                </Grid>
                                <Grid item xs={9} sm={9}>
                                  <Typography variant="subtitle1">{contractInfo?.ipfsOtherValues?.globalquorum || ''}</Typography>
                                </Grid>


                                <Grid item xs={12} sm={12}>
                                  <Box pb={1} pt={4}>
                                    <Typography variant="h5">
                                      Master Data
                                    </Typography>
                                  </Box>
                                </Grid>

                                {contractInfo?.crmMaster?.master?.length > 0 &&
                                  contractInfo.crmMaster.master.map(row => {
                                    return (
                                      <>
                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Nickname
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="subtitle1">{row?.nickname || ''}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Account
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="body2">{row?.account || ''}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Percentage
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
                                        </Grid>
                                      </>)
                                  })
                                }


                                <Grid item xs={12} sm={12}>
                                  <Box pb={1} pt={4}>
                                    <Typography variant="h5">
                                      Composition Data
                                    </Typography>
                                  </Box>
                                </Grid>

                                {contractInfo?.crmComposition?.composition?.length > 0 &&
                                  contractInfo.crmComposition.composition.map(row => {
                                    return (
                                      <>
                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Nickname
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="subtitle1">{row?.nickname || ''}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Account
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="body2">{row?.account || ''}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Percentage
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
                                        </Grid>
                                      </>)
                                  })
                                }


                                <Grid item xs={12} sm={12}>
                                  <Box pb={1} pt={4}>
                                    <Typography variant="h5">
                                      Other Contracts Data
                                    </Typography>
                                  </Box>
                                </Grid>

                                {contractInfo?.crmOtherContracts?.OtherContracts?.length > 0 &&
                                  contractInfo.crmOtherContracts.OtherContracts.map(row => {
                                    return (
                                      <>
                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            ID
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="subtitle1">{row?.id || ''}</Typography>
                                        </Grid>

                                        <Grid item xs={3} sm={3}>
                                          <Typography variant="subtitle2">
                                            Percentage
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={9} sm={9}>
                                          <Typography variant="body2">{row?.percentage || ''}</Typography>
                                        </Grid>

                                      </>)
                                  })
                                }


                                <Grid item xs={12} sm={12}>
                                  <Box pb={1} pt={1}>
                                    {""}
                                  </Box>
                                </Grid>

                                <Grid item xs={112} sm={12}>
                                  <Typography variant="subtitle1">
                                    Checkout the transaction

                                    <span style={{ color: '#f50057' }}>
                                      {" "}
                                      {newContractLink(newContractHash?.toString())}
                                      {" "}
                                    </span>
                                  </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                  <Typography variant="subtitle1">
                                    View your contracts

                                    <span style={{ color: '#f50057', cursor: 'pointer' }} onClick={() => {
                                      setProposalsPage(false)
                                      setContractsPage(true)
                                    }}>
                                      {" "}
                                      here
                                      {" "}
                                    </span>
                                  </Typography>
                                </Grid>
                              </Grid>

                              {/* reset form */}
                            </>
                          )
                    }


                    {/* For updated contract */}
                    {
                      !changeId ? '' :

                        !updateData ?
                          <CircularProgress /> :
                          (
                            <>
                              <Typography variant="h4" gutterBottom>
                                Thank you for updating your contract.
                              </Typography>

                              <Typography variant="h5">
                                Here's the contract id

                                <span style={{ color: '#f50057' }}>
                                  {" "}
                                  {changeId}
                                  {" "}
                                </span>
                              </Typography>

                              <Box pt={4}>
                              </Box>
                              <Grid container spacing={1}>
                                {console.log('update data in render:', JSON.stringify(updateData, null, 2))}

                                {
                                  updateData && updateData.updateArea === 'crm' ? (<>
                                    <Grid item xs={12} sm={12}>
                                      <Box pb={1}>
                                        <Typography variant="h5">
                                          Crm data changes proposal
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Change ID
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.changeId || ''}
                                      </Typography>
                                    </Grid>

                                    {/* crm data update data */}
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        IPFS Hash
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.ipfshash || ''}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        IPFS Hash (artwork)
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.ipfshashprivate?.split(',')[0] || ''}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        IPFS Hash (audio)
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.ipfshashprivate?.split(',')[1] || ''}
                                      </Typography>
                                    </Grid>

                                    <Box pt={2}>{" "}</Box>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Master share
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.mastershare || ''}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Master Quorum
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.masterquorum || ''}
                                      </Typography>
                                    </Grid>
                                 
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Composition share
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.compositionshare || ''}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Composition Quorum
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.compositionquorum || ''}
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Other Contracts share
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.othercontractsshare || ''}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Other Contracts Quorum
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.othercontractsquorum || ''}
                                      </Typography>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Global Quorum
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Typography variant="subtitle1">
                                        {updateData?.crmUpdateData?.globalquorum || ''}
                                      </Typography>
                                    </Grid>

                                  </>) : ''
                                }


                                {
                                  updateData && updateData.updateArea === 'master' ? (<>

                                    <Grid item xs={12} sm={12}>
                                      <Box pb={1} pt={1}>
                                        <Typography variant="h5">
                                          Master data changes proposal
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Change ID
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Box pb={4}>
                                        <Typography variant="subtitle1">
                                          {updateData?.changeId || ''}
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    {/* master accounts update data */}
                                    {
                                      (updateData.masterUpdateData && updateData.masterUpdateData.master.length > 0) && (
                                        <>
                                          <Grid item xs={1} sm={1}>
                                            <Typography variant="subtitle2">
                                              No.
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={1} sm={1}>
                                            <Typography noWrap variant="subtitle2">
                                              Name
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={9} sm={9}>
                                            <Typography noWrap variant="subtitle2">
                                              Account
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={1} sm={1}>
                                            <Typography variant="subtitle2">
                                              Percent
                                            </Typography>
                                          </Grid>

                                        </>
                                      )
                                    }
                                    {
                                      (updateData.masterUpdateData && updateData.masterUpdateData.master.length > 0) &&
                                      updateData.masterUpdateData.master.map((row, idx) => {

                                        return (
                                          <>
                                            <Grid item xs={1} sm={1}>
                                              <Typography variant="subtitle1">{idx + 1}</Typography>
                                            </Grid>

                                            <Grid item xs={1} sm={1}>
                                              <Typography noWrap variant="subtitle1">{row?.nickname || ''}</Typography>
                                            </Grid>

                                            <Grid item xs={9} sm={9}>
                                              <Typography noWrap variant="body2">{row?.account || ''}</Typography>
                                            </Grid>

                                            <Grid item xs={1} sm={1}>
                                              <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
                                            </Grid>
                                          </>)

                                      })
                                    }

                                  </>) : ''
                                }


                                {
                                  updateData && updateData.updateArea === 'composition' ? (<>

                                    <Grid item xs={12} sm={12}>
                                      <Box pb={1} pt={1}>
                                        <Typography variant="h5">
                                          Composition data changes proposal
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Change ID
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Box pb={4}>
                                        <Typography variant="subtitle1">
                                          {updateData?.changeId || ''}
                                        </Typography>
                                      </Box>
                                    </Grid>


                                    {/* composition accounts update data */}
                                    {
                                      (updateData.compositionUpdateData && updateData.compositionUpdateData.composition.length > 0) && (
                                        <>
                                          <Grid item xs={1} sm={1}>
                                            <Typography variant="subtitle2">
                                              No.
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={1} sm={1}>
                                            <Typography noWrap variant="subtitle2">
                                              Name
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={9} sm={9}>
                                            <Typography noWrap variant="subtitle2">
                                              Account
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={1} sm={1}>
                                            <Typography variant="subtitle2">
                                              Percent
                                            </Typography>
                                          </Grid>

                                        </>
                                      )
                                    }
                                    {
                                      (updateData.compositionUpdateData && updateData.compositionUpdateData.composition.length > 0) &&
                                      updateData.compositionUpdateData.composition.map((row, idx) => {

                                        return (
                                          <>
                                            <Grid item xs={1} sm={1}>
                                              <Typography variant="subtitle1">{idx + 1}</Typography>
                                            </Grid>

                                            <Grid item xs={1} sm={1}>
                                              <Typography noWrap variant="subtitle1">{row?.nickname || ''}</Typography>
                                            </Grid>

                                            <Grid item xs={9} sm={9}>
                                              <Typography noWrap variant="body2">{row?.account || ''}</Typography>
                                            </Grid>

                                            <Grid item xs={1} sm={1}>
                                              <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
                                            </Grid>
                                          </>)

                                      })
                                    }

                                  </>) : ''
                                }


                                {
                                  updateData && updateData.updateArea === 'otherContracts' ? (<>

                                    <Grid item xs={12} sm={12}>
                                      <Box pb={1} pt={1}>
                                        <Typography variant="h5">
                                          Other contracts data changes proposal
                                        </Typography>
                                      </Box>
                                    </Grid>

                                    <Grid item xs={3} sm={3}>
                                      <Typography variant="subtitle2">
                                        Change ID
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={9} sm={9}>
                                      <Box pb={4}>
                                        <Typography variant="subtitle1">
                                          {updateData?.changeId || ''}
                                        </Typography>
                                      </Box>
                                    </Grid>


                                    {/* other contracts update data */}
                                    {
                                      (updateData.otherContractsUpdateData && updateData.otherContractsUpdateData.othercontracts.length > 0) && (
                                        <>
                                          <Grid item xs={2} sm={2}>
                                            <Typography variant="subtitle2">
                                              No.
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={5} sm={5}>
                                            <Typography noWrap variant="subtitle2">
                                              ID
                                            </Typography>
                                          </Grid>

                                          <Grid item xs={5} sm={5}>
                                            <Typography variant="subtitle2">
                                              Percent
                                            </Typography>
                                          </Grid>

                                        </>
                                      )
                                    }
                                    {
                                      (updateData.otherContractsUpdateData && updateData.otherContractsUpdateData.othercontracts.length > 0) &&
                                      updateData.otherContractsUpdateData.othercontracts.map((row, idx) => {

                                        return (
                                          <>
                                            <Grid item xs={2} sm={2}>
                                              <Typography variant="subtitle1">{idx + 1}</Typography>
                                            </Grid>

                                            <Grid item xs={5} sm={5}>
                                              <Typography noWrap variant="subtitle1">{row?.id || ''}</Typography>
                                            </Grid>

                                            <Grid item xs={5} sm={5}>
                                              <Typography variant="subtitle1">{row?.percentage || ''}</Typography>
                                            </Grid>
                                          </>)

                                      })
                                    }

                                  </>) : ''
                                }

                              </Grid>

                            </>
                          )

                    }

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
            text="Loading.."
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

            {/* Select Node */}
            <Box pt={4}>
              <Box p={1}>
                <SimpleSelect
                  inputPropsId="input-node-simple"
                  inputPropsName="input-node"
                  inputLabel="Select Node"
                  value={nodeValue}
                  onChange={handleNodeChange}
                >
                  <MenuItem value="local">Local</MenuItem>
                  <MenuItem value="testnet">Testnet</MenuItem>
                  {/* <MenuItem value="mainnet">Mainnet</MenuItem> */}
                </SimpleSelect>
              </Box>
            </Box>

            {/* Select Mode */}
            {/* <Box pt={4}>
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
            </Box> */}

            {/* Query CRM */}
            <Box pt={4}>
              <Box p={2}>
                <TextField

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
                      // console.log('query crm id', e.target.value);

                      handlePageLoading(true)
                      // get crm data
                      checkContractsExists(
                        e.target.value,
                        nodeApi,
                        (response) => {
                          if (response === null) {

                            notify(`Contract ID ${e.target.value} does'nt exist, Please enter a valid contract ID`, 'error')
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
                            notify(`Contract with ID: ${e.target.value} retrieved`, 'success')
                            // console.log('crm data response', response)
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
                            notify(`Master data ID ${e.target.value} does'nt exist, Please enter a valid master data ID`, 'error')
                            nodeFormik.setFieldValue('masterValues.master', [{ nickname: '', account: '', percentage: '' }])

                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedMasterData'] = null
                            setCapturedContract(capturedData)

                          } else {
                            // console.log('master data response', response);
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
                            notify(`Composition data ID ${e.target.value} does'nt exist, Please enter a valid master data ID`, 'error')
                            nodeFormik.setFieldValue('compositionValues.composition', [{ nickname: '', account: '', percentage: '' }])
                            // unset captured crm data
                            let capturedData = capturedContract
                            capturedData['capturedCompositionData'] = null
                            setCapturedContract(capturedData)
                          } else {
                            // console.log('composition data response', response);
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
                            // console.log('other contracts response sempty?', isEmpty(response));
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

            {/* Convert Substrate to Hex Account */}
            <Box pt={4}>
              <Box p={2}>
                <TextField

                  id="hexAccountTextbox"
                  name="preHexAccount"
                  label="Convert address to hex"
                  fullWidth
                  autoComplete=""
                  color="secondary"
                  value={nodeFormik.values?.preHexAccount || ''}
                  placeholder="Enter polkadot address"
                  onChange={(e) => {
                    nodeFormik.handleChange(e)

                    if (!e.target.value) return

                    nodeFormik.setFieldValue('preHexAccount', e.target.value)

                    if (acctTimeoutRef.current) clearTimeout(acctTimeoutRef.current)

                    acctTimeoutRef.current = setTimeout(() => {

                      try {
                        const krpair = keyring.getPair(e.target.value);

                        console.log('reg krpair', krpair);

                        keyring.saveAddress(krpair.address, { name: krpair.meta.name });

                        const hex = u8aToHex(krpair?.publicKey || '')

                        nodeFormik.setFieldValue('hexAccount', hex)
                      } catch (err) {
                        notify(`Error converting account to hex, Please enter a generic substrate address.`, 'error')
                      }

                    }, 2000)

                  }}
                />
              </Box>
            </Box>

            <Box p={2} sx={{ display: 'flex', flexDirection: 'row' }}>
              Public Key Output
              {" "}
              <Typography noWrap color="secondary">
                {nodeFormik.values?.hexAccount}
              </Typography>

              <Box pt={2}>
                * Or get at
                {" "}
                <span color="secondary">
                  <a href="https://polkadot.subscan.io/tools/ss58_transform" rel="noopener noreferrer" target="blank">
                    polkadot.subscan.io
                  </a>
                </span>
                {" "}
                and set Output Type as Public Key
              </Box>
            </Box>

          </LoadingOverlay>

        </Drawer>
      </LoadingOverlay>
    </React.Fragment>
  )
}

export default SimpleMode
