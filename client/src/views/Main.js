import React, { useEffect } from 'react';

import carpe_diction from '../images/carpe_diction.png';

import FoundersNote from '../components/main/FoundersNote';
import Links from '../components/main/Links';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import TipJars from '../components/main/TipJars';
import WOTDCard from '../components/main/WOTDCard';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';



// defines style rulesets for Material UI components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    divider: {
        margin: "30px 0",
    },
}));


// Main view is the homepage
const Main = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // alert user of current site issues
    useEffect(() => {
        if (logged === null)
            alert("* NOTICE:\n- The site will not currently work on Safari browsers...\n- I just got a MacBook, fix coming soon!");
    }, [logged])

    // returns the homepage
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
                            <img
                                src={carpe_diction}
                                width="100%"
                                height=""
                                alt="CarpeDiction!"
                            />
                            <p className="cdTagLine">
                                <strong>
                                    <i>
                                        Language is art!
                                    </i>
                                </strong>
                            </p>
                            <WOTDCard />
                            <p className="cdInstructions">
                                <strong>
                                    <i>
                                        ^ ***** ******** ***** ^
                                        <br />
                                        <br />
                                        Query a word, phrase, suffix, prefix or colloquialism above to get started!
                                        <br />
                                        <br />
                                        ^ *** ******* *********** ******* *** ^
                                    </i>
                                </strong>
                            </p>
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <FoundersNote />
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <TipJars />
                            <br />
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <Links />
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div >
    );
};


export default Main;