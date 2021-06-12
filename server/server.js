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
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// imports routes to express app
require('./routes/user.routes')(app);

