if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError');

const session = require('express-session');
const flash = require('connect-flash');

const app = express();

//REQUIRE ROUTERS
const customerRouter = require('./server/router/lisRouter');

//Configure EJS-MATE
app.engine('ejs', ejsMate);

//CONFIG JOIN DIRECTORY PATH
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');



app.use(express.static('public'));
app.use(express.static('assets'));
//Setup for Session
const sessionConfig = {
    secret: 'thisismysecret',
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    next();
})

//PARSE FORM DATA THROUGH URL
app.use(express.urlencoded({ extended: true }));

//Override method on Form
app.use(methodOverride('_method'));

//EXCECUTE ROUTER
app.use('', customerRouter);

app.listen(8080, () => {
    console.log('Server is Up and Running on PORT: 8080');
})