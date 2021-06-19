const Comment = require("../models/comment.model");



// posts a new comment
module.exports.post = (req, res) => {
    Comment.create(req.body)
        .then(comment => {
            res.json({
                msg: "Comment posted successfully!",
                comment: {
                    _id: comment._id,
                    query: comment.query,
                    content: comment.content,
                    user: comment.user,
                },
            });
        })
        .catch(err => {
            console.log(err.errors)
            res.status(400).json(err)
        });
};


// retrieves all comments for the query
module.exports.retrieve = (req, res) => {
    Comment.find({ query: req.params.query }).sort({ _id: -1 }).populate('user')
        .then(comments => res.json({
            msg: "Comments retrieved successfully!",
            comments: comments,
        }))
        .catch(err => res.status(400).json(err));
};

// deletes the comment via it's ID
module.exports.deleteComment = (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.status(401).json(err));
};
