import React from 'react';

import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';

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
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


// Main view is the homepage
const Main = props => {

    // retrieves the logged state variables from props
    const { logged, setLogged } = props;

    // generates CSS rulesets
    const classes = useStyles();


    // returns the homepage
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
            />
            <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
            >
                <div className={classes.paper}>
                    <strong>
                        Home Page
                    </strong>
                </div>
            </Container>
            <StickyFooter />
        </div>
    );
};

export default Main;