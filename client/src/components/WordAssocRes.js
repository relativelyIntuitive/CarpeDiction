import React, { useState, useEffect } from 'react';

import Axios from '../../node_modules/axios';
import { Link } from '@reach/router';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid/';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



// defines style rulesets for Material UI components
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


// WordAssocRes retrieves and displays a list of related words from Word Associations API 
const WordAssocRes = props => {

    // retrieves search variables from props
    const { query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [entry, setEntry] = useState([]);
    const [words, setWords] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results and saves them
    useEffect(() => {
        // set the options for the query request through rapidAPI
        const options = {
            method: 'GET',
            url: 'https://twinword-word-associations-v1.p.rapidapi.com/associations/',
            params: { entry: query.toLowerCase() },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'twinword-word-associations-v1.p.rapidapi.com'
            }
        };

        // makes the request
        Axios.request(options)
            .then(res => {
                const resEntry = res.data;
                // generates an array of the word found by the search
                const resWords = [];
                for (const resWord in res.data.associations_scored) {
                    resWords.push(`${resWord} : ${res.data.associations_scored[resWord].toString().split(".")[0]}%`)
                }

                // updates all pertinent state variables
                if (resEntry.result_code === "462") {
                    setError(`No results for words related to "${query.toLowerCase()}" from Word Associations API...`);
                    setEntry(null);
                    setWords(null);
                    setLoaded(false);
                } else if (resWords.length === 0) {
                    setError(`No results for words related to "${query.toLowerCase()}" from Word Associations API...`);
                    setEntry(null);
                    setWords(null);
                    setLoaded(false);
                } else {
                    setError(null);
                    setEntry(resEntry);
                    setWords(resWords);
                    setLoaded(true);
                }
            })
            .catch(err => {
                if (err && err.response && err.response.status === 503) {
                    setError(`Word Associations API is temporarily unavailable...`)
                    setEntry(null);
                    setWords(null);
                    setLoaded(false);
                } else {
                    setError(`No results for words related to "${query.toLowerCase()}" from Word Associations API...`);
                    setEntry(null);
                    setWords(null);
                    setLoaded(false);
                }
            });
    }, [query]);


    // returns a material UI accordion component displaying the results from Word Associations API
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
                                    {(words !== null && words.length) && (
                                        words.length
                                    )}
                                    {(words === null) && (
                                        0
                                    )}
                                    )
                                    <span className="rIOrange">
                                        &nbsp;-&nbsp;
                                    </span>
                                    <i>
                                        <u>
                                            Related Words
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
                                            Word Associations API
                                        </span>
                                    </i>
                                </strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.root}>
                        {loaded && (
                            <>
                                {(words && words.length > 0 && entry && entry.associations_scored) && (
                                    <ul className="inlineList">
                                        <li className="mgInlineBlock text-muted">
                                            <Typography>
                                                <strong>
                                                    &emsp;Related words / similarity score for "
                                                    <span className="mgWordBreak">
                                                        {query.toLowerCase()}
                                                    </span>
                                                    " :&nbsp;
                                                </strong>
                                            </Typography>
                                        </li>
                                        {words.map((word, index) => (
                                            <li key={index} className="mgInlineBlock">
                                                <Typography>
                                                    &ensp;
                                                    <Link to={`/search/${Object.keys(entry.associations_scored)[index]}`}>
                                                        <i>
                                                            <span className="rIPurple">
                                                                {word}
                                                            </span>
                                                        </i>
                                                    </Link>
                                                    {(words.indexOf(word) !== (words.length - 1)) && (
                                                        <strong>
                                                            <span className="rIOrange">
                                                                &ensp;|
                                                            </span>
                                                        </strong>
                                                    )}
                                                </Typography>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        )}
                        {!loaded && (
                            <Typography className="text-danger mgWordBreak">
                                <strong>
                                    <i>
                                        &emsp;
                                        {error}
                                    </i>
                                </strong>
                            </Typography>
                        )}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


export default WordAssocRes;