import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';
import { Link } from '@reach/router';

import Sensitive from './Sensitive';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));


// WordsApiRhymes retrieves and displays rhyme results for the qury from Words API
const WordsApiRhymes = props => {

    // retrieves search variables from props
    const { query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [entry, setEntry] = useState([]);
    const [words, setWords] = useState([]);
    const [phrases, setPhrases] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results and saves them
    useEffect(() => {
        // set the options for the query request through rapidAPI
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${query}/rhymes`,
            headers: {
                'x-rapidapi-key': Sensitive.X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        // makes the request
        Axios.request(options)
            .then(res => {
                const resEntry = res.data;
                // generates an array of the rhymes found by the search
                const resWords = [];
                const resPhrases = [];
                if (res.data.rhymes.all && res.data.rhymes.all.length !== 0) {
                    for (const resWord of res.data.rhymes.all) {
                        if (resWord.split(" ").length > 1) {
                            resPhrases.push(resWord)
                        } else {
                            resWords.push(resWord);
                        }
                    }
                }

                // updates all pertinent state variables
                if (Object.keys(res.data.rhymes).length === 0)
                    setError(`No results for rhymes of "${query.toLowerCase()}" from Words API...`);
                setEntry(resEntry);
                setWords(resWords);
                setPhrases(resPhrases);
                console.log(resPhrases)
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query]);


    // returns a material UI accordion component displaying the rhymes retrieved
    return (
        <div className={classes.root}>
            <Accordion className="rIAccordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography className={classes.heading}>
                                <strong>
                                    (
                                    {words.length}
                                    )
                                    <span className="rIOrange">
                                        &nbsp;-&nbsp;
                                    </span>
                                    <i>
                                        <u>
                                            Rhymes
                                        </u>
                                    </i>
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            className="mgTxtRight"
                        >
                            <Typography className={classes.heading}>
                                <strong className="mgSmFont">
                                    <i>
                                        <span className="rIOrange">
                                            ...&nbsp;from&nbsp;
                                        </span>
                                        <span className="rIPurple">
                                            Words API
                                        </span>
                                    </i>
                                </strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {loaded && (
                        <div className={classes.root}>
                            {(words.length > 0 && entry.rhymes && entry.rhymes.all) && (
                                <ul className="inlineList">
                                    <li className="mgInlineBlock text-muted">
                                        <Typography>
                                            <strong>
                                                &emsp;Words that rhyme with
                                                "
                                                {entry.word.toLowerCase()}
                                                " ~ (A-Z):
                                            </strong>
                                        </Typography>
                                    </li>
                                    {words.map((word, index) => (
                                        <li key={index} className="mgInlineBlock">
                                            <Typography>
                                                &nbsp;
                                                <Link to={`/search/${entry.rhymes.all[index]}`}>
                                                    <i>
                                                        <span className="rIPurple">
                                                            {word}
                                                        </span>
                                                    </i>
                                                </Link>
                                                {(words.indexOf(word) !== (words.length - 1)) && (
                                                    <span className="rIOrange">
                                                        &ensp;|&nbsp;
                                                    </span>
                                                )}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {(phrases.length > 0 && entry.rhymes && entry.rhymes.all) && (
                                <ul className="inlineList">
                                    <li className="mgInlineBlock text-muted">
                                        <Typography>
                                            <strong>
                                                &emsp;Phrases that rhyme with
                                                "
                                                {entry.word.toLowerCase()}
                                                " ~ (A-Z):
                                            </strong>
                                        </Typography>
                                    </li>
                                    {phrases.map((phrase, index) => (
                                        <li key={index} className="mgInlineBlock">
                                            <Typography>
                                                &nbsp;
                                                <Link to={`/search/${phrases[index]}`}>
                                                    <i>
                                                        <span className="rIPurple">
                                                            {phrase}
                                                        </span>
                                                    </i>
                                                </Link>
                                                {(phrases.indexOf(phrase) !== (phrases.length - 1)) && (
                                                    <span className="rIOrange">
                                                        &ensp;|&nbsp;
                                                    </span>
                                                )}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {words.length === 0 && (
                                <Typography className="text-danger">
                                    <strong>
                                        <i>
                                            &emsp;
                                            {error}
                                        </i>
                                    </strong>
                                </Typography>
                            )}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default WordsApiRhymes;