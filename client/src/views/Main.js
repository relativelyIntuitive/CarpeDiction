import React from 'react';

import carpe_diction from '../images/carpe_diction.png';
import btc_qr from '../images/btc_qr.png';
import eth_qr from '../images/eth_qr.png';

import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import WOTDCard from '../components/WOTDCard';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from "@material-ui/core";
import Link from '@material-ui/core/Link';
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
                            <p className="text-danger">
                                <strong>
                                    <i>
                                        *NOTICE*
                                    </i>
                                    <br />
                                    Safari browsers are not currently supported here!
                                </strong>
                            </p>
                            <WOTDCard />
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
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
                                        &emsp;&emsp;Welcome to CarpeDiction! Here, in this veritable verbal shangri-la, language and history are celebrated and censorship is spurned! Freedom of knowledge is essential to the evolution of our species, as well as the growth and development of our own souls. I created this site in an attempt to bring the obscurely dendritic patterns of the American-English lexicon into focus, and it is my sincerest hope that it will be able to foster new and exciting insights for all!
                                        <br />
                                        <br />
                                        &emsp;&emsp;Any and all correspondence is both welcome and encouraged, so feel free to drop me a message at any of my linked profiles in the bottom right. I would love to hear about any issues, inspirations or ideas that you may encounter while browsing the site! Register to gain access to favorites and take part in the discussions! Query a word, phrase, suffix, prefix or colloquialism to get started, but be warned, results are uncurated and may be offensive! Enjoy!
                                        <br />
                                        <br />
                                        &emsp;&ensp;- Zack
                                    </strong>
                                </Typography>
                            </div>
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <div className="rITipJars">
                                <div>
                                    <h3 className="qQuotes">
                                        <strong>
                                            <i>
                                                BTC Tip Jar
                                            </i>
                                        </strong>
                                    </h3>
                                    <Typography className="rITipJarChars">
                                        <strong>
                                            <i>
                                                bc1q25mdmtjaxcenae7vjpnleec8m09ngcf7khwaw6
                                            </i>
                                        </strong>
                                    </Typography>
                                    <img
                                        src={btc_qr}
                                        width="300"
                                        height="300"
                                        className="d-inline-block rITipJar"
                                        alt="{BTC QR}"
                                    />
                                </div>
                                <br />
                                <div>
                                    <h3 className="qQuotes">
                                        <strong>
                                            <i>
                                                ETH Tip Jar
                                            </i>
                                        </strong>
                                    </h3>
                                    <Typography className="rITipJarChars">
                                        <strong>
                                            <i>
                                                0x5EAAcaDFDbcF195d1E21c916FAC836fB94e86313
                                            </i>
                                        </strong>
                                    </Typography>
                                    <img
                                        src={eth_qr}
                                        width="300"
                                        height="300"
                                        className="d-inline-block mr-sm-1 rITipJar"
                                        alt="{ETH QR}"
                                    />
                                </div>
                            </div>
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <h3 className="qQuotes">
                                Other beguiling sites:
                            </h3>
                            <br />
                            <h5>
                                <i>
                                    <Link
                                        target="_blank"
                                        href="http://bitcoinfaq.io"
                                        className="flatLinkPurple"
                                        style={{ textDecoration: "none" }}
                                    >
                                        &gt; Bitcoin FAQ &lt;
                                    </Link>
                                    <br />
                                    <br />
                                    <Link
                                        target="_blank"
                                        href="http://libraryofbabel.info"
                                        className="flatLinkPurple"
                                        style={{ textDecoration: "none" }}
                                    >
                                        &gt; The Library of Babel &lt;
                                    </Link>
                                </i>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div>
    );
};


export default Main;