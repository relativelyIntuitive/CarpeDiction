const mongoose = require('mongoose');



// defines the model for WOTDs
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


// generates a mongoose model to export for WOTDSchema
const WOTD = mongoose.model("WOTD", WOTDSchema);

module.exports = WOTD;