import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { navigate } from '@reach/router';

import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import UserForm from '../components/user/UserForm';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';



// defines style rulesets for Material UI components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));


// Register view is for the registration version of the UserForm component 
const Register = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state to keep track of an array of errors from RegForm
    const [errors, setErrors] = useState([]);

    // creates empty initial registration field values to pass down to form
    const initialReg = {
        userName: "",
        email: "",
        password: "",
        passwordConf: "",
    };


    // redirects to home if User already logged in
    useEffect(() => {
        if (logged !== null)
            navigate('/');
    });

    // API post function; to be passed down to the RegForm
    const createUser = user => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/register/`, user, { withCredentials: true })
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
        } else {
            axios.post(`http://localhost:8000/api/register/`, user, { withCredentials: true })
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
        }
    };


    // returns the registration page
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
                setAudioLoaded={setAudioLoaded}
                setSyllables={setSyllables}
            />
            <div className="chocolate">
                <UserForm
                    submitCallback={createUser}
                    formFunc="Register"
                    errors={errors}
                    initialUser={initialReg}
                />
            </div>
            <StickyFooter />
        </div>
    );
};


export default Register;