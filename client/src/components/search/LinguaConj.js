import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from '@reach/router';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
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


// LinguaCons retrieves and displays frequency data results from Linguatools Conjugations API
const LinguaCons = props => {

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
            url: 'https://linguatools-conjugations.p.rapidapi.com/conjugate/',
            params: { verb: query.replace(/\//g, '%2F') },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_X_RAPIDAPI_KEY,
                'x-rapidapi-host': 'linguatools-conjugations.p.rapidapi.com'
            }
        };

        // makes the request
        axios.request(options)
            .then(res => {
                const resEntry = res.data;
                // updates all pertinent state variables
                if (resEntry.result !== 'OK') {
                    setError(`No results from Linguatools Conjugations API...`);
                    setEntry(null);
                    setLoaded(false);
                } else {
                    setError(null);
                    setEntry(resEntry);
                    setLoaded(true);
                }
            })
            .catch(err => {
                setError(`No results from Linguatools Conjugations API...`);
                setEntry(null);
                setLoaded(false);
            });
    }, [query]);


    // returns a material UI accordion component displaying the conjugation forms
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
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography className={classes.heading}>
                                <strong>
                                    (
                                    {(entry && entry.conjugated_forms) && (
                                        Object.keys(entry.conjugated_forms).length
                                    )}
                                    {!(entry && entry.conjugated_forms) && (
                                        0
                                    )}
                                    )
                                    <span className="rIOrange">
                                        &nbsp;-&nbsp;
                                    </span>
                                    <i>
                                        <u>
                                            Conjugations
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
                                            Linguatools Conjugations API
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
                                {(entry && entry.conjugated_forms) && (
                                    <>
                                        {query && (
                                            <>
                                                <Typography className="text-muted">
                                                    <strong>
                                                        &emsp;
                                                        Conjugations of :&ensp;
                                                        "
                                                        <span className="mgWordBreak">
                                                            {query}
                                                        </span>
                                                        "
                                                    </strong>
                                                </Typography>
                                                <br />
                                            </>
                                        )}
                                        {entry.conjugated_forms.map((form, index) => (
                                            <Typography key={index}>
                                                <i>
                                                    <strong>
                                                        <span className="rIOrange">
                                                            &emsp;&emsp;~
                                                        </span>
                                                        <span className="text-muted">
                                                            &nbsp;
                                                            {form[0]} :&nbsp;
                                                        </span>
                                                        <span className="rIPurple">
                                                            &nbsp;
                                                            "&nbsp;
                                                            <Link to={`/search/` + form[1].replace(/\//g, '%2F')}>
                                                                <span className="rIPurple">
                                                                    ...&ensp;
                                                                    {form[1].replace(/%2f/g,'/')}
                                                                </span>
                                                            </Link>
                                                            &ensp;"
                                                        </span>
                                                    </strong>
                                                    <br />
                                                </i>
                                            </Typography>
                                        ))}
                                        <br />
                                    </>
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


export default LinguaCons;