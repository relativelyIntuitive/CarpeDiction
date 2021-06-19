import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';

import Sensitive from './Sensitive';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
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


// WordsApiFreq retrieves and displays frequency data results from Words API
const WordsApiFreq = props => {

    // retrieves search variables from props
    const { query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [entry, setEntry] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results and saves them
    useEffect(() => {
        // set the options for the query request through rapidAPI
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${query}/frequency`,
            headers: {
                'x-rapidapi-key': Sensitive.X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
            }
        };

        // makes the request
        Axios.request(options)
            .then(res => {
                const resEntry = res.data;
                // updates all pertinent state variables
                if (!resEntry.frequency) {
                    setError(`No results for frequency data of "${query.toLowerCase()}" from Words API...`);
                    setEntry(null);
                } else {
                    setEntry(resEntry);
                }
                setLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setError(`No results for frequency data of "${query.toLowerCase()}" from Words API...`);
                setEntry(null);
                setLoaded(true);
            });
    }, [query]);


    // returns a material UI accordion component displaying the frequency data
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
                                    {(entry && entry.frequency) && (
                                        Object.keys(entry.frequency).length
                                    )}
                                    {!(entry && entry.frequency) && (
                                        0
                                    )}
                                    )
                                    <span className="rIOrange">
                                        &nbsp;-&nbsp;
                                    </span>
                                    <i>
                                        <u>
                                            Frequency Data
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
                            {(entry && entry.frequency) && (
                                <>
                                    {entry.word && (
                                        <>
                                            <Typography className="text-muted">
                                                <strong>
                                                    &emsp;
                                                    Frequency data for:
                                                    "
                                                    {entry.word.toLowerCase()}
                                                    "
                                                </strong>
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                    {entry.frequency.zipf >= 0 && (
                                        <>
                                            <Typography>
                                                <i>
                                                    <strong>
                                                        <span className="rIOrange">
                                                            &emsp;&emsp;-
                                                        </span>
                                                        <span className="text-muted">
                                                            &nbsp;Zipf Rating:
                                                        </span>
                                                        <span className="rIPurple">
                                                            &nbsp;
                                                            {entry.frequency.zipf}
                                                        </span>
                                                    </strong>
                                                    <br />
                                                    <Container>
                                                        <span className="mgSmFont">
                                                            <span className="rIOrange">
                                                                &emsp;&emsp;*&nbsp;
                                                            </span>
                                                            A score indicating how common the word is in the English language, with a range of 1 - 7;
                                                        </span>
                                                    </Container>
                                                </i>
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                    {entry.frequency.perMillion >= 0 && (
                                        <>
                                            <Typography>
                                                <i>
                                                    <strong>
                                                        <span className="rIOrange">
                                                            &emsp;&emsp;-
                                                        </span>
                                                        <span className="text-muted">
                                                            &nbsp;Per - Million Rating:
                                                        </span>
                                                        <span className="rIPurple">
                                                            &nbsp;
                                                            {entry.frequency.perMillion}
                                                        </span>
                                                    </strong>
                                                    <br />
                                                    <Container>
                                                        <span className="mgSmFont">
                                                            <span className="rIOrange">
                                                                &emsp;&emsp;*&nbsp;
                                                            </span>
                                                            The number of times the word is likely to appear in a corpus of one million English words;
                                                        </span>
                                                    </Container>
                                                </i>
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                    {entry.frequency.diversity >= 0 && (
                                        <>
                                            <Typography>
                                                <i>
                                                    <strong>
                                                        <span className="rIOrange">
                                                            &emsp;&emsp;-
                                                        </span>
                                                        <span className="text-muted">
                                                            &nbsp;Diversity Rating:
                                                        </span>
                                                        <span className="rIPurple">
                                                            &nbsp;
                                                            {entry.frequency.diversity}
                                                        </span>
                                                    </strong>
                                                    <br />
                                                    <Container>
                                                        <span className="mgSmFont">
                                                            <span className="rIOrange">
                                                                &emsp;&emsp;*&nbsp;
                                                            </span>
                                                            0 - 1 scale the shows the likelyhood of the word appearing in an English document that is part of a corpus;
                                                        </span>
                                                    </Container>
                                                </i>
                                            </Typography>
                                            <br />
                                        </>
                                    )}
                                </>
                            )}
                            {(error.length > 0 && entry === null) && (
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
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


export default WordsApiFreq;