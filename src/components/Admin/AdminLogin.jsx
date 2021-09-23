import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, } from 'react-router-dom'
import { UseGlobalContext } from './../Provider/Anonymus'
import { db, } from '../../Firebase/config';


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
    continuewith: {
        // background: '#00e676',
        padding: ` .3rem 1.4rem .2rem .2rem`,
        borderRadius: ' 2em',
    }
}));

export default function AdminLogin() {

    const location = useHistory()

    const { setglobalAdmin } = UseGlobalContext()

    const [value, setvalue] = React.useState({
        email: '',
        password: ''
    })
    const [massage, setMassage] = React.useState({ massage: '', type: '', state: false });



    const handleFormValue = (e) => {
        const TheName = e.target.name
        const TheValue = e.target.value
        setvalue({ ...value, [TheName]: TheValue })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        db.collection('only_admin').get().then(snapshot => {
            let detailscarryer = []
            snapshot.forEach((doc) => {
                detailscarryer.push({
                    email: doc.data().email,
                    password: doc.data().password
                })
            });
            if (detailscarryer) {
                const AdminEmail = detailscarryer.some(e => e.email === value.email)
                const AdminPassword = detailscarryer.some(e => e.password === value.password)
                if (!AdminEmail) {
                    setMassage({ massage: `Wrong Email`, state: true, type: 'error' })
                }
                if (!AdminPassword) {
                    setMassage({ massage: `Wrong Password`, state: true, type: 'error' })
                }
                if (AdminEmail && AdminPassword) {
                    setglobalAdmin(true)
                    localStorage.setItem('admin', process.env.REACT_APP_ADMIN_LOGIN_SETUP)
                    location.push('/only/admin/access/')
                }
            }
        })

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
                    Only Admin
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
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
                        onChange={handleFormValue}
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
                        onChange={handleFormValue}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"

                        color="primary"
                        className={classes.submit}
                    >
                        Go to dashbord
                    </Button>


                </form>
            </div>
            <div className="errorMassage">
                <Snackbar open={massage.state} autoHideDuration={35000} onClose={handleClose}>
                    <ErrorAlert onClose={handleClose} severity={massage.type}>
                        {massage.massage}
                    </ErrorAlert>
                </Snackbar>
            </div>

        </Container>
    );
}