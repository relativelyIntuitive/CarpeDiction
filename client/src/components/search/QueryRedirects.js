import React from 'react';

import Link from '@material-ui/core/Link';



// SearchRedirects component displays links to search the users query on external sites
const QueryRedirects = props => {

    // retrieves the encoded and decoded query state variables from props
    const { encQuery } = props;

    // returns the list of query redirects
    return (
        <>
            <Link
                href={"http://libraryofbabel.info/search.html"}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    * Query The Library of Babel *
                </strong>
            </Link>
            <br />
            <Link
                href={"http://www.wikipedia.com/wiki/" + encQuery}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    * Query Wikipedia *
                </strong>
            </Link>
            <br />
            <Link
                href={"http://www.google.com/search?q=" + encQuery}
                target="_blank"
                style={{ textDecoration: "none" }}
            >
                <strong className="flatLinkRedirect mgWordBreak">
                    * Query Google *
                </strong>
            </Link>
        </>
    );
};


export default QueryRedirects;