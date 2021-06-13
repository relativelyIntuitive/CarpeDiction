import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';
import { navigate } from '@reach/router';

import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import UserForm from '../components/UserForm';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(8),
    },
}));


// Register view is for the registration version of the UserForm component 
const Register = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state to keep track of an array of errors from RegForm
    const [errors, setErrors] = useState([]);

    // creates empty initial registration field values to pass down to form
    const initialReg = {
        userName: "",
        email: "",
        password: "",
        passwordConf: ""
    };


    // redirects to home if User already logged in
    useEffect(() => {
        if (logged !== null)
            navigate('/');
    });


    // API post function; to be passed down to the RegForm
    const createUser = user => {
        Axios.post('http://localhost:8000/api/register/', user, { withCredentials: true })
            .then(res => {
                if (res.data.user) {
                    setLogged(res.data.user);
                    navigate("/");
                } else {
                    setErrors(res.data);
                }
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    };


    // returns the registration page
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
                setAudioLoaded={setAudioLoaded}
            />
            <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
            >
                <UserForm
                    submitCallback={createUser}
                    formFunc="Register"
                    errors={errors}
                    initialUser={initialReg}
                />
            </Container>
            <StickyFooter />
        </div>
    );
};


export default Register;