const mongoose = require('mongoose');



// defines the model for Users
const WOTDSchema = new mongoose.Schema({
    word: {
        type: String,
        required: [true, "No word found!"],
    },
    def: {
        type: String,
        required: false,
    }
}, { timestamps: true });


// generates a mongoose model to export for UserSchema
const WOTD = mongoose.model("WOTD", WOTDSchema);

module.exports = WOTD;