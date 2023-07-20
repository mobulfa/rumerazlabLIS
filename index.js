if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError');
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


//PARSE FORM DATA THROUGH URL
app.use(express.urlencoded({ extended: true }));

//Override method on Form
app.use(methodOverride('_method'));

//EXCECUTE ROUTER
app.use('', customerRouter);

app.listen(8080, () => {
    console.log('Server is Up and Running on PORT: 8080');
})