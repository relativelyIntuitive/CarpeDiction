import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';



// Links component lists links to other interesting sites
const Links = () => {
    // returns the list of links
    return (
        <>
            <h3 className="qQuotes">
                Educational & Beguiling Links:
            </h3>
            <br />
            <Typography className="">
                <strong>
                    <i>
                        <Link
                            target="_blank"
                            href="http://www.ZeeboVO.com"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; Zeebo Voiceover &lt;
                            <br />
                            (My side hustle)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="http://libraryofbabel.info"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; The Library of Babel &lt;
                            <br />
                            (Artistic language experiment)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://www.dictionaryofobscuresorrows.com/"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; The Dictionary of Obscure Sorrows &lt;
                            <br />
                            (Exactly what it sounds like!)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://archive.org/web/"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; The Wayback Machine &lt;
                            <br />
                            (Archive of the internet)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://www.duolingo.com/"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; Duolingo &lt;
                            <br />
                            (Free Language Courses)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://ocw.mit.edu/"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; MIT OCW &lt;
                            <br />
                            (Free College Courses from MIT)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://www.freecodecamp.org/learn/"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; FreeCodeCamp &lt;
                            <br />
                            (Free Online Coding Bootcamp)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="http://www.youtube.com/user/vsauce"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; Vsauce &lt;
                            <br />
                            (Science/Philosophy Videos)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://www.youtube.com/user/zbielicki88"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; My YouTube library &lt;
                            <br />
                            (Music/Misc.)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="https://www.youtube.com/watch?v=1t1OL2zN0LQ"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; How to solve a Rubik's Cube &lt;
                            <br />
                            (Beginner video)
                        </Link>
                        <br />
                        <br />
                        <Link
                            target="_blank"
                            href="http://bitcoinfaq.io"
                            className="flatLinkRedirect"
                            style={{ textDecoration: "none" }}
                        >
                            &gt; Bitcoin FAQ &lt;
                            <br />
                            (A friend's site)
                        </Link>
                    </i>
                </strong>
            </Typography>
        </>
    );
};


export default Links;