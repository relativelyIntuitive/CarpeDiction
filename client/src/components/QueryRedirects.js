import React from 'react';

import Link from '@material-ui/core/Link';


// SearchRedirects component displays links to search the users query on external sites
const QueryRedirects = props => {

    // retrieves the encoded and decoded query state variables from props
    const { decQuery, encQuery } = props;

    // returns the list of query redirects
    return (
        <>
            <Link
                href={"http://libraryofbabel.info/search.html"}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    Search The Library of Babel for "
                    {decQuery}
                    "
                </strong>
            </Link>
            <br />
            <Link
                href={"http://www.wikipedia.com/wiki/" + encQuery}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    Search Wikipedia for "
                    {decQuery}
                    "
                </strong>
            </Link>
            <br />
            <Link
                href={"http://www.google.com/search?q=" + encQuery}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    Search Google for "
                    {decQuery}
                    "
                </strong>
            </Link>
        </>
    );
};


export default QueryRedirects;