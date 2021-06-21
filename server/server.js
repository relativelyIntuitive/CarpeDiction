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
app.use(cors({ credentials: true, origin: 'https://www.carpediction.com' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allows Ecpress to set browser cookies
app.enable('trust proxy');
app.use((req, res, next) => {
    if (req.secure) {
        next();
    } else {
        res.redirect('https://' + req.headers.host + req.url);
    }
});
// Express redirect to handle manual refreshes and typed URLs
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


// imports routes to express app
require('./routes/user.routes')(app);
require('./routes/wotd.routes')(app);
require('./routes/comment.routes')(app);


// scrapes a random WOTD every 24 hours and saves it to the db
setInterval(
    function getWOTD() {
        const WOTD = {};

        Axios.get('http://randomword.com/')
            .then(res => {
                const html = res.data;
                const $ = cheerio.load(html);
                WOTD.word = $('#random_word').text().trim();
                WOTD.def = $('#random_word_definition').text().trim();
                console.log(WOTD);
                Axios.post(`${process.env.API_ROOT}/api/wotd/add`, WOTD)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },
    // repeat every 24 hours (expressed in ms)
    86400000
    // 5 second repeat to uncomment for initial archive population (expressed in ms)
    // 500000
)