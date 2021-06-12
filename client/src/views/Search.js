import React, { useState } from 'react';

import MWDictRes from '../components/MWDictRes';
import MWThesRes from '../components/MWThesRes';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import WordAssocRes from '../components/WordAssocRes';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


// Main view is the homepage
const Search = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of various query data
    const [isOffensive, setIsOffensive] = useState(0);
    const [notOffensive, setNotOffensive] = useState(0);
    const [pronunciations, setPronunciations] = useState([]);
    const [mp3s, setMp3s] = useState([]);
    const [wavs, setWavs] = useState([]);
    const [audioLoaded, setAudioLoaded] = useState(false);
    const [headWords, setHeadWords] = useState([]);

    // returns the homepage
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
                setIsOffensive={setIsOffensive}
                setNotOffensive={setNotOffensive}
            />
            <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
            >
                <div className={classes.paper}>
                    {(audioLoaded && mp3s.length) && (
                        mp3s.map((mp3, index) => {
                            return(
                                <div key={index}>
                                    <audio controls key={index}>
                                        if (mp3s.length)
                                            <source src={mp3} type="audio/mpeg"/>
                                        if (wavs.length)
                                            <source src={wavs[index]} type="audio/wav"/>
                                        Your browser does not support the audio element!
                                    </audio>
                                </div>
                            );
                        })
                    )}
                    <div className="resHeading">
                        <Typography
                            component="h1"
                            variant="h3"
                        >
                            You queried:
                        </Typography>
                        <Typography
                            component="h2"
                            variant="h2"
                        >
                            <strong>
                                "
                                <span className="rIPurple">
                                    {query.replace(query[0], query[0].toUpperCase())}
                                </span>
                                "
                            </strong>
                        </Typography>
                        {pronunciations.length > 0 && (
                            <ul className="inlineList topList">
                                {pronunciations.map((variant, index) => (
                                    <li
                                        key={index}
                                        className="mgInlineBlock"
                                    >
                                        <Typography
                                            className="text-info"
                                            component="h3"
                                            variant="h5"
                                        >
                                            <strong>
                                            <i>
                                                \&nbsp;
                                                {variant}
                                                &nbsp;\
                                            </i>
                                            </strong>
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {headWords.length > 0 && (
                            <>
                                <Typography
                                    className="text-muted"
                                    component="h4"
                                    variant="h6"
                                >
                                    Found results for:
                                </Typography>
                                <ul className="inlineList topList">
                                    {headWords.map((headWord, index) => (
                                        <li
                                            key={index}
                                            className="mgInlineBlock"
                                        >
                                            <Typography
                                                className="text-muted"
                                                component="h5"
                                                variant="h5"
                                            >
                                                <strong>
                                                    <i>
                                                        &nbsp;"
                                                        {headWord}
                                                        ",
                                                    </i>
                                                </strong>
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {isOffensive === 0 && (
                            <Typography
                                className="text-success"
                                component="h6"
                                variant="h6"
                            >
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is not considered offensive by any sources.
                                </strong>
                            </Typography>
                        )}
                        {(isOffensive > 0 && isOffensive <= notOffensive) && (
                            <Typography
                                className="text-warning"
                                component="h6"
                                variant="h6"
                            >
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is considered offensive by some sources...
                                </strong>
                            </Typography>
                        )}
                        {(isOffensive > notOffensive) && (
                            <Typography
                                className="text-danger" 
                                component="h6"
                                variant="h6"
                            >
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is considered offensive by most sources!
                                </strong>
                            </Typography>
                        )}
                    </div>
                    <br />
                    <MWDictRes 
                        query={query}
                        setIsOffensive={setIsOffensive}
                        setNotOffensive={setNotOffensive}
                        setPronunciations={setPronunciations}
                        setMp3s={setMp3s}
                        setWavs={setWavs}
                        setAudioLoaded={setAudioLoaded}
                        setHeadWords={setHeadWords}
                    />
                    <MWThesRes 
                        query={query}
                    />
                    <WordAssocRes
                        query={query}
                    />
                    <br />
                    <Link 
                        href={"http://www.google.com/search?q=" + query}
                        target="_blank"
                        style={{ textDecoration: "none"}}
                    >
                        <strong className="rIPurple">
                            Search Google for "
                            {query.replace(query[0], query[0].toUpperCase())}
                            "
                        </strong>
                    </Link>
                </div>
            </Container>
            <StickyFooter />
        </div>
    );
};

export default Search;