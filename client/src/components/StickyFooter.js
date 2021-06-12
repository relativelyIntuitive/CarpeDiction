import React from 'react';

import gh_icon from '../static/images/github_icon_square_purple.png';
import li_icon from '../static/images/linkedin_icon_square_purple.png';

import Copyright from '../components/Copyright'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(2.1, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));


// StickyFooter sticks to the bottom of the page and contains the copyright statement and social media links
const StickyFooter = () => {

    // generates CSS rulesets
    const classes = useStyles();


    return (
        <footer className={classes.footer}>
            <CssBaseline />
            <Grid container
                justify="space-between"
                alignItems="center"
            >
                <Grid container
                    item
                    justify="flex-start"
                    alignItems="center"
                    xs={6}
                >
                    <Copyright />
                </Grid>
                <Grid container
                    item
                    justify="flex-end"
                    alignItems="center"
                    xs={6}
                >
                    <Link
                        href="https://www.linkedin.com/in/relativelyIntuitive"
                        target="_blank"
                    >
                        <img
                            src={li_icon}
                            width="35"
                            height="35"
                            className="d-inline-block align-top socialIcon"
                            alt="LinkedIn!"
                        />
                    </Link>
                    <Link
                        href="https://github.com/relativelyIntuitive"
                        target="_blank"
                    >
                        <img
                            src={gh_icon}
                            width="35"
                            height="35"
                            className="d-inline-block align-top socialIcon"
                            alt="GitHub!"
                        />
                    </Link>
                </Grid>
            </Grid>
        </footer>
    );
};

export default StickyFooter;