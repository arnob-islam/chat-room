import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import { FORGET_PASSWORD } from '../../Firebase/Syntex';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Forget_Password() {


    const [value, setvalue] = React.useState({
        email: '',
    })
    const [showAlert, setshowAlert] = React.useState(false);

    const [errorMassage, seterrorMassage] = React.useState({ massage: '', type: 'error' });

    const handleValue = (e) => {
        const TheName = e.target.name
        const TheValue = e.target.value
        setvalue({ ...value, [TheName]: TheValue })
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            await FORGET_PASSWORD(value.email)
            setshowAlert(true)
            seterrorMassage({ massage: 'Success! Please cheak your mail box', type: 'success' })
            setvalue({ email: "" })
        } catch (error) {
            setvalue({ email: "" })
            if (error.code === 'auth/user-not-found') {
                setshowAlert(true)
                seterrorMassage({ massage: 'User dosen"t exist', type: 'error' })
            }
            else if (error.code === 'auth/invalid-email') {
                setshowAlert(true)
                seterrorMassage({ massage: 'Your email is invalid', type: 'error' })
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setshowAlert(false);
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
                    Forget password
                </Typography>
                <form className={classes.form} onSubmit={handleResetPassword}>
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

                        onChange={handleValue}
                        value={value.email}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset Passward
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/" >
                                Log in
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/user/signup/" >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <div className="errorMassage">
                    <Snackbar open={showAlert} autoHideDuration={1000} onClose={handleClose}>
                        <ErrorAlert onClose={handleClose} severity={errorMassage.type}>
                            {errorMassage.massage}
                        </ErrorAlert>
                    </Snackbar>
                </div>
            </div>

        </Container>
    );
}