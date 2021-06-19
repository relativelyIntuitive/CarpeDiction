import React from 'react';

import gh_icon from '../images/github_icon_square_orange.png';
import ig_icon from '../images/ig_icon_square_orange.png';
import li_icon from '../images/linkedin_icon_square_orange.png';

import Copyright from '../components/Copyright'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';



// StickyFooter sticks to the bottom of the page and contains the copyright statement and social media links
const StickyFooter = () => {
    return (
        <footer className="sFooter">
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
                    <Link
                        href="https://www.instagram.com/zeebo_rowte/"
                        target="_blank"
                    >
                        <img
                            src={ig_icon}
                            width="35"
                            height="35"
                            className="d-inline-block align-top socialIcon"
                            alt="InstaGram!"
                        />
                    </Link>
                </Grid>
            </Grid>
        </footer>
    );
};


export default StickyFooter;