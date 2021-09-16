import React from 'react';

import axios from 'axios';
import { navigate } from '@reach/router';

import { Button } from 'react-bootstrap';



// DeleteButton is a reusable button that deletes + logs out the current user
const DeleteButton = props => {

    // retrieves the logged state variables, comments if applicable and the buttons function from props
    const { logged,
        setLogged,
        comment,
        buttFunc,
        successCallback } = props;


    // function to handle logouts
    const handleLogout = () => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.get(`${process.env.REACT_APP_API_ROOT}/api/logout`, { withCredentials: true })
                .then(res => {
                    setLogged(null);
                    navigate('/');
                });
        } else {
            axios.get(`http://localhost:8000/api/logout`, { withCredentials: true })
                .then(res => {
                    setLogged(null);
                    navigate('/');
                });
        }
    };


    // deletes the User
    const deleteUser = e => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.delete(`${process.env.REACT_APP_API_ROOT}/api/users/${logged._id}`, { withCredentials: true })
                .then(res => {
                    handleLogout();
                    successCallback();
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        } else {
            axios.delete(`http://localhost:8000/api/users/${logged._id}`, { withCredentials: true })
                .then(res => {
                    handleLogout();
                    successCallback();
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        }
    };

    // deletes the Comment
    const deleteComment = e => {
        if (process.env.REACT_APP_NODE_ENV === 'production') {
            axios.delete(`${process.env.REACT_APP_API_ROOT}/api/comments/delete/${comment._id}`, { withCredentials: true })
                .then(res => {
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        } else {
            axios.delete(`http://localhost:8000/api/comments/delete/${comment._id}`, { withCredentials: true })
                .then(res => {
                })
                .catch(err => {
                    if (err.response.status === 401)
                        navigate('/login');
                });
        }
    }


    // returns a delete button
    return (
        <>
            {buttFunc === 'user' && (
                <Button
                    onClick={() => deleteUser()}
                    size="sm"
                    variant="outline-danger"
                    className="dButt"
                >
                    <strong>
                        Yes, I am a fool!
                    </strong>
                </Button>
            )}
            {buttFunc === 'comment' && (
                <Button
                    onClick={() => deleteComment()}
                    size="sm"
                    variant="outline-danger"
                    className="dButt"
                >
                    <strong>
                        Delete
                    </strong>
                </Button>
            )
            }
        </>
    );
};


export default DeleteButton;