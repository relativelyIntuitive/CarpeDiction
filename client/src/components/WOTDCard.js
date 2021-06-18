import React, { useEffect, useState } from 'react';

import Axios from '../../../server/node_modules/axios';
import { Link } from '@reach/router';

import WOTDArchive from './WOTDArchive';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    root: {
        width: '75%',
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


const WOTDCard = () => {

    // generates CSS rulesets
    const classes = useStyles();

    // state variables for handling the WOTD data
    const [word, setWord] = useState("");
    const [def, setDef] = useState("");
    const [loaded, setLoaded] = useState(false);

    // retrieves the WOTD data
    useEffect(() => {
        Axios.get('http://localhost:8000/api/wotd/latest')
            .then(res => {
                console.log(res.data);
                const newWord = res.data.WOTD.word;
                const newDef = res.data.WOTD.def;
                setWord(newWord);
                setDef(newDef);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [setDef, setWord])

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
                {loaded && (
                    <>
                        <Typography
                            className="rIPurple"
                            variant="h4"
                            component="h2"
                        >
                            <strong className="qQuotes">
                                "&nbsp;
                                <span className="rIPurple">
                                    {word}
                                </span>
                                &nbsp;"
                            </strong>
                        </Typography>
                        <Typography
                            variant="body2"
                            variant="h5"
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
                        </Typography>
                    </>
                )}
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