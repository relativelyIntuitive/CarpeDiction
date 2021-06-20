import React from 'react';

import Axios from '../../../server/node_modules/axios';
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
        Axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => {
                setLogged(null);
                navigate('/');
            });
    };


    // deletes the User
    const deleteUser = e => {
        Axios.delete('http://localhost:8000/api/users/' + logged._id, { withCredentials: true })
            .then(res => {
                handleLogout();
                successCallback();
            })
            .catch(err => {
                if (err.response.status === 401)
                    navigate('/login');
            });
    };

    // deletes the Comment
    const deleteComment = e => {
        Axios.delete('http://localhost:8000/api/comments/delete/' + comment._id, { withCredentials: true })
            .then(res => {
            })
            .catch(err => {
                if (err.response.status === 401)
                    navigate('/login');
            });
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
                        Yes, I'm a fool!
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