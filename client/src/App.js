import React, { useState } from 'react';

import { Router } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Delete from './views/Delete';
import Detail from './views/Detail';
import Login from './views/Login';
import Main from './views/Main';
import NotFound from './views/NotFound'
import Register from './views/Register';
import Search from './views/Search';
import Update from './views/Update';



// React client routing setup
function App() {

    // state variable to hold logged in User
    const [logged, setLogged] = useState(
        JSON.parse(sessionStorage.getItem('logged'))
    );

    // state variables to be passed by each view to the NavBar to force rerender of audio player and syllables when redirecting to Search.js
    const [audioLoaded, setAudioLoaded] = useState(false);
    const [syllables, setSyllables] = useState("");

    // hook to update logged User in sessionStorage when the state changes
    React.useEffect(() => {
        sessionStorage.setItem('logged', JSON.stringify(logged));
    }, [logged]);

    // returns the app with routes
    return (
        <div className="App">
            <Router>
                <NotFound default />
                <Main
                    path="/"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
                <Search
                    path="/search/:query"
                    logged={logged}
                    setLogged={setLogged}
                    audioLoaded={audioLoaded}
                    setAudioLoaded={setAudioLoaded}
                    syllables={syllables}
                    setSyllables={setSyllables}
                />
                <Register
                    path="register/"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
                <Login
                    path="login/"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
                <Detail
                    path="user/account"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
                <Update
                    path="user/account/edit"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
                <Delete
                    path="user/account/delete"
                    logged={logged}
                    setLogged={setLogged}
                    setAudioLoaded={setAudioLoaded}
                    setSyllables={setSyllables}
                />
            </Router>
        </div>
    );
}

export default App;