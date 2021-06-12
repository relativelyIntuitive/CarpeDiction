import React, { useEffect } from 'react';

import { navigate } from '@reach/router';



const Main = props => {

    // redirects to home
    useEffect(() => {
        navigate('/');
    });

    return (
        <>
        </>
    );
};


export default Main;