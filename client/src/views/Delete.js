import React, { useEffect } from 'react';

import { navigate } from '@reach/router';

import DeleteButton from '../components/DeleteButton';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';

import { Button } from 'react-bootstrap';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
    },
}));


// Delete view is used for confirmation of account deletion
const Delete = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();


    // redirects to home if no User logged in
    useEffect(() => {
        if (logged === null)
            navigate('/login');
    });


    // displays account deletion confirmation page
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
                setAudioLoaded={setAudioLoaded}
                setSyllables={setSyllables}
            />
            <Container
                component="main"
                className="chocolate"
            >
                <div className={classes.paper}>
                    <Typography
                        component="h1"
                        variant="h4"
                    >
                        Delete your account?
                    </Typography>
                    <br />
                    <Typography
                        component="h1"
                        variant="h5"
                        className="text-danger"
                    >
                        This&nbsp;
                        <u>
                            cannot
                        </u>
                        &nbsp;be undone!</Typography>
                    <br />
                    <br />
                    <br />
                    <Container maxWidth="sm">
                        <Button
                            onClick={() => navigate("/user/account/edit")}
                            size="lg"
                            variant="light"
                            className="formButt"
                        >
                            <strong>
                                Please, no!
                            </strong>
                        </Button>
                    </Container>
                    <br />
                    <br />
                    <DeleteButton
                        successCallback={() => navigate("/")}
                        logged={logged}
                        setLogged={setLogged}
                    />
                </ div>
            </Container>
            <StickyFooter />
        </div>
    );
};

export default Delete;