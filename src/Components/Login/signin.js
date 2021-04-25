import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MusicLogo from '../Common/musicLogo';
import Divider from '@material-ui/core/Divider';
import TwitterLogin from 'react-twitter-auth-light';
import TwitterIcon from '@material-ui/icons/Twitter';
import SimpleMode from '../Forms/simpleMode';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signin = () => {
    const classes = useStyles();

    const onSuccess = (response) => {
        response.json().then(body => {
          alert(JSON.stringify(body));
          // display simpleMode rmp
        });
      }
    
     const onFailed = (error) => {
        alert(error);
      }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h2">POLKA<span style={{ color: '#f50057' }}><b>MUSIC</b></span></Typography>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                    >
                        Sign In
          </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>


                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>

                    <br />
                    <Divider variant="middle" />
                    <br />
                    <Typography component="h1" variant="h5" align="center">
                        Or
        </Typography>

                    <TwitterLogin
                        //   fetchRequestToken={fetchTwitterRequestToken}
                        //   fetchOauthToken={fetchTwitterOauthToken}
                        loginUrl="http://localhost:4000/api/v1/auth/twitter"
                        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                          onFailure={onFailed}
                          onSuccess={onSuccess}
                        tag="span"
                    >
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}>
                            <TwitterIcon />
                             login with twitter
                       </Button>
                    </TwitterLogin>
                </form>
            </div>
        </Container>
    );
}

export default Signin
