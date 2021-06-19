import React, { useEffect, useState } from "react";

import Axios from '../../../server/node_modules/axios';

import DeleteButton from '../components/DeleteButton';

import { Button } from 'react-bootstrap';

import { Divider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        marginBottom: '1rem',
    },
    paper: {
        padding: "40px 20px",
        backgroundColor: '#acff2f88',
        borderRadius: '23px',
        border: '2px solid black',
    },
    heading: {
        margin: 0,
        textAlign: "left",
    },
    divider: {
        margin: "30px 0",
    },
}));


// comments displays all comments for the query and allows the user to post if they are logged in
const Comments = props => {

    // retrieves search variables from props
    const { query,
        logged } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to handle comments
    const [newComment, setNewComment] = useState({});
    const [comments, setComments] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState([]);


    useEffect(() => {
        Axios.get('http://localhost:8000/api/comments/retrieve/' + query)
            .then(res => {
                const resComments = res.data.comments;
                setComments(resComments);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, [query, setComments, comments]);

    const postComment = comment => {
        Axios.post('http://localhost:8000/api/comments/post/', comment, { withCredentials: true })
            .then(res => {
                setErrors([]);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    // handler to update comment on input change
    const handleInputChange = e => {
        setNewComment({
            query: query,
            user: logged._id,
            [e.target.name]: e.target.value,
        });
    };

    // handler when the comment is submitted
    const handleSubmit = e => {
        // prevent default behavior of the submit
        e.preventDefault();
        // update the comments state variable to force a rerender of the list from the hook dependencies
        comments.push(newComment);
        // make a post request with the submitCallback to post the new comment
        postComment(newComment);
    };


    // returns a list of comments if found and an input field if the user is logged in
    return (
        <>
            <Paper className={classes.paper}>
                {loaded && (
                    <>
                        {logged !== null && (
                            <form
                                className={classes.root}
                                noValidate autoComplete="off"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Comment..."
                                    name="content"
                                    variant="outlined"
                                    multiline
                                    className="commentBox"
                                    onChange={handleInputChange}
                                />
                                {errors.length > 0 && (
                                    errors.map((err, index) => (
                                        <Typography
                                            className="text-danger resHeading"
                                            key={index}
                                        >
                                            <strong>
                                                {err}
                                            </strong>
                                        </Typography>
                                    ))
                                )}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    className="formButt mt-sm-3"
                                >
                                    Post!
                                </Button>
                            </form>
                        )}
                        {logged === null && (
                            <Typography className="text-danger resHeading">
                                <strong>
                                    <i>
                                        You must be signed in to post comments!
                                    </i>
                                </strong>
                            </Typography>
                        )}
                        <Divider
                            variant="fullWidth"
                            className={classes.divider}
                        />
                        {comments.length < 1 && (
                            <Typography className="rIPurple resHeading">
                                <strong>
                                    <i>
                                        There are not yet any comments for "
                                        {query}
                                        ," be the first!
                                    </i>
                                </strong>
                            </Typography>
                        )}
                        {comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <h5 className={classes.heading}>
                                        <span className="qQuotes">
                                            &ensp;@
                                        </span>
                                        <i className="rIPurple">
                                            {comment.user.userName}
                                        </i>
                                    </h5>
                                    <p className="cdParagraph">
                                        &emsp;&emsp;
                                        {comment.content}
                                        <br />
                                        <br />
                                        <Grid
                                            container
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <Grid
                                                item
                                                xs={9}
                                            >
                                                <i className="text-muted">
                                                    ~
                                                    {comment.createdAt.split("T")[0]}
                                                </i>
                                            </Grid>
                                            {(comment.user !== null) && (logged !== null) && (comment.user._id === logged._id) && (
                                                <Grid
                                                    item
                                                    xs={3}
                                                    className="mgTxtRight"
                                                >
                                                    <DeleteButton
                                                        buttFunc={'comment'}
                                                        comment={comment}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </p>
                                    <Divider
                                        variant="fullWidth"
                                        className={classes.divider}
                                    />
                                </div>
                            )
                        })}
                    </>
                )
                }
            </Paper>
        </>
    );
}

export default Comments;