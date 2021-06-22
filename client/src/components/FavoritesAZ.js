import React from 'react';

import { Link } from '@reach/router';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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


// FavoritesAZ retrieves a list of the user's favorite words sorted alphabetically
const FavoritesAZ = props => {

    // retrieves user data from props
    const { user } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // local list to hold favs for sorting so as not to mutate original
    const favsToSort = user.favs;

    // returns a material UI accordion component displaying the user's favorites list
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
                                    Favorite Queries (A - Z)
                                </u>
                            </i>
                        </strong>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={classes.root}>
                        {favsToSort.length > 0 && (
                            <ul className="inlineList">
                                {favsToSort.sort().map((word, index) => (
                                    <li key={index} className="mgInlineBlock">
                                        <Typography>
                                            &nbsp;
                                            <Link to={"/search/" + word}>
                                                <i>
                                                    <span className="rIPurple mgWordBreak">
                                                        {word}
                                                    </span>
                                                </i>
                                            </Link>
                                            {(favsToSort.indexOf(word) !== (favsToSort.length - 1)) && (
                                                <strong>
                                                    <span className="rIOrange">
                                                        &nbsp;|&nbsp;
                                                    </span>
                                                </strong>
                                            )}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div >
    );
}


export default FavoritesAZ;