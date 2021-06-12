import React, { useState, useEffect } from 'react';

import Axios from '../../../server/node_modules/axios';

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
const MWDictRes = props => {

    // retrieves search variables from props
    const { query,
        setIsOffensive,
        setNotOffensive,
        setPronunciations,
        setMp3s,
        setWavs,
        setAudioLoaded,
        setHeadWords } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of search progress and results
    const [entries, setEntries] = useState([]);
    const [entriesByType, setEntriesByType] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");


    // retrieves the query results and saves them
    useEffect(() => {
        Axios.get('https://dictionaryapi.com/api/v3/references/collegiate/json/' + query + '?key=' + process.env.MW_DICT_KEY)
            .then(res => {
                // generates an array of the entries found by the search
                const resEntries = [];
                for (const entryKey of Object.keys(res.data)) {
                    if (res.data[entryKey].fl !== undefined)
                        resEntries.push(res.data[entryKey]);
                }
                setEntries(resEntries);
                console.log(resEntries);

                // generates an object with key for each type of entry found and values containing arrays of entries matching the type
                const entryTypes = {}
                // local offensive counters to manipulate and push their sums to overall offensive score
                let isOffensive = 0;
                let notOffensive = 0;
                let newPronunciations = [];
                let newHeadWords = [];
                let audio = [];
                let newMp3s = [];
                let newWavs = [];

                // processes each entry retrieved
                for (const entry of resEntries) {
                    // variables to hold entry data
                    const newEntry = entry;
                    // tallies offensive entries
                    (newEntry.meta.offensive === true) ? isOffensive += 1 : notOffensive += 1;
                    // gathers pronunciation data if present
                    if (newEntry.hwi && newEntry.hwi.prs && newEntry.hwi.prs[0] && newEntry.hwi.prs[0].mw)
                    newPronunciations.push(newEntry.hwi.prs[0].mw);
                        // gathers headwords if present
                    if (newEntry.hwi && newEntry.hwi.hw && !newHeadWords.includes(newEntry.hwi.hw))
                        newHeadWords.push(newEntry.hwi.hw)
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
                    // gathers audio URLs if present
                    if (newEntry.hwi && newEntry.hwi.prs && newEntry.hwi.prs[0] && newEntry.hwi.prs[0].sound)
                        audio.push(newEntry.hwi.prs[0].sound);
                    for (let i = 0; i < audio.length; i++){
                        // determines which subdirectory to place in the URL request based on rules from MW API docs
                        let subDirectory = "";
                        if (audio[i].audio.toString().slice(2) === "bix") {
                            subDirectory = "bix";
                        } else if (audio[i].audio.toString().slice(1) === "gg") {
                            subDirectory = "gg";
                        } else if (!!audio[i].audio.toString()[0].match(/^[`~@#$%^&*()_=+/-[\]{}\\|.,:;!?'"<>123456789]/)) {
                            subDirectory = "number";
                        } else {
                            subDirectory = audio[i].audio.toString()[0];
                        }
                        newMp3s.push('https://media.merriam-webster.com/audio/prons/en/us/mp3/' + subDirectory + '/' + audio[i].audio + '.mp3');
                        newWavs.push('https://media.merriam-webster.com/audio/prons/en/us/wav/' + subDirectory + '/' + audio[i].audio + '.wav');
                    }
                }
                console.log(audio)
                console.log(newMp3s);
                console.log(newWavs);
                // updates all pertinent state variables
                if (resEntries.length === 0)
                    setError(`No results for "${query.replace(query[0], query[0].toUpperCase())}" from the Merriam-Webster Collegiate Dictionary...`);
                setIsOffensive(isOffensive);
                setNotOffensive(notOffensive);
                setPronunciations(newPronunciations);
                setHeadWords(newHeadWords);
                setEntriesByType(entryTypes);
                setMp3s(newMp3s);
                setWavs(newWavs);
                setAudioLoaded(true);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query, setIsOffensive, setNotOffensive, setPronunciations, setHeadWords, setMp3s, setWavs, setAudioLoaded]);


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
                            {entries.length}
                            )
                            <span className="rIOrange">
                                &nbsp;-&nbsp;
                            </span>
                            <i>
                                <u>
                                    Merriam-Webster Collegiate Dictionary
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
                                        <Accordion key={index}>
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
                                                        entriesByType[type].map((entry, index) => (
                                                            <Accordion
                                                                key={index}
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
                                                                                    </span>
                                                                                </strong>
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
                                                                            {(entry.hwi && entry.hwi.prs && entry.hwi.prs[0] && entry.hwi.prs[0].mw) && (
                                                                                <strong>
                                                                                    <span className="rIOrange">
                                                                                        |
                                                                                    </span>
                                                                                    <i>
                                                                                        <span className="text-info">
                                                                                            &ensp;\&nbsp;
                                                                                            {entry.hwi.prs[0].mw}
                                                                                            &nbsp;\
                                                                                        </span>
                                                                                    </i>
                                                                                </strong>
                                                                            )}
                                                                        </Typography>
                                                                        <br />
                                                                        {entry.shortdef.length > 0 && (
                                                                            entry.shortdef.map((def, index) => (
                                                                                <div key={index}>
                                                                                    <Typography>
                                                                                        <strong>
                                                                                            {index + 1}
                                                                                            :
                                                                                        </strong>
                                                                                        &nbsp;"
                                                                                        {def}
                                                                                        "
                                                                                    </Typography>
                                                                                    <br />
                                                                                </div>
                                                                            ))
                                                                        )}
                                                                        {(entry.date || entry.et) && (
                                                                            <>
                                                                                <hr />
                                                                                <Typography>
                                                                                    <strong>
                                                                                        Origin:&nbsp;
                                                                                    </strong>
                                                                                    {entry.date && (
                                                                                        <>
                                                                                            <i>
                                                                                                {entry.date.replace(/{.*}/g, '')}
                                                                                            </i>
                                                                                            <strong>
                                                                                                &nbsp;;
                                                                                            </strong>
                                                                                        </>
                                                                                    )}
                                                                                    {(entry.et && entry.et[0][1]) && (
                                                                                        <>
                                                                                            <br />
                                                                                            &emsp;{entry.et[0][1]}
                                                                                        </>
                                                                                    )}
                                                                                </Typography>
                                                                            </>
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

export default MWDictRes;