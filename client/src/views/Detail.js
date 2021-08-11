import React, { useEffect, useState } from 'react';

import axios from '../../node_modules/axios';
import { Link, navigate } from '@reach/router';

import FavoritesAZ from '../components/FavoritesAZ';
import FavoritesNew from '../components/FavoritesNew';
import ImportExportFavs from '../components/ImportExportFavs';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



// defines style rulesets for Material UI components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
    },
    divider: {
        margin: "30px 0",
    },
}));


// Detail view is for viewing account info
const Detail = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // local logged variable for the GET hook to track intermediately, preventing logout errors
    const [localUser] = useState(logged);

    // state variables to hold the User data and whether or not it has loaded
    const [user, setUser] = useState({});
    const [loaded, setLoaded] = useState(false);


    // redirects to home if no User logged in. Otherwise copies logged data to localUser
    useEffect(() => {
        if (logged === null)
            navigate('/login');
    });

    // retrieves the User data
    useEffect(() => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.get(`${process.env.REACT_APP_API_ROOT}/api/users/${localUser._id}`, { withCredentials: true })
                .then(res => {
                    setUser(res.data.user);
                    setLoaded(true);
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        } else {
            axios.get(`http://localhost:8000/api/users/${localUser._id}`, { withCredentials: true })
                .then(res => {
                    setUser(res.data.user);
                    setLoaded(true);
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        }
    }, [localUser, logged]);


    // returns the User account screen
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
                <div className="filling">
                    <div className={classes.paper}>
                        <div className="resHeading">
                            {loaded && (
                                <>
                                    <h2 className="qQuotes">
                                        <strong>
                                            Username:
                                        </strong>
                                    </h2>
                                    <Typography className="rIPurple">
                                        <strong>
                                            <i className="userDetails">
                                                {user.userName}
                                            </i>
                                        </strong>
                                    </Typography>
                                    <br />
                                    <h2 className="qQuotes">
                                        <strong>
                                            Email:
                                        </strong>
                                    </h2>
                                    <Typography className="rIPurple">
                                        <strong>
                                            <i className="userDetails">
                                                {user.email}
                                            </i>
                                        </strong>
                                    </Typography>
                                    <br />
                                    <br />
                                    <Typography>
                                        <strong>
                                            <span className="rIOrange">
                                                (&ensp;
                                            </span>
                                            <Link
                                                to={"/user/account/edit"}
                                                className="flatLinkPurple"
                                            >
                                                Edit Account
                                            </Link>
                                            <span className="rIOrange">
                                                &ensp;|&ensp;
                                            </span>
                                            <Link
                                                to='/'
                                                className="flatLinkPurple"
                                            >
                                                Nevermind...
                                            </Link>
                                            <span className="rIOrange">
                                                &ensp;)
                                            </span>
                                        </strong>
                                    </Typography>
                                    <Divider
                                        variant="fullWidth"
                                        className={classes.divider}
                                    />
                                    <FavoritesNew user={user} />
                                    <FavoritesAZ user={user} />
                                    <Divider
                                        variant="fullWidth"
                                        className={classes.divider}
                                    />
                                    <ImportExportFavs
                                        user={user}
                                        setLogged={setLogged}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div>
    );
};


export default Detail;