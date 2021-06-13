import React, { useEffect, useState } from 'react';

import Axios from '../../../server/node_modules/axios';

import MWDictRes from '../components/MWDictRes';
import MWThesRes from '../components/MWThesRes';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import WordsApiRhymes from '../components/WordsApiRhymes';
import WordsApiFreq from '../components/WordsApiFreq';
import WordAssocRes from '../components/WordAssocRes';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Sensitive from '../components/Sensitive';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        maxWidth: '100vw',
    },
    main: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5),
        maxWidth: '69vw',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100',
    },
}));


// Main view is the homepage
const Search = props => {

    // retrieves the logged state variables from props
    const { logged,
        setLogged,
        query,
        audioLoaded,
        setAudioLoaded } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of various query data
    const [isOffensive, setIsOffensive] = useState(0);
    const [notOffensive, setNotOffensive] = useState(0);
    const [pronunciations, setPronunciations] = useState([]);
    const [mp3s, setMp3s] = useState({});
    const [wavs, setWavs] = useState({});
    const [headWords, setHeadWords] = useState([]);
    const [syllables, setSyllables] = useState("");
    const [loaded, setLoaded] = useState(true);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${query}/syllables`,
            headers: {
                'x-rapidapi-key': Sensitive.X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        Axios.request(options)
            .then(res => {
                let entry = res.data;
                let resSyllables = "";
                for (let i = 0; i < entry.syllables.list.length; i++) {
                    if (i !== entry.syllables.list.length - 1) {
                        resSyllables += (res.data.syllables.list[i] + '*');
                    } else {
                        resSyllables += res.data.syllables.list[i];
                    }
                }
                setSyllables(resSyllables);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query])

    // returns the homepage
    return (
        <div className={classes.root}>
            <CssBaseline />
            <NavBar
                logged={logged}
                setLogged={setLogged}
                setAudioLoaded={setAudioLoaded}
            />
            <Container
                component="main"
                className={classes.main}
                maxWidth="sm"
            >
                <div className={classes.paper}>
                    <div className="resHeading">
                        <h4>
                            Query results for:
                        </h4>
                        <h1>
                            <strong>
                                "
                                <span className="rIPurple resHeading">
                                    {query.replace(query[0], query[0].toUpperCase())}
                                </span>
                                "
                            </strong>
                        </h1>
                        {(loaded && syllables.length > 0) && (
                            <>
                                <h3 className="rIOrange">
                                    <strong>
                                        "
                                        {syllables}
                                        "
                                    </strong>
                                </h3>
                                <br />
                            </>
                        )}
                        {pronunciations.length > 0 && (
                            <ul className="inlineList topList">
                                {pronunciations.map((variant, index) => (
                                    <li
                                        key={index}
                                        className="mgInlineBlock"
                                    >
                                        <h5 className="text-info">
                                            <strong>
                                                <i>
                                                    \&nbsp;
                                                    {variant}
                                                    &nbsp;
                                                    {(pronunciations.indexOf(variant) === (pronunciations.length - 1)) && (
                                                        <>
                                                            \
                                                        </>
                                                    )}
                                                </i>
                                            </strong>
                                        </h5>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {(audioLoaded && ((mp3s && Object.keys(mp3s).length > 0) || (wavs && Object.keys(wavs).length > 0))) && (
                            <audio controls className="rIAudio">
                                {(mp3s && Object.keys(mp3s).length > 0) && (
                                    <source src={mp3s[Object.keys(mp3s)[0]]} type="audio/mpeg" />
                                )}
                                {(wavs && Object.keys(wavs).length > 0) && (
                                    <source src={[Object.keys(wavs)[0]]} type="audio/wav" />
                                )}
                                Your browser does not support the audio element!
                            </audio>
                        )}
                        {headWords.length > 0 && (
                            <>
                                <h6 className="text-muted">
                                    Definitions retrieved for:
                                </h6>
                                <ul className="inlineList topList">
                                    {headWords.map((headWord, index) => (
                                        <li
                                            key={index}
                                            className="mgInlineBlock"
                                        >   
                                            <Link href={`/search/${headWord}`} style={{textDecoration: 'none'}}>
                                                <h5 className="text-muted flatLink">
                                                    <strong>
                                                        <i>
                                                            &nbsp;"
                                                            {headWord}
                                                            "
                                                            {(headWords.indexOf(headWord) !== (headWords.length - 1)) && (
                                                                <>
                                                                    ,
                                                                </>
                                                            )}
                                                            {!(headWords.indexOf(headWord) !== (headWords.length - 1)) && (
                                                                <>
                                                                    ;
                                                                </>
                                                            )}
                                                        </i>
                                                    </strong>
                                                </h5>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {isOffensive === 0 && (
                            <h6 className="text-success">
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is not considered offensive by any sources!
                                </strong>
                            </h6>
                        )}
                        {(isOffensive > 0 && isOffensive <= notOffensive) && (
                            <h6 className="text-warning">
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is considered offensive by some sources...
                                </strong>
                            </h6>
                        )}
                        {(isOffensive > notOffensive) && (
                            <h6 className="text-danger">
                                <strong>
                                    "
                                    {query.replace(query[0], query[0].toUpperCase())}
                                    "
                                    is considered offensive by most sources!
                                </strong>
                            </h6>
                        )}
                        <hr />
                    </div>
                    <MWDictRes
                        query={query}
                        setIsOffensive={setIsOffensive}
                        setNotOffensive={setNotOffensive}
                        setPronunciations={setPronunciations}
                        mp3s={mp3s}
                        setMp3s={setMp3s}
                        wavs={wavs}
                        setWavs={setWavs}
                        audioLoaded={audioLoaded}
                        setAudioLoaded={setAudioLoaded}
                        setHeadWords={setHeadWords}
                    />
                    <MWThesRes query={query} />
                    <WordsApiRhymes query={query} />
                    <WordsApiFreq query={query} />
                    <WordAssocRes query={query} />
                    <br />
                    <Link
                        href={"http://www.google.com/search?q=" + query}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                    >
                        <strong className="flatLinkPurple">
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