import React, { useEffect } from 'react';

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

    // alert user of current site issues
    useEffect(() => {
        if (logged !== null)
            alert('* NOTICE:\n- The site will not currently work on Safari browsers...\n- If you want that to change, consider tipping generously below so that I can buy a Mac to figure out why');
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
                                        ^ (Query a word, phrase, suffix or colloquialism above to get started!) ^
                                    </i>
                                </strong>
                            </p>
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
                                        &emsp;Greetings to you, denizens and fellow logophiles,
                                        <br />
                                        <br />
                                        &emsp;&emsp;Welcome to CarpeDiction! Here, in this veritable verbal shangri-la, language and history are celebrated and censorship is spurned! The freedom of knowledge is essential to the evolution of our species, as well as the growth and development of our own souls. Words carry great power, and I created this site in an attempt to bring the obscurely dendritic patterns of the American-English lexicon into focus, and it is my sincerest hope that it will be able to foster new and exciting insights for all!
                                        <br />
                                        <br />
                                        &emsp;&emsp;Any and all correspondence is both welcome and encouraged, so feel free to contact me at any of my linked profiles in the bottom right. If you're bored, check out the list other fascinating and informative links that I have compiled at the bottom of this page. I would love to hear about any issues, inspirations or ideas that you may encounter while browsing the site! Register to gain access to favorites and take part in the discussions! Query a word, phrase, suffix, prefix or colloquialism to get started, but beware: for better or for worse, results are uncurated and may be offensive! Enjoy!
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
                            <h3 className="qQuotes">
                                <i>
                                    Venmo Tip Jar
                                </i>
                            </h3>
                            <Typography className="rITipJarChars">
                                <strong>
                                    <i>
                                        @Zack-Bielicki-1
                                    </i>
                                </strong>
                            </Typography>
                            <div className="rITipJars">
                                <div className="m-sm-auto">
                                    <h3 className="qQuotes">
                                        <i>
                                            BTC Tip Jar
                                        </i>
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
                                <div className="m-sm-auto">
                                    <h3 className="qQuotes">
                                        <i>
                                            ETH Tip Jar
                                        </i>
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
                            <br />
                            <h3 className="qQuotes">
                                Cryptocurrency Referrals:
                            </h3>
                            <br />
                            <Typography className="rITipJarChars">
                                <strong>
                                    <i>
                                        <Link
                                            target="_blank"
                                            href="https://blockfi.com/?ref=cb8d5d22"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; Apply for the world's first BTC rewards credit card here! &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="http://bitcoinfaq.io"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; Bitcoin FAQ &lt;
                                        </Link>
                                        <br />
                                    </i>
                                </strong>
                            </Typography>
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
                            <h3 className="qQuotes">
                                Other Educational & Beguiling Links:
                            </h3>
                            <br />
                            <Typography className="">
                                <strong>
                                    <i>
                                        <Link
                                            target="_blank"
                                            href="http://www.ZeeboVO.com"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; Zeebo Voiceovers (My side hustle) &lt;
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
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://www.dictionaryofobscuresorrows.com/"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; The Dictionary of Obscure Sorrows &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://archive.org/web/"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; The Wayback Machine (Archive of the internet!) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://www.duolingo.com/"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; Duolingo (Free Language Courses) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://ocw.mit.edu/"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; MIT OCW (Free College Courses from MIT) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://www.freecodecamp.org/learn/"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; FreeCodeCamp (Free Online Coding Bootcamp) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="http://www.youtube.com/user/vsauce"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; Vsauce (Science/Philosophy Videos) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://www.youtube.com/user/zbielicki88"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; My youtube library (Music/Curiosities) &lt;
                                        </Link>
                                        <br />
                                        <br />
                                        <Link
                                            target="_blank"
                                            href="https://www.youtube.com/watch?v=1t1OL2zN0LQ"
                                            className="flatLinkPurple"
                                            style={{ textDecoration: "none" }}
                                        >
                                            &gt; How to solve a Rubik's Cube &lt;
                                        </Link>
                                    </i>
                                </strong>
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div >
    );
};


export default Main;