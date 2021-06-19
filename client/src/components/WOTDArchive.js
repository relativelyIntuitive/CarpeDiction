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


// WOTDArchive retrieves the archive of all previous WOTDs
const WOTDArchive = props => {

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of words
    const [words, setWords] = useState([]);
    const [loaded, setLoaded] = useState(false);


    // retrieves the WOTD archive
    useEffect(() => {
        Axios.get('http://localhost:8000/api/wotd/archive')
            .then(res => {
                const newWords = res.data.Archive;
                setWords(newWords);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [setWords, setLoaded]);


    // returns a material UI accordion component displaying the rWOTD archive
    return (
        <div className={classes.root}>
            <Accordion className="rIWOTDAccordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        <strong>
                            <i>
                                <u>
                                    WOTD Monthly Archive
                                </u>
                            </i>
                        </strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loaded && (
                        <div className={classes.root}>
                            {words.length > 0 && (
                                <ul className="inlineList">
                                    {words.map((word, index) => (
                                        <li key={index} className="mgInlineBlock">
                                            <Typography>
                                                &nbsp;
                                                <Link to={"/search/" + words[index].word}>
                                                    <i>
                                                        <span className="rIPurple">
                                                            {word.word}
                                                        </span>
                                                    </i>
                                                </Link>
                                                {(words.indexOf(word) !== (words.length - 1)) && (
                                                    <strong>
                                                        <span className="rIOrange">
                                                            &ensp;|&nbsp;
                                                        </span>
                                                    </strong>
                                                )}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </AccordionDetails>
            </Accordion>
        </div >
    );
}

export default WOTDArchive;