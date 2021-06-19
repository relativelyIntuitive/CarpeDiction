import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';
import { navigate } from '@reach/router';

import LoginForm from '../components/LoginForm';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));


// Login view is for the login form
const Login = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state to keep track of an array of errors from LoginForm
    const [errors, setErrors] = useState([]);

    // creates empty initial login field values to pass down to form
    const initialLog = {
        email: "",
        password: "",
    };


    // redirects to home if User already logged in
    useEffect(() => {
        if (logged !== null)
            navigate('/');
    });


    // API post function; to be passed down to the LoginForm
    const loginUser = user => {
        Axios.post('http://localhost:8000/api/login/', user, { withCredentials: true })
            .then(res => {
                if (res.data.user) {
                    setLogged(res.data.user);
                    navigate("/");
                } else {
                    setErrors(res.data);
                }
            })
            .catch(err => {
                console.log(err);
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    };


    // returns the login page
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
                <LoginForm
                    onSubmitProp={loginUser}
                    errors={errors}
                    initialLog={initialLog}
                />
            </div>
            <StickyFooter />
        </div>
    );
};

export default Login;