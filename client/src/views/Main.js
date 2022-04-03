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

    // retrieves state variables from props
    const { envUrl,
        logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // alert user of any current site issues
    // useEffect(() => {
    //     if (logged === null)
    //         alert("* NOTICE:");
    // }, [logged])

    // returns the homepage
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                envUrl={envUrl}
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
                            <WOTDCard envUrl={envUrl} />
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
                            <Links />
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <TipJars />
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div >
    );
};


export default Main;