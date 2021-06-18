import React from 'react';

import carpe_diction from '../images/carpe_diction.png';

import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import WOTDCard from '../components/WOTDCard';

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
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
                                // className="d-inline-block mr-sm-1 cdNavLogo"
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
                            <hr />
                            <br />
                            <h3 className="rIPurple">
                                <strong>
                                    <i>
                                        <span className="qQuotes">
                                            *&nbsp;
                                        </span>
                                        <u>
                                            A note from the founder
                                        </u>
                                        <span className="qQuotes">
                                            &nbsp;*
                                        </span>
                                    </i>
                                </strong>
                            </h3>
                            <div className="cdAbout">
                                <Typography>
                                    <strong>
                                        &emsp;Greetings to you, denizens and fellow logophiles!
                                        <br />
                                        <br />
                                        &emsp;&emsp;Welcome to CarpeDiction! Here, in this veritable verbal shangri-la, language and history are celebrated and censorship is spurned! Freedom of knowledge is essential to the evolution of our species, as well as the growth and development of our own souls. I created this site in an attempt to bring the obscurely dendritic patterns of the American-English Lexicon into focus, and it is my sincerest hope that it will be able to foster new and exciting insights for all!
                                        <br />
                                        <br />
                                        &emsp;&emsp;Any and all correspondence is both welcome and encouraged, so feel free to drop me a message at any of my linked profiles in the bottom right. I would love to hear about any issues, inspirations or ideas that you may encounter while browsing the site! Enjoy!
                                        <br />
                                        <br />
                                        &emsp;&ensp;- Zack
                                    </strong>
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div>
    );
};

export default Main;