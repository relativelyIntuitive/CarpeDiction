import React from 'react';

import Axios from '../../../server/node_modules/axios';
import { navigate } from '@reach/router';

import { Button } from 'react-bootstrap';



// DeleteButton is a reusable button that deletes + logs out the current user
const DeleteButton = props => {

    // retrieves the userId, successCallback function and logged state variables from props
    const { logged, setLogged } = props;


    // function to handle logouts
    const handleLogout = () => {
        Axios.get('http://localhost:8000/api/logout', { withCredentials: true })
        .then(res => {
                setLogged(null);
                navigate('/');
            })
            .catch(err => console.log(err));
    };


    // deletes the User and executes successCallback() function to remove them from DOM
    const deleteUser = e => {
        Axios.delete('http://localhost:8000/api/users/' + logged._id, { withCredentials: true })
            .then(res => {
                handleLogout();
            })
            .catch(err => {
                if (err.response.status === 401)
                    navigate('/login');
            });
    };


    // returns a delete button
    return (
        <Button
            onClick={deleteUser}
            size="sm"
            variant="outline-danger"
            className="dButt"
        >
            <strong>
                Yes, I'm a fool!
            </strong>
        </Button>
    );
};

export default DeleteButton;