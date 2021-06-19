import React, { useEffect, useState } from 'react';

import Axios from '../../../server/node_modules/axios';
import { navigate } from '@reach/router';

import fav_icon_gray from '../images/fav_icon_gray.png';
import fav_icon_orange from '../images/fav_icon_orange.png';

import Comments from '../components/Comments';
// disabled for now due to 429 error...retry in a month or so maybe a bad useEffect ran up the limit...
// import DeepTrans from '../components/DeepTrans';
import LinguaConj from '../components/LinguaConj';
import MWDictRes from '../components/MWDictRes';
import MWThesRes from '../components/MWThesRes';
import NavBar from '../components/NavBar';
import StickyFooter from '../components/StickyFooter';
import UrbanDict from '../components/UrbanDict';
import WordsApiRhymes from '../components/WordsApiRhymes';
import WordsApiFreq from '../components/WordsApiFreq';
import WordAssocRes from '../components/WordAssocRes';

import { Button } from 'react-bootstrap';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Divider } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Sensitive from '../components/Sensitive';
import Typography from '@material-ui/core/Typography';



// defines style rulesets for Material UI components
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '100',
        minHeight: '100vh',
    },
    divider: {
        margin: "30px 0",
    },
}));


// Search view returns search results
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
    const [spellings, setSpellings] = useState([]);
    const [syllables, setSyllables] = useState("");
    const [loaded, setLoaded] = useState(true);


    // retrieves the query syllables results and processes them
    useEffect(() => {
        // sets the options for the request through Rapid API
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${query}/syllables`,
            headers: {
                'x-rapidapi-key': Sensitive.X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        // makes the request
        Axios.request(options)
            .then(res => {
                let entry = res.data;
                let resSyllables = "";
                // retrieve syllable data
                if (entry.syllables && entry.syllables.list) {
                    for (let i = 0; i < entry.syllables.list.length; i++) {
                        if (i !== entry.syllables.list.length - 1 && res.data.syllables.list[i + 1] !== "") {
                            resSyllables += (res.data.syllables.list[i] + ' * ');
                        } else {
                            resSyllables += res.data.syllables.list[i];
                        }
                    }
                    //update pertinent state variables and reset audio to fix back/forward issue
                    setSyllables(resSyllables);
                    setAudioLoaded(false);
                    setAudioLoaded(true);
                } else {
                    //update pertinent state variables and reset audio to fix back/forward issue
                    setSyllables("");
                    setAudioLoaded(false);
                    setAudioLoaded(true);
                }
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query, setAudioLoaded, logged])

    // updates the User's data with the new data
    const updateUser = newUser => {
        Axios.put('http://localhost:8000/api/users/' + logged._id, newUser, { withCredentials: true })
            .then(res => {
                setLogged(res.data.user);
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 401)
                    navigate('/login');
            });
    };

    // toggles favorite status on query
    const handleFavs = () => {
        if (!logged.favs.includes(query.toLowerCase())) {
            logged.favs.push(query.toLowerCase());
        } else {
            const index = logged.favs.indexOf(query.toLowerCase());
            logged.favs.splice(index, index + 1);
        }
        // favorite the word
        updateUser(logged);
    }

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
                            <h4>
                                <i>
                                    You queried:
                                </i>
                            </h4>
                            <h1 className="mgWordBreak">
                                <strong className="qQuotes">
                                    "&nbsp;
                                    <span className="rIPurple resHeading">
                                        {query}
                                    </span>
                                    &nbsp;"
                                </strong>
                            </h1>
                            {logged === null && (
                                <Button
                                    variant="outline-warning"
                                    className="cdFavIcon"
                                    onClick={() => navigate("/login")}
                                >
                                    <img
                                        src={fav_icon_gray}
                                        width="35"
                                        height="35"
                                        className="d-inline-block"
                                        alt="Favorite?"
                                    />
                                </Button>
                            )}
                            {(logged !== null) && (logged.favs !== undefined) && !(logged.favs.includes(query)) && (
                                <Button
                                    variant="outline-warning"
                                    className="cdFavIcon"
                                    type="submit"
                                    onClick={() => handleFavs()}
                                >
                                    <img
                                        src={fav_icon_gray}
                                        width="35"
                                        height="35"
                                        className="d-inline-block"
                                        alt="Favorite?"
                                    />
                                </Button>
                            )}
                            {(logged !== null) && (logged.favs !== undefined) && (logged.favs.includes(query)) && (
                                <Button
                                    variant="outline-dark"
                                    className="cdFavIcon"
                                    onClick={() => handleFavs()}
                                >
                                    <img
                                        src={fav_icon_orange}
                                        width="35"
                                        height="35"
                                        className="d-inline-block"
                                        alt="Favorited!"
                                    />
                                </Button>
                            )}
                            {headWords.length > 0 && (
                                <>
                                    <h5 className="text-muted">
                                        Definitions retrieved for:
                                    </h5>
                                    <ul className="inlineList topList">
                                        {headWords.map((headWord, index) => (
                                            <li
                                                key={index}
                                                className="mgInlineBlock"
                                            >
                                                <Link href={`/search/${headWord}`} style={{ textDecoration: 'none' }}>
                                                    <strong className="flatLinkMuted">
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
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {spellings.length > 0 && (
                                <>
                                    <h5 className="text-muted">
                                        Did you mean...
                                    </h5>
                                    <ul className="inlineList topList">
                                        {spellings.map((spelling, index) => (
                                            <li
                                                key={index}
                                                className="mgInlineBlock"
                                            >
                                                <Link href={`/search/${spelling}`} style={{ textDecoration: 'none' }}>
                                                    <strong className="flatLinkMuted">
                                                        <i>
                                                            &nbsp;"
                                                            {spelling}
                                                            "
                                                            {(spellings.indexOf(spelling) !== (spellings.length - 1)) && (
                                                                <>
                                                                    ,
                                                                </>
                                                            )}
                                                            {!(spellings.indexOf(spelling) !== (spellings.length - 1)) && (
                                                                <>
                                                                    ...?
                                                                </>
                                                            )}
                                                        </i>
                                                    </strong>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            {pronunciations.length > 0 && (
                                <ul className="inlineList topList">
                                    {pronunciations.map((variant, index) => (
                                        <li
                                            key={index}
                                            className="mgInlineBlock"
                                        >
                                            <h3 className="text-info">
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
                                            </h3>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {(loaded && syllables.length > 0) && (
                                <>
                                    <h2>
                                        <strong className="text-muted">
                                            (&nbsp;
                                            <i className="rIOrange syllables">
                                                {syllables}
                                            </i>
                                            &nbsp;)
                                        </strong>
                                    </h2>
                                    <br />
                                </>
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
                            {isOffensive === 0 && (
                                <h6 className="text-success isOffensive">
                                    <strong>
                                        "
                                        <i className="mgWordBreak">
                                            {query}
                                        </i>
                                        &nbsp;" is not considered offensive by any official sources!
                                    </strong>
                                </h6>
                            )}
                            {(isOffensive > 0 && isOffensive <= notOffensive) && (
                                <h6 className="text-warning isOffensive">
                                    <strong>
                                        "
                                        <i>
                                            {query}
                                        </i>
                                        &nbsp;" is considered offensive by some official sources...
                                    </strong>
                                </h6>
                            )}
                            {(isOffensive > notOffensive) && (
                                <h6 className="text-danger isOffensive">
                                    <strong>
                                        "
                                        <i>
                                            {query}
                                        </i>
                                        &nbsp;" is considered offensive by most official sources!
                                    </strong>
                                </h6>
                            )}
                            <Typography className="text-muted">
                                <i>
                                    ( some results may take a moment to update )
                                </i>
                            </Typography>
                            <Divider
                                variant="fullWidth"
                                className={classes.divider}
                            />
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
                            setSpellings={setSpellings}
                        />
                        <MWThesRes query={query} />
                        <UrbanDict query={query} />
                        <WordsApiRhymes query={query} />
                        <LinguaConj query={query} />
                        {/* <DeepTrans query={query} /> */}
                        <WordsApiFreq query={query} />
                        <WordAssocRes query={query} />
                        <br />
                        <Link
                            href={"http://www.wikipedia.com/wiki/" + query}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <strong className="flatLinkRedirect mgWordBreak">
                                Search Wikipedia for "
                                {query}
                                "
                            </strong>
                        </Link>
                        <br />
                        <Link
                            href={"http://www.google.com/search?q=" + query}
                            target="_blank"
                            style={{ textDecoration: "none" }}
                        >
                            <strong className="flatLinkRedirect mgWordBreak">
                                Search Google for "
                                {query}
                                "
                            </strong>
                        </Link>
                        <Comments
                            query={query}
                            logged={logged}
                        />
                    </div>
                </div>
            </div>
            <StickyFooter />
        </div>
    );
};


export default Search;