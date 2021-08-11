import React, { useEffect, useState } from 'react';

import axios from '../../node_modules/axios';
import { Link } from '@reach/router';

import WOTDArchive from './WOTDArchive';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



// defines style rulesets for Material UI components
const useStyles = makeStyles({
    root: {
        width: '85%',
        marginTop: '3rem',
        marginBottom: '3rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#adff2f',
        border: '2px dashed #800080'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
});


// WOTDCard retrieves and displays WOTD and archive accordion
const WOTDCard = () => {

    // generates CSS rulesets
    const classes = useStyles();

    // state variables for handling the WOTD data
    const [word, setWord] = useState("");
    // const [def, setDef] = useState("");
    const [loaded, setLoaded] = useState(false);


    // retrieves the WOTD data
    useEffect(() => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.get(`${process.env.REACT_APP_API_ROOT}/api/wotd/latest`)
                .then(res => {
                    console.log(res)
                    const newWord = res.data.WOTD.word;
                    // const newDef = res.data.WOTD.def;
                    setWord(newWord);
                    // setDef(newDef);
                    setLoaded(true);
                });
        } else {
            axios.get(`http://localhost:8000/api/wotd/latest`)
                .then(res => {
                    console.log(res)
                    const newWord = res.data.WOTD.word;
                    // const newDef = res.data.WOTD.def;
                    setWord(newWord);
                    // setDef(newDef);
                    setLoaded(true);
                });
        }
    }, [])


    // returns WOTD card with archive accordion
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className="qQuotes"
                    gutterBottom
                    variant="h5"
                    component="h1"
                >
                    <strong>
                        Word of the Day:
                    </strong>
                </Typography>
                <Typography
                    className="rIPurple"
                    variant="h4"
                    component="h2"
                >
                    {!loaded && (
                        <>
                            <strong className="qQuotes">
                                <i>
                                    <span className="rIPurple">
                                        ⏳ Loading... ⌛
                                    </span>
                                </i>
                            </strong>
                            {/* <Typography
                        variant="h6"
                        component="h3"
                        className="rIGrey"
                    >
                        <i>
                            <strong>
                                <br />
                                ...&nbsp;
                                {def}
                            </strong>
                        </i>
                    </Typography> */}
                        </>
                    )}
                    {loaded && (
                        <>
                            <strong className="qQuotes">
                                "
                                <span className="rIPurple">
                                    {word}
                                </span>
                                "
                            </strong>
                            {/* <Typography
                            variant="h6"
                            component="h3"
                            className="rIGrey"
                        >
                            <i>
                                <strong>
                                    <br />
                                    ...&nbsp;
                                    {def}
                                </strong>
                            </i>
                        </Typography> */}
                        </>
                    )}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={"/search/" + word} className="mgMargAuto flatLinkWOTD">
                    <strong>
                        <i>
                            * Learn more! *
                        </i>
                    </strong>
                </Link>
            </CardActions>
            <WOTDArchive />
        </Card>
    );
}


export default WOTDCard;