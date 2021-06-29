// configures axios and imports cheerio parser for WOTD retrieval
const Axios = require('axios');
const cheerio = require('cheerio');

// configures dotenv and mongoose
require('dotenv').config();
require('./config/mongoose.config');


// configures and initializes an express server
const express = require('express'),
    app = express(),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    port = process.env.PORT,
    server = app.listen(port, () => console.log(`Listening on port ${port}`));


// configuers and registers middleware
app.use(cookieParser());
if (process.env.NODE_ENV === 'production') {
    app.use(cors({ credentials: true, origin: 'https://www.carpediction.com' }));
} else {
    app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
}
console.log(`Server Type: ${process.env.NODE_ENV}`)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// imports routes to express app
require('./routes/user.routes')(app);
require('./routes/wotd.routes')(app);
require('./routes/comment.routes')(app);


// scrapes a random WOTD every 24 hours and saves it to the db
setInterval(
    function getWOTD() {
        const WOTD = {};

        // Axios.get('http://randomword.com/')
        Axios.get('https://www.merriam-webster.com/word-of-the-day')
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);
                // WOTD.word = $('#random_word').text().trim();
                // WOTD.def = $('#random_word_definition').text().trim();
                WOTD.word = $("h1:first").text().trim();
                WOTD.def = "";
                console.log(WOTD);
                Axios.post(`${process.env.API_ROOT}/api/wotd/add`, WOTD)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },
    // repeat every 24 hours (expressed in ms)
    // 86400000
    // repeat every hour for MW (expressed in ms)
    3600000
)