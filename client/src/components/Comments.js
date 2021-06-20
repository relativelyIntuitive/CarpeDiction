import React, { useEffect, useState } from "react";

import Axios from '../../node_modules/axios';
import { navigate } from '@reach/router';

import like_icon_purple from '../images/like_icon_purple.png';
import like_icon_orange from '../images/like_icon_orange.png';

import DeleteButton from '../components/DeleteButton';

import { Button } from 'react-bootstrap';

import { Divider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



// defines style rulesets for Material UI components
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
        marginTop: '1.5rem',
    },
    heading: {
        margin: 0,
        textAlign: "left",
    },
    divider: {
        margin: "30px 0",
    },
}));


// Comments displays all comments for the query and allows the user to post if they are logged in
const Comments = props => {

    // retrieves search and logged variables from props
    const { query,
        logged } = props;

    // generates CSS rulesets
    const classes = useStyles();

    // state variables to handle comments
    const [newComment, setNewComment] = useState({});
    const [comments, setComments] = useState([]);
    const [topComments, setTopComments] = useState([]);
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState([]);


    // retrieves all comments
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_ROOT}/api/comments/retrieve/${query}`)
            .then(res => {
                const resComments = res.data.comments;
                setComments(resComments);
                setLoaded(true);
            });
    }, [query, setComments, comments]);

    // retrieves the top comments
    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_API_ROOT}/api/comments/tops/${query}`)
            .then(res => {
                const resTopComments = res.data.comments;
                setTopComments(resTopComments);
                setLoaded(true);
            });
    }, [query, setTopComments, comments]);

    // posts a comment
    const postComment = comment => {
        Axios.post(`${process.env.REACT_APP_API_ROOT}/api/comments/post/`, comment, { withCredentials: true })
            .then(res => {
                setErrors([]);
            })
            .catch(err => {
                if (err.response.status === 401)
                    navigate('/login');
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            });
    }

    // updates comments when liked
    const updateComment = comment => {
        Axios.put(`${process.env.REACT_APP_API_ROOT}/api/comments/update/`, comment, { withCredentials: true })
            .then(res => {
            })
            .catch(err => {
                if (err.response.status === 401)
                    navigate('/login');
            });
    }

    // handler to update comment on input change
    const handleInputChange = e => {
        setNewComment({
            query: query,
            user: logged._id,
            creator: logged.userName,
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
        // clear comment box after submit
        setNewComment({
            query: query,
            user: logged._id,
            creator: logged.userName,
            content: "",
        });
    };

    // update a comment's likers
    const handleLikes = (comment) => {
        if (!comment.likers.includes(logged._id)) {
            comment.likers.push(logged._id);
        } else {
            const index = comment.likers.indexOf(logged._id);
            comment.likers.splice(index, index + 1);
        }
        // favorite the word
        updateComment(comment);
        // refresh page
        navigate('/search/' + query);
    }


    // returns a list of comments if found and an input field if the user is logged in
    return (
        <>
            <Paper className={classes.paper}>
                <h2 className="qQuotes resHeading mb-sm-3">
                    <strong>
                        <i>
                            * Discuss! *
                        </i>
                    </strong>
                </h2>
                <Divider
                    variant="fullWidth"
                    className={classes.divider}
                />
                {logged !== null && (
                    <form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <Typography className="rIPurple resHeading mb-sm-3">
                            <strong>
                                <i>
                                    <u>
                                        Post a comment for "
                                        <span className="mgWordBreak">
                                            {query}
                                        </span>
                                        "
                                    </u>
                                </i>
                            </strong>
                        </Typography>
                        <br />
                        <TextField
                            id="outlined-basic"
                            label="Comment..."
                            name="content"
                            variant="outlined"
                            multiline
                            className="commentBox"
                            onChange={handleInputChange}
                            value={newComment.content}
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
                <Typography className="rIPurple resHeading">
                    <strong>
                        <i>
                            <u>
                                Top comments for "
                                <span className="mgWordBreak">
                                    {query}
                                </span>
                                "
                            </u>
                        </i>
                    </strong>
                </Typography>
                <br />
                {loaded && (
                    <>
                        {comments.length < 1 && (
                            <>
                                <Typography className="text-danger resHeading">
                                    <strong>
                                        <i>
                                            There are not yet any comments for "
                                            <span className="mgWordBreak">
                                                {query}
                                            </span>
                                            ," be the first!
                                        </i>
                                    </strong>
                                </Typography>
                                <Divider
                                    variant="fullWidth"
                                    className={classes.divider}
                                />
                            </>
                        )}
                        {comments.length > 0 && (
                            <>
                                {topComments.length > 0 && (
                                    <>
                                        {
                                            topComments.map((topComment, index) => {
                                                return (
                                                    <div key={index}>
                                                        <h5 className={classes.heading}>
                                                            <span className="qQuotes">
                                                                &ensp;@
                                                            </span>
                                                            <i className="rIPurple">
                                                                {topComment.creator}
                                                            </i>
                                                        </h5>
                                                        <p className="cdParagraph">
                                                            &emsp;&emsp;
                                                            {topComment.content}
                                                            <br />
                                                            <br />
                                                            <Grid
                                                                container
                                                                justify="space-between"
                                                                alignItems="center"
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={6}
                                                                >
                                                                    <i className="text-muted">
                                                                        ~
                                                                        {topComment.createdAt.split("T")[0]}
                                                                    </i>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={6}
                                                                    className="mgTxtRight"
                                                                >
                                                                    <Typography className="rIPurple">
                                                                        <strong>
                                                                            <i>
                                                                                {topComment.likers && (
                                                                                    topComment.likers.length
                                                                                )}
                                                                                &nbsp;Likes
                                                                            </i>
                                                                        </strong>
                                                                    </Typography>
                                                                    {(logged !== null) && (topComment.creator === logged.userName) && (
                                                                        <DeleteButton
                                                                            buttFunc={'comment'}
                                                                            comment={topComment}
                                                                        />
                                                                    )}
                                                                    {(logged !== null) && (topComment.creator !== logged.userName) && (!topComment.likers.includes(logged._id)) && (
                                                                        <Button
                                                                            variant="outline-warning"
                                                                            className="cdLikeIcon"
                                                                            onClick={() => handleLikes(topComment)}
                                                                        >
                                                                            <img
                                                                                src={like_icon_purple}
                                                                                width=""
                                                                                height="25"
                                                                                className="d-inline-block mr-sm-1 cdTitle"
                                                                                alt="Like!"
                                                                            />
                                                                        </Button>
                                                                    )}
                                                                    {(logged !== null) && (topComment.creator !== logged.userName) && (topComment.likers.includes(logged._id)) && (
                                                                        <Button
                                                                            variant="outline-warning"
                                                                            className="cdLikeIcon"
                                                                            onClick={() => handleLikes(topComment)}
                                                                        >
                                                                            <img
                                                                                src={like_icon_orange}
                                                                                width=""
                                                                                height="25"
                                                                                className="d-inline-block mr-sm-1 cdTitle"
                                                                                alt="Unlike!"
                                                                            />
                                                                        </Button>
                                                                    )}
                                                                    {logged === null && (
                                                                        <Button
                                                                            variant="outline-warning"
                                                                            className="cdLikeIcon"
                                                                            onClick={() => navigate("/login")}
                                                                        >
                                                                            <img
                                                                                src={like_icon_purple}
                                                                                width=""
                                                                                height="25"
                                                                                className="d-inline-block mr-sm-1 cdTitle"
                                                                                alt="Like!!"
                                                                            />
                                                                        </Button>
                                                                    )}
                                                                </Grid>
                                                            </Grid>
                                                        </p>
                                                        <Divider
                                                            variant="fullWidth"
                                                            className={classes.divider}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                )}
                            </>
                        )}
                        {comments.length > 0 && (
                            <>
                                <Typography className="rIPurple resHeading">
                                    <strong>
                                        <i>
                                            <u>
                                                Latest comments for "
                                                <span className="mgWordBreak">
                                                    {query}
                                                </span>
                                                "
                                            </u>
                                        </i>
                                    </strong>
                                </Typography>
                                <br />
                                {comments.map((comment, index) => {
                                    return (
                                        <div key={index}>
                                            <h5 className={classes.heading}>
                                                <span className="qQuotes">
                                                    &ensp;@
                                                </span>
                                                <i className="rIPurple">
                                                    {comment.creator}
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
                                                        xs={6}
                                                    >
                                                        {comment.createdAt && (
                                                            <i className="text-muted">
                                                                ~
                                                                {comment.createdAt.split("T")[0]}
                                                            </i>
                                                        )}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        className="mgTxtRight"
                                                    >
                                                        <Typography className="rIPurple">
                                                            <strong>
                                                                <i>
                                                                    {comment.likers && (
                                                                        comment.likers.length
                                                                    )}
                                                                    &nbsp;Likes
                                                                </i>
                                                            </strong>
                                                        </Typography>
                                                        {(logged !== null) && (comment.creator === logged.userName) && (
                                                            <DeleteButton
                                                                buttFunc={'comment'}
                                                                comment={comment}
                                                            />
                                                        )}
                                                        {(logged !== null) && (comment.creator !== logged.userName) && (!comment.likers.includes(logged._id)) && (
                                                            <Button
                                                                variant="outline-warning"
                                                                className="cdLikeIcon"
                                                                onClick={() => handleLikes(comment)}
                                                            >
                                                                <img
                                                                    src={like_icon_purple}
                                                                    width=""
                                                                    height="25"
                                                                    className="d-inline-block mr-sm-1 cdTitle"
                                                                    alt="Like!"
                                                                />
                                                            </Button>
                                                        )}
                                                        {(logged !== null) && (comment.creator !== logged.userName) && (comment.likers) && (comment.likers.includes(logged._id)) && (
                                                            <Button
                                                                variant="outline-warning"
                                                                className="cdLikeIcon"
                                                                onClick={() => handleLikes(comment)}
                                                            >
                                                                <img
                                                                    src={like_icon_orange}
                                                                    width=""
                                                                    height="25"
                                                                    className="d-inline-block mr-sm-1 cdTitle"
                                                                    alt="Unlike!"
                                                                />
                                                            </Button>
                                                        )}
                                                        {logged === null && (
                                                            <Button
                                                                variant="outline-warning"
                                                                className="cdLikeIcon"
                                                                onClick={() => navigate("/login")}
                                                            >
                                                                <img
                                                                    src={like_icon_purple}
                                                                    width=""
                                                                    height="25"
                                                                    className="d-inline-block mr-sm-1 cdTitle"
                                                                    alt="Like!!"
                                                                />
                                                            </Button>
                                                        )}
                                                    </Grid>
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
                        )}
                    </>
                )}
            </Paper>
        </>
    );
}


export default Comments;