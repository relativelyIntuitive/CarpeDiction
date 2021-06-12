import React, { useState } from 'react';

import { Link, navigate } from '@reach/router';

import cd_icon from '../static/images/cd_icon.png';

import { Button } from 'react-bootstrap';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



// CSS rulesets
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


// UserForm is a multipurpose form meant for registration and account detail updates
const UserForm = props => {

    // grabs the initialUser object, formFunc, errors array and submitCallback function from props
    const { submitCallback,
        formFunc,
        initialUser,
        errors } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to keep track of what is being typed
    const [user, setUser] = useState(initialUser);


    // handler to update state on input change
    const handleInputChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // handler when the form is submitted
    const handleSubmit = e => {
        // prevent default behavior of the submit
        e.preventDefault();
        // make a post request with the submitCallback to create a new User
        submitCallback(user);
    };


    // returns a User account form
    return (
        <Container
            component="main"
            maxWidth="xs"
        >
            <CssBaseline />
            <div className={classes.paper}>
                <img
                    src={cd_icon}
                    width="123"
                    height="123"
                    className="d-inline-block"
                    alt="CarpeDiction!"
                />
                <br />
                <Typography
                    component="h1"
                    variant="h5"
                >
                    <span className="rIPurple">
                        <strong>
                            {formFunc === "Update" && (
                                <>
                                    Edit Account
                                </>
                            )}
                            {formFunc === "Register" && (
                                <>
                                    Sign Up
                                </>
                            )}
                        </strong>
                    </span>
                </Typography>
                <form
                    onSubmit={handleSubmit}
                    className={classes.form}
                    noValidate
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            container
                            justify="center"
                        >
                            <Grid item>
                                {errors.length > 0 && (
                                    errors.map((err, index) => (
                                        <Typography
                                            className="text-danger"
                                            key={index}
                                        >
                                            <strong>
                                                {err}
                                            </strong>
                                        </Typography>
                                    )
                                ))}
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                className="rIFormControl"
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Username:"
                                name="userName"
                                placeholder={user.userName}
                                autoComplete="username"
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                className="rIFormControl"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email:"
                                name="email"
                                placeholder={user.email}
                                autoComplete="email"
                                onChange={handleInputChange}
                            />
                            <Typography
                                className="rIPurple"
                                variant="body2"
                            >
                                <strong>
                                    &emsp;*For sign-in purposes only. We will never email you!
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                className="rIFormControl"
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password:"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleInputChange}
                            />
                            <Typography
                                className="rIPurple"
                                variant="body2"
                            >
                                <strong>
                                    &emsp;*Password must contain 8 or more characters
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                className="rIFormControl"
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordConf"
                                label="Confirm Password:"
                                type="password"
                                id="passwordConf"
                                autoComplete="current-password"
                                onChange={handleInputChange}
                            />
                            <Typography
                                className="rIOrange"
                                variant="body2"
                            >
                                <strong>
                                    &emsp;*Password can not be recovered!
                                </strong>
                            </Typography>
                        </Grid>
                    </Grid>
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        className="formButt"
                    >
                        <strong>
                            {formFunc === "Register" && (
                                <>
                                    Register
                                </>
                            )}
                            {formFunc === "Update" && (
                                <>
                                    Update
                                </>
                            )}
                        </strong>
                    </Button>
                    <br />
                    <br />
                    {formFunc === "Register" && (
                        <>
                            <Grid
                                container
                                justify="flex-end"
                            >
                                <Link
                                    to="/login"
                                    className="flatLink"
                                >
                                    <span className="rIPurple">
                                        <strong>
                                            Already have an account? Sign in here!*&emsp;
                                        </strong>
                                    </span>
                                </Link>
                            </Grid>
                            <hr />
                            <Grid
                                container
                                justify="flex-end"
                            >
                                <Link
                                    to={"/"}
                                    className="flatLink"
                                >
                                    <span className="rIPurple">
                                        <strong>
                                            Nevermind...&emsp;
                                        </strong>
                                    </span>
                                </Link>
                            </Grid>
                        </>
                    )}
                    {formFunc === "Update" && (
                        <>
                            <hr />
                            <Grid
                                container
                                justify="center"
                            >
                                <Button
                                    size="md"
                                    variant="outline-danger"
                                    className="dButt"
                                    onClick={() => navigate("/user/account/delete")}
                                >
                                    <strong>
                                        Delete Account?
                                    </strong>
                                </Button>
                            </Grid>
                        </>
                    )}
                </form>
            </div>
        </Container>
    );
};

export default UserForm;