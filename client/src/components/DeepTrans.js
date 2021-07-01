import React, { useState, useEffect } from 'react';

import Axios from '../../node_modules/axios';

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


// DeepTrans retrieves and displays frequency data results from Deep Translate API
const DeepTrans = props => {

    // retrieves search variables from props
    const { query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [results, setResults] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results for various languages and saves them
    useEffect(() => {
        let newResults = { 'query': query.toLowerCase() };
        // results['query'] = query;
        // set the options for the Spanish translation request through rapidAPI
        const optionsEs = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
            },
            data: { q: query.toLowerCase(), source: 'en', target: 'es' }
        };
        // makes the request
        Axios.request(optionsEs)
            .then(res => {
                console.log(res.data)
                const resEntry = res.data;
                // adds the translation to results
                if (resEntry.data && resEntry.data.translations)
                    newResults['es'] = resEntry.data.translations['translatedText'];
            })
            .catch(err => {
                console.log(err);
                setError(`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`);
            });

        // set the options for the French translation request through rapidAPI
        const optionsFr = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
            },
            data: { q: query.toLowerCase(), source: 'en', target: 'fr' }
        };
        // makes the request
        Axios.request(optionsFr)
            .then(res => {
                const resEntry = res.data;
                // adds the translation to results
                if (resEntry.data && resEntry.data.translations)
                    newResults['fr'] = resEntry.data.translations['translatedText'];
            })
            .catch(err => {
                console.log(err);
                setError(`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`);
            });

        // set the options for the French translation request through rapidAPI
        const optionsLa = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
            },
            data: { q: query.toLowerCase(), source: 'en', target: 'la' }
        };
        // makes the request
        Axios.request(optionsLa)
            .then(res => {
                const resEntry = res.data;
                // adds the translation to results
                if (resEntry.data && resEntry.data.translations)
                    newResults['la'] = resEntry.data.translations['translatedText'];
            })
            .catch(err => {
                console.log(err);
                setError(`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`);
            });

        // set the options for the French translation request through rapidAPI
        const optionsIt = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
            },
            data: { q: query.toLowerCase(), source: 'en', target: 'it' }
        };
        // makes the request
        Axios.request(optionsIt)
            .then(res => {
                const resEntry = res.data;
                // adds the translation to results
                if (resEntry.data && resEntry.data.translations)
                    newResults['it'] = resEntry.data.translations['translatedText'];
            })
            .catch(err => {
                console.log(err);
                setError(`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`);
            });

        // set the options for the French translation request through rapidAPI
        const optionsPt = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
            },
            data: { q: query.toLowerCase(), source: 'en', target: 'pt' }
        };
        // makes the request
        Axios.request(optionsPt)
            .then(res => {
                const resEntry = res.data;
                // adds the translation to results
                if (resEntry.data && resEntry.data.translations)
                    newResults['pt'] = resEntry.data.translations['translatedText'];
            })
            .catch(err => {
                console.log(err);
                setError(`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`);
            });

        // update loaded when all requests are complete
        setResults(newResults);
        setLoaded(true);
    }, [query, setResults]);


    // returns a material UI accordion component displaying the translations
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
                                    {(results && results.length >= 2) && (
                                        Object.keys(results).length - 1
                                    )}
                                    {!(results && results.length >= 2) && (
                                        0
                                    )}
                                    )
                                    <span className="rIOrange">
                                        &nbsp;-&nbsp;
                                    </span>
                                    <i>
                                        <u>
                                            Latin - Derived Translations
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
                                            Deep Translate API
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
                                {(results && results.fr) && (
                                    <>
                                        <Typography className="text-muted">
                                            <strong>
                                                &emsp;
                                                French:
                                                <i className="rIPurple">
                                                    &ensp;"
                                                    {results.fr}
                                                    "
                                                </i>
                                            </strong>
                                        </Typography>
                                        <br />
                                    </>
                                )}
                                {(results && results.it) && (
                                    <>
                                        <Typography className="text-muted">
                                            <strong>
                                                &emsp;
                                                Italian:
                                                <i className="rIPurple">
                                                    &ensp;"
                                                    {results.it}
                                                    "
                                                </i>
                                            </strong>
                                        </Typography>
                                        <br />
                                    </>
                                )}
                                {(results && results.la) && (
                                    <>
                                        <Typography className="text-muted">
                                            <strong>
                                                &emsp;
                                                Latin:
                                                <i className="rIPurple">
                                                    &ensp;"
                                                    {results.la}
                                                    "
                                                </i>
                                            </strong>
                                        </Typography>
                                        <br />
                                    </>
                                )}
                                {(results && results.pt) && (
                                    <>
                                        <Typography className="text-muted">
                                            <strong>
                                                &emsp;
                                                Portuguese:
                                                <i className="rIPurple">
                                                    &ensp;"
                                                    {results.pt}
                                                    "
                                                </i>
                                            </strong>
                                        </Typography>
                                        <br />
                                    </>
                                )}
                                {(results && results.es) && (
                                    <>
                                        <Typography className="text-muted">
                                            <strong>
                                                &emsp;
                                                Spanish:
                                                <i className="rIPurple">
                                                    &ensp;"
                                                    {results.es}
                                                    "
                                                </i>
                                            </strong>
                                        </Typography>
                                        <br />
                                    </>
                                )}
                            </>
                        )}
                        {!loaded && (
                            <Typography className="text-danger">
                                <strong>
                                    <i>
                                        &emsp;
                                        {`No results for translations of "${query.toLowerCase()}" from Deep Translate API...`}
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

export default DeepTrans;