import React, { useState } from 'react';

import Axios from '../../../server/node_modules/axios';
import { navigate } from '@reach/router';

import 'bootstrap/dist/css/bootstrap.min.css';
import ri_icon from '../images/ri_icon.png';
import carpe_diction from '../images/carpe_diction.png';

import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



// NavBar sticks to the top of the page to handle logout and searching
const NavBar = props => {

    // grabs logged state variables from props
    const { logged,
        setLogged,
        setAudioLoaded,
        setSyllables } = props;

    // state variables to keep track of what is being typed in search
    const [query, setQuery] = useState("");
    const [softQuery, setSoftQuery] = useState("");

    // handler to update query state on input change
    const handleInputChange = e => {
        setSoftQuery(e.target.value);
    };

    // handler when the search form is submitted
    const handleSubmit = e => {
        // prevent default behavior of the submit
        e.preventDefault();
        // reset audioLoaded to force rerender of player on Search.js
        if (softQuery !== query) {
            setAudioLoaded(false);
            setSyllables("");
            setQuery(softQuery);
            // if query is present, redirect to search view, passing along the query
            if (softQuery !== undefined && softQuery.replace(/\s/g, '').length)
                navigate('/search/' + softQuery);
        }
    };

    // function to handle logouts
    const handleLogout = () => {
        Axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                setLogged(null);
                navigate('/');
            })
            .catch(err => console.log(err));
    };


    // returns NavBar
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
        >
            <CssBaseline />
            <Form
                onSubmit={handleSubmit}
                className="mr-auto"
                inline
            >
                <Navbar.Brand className="cdNav">
                    <Link href="/">
                        <img
                            src={carpe_diction}
                            width=""
                            height="40"
                            className="d-inline-block mr-sm-1"
                            alt="CarpeDiction!"
                        />
                    </Link>
                    <Typography className="d-inline rIOrange">
                        <i>
                            by&nbsp;
                        </i>
                    </Typography>
                    <Link href="http://github.com/relativelyIntuitive" target="_blank">
                        <img
                            src={ri_icon}
                            width="25"
                            height="25"
                            className="d-inline-block mr-sm-1"
                            alt="rI : "
                        />
                    </Link>
                </Navbar.Brand>
                <div className="sForm cdNav">
                    <FormControl
                        type="text"
                        placeholder="Query..."
                        className="sBox mgSearchControl"
                        onChange={handleInputChange}
                    />
                    <Button
                        className="sButt"
                        variant="warning"
                        type="submit"
                    >
                        <strong>
                            Search!
                        </strong>
                    </Button>
                </div>
            </Form>
            <Nav>
                <Navbar.Text className="cdNav">
                    {logged !== null &&
                        <>
                            <i>
                                Signed in as:&nbsp;
                            </i>
                            <Link
                                href="/user/account"
                                className="flatLinkOrange"
                                style={{ textDecoration: "none" }}
                            >
                                <span className="rIOrange">
                                    <strong>
                                        {logged.userName}&nbsp;
                                    </strong>
                                </span>
                            </Link>
                            <i>
                                Not you?&ensp;
                            </i>
                            <Button
                                onClick={handleLogout}
                                size="sm"
                                variant="outline-danger"
                                className="ml-sm-1"
                            >
                                <span>
                                    <strong>
                                        Log Out
                                    </strong>
                                </span>
                            </Button>
                        </>
                    }
                    {logged === null &&
                        <>
                            <i>
                                You are browsing as a guest.&nbsp;
                                <Link
                                    href="/register"
                                    className="flatLinkOrange"
                                    style={{ textDecoration: "none" }}
                                >
                                    <span className="flatLinkOrange">
                                        <strong>
                                            Register&nbsp;
                                        </strong>
                                    </span>
                                </Link>
                                or&ensp;
                                <Link
                                    href="/login"
                                    className="flatLinkOrange"
                                    style={{ textDecoration: "none" }}
                                >
                                    <span className="flatLinkOrange">
                                        <strong>
                                            Sign In&nbsp;
                                        </strong>
                                    </span>
                                </Link>
                                to access exclusive features!
                            </i>
                        </>
                    }
                </Navbar.Text>
            </Nav>
        </Navbar>
    );
};

export default NavBar;