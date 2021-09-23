import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from 'react-router-dom'
import { SIGNUP_WITH_EMAIL } from '../../Firebase/Syntex';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function ErrorAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    continuewith: {
        // background: '#00e676',
        padding: ` .3rem 1.4rem .2rem .2rem`,
        borderRadius: ' 2em',
    }
}));

export default function SignUp() {

    const location = useHistory()

    const [value, setvalue] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const [massage, setMassage] = React.useState({ massage: '', type: '', state: false });

    const handleFormValue = (e) => {
        const TheName = e.target.name
        const TheValue = e.target.value
        setvalue({ ...value, [TheName]: TheValue })

    }

    const submitWithEmail = async (e) => {
        e.preventDefault()
        try {
            if (value.password.length < 8) {
                setMassage({
                    massage: 'Your passwor should be more then 8',
                    type: 'warning',
                    state: true
                })
            }
            else {
                await SIGNUP_WITH_EMAIL(value.email, value.password)
                location.push('/only/admin/access/')
            }
        } catch (error) {
            if (error.code === 'auth/network-request-failed') {
                setMassage({
                    massage: 'Something wrong try again or Refresh',
                    type: 'error',
                    state: true
                })
            }
            if (error.code === 'auth/weak-password') {
                setMassage({
                    massage: 'Week password',
                    type: 'error',
                    state: true
                })
            }
            else if (error.code === 'auth/email-already-in-use') {
                setMassage({
                    massage: 'Account already in use',
                    type: 'error',
                    state: true
                })
            }
            else if (error.code === 'auth/invalid-email') {
                setMassage({
                    massage: 'Invalid email',
                    type: 'error',
                    state: true
                })
            }
        }
    }




    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMassage({
            ...massage,
            state: false
        })
    };


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Admin SignUp
                </Typography>
                <form className={classes.form} onSubmit={submitWithEmail}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleFormValue}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleFormValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleFormValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleFormValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/only/admin/login/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <div className="errorMassage">
                    <Snackbar open={massage.state} autoHideDuration={1500} onClose={handleClose}>
                        <ErrorAlert onClose={handleClose} severity={massage.type}>
                            {massage.massage}
                        </ErrorAlert>
                    </Snackbar>
                </div>
            </div>

        </Container>
    );
}