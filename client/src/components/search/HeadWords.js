import React from 'react';

import { Link } from '@reach/router';



// Search view returns search results
const Search = props => {

    // retrieves the logged state variables from props
    const { headWords,
        spellings } = props;


// returns the homepage
    return (
        <>
            {headWords.length > 0 && (
                <>
                    <h5 className="text-muted mt-sm-2">
                        Definitions retrieved for:
                    </h5>
                    <ul className="inlineList topList mb-sm-5 mt-sm-3">
                        {headWords.map((headWord, index) => (
                            <li
                                key={index}
                                className="mgInlineBlock"
                            >
                                <Link to={`/search/${headWord.replace(/\//g, '%2F')}`} style={{ textDecoration: 'none' }}>
                                    <strong className="flatLinkMuted">
                                        <i>
                                            &nbsp;"
                                            {headWord}
                                            "
                                            {(headWords.indexOf(headWord) !== (headWords.length - 1)) && (
                                                <>
                                                    ,
                                                </>
                                            )}
                                            {!(headWords.indexOf(headWord) !== (headWords.length - 1)) && (
                                                <>
                                                    ;
                                                </>
                                            )}
                                        </i>
                                    </strong>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {spellings.length > 0 && (
                <>
                    <h5 className="text-muted">
                        Did you mean...
                    </h5>
                    <ul className="inlineList topList">
                        {spellings.map((spelling, index) => (
                            <li
                                key={index}
                                className="mgInlineBlock"
                            >
                                <Link to={`/search/${spelling.replace(/\//g, '%2F')}`} style={{ textDecoration: 'none' }}>
                                    <strong className="flatLinkMuted">
                                        <i>
                                            &nbsp;"
                                            {spelling}
                                            "
                                            {(spellings.indexOf(spelling) !== (spellings.length - 1)) && (
                                                <>
                                                    ,
                                                </>
                                            )}
                                            {!(spellings.indexOf(spelling) !== (spellings.length - 1)) && (
                                                <>
                                                    ...?
                                                </>
                                            )}
                                        </i>
                                    </strong>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};


export default Search;