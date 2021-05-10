import React, { useEffect, useState } from 'react'
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
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import SimlpeSelect from '../Common/simpleSelect';
import { MenuItem } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
// import { stringToU8a, u8aToHex } from '@polkadot/util';
import cryptoRandomString from 'crypto-random-string';

const drawerWidth = 240;

const customTypes = {

};

// async function callRegisterMusic() {
//   // Instantiate the API
//   const api = await ApiPromise.create(new WsProvider('ws://127.0.0.1:9944'), customTypes);

//   // Constuct the keying after the API (crypto has an async init)
//   // const keyring = new Keyring({ type: 'sr25519' });

//   // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
//   // const user = keyring.addFromUri('//Alice');

//   // get keyring/pair, use to signAndSend

//   // Create a extrinsic, register music
//   const transfer = api.tx.rightsMgmtPortal
//     .registerMusic(`0x${cryptoRandomString({length: 10})}`, addressValues['wallet-addresses'], null);

//   // Sign and send the transaction using our account
//   const hash = await transfer.signAndSend(keyringValue);

//   // console.log('Music registered', hash.toHex());
// }

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

const steps = ['Upload MP3 or WAV', 'Information', 'Review & Submit'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <UploadFile />;
    case 1:
      return <Information />;
    case 2:
      return <ReviewAndSubmit />;
    default:
      throw new Error('Unknown step');
  }
}

