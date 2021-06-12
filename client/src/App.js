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
                />
                <Search
                    path="/search/:query"
                    logged={logged}
                    setLogged={setLogged}
                />
                <Register
                    path="register/"
                    logged={logged}
                    setLogged={setLogged}
                />
                <Login
                    path="login/"
                    logged={logged}
                    setLogged={setLogged}
                />
                <Detail
                    path="user/account"
                    logged={logged}
                    setLogged={setLogged}
                />
                <Update
                    path="user/account/edit"
                    logged={logged}
                    setLogged={setLogged}
                />
                <Delete
                    path="user/account/delete"
                    logged={logged}
                    setLogged={setLogged}
                />
            </Router>
        </div>
    );
}

export default App;