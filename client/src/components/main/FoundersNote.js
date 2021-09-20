import React from 'react';

import Typography from '@material-ui/core/Typography';



// FoundersNote component displays a note from me
const FoundersNote = () => {
    // returns the note 
    return (
        <>
            <h3 className="rIPurple">
                <strong>
                    <i>
                        <span className="qQuotes">
                            *&nbsp;
                        </span>
                        <u>
                            Founder's note
                        </u>
                        <span className="qQuotes">
                            &nbsp;*
                        </span>
                    </i>
                </strong>
            </h3>
            <div className="cdAbout">
                <Typography>
                    <strong>
                        &emsp;Greetings to you, denizens and fellow logophiles,
                        <br />
                        <br />
                        &emsp;&emsp;Welcome to CarpeDiction! Here, in this veritable verbal shangri-la, language and history are celebrated, and censorship is spurned! The accessibility and dissemination of knowledge is essential to the evolution of our species, as well as the growth and development of our own souls. Words carry great power, and I created this site in an attempt to bring the obscurely dendritic patterns of the American-English lexicon into focus. It is my sincerest hope that it will be able to foster new and exciting insights for all!
                        <br />
                        <br />
                        &emsp;&emsp;Any and all correspondence is both welcome and encouraged, so feel free to contact me at any of my linked profiles in the bottom right. If you're bored, check out the list other fascinating and informative links that I have compiled at the bottom of this page. I would love to hear about any issues, inspirations or ideas that you may encounter while browsing the site! Register to gain access to favorites and take part in the discussions! Query a word, phrase, suffix, prefix or colloquialism to get started, but beware: for better or for worse, results are uncurated and may be offensive! Enjoy!
                        <br />
                        <br />
                        &emsp;&ensp;- Zack
                    </strong>
                </Typography>
            </div>
        </>
    );
};


export default FoundersNote;