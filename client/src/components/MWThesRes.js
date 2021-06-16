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


// MWDictRes retrieves and displays query results from the Merriam-Webster Collegiate Dictionary API
const MWThesRes = props => {

    // retrieves search variables from props
    const { query } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [entries, setEntries] = useState([]);
    const [entriesByType, setEntriesByType] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results and saves them
    useEffect(() => {
        Axios.get('https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query + '?key=' + Sensitive.MW_THES_KEY)
            .then(res => {
                // generates an array of the entries found by the search
                const resEntries = [];
                for (const entryKey of Object.keys(res.data)) {
                    if (res.data[entryKey].fl !== undefined)
                        resEntries.push(res.data[entryKey]);
                }

                // generates an object with key for each type of entry found and values containing arrays of entries matching the type
                const entryTypes = {};
                // local offensive counters to manipulate and push their sums to overall offensive score
                let isOffensive = 0;
                let notOffensive = 0;
                for (const entry of resEntries) {
                    // local variable to store working entry for processing
                    const newEntry = entry;
                    // tallies offensive entries
                    (newEntry.meta.offensive === true) ? isOffensive += 1 : notOffensive += 1;
                    // removes format bracket pairs and leftover references to other entries
                    if (newEntry.et && newEntry.et[0][1]) {
                        newEntry.et[0][1] = newEntry.et[0][1].replace(/\{.*?\}/g, '');
                        if (newEntry.et[0][1].split(" ").length <= 3)
                            newEntry.et[0][1] = undefined;
                    }
                    // checks if the type of entry exists in the object and adds it to the appropriate array if so, and creates a new one if not
                    if (`${newEntry.fl}` in entryTypes) {
                        entryTypes[`${newEntry.fl}`].push(newEntry);
                        continue;
                    } else {
                        entryTypes[`${newEntry.fl}`] = [newEntry];
                    }
                }

                // updates all pertinent state variables
                if (resEntries.length === 0)
                    setError(`No results for "${query.toLowerCase()}" from the Merriam-Webster Collegiate Thesaurus...`);
                setEntries(resEntries);
                setEntriesByType(entryTypes);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query]);


    // returns a material UI accordion component displaying the results from the MW dictionary API
    return (
        <div className={classes.root}>
            <Accordion className="rIAccordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        <strong>
                            (
                            {entries.length}
                            )
                            <span className="rIOrange">
                                &nbsp;-&nbsp;
                            </span>
                            <i>
                                <u>
                                    Merriam-Webster Collegiate Thesaurus
                                </u>
                            </i>
                        </strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loaded && (
                        <div className={classes.root}>
                            <>
                                {Object.keys(entriesByType).length > 0 && (
                                    Object.keys(entriesByType).map((type, index) => (
                                        <Accordion
                                            key={index}
                                            className="rIAccordion"
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>
                                                    <strong>
                                                        (
                                                        {entriesByType[type].length}
                                                        )
                                                        <span className="rIOrange">
                                                            &nbsp;-&nbsp;
                                                        </span>
                                                        <i>
                                                            {type.replace(type[0], type[0].toUpperCase())}
                                                            &nbsp;entries...
                                                        </i>
                                                    </strong>
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className={classes.root}>
                                                    {entriesByType[type].length > 0 && (
                                                        entriesByType[type].map((entry, index2) => (
                                                            <Accordion
                                                                key={index2}
                                                                className="rIAccordion"
                                                            >
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Grid
                                                                        container
                                                                        justify="space-evenly"
                                                                        alignItems="center"
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={10}
                                                                        >
                                                                            <Typography className={classes.heading}>
                                                                                <strong>
                                                                                    <span className="rIOrange">
                                                                                        :&nbsp;
                                                                                    </span>
                                                                                    (
                                                                                    {entry.shortdef.length}
                                                                                    )
                                                                                    <span className="text-muted">
                                                                                        &emsp;
                                                                                        {'{'}
                                                                                        &nbsp;
                                                                                        {entry.meta.id}
                                                                                        &nbsp;
                                                                                        {'}'}
                                                                                    </span>                                                                                </strong>
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={2}
                                                                        >
                                                                            {(entry.meta.offensive === true) && (
                                                                                <Typography className={classes.heading}>
                                                                                    <span className="text-danger isOffensive">
                                                                                        <strong>
                                                                                            <i>
                                                                                                Vulgar?
                                                                                            </i>
                                                                                        </strong>
                                                                                    </span>
                                                                                </Typography>
                                                                            )}
                                                                            {(entry.meta.offensive === false) && (
                                                                                <Typography className={classes.heading}>
                                                                                    <span className="text-success isOffensive">
                                                                                        <strong>
                                                                                            <i>
                                                                                                Clean!
                                                                                            </i>
                                                                                        </strong>
                                                                                    </span>
                                                                                </Typography>
                                                                            )}
                                                                        </Grid>
                                                                    </Grid>
                                                                </AccordionSummary>
                                                                <AccordionDetails>
                                                                    <div className={classes.root}>
                                                                        <Typography>
                                                                            <strong>
                                                                                [
                                                                                {type.replace(type[0], type[0].toUpperCase())}
                                                                                ]
                                                                            </strong>
                                                                            {(entry.hwi && entry.hwi.hw) && (
                                                                                <span className="text-muted">
                                                                                    <strong>
                                                                                        <span className="rIOrange">
                                                                                            &nbsp;&ensp;|&ensp;
                                                                                        </span>
                                                                                        "
                                                                                        {entry.hwi.hw}
                                                                                        "&ensp;
                                                                                    </strong>
                                                                                </span>
                                                                            )}
                                                                        </Typography>
                                                                        <br />
                                                                        {entry.shortdef.length > 0 && (
                                                                            entry.shortdef.map((def, index3) => (
                                                                                <div key={index3}>
                                                                                    <Typography>
                                                                                        <strong>
                                                                                            {index3 + 1}:
                                                                                        </strong>
                                                                                        &nbsp;"
                                                                                        {def}
                                                                                        "
                                                                                    </Typography>
                                                                                    <br />
                                                                                    <ul className="inlineList">
                                                                                        <li className="mgInlineBlock text-muted">
                                                                                            <Typography>
                                                                                                <strong>
                                                                                                    &ensp;Synonyms:&nbsp;
                                                                                                </strong>
                                                                                            </Typography>
                                                                                        </li>
                                                                                        {(entry.meta.syns.length > 0 && entry.meta.syns[index3] && entry.meta.syns[index3].length > 0) && (
                                                                                            entry.meta.syns[index3].map((syn, index4) => (
                                                                                                <li key={index4} className="mgInlineBlock">
                                                                                                    <Typography>
                                                                                                        &nbsp;
                                                                                                        <Link to={`/search/${syn}`} >
                                                                                                            <span className="rIPurple">
                                                                                                                <i>
                                                                                                                    {syn}
                                                                                                                </i>
                                                                                                            </span>
                                                                                                        </Link>
                                                                                                        {(entry.meta.syns[index3].indexOf(syn) !== (entry.meta.syns[index3].length - 1)) && (
                                                                                                            <>
                                                                                                                ,
                                                                                                            </>
                                                                                                        )}
                                                                                                        {!(entry.meta.syns[index3].indexOf(syn) !== (entry.meta.syns[index3].length - 1)) && (
                                                                                                            <>
                                                                                                                ;
                                                                                                            </>
                                                                                                        )}
                                                                                                    </Typography>
                                                                                                </li>
                                                                                            ))
                                                                                        )}
                                                                                        {!(entry.meta.syns.length > 0 && entry.meta.syns[index3] && entry.meta.syns[index3].length > !0) && (
                                                                                            <li className="mgInlineBlock">
                                                                                                <Typography>
                                                                                                    <span className="rIPurple">
                                                                                                        <i>
                                                                                                            (N/A);
                                                                                                        </i>
                                                                                                    </span>
                                                                                                </Typography>
                                                                                            </li>
                                                                                        )}
                                                                                    </ul>
                                                                                    <ul className="inlineList">
                                                                                        <li className="mgInlineBlock text-muted">
                                                                                            <Typography>
                                                                                                <strong>
                                                                                                    &ensp;Antonyms:&nbsp;
                                                                                                </strong>
                                                                                            </Typography>
                                                                                        </li>
                                                                                        {(entry.meta.ants.length > 0 && entry.meta.ants[index3] && entry.meta.ants[index3].length > 0) && (
                                                                                            entry.meta.ants[index3].map((ant, index4) => (
                                                                                                <li key={index4} className="mgInlineBlock">
                                                                                                    <Typography>
                                                                                                        &nbsp;
                                                                                                        <Link to={`/search/${ant}`} >
                                                                                                            <span className="rIPurple">
                                                                                                                <i>
                                                                                                                    {ant}
                                                                                                                </i>
                                                                                                            </span>
                                                                                                        </Link>
                                                                                                        {(entry.meta.ants[index3].indexOf(ant) !== (entry.meta.ants[index3].length - 1)) && (
                                                                                                            <>
                                                                                                                ,
                                                                                                            </>
                                                                                                        )}
                                                                                                        {!(entry.meta.ants[index3].indexOf(ant) !== (entry.meta.ants[index3].length - 1)) && (
                                                                                                            <>
                                                                                                                ;
                                                                                                            </>
                                                                                                        )}
                                                                                                    </Typography>
                                                                                                </li>
                                                                                            ))
                                                                                        )}
                                                                                        {!(entry.meta.ants.length > 0 && entry.meta.ants[index3] && entry.meta.ants[index3].length > 0) && (
                                                                                            <li className="mgInlineBlock">
                                                                                                <Typography>
                                                                                                    <span className="rIPurple">
                                                                                                        <i>
                                                                                                            (N/A);
                                                                                                        </i>
                                                                                                    </span>
                                                                                                </Typography>
                                                                                            </li>
                                                                                        )}
                                                                                    </ul>
                                                                                    <hr />
                                                                                    <br />
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        ))
                                                    )}
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                )}
                                {entries.length === 0 && (
                                    <Typography className="text-danger">
                                        <strong>
                                            <i>
                                                &emsp;
                                                {error}
                                            </i>
                                        </strong>
                                    </Typography>
                                )}
                            </>
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default MWThesRes;