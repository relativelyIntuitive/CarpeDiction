import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';
import { Link } from '@reach/router';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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


// MWDictRes retrieves and displays query results from the Merriam-Webster Collegiate Dictionary API
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
            params: { entry: `${query}` },
            headers: {
                'x-rapidapi-key': process.env.WORD_ASSOC_KEY,
                'x-rapidapi-host': 'twinword-word-associations-v1.p.rapidapi.com'
            }
        };

        // makes the request
        Axios.request(options)
            .then(function (res) {
                // generates an array of the entries found by the search
                const resEntry = res.data;
                const resWords = [];
                for (const resWord in res.data.associations_scored) {
                    resWords.push(`${resWord} : ${res.data.associations_scored[resWord].toString().split(".")[0]}%`)
                }

                // updates all pertinent state variables
                if (resEntry.result_code === "462")
                    setError(`No results for "${query.replace(query[0], query[0].toUpperCase())}" from Word Associations API...`);
                setEntry(resEntry);
                setWords(resWords);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query]);


    // returns a material UI accordion component displaying the results from the MW dictionary API
    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
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
                                    Word Associations API
                                </u>
                            </i>
                        </strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loaded && (
                        <div className={classes.root}>
                            {(words.length > 0 && entry.associations_scored) && (
                                <ul className="inlineList">
                                    <li className="mgInlineBlock text-muted">
                                        <strong>
                                                &emsp;Related words / similarity score:
                                        </strong>
                                    </li>
                                    {words.map((word, index) => (
                                        <li key={index} className="mgInlineBlock">
                                            &nbsp;
                                            <Link to={`/search/${Object.keys(entry.associations_scored)[index]}`}>
                                                <span className="rIPurple">
                                                    <i>
                                                        {word}
                                                        <span className="rIOrange">
                                                            &nbsp;|&nbsp;
                                                        </span>
                                                    </i>
                                                </span>
                                            </Link>
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

export default WordAssocRes;