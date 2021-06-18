const WOTD = require("../models/wotd.model");



// creates a WOTD entry
module.exports.add = (req, res) => {
    WOTD.create(req.body)
    .then(wotdNew => {
        res.json({
                msg: "WOTD saved successfully!",
                WOTD: {
                    _id: wotdNew._id,
                    word: wotdNew.word,
                    def: wotdNew.def,
                }
            });
    })
    .catch(err => res.status(400).json(err));
};


// retrieves newest WOTD
module.exports.latest = (req, res) => {
    WOTD.findOne({}).sort({_id:-1}).limit(1)
        .then(wotd => res.json({
            msg: "WOTD retrieved successfully!",
            WOTD: {
                _id: wotd._id,
                word: wotd.word,
                def: wotd.def,
            }
        }))
        .catch(err => res.status(400).json(err));
};


// retrieves archive of WOTD
module.exports.archive = (req, res) => {
    WOTD.find({}).sort({_id:-1}).limit(31)
        .then(archive => res.json({
            msg: "Archive retrieved successfully!",
            Archive: archive,
        }))
        .catch(err => res.status(400).json(err));
};