const SimpleMode = () => {
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
  const [allAccounts, setAllAccounts] = useState(null);
  const [addressName, setAddressName] = useState(null);
  const [keyringPair, setKeyringPair] = useState(null);
  const [keyringAccounts, setKeyringAccounts] = useState(null);
  const [keyringAddresses, setKeyringAddresses] = useState(null);
  const [keyringAddress, setKeyringAddress] = useState(null);

  async function callRegisterMusic() {
    if (addressValues && keyringAddress) {
      // Instantiate the API
      const api = await ApiPromise.create(new WsProvider('ws://127.0.0.1:9944'), customTypes);

      // Constuct the keying after the API (crypto has an async init)
      // const keyring = new Keyring({ type: 'sr25519' });

      // Add Alice to our keyring with a hard-deived path (empty phrase, so uses dev)
      // const user = keyring.addFromUri('//Alice');

      // get keyring/pair, use to signAndSend

      // Create a extrinsic, register music
      const transfer = api.tx.rightsMgmtPortal
        .registerMusic(
          `0x${cryptoRandomString({ length: 10 })}`,
          addressValues['wallet-addresses'],
          null
        );

      // Sign and send the transaction using our account
      const hash = await transfer.signAndSend(keyringAddress);

      console.log('Music registered', hash.toHex());
    }
  }

  // connecting wallet
  useEffect(() => {
    async function callPolkaJsAuth() {
      // this call fires up the authorization popup
      const extensions = await web3Enable('POLKAMUSIC');

      if (extensions.length === 0) {
        // no extension installed, or the user did not accept the authorization
        // in this case we should inform the use and give a link to the extension
        if (window.confirm('Polkadot.js wallet not found. If you click "ok" you would be redirected . Cancel will load this website ')) {
          window.location.href = 'https://polkadot.js.org/extension/';
        };
        return;
      }

      // we are now informed that the user has at least one extension and that we
      // will be able to show and use accounts
      const allAccounts = await web3Accounts();
      // console.log(allAccounts);

      if (allAccounts && allAccounts.length > 0) {
        // set first address as initial address value
        setAddressValues(oldValues => ({
          ...oldValues,
          'wallet-addresses': allAccounts[0].address
        }));

        // set addresses for selection
        const addressesOptions = allAccounts.map(account => ({
          'addressValue': account.address,
          'addressDisplay': `${account.address.toString().toString().slice(0, 5)}...${allAccounts[0].address.toString().slice(account.address.toString().length - 5)}`
        }));
        setSelectAddresses(addressesOptions);

        // set formatted/mapped all acounts for loading keyring
        const allAccountsMapped = allAccounts.map(({ address, meta }) =>
          ({ address, meta: { ...meta, name: `${meta.name} (${meta.source})` } }));
        setAllAccounts(allAccountsMapped);

        // set address name for saving to keyring
        setAddressName(allAccounts[0].meta.name);

        const initialAddr = allAccounts[0].address;
        // save keyring account of initial address
        keyring.saveAddress(initialAddr, { name: allAccounts[0].meta.name });
        // set keyring pair by address
        const krAddresses = keyring.getAddresses();
        console.log('kr addresses', krAddresses);

        // setKeyringAccounts(accounts);
        setKeyringAddresses(krAddresses);

        if (krAddresses && initialAddr) {
          krAddresses.forEach(krAddr => {
            console.log('kr addr', krAddr.address);
            if (krAddr.address?.toString() === initialAddr.toString()) {
              // const krpair = keyring.getPair(krAddr.address);
              // console.log('init krpair', krpair);
              // if (krpair) setKeyringPair(krpair);
              if (krAddr && krAddr.address) setKeyringAddress(krAddr);
            }
          })
        }
      }

    }

    callPolkaJsAuth();
  }, []);

  // conencting to the node
  useEffect(() => {
    // call once should be redux state
    console.log('api State', apiState);
    if (apiState) return;

    async function callConnectToNode() {
      // Initialise the provider to connect to the local node
      const provider = new WsProvider('ws://127.0.0.1:9944'); // change if prod/staging

      // Create the API and wait until ready
      const api = await ApiPromise.create({
        provider,
        types: {
          "SongName": "Vec<u8>",
          "ArtistName": "Vec<u8>",
          "Composer": "Vec<u8>",
          "Lyricist": "Vec<u8>",
          "YOR": "Vec<u8>",
          "MusicProperty": {
            "name": "SongName",
            "artist": "ArtistName",
            "composer": "Composer",
            "lyricist": "Lyricist",
            "year": "YOR"
          },
          "SongId": "Vec<u8>",
          "MusicData": {
            "id": "SongId",
            "owner": "AccountId",
            "props": "Option<Vec<MusicProperty>>",
            "registered": "Moment"
          }
        }
      })

      // Retrieve the chain & node information information via rpc calls
      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ]);

      console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
    }

    callConnectToNode()
      // .then(() => {
        // if (allAccounts) {
        //   console.log('allAccts', allAccounts);
        //   keyring.loadAll({ isDevelopment: process.env.NODE_ENV === "development" }, allAccounts);
        // }
        // const accounts = keyring.getAccounts();
        // setKeyringAccounts(accounts);
        // // set keyring pair by address
        // const initialAddr = addressValues['wallet-addresses'];
        // console.log('init addr', initialAddr);
        // if (accounts && initialAddr) {
        //   accounts.forEach(({ address }) => {
        //     if (address?.toString() === initialAddr.toString()) {
        //       const krpair = keyring.getPair(address);
        //       console.log('init krpair', krpair);
        //       if (krpair) setKeyringPair(krpair);
        //     }
        //   })
        // }
      // })
      .catch(console.error)
      .finally(() => setApiState("READY"));
  }, []);

  // set key pair else add address in keyring
  useEffect(() => {
    console.log('wallet addr', addressValues['wallet-addresses']);
    if (!addressValues['wallet-addresses'] || !keyringAddresses) return;
    let krVal;
    // async function getKeyrngPair() {
    //   try {
    //     krVal = keyring.getPair(addressValues['wallet-addresses']);
    //     console.log(krVal);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // getKeyrngPair();
    // const keyringVal = keyring.getPair(addressValues['wallet-addresses']);
    // alternative of getting the key pair value
    keyringAddresses.forEach(krAddr => {
      if (krAddr.address?.toString() === addressValues['wallet-addresses'].toString()) {
        // krVal = keyring.getPair(krAddr.address);
        if (krAddr) krVal = krAddr; 
      }
    })
    console.log('keyring val', krVal);

    if (!krVal) {
      // add address
      console.log('addr name', addressName);
      if (addressName) {
        keyring.saveAddress(addressValues['wallet-addresses'], { name: addressName });

        // the addr will now be in the list of available addresses
        // keyring.getAddresses().forEach(addr => console.log(addr));
      }

    }
    else {
      console.log('we got the keyring address', krVal);
      // setKeyringPair(krVal);
      setKeyringAddress(krVal);
    }
  }, [addressName, keyringAddresses]);


  const handleNext = () => {
    setActiveStep(activeStep + 1);
    // handle submit
    if (activeStep === steps.length - 1) {
      // setSubmitting
      callRegisterMusic()
        .catch(console.error)
      // .finally(() => setSubmitting(false));
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

    // find name from allAccounts
    const accountFound = allAccounts.find(acct => acct.address?.toString() === event.target.value?.toString())
    if (accountFound) {
      console.log('account found', accountFound);
      setAddressName(accountFound.meta.name);
    }
  };

  // for input mode selection
  const handleModeChange = (event) => {
    console.log(event.target);
    setModeValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }


  const theme = useTheme();

  return (
    <React.Fragment>
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
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
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
        <Box p={1}>
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
      </Drawer>
    </React.Fragment>
  )
}

export default SimpleMode
