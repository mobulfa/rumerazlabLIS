if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('../utils/expressError');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.set('strictQuery', false);


//------------------DB CONNECTion
const connDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);

    }
}

//REQUIRE ROUTERS
const customerRouter = require('../server/router/lisRouter');

//Configure EJS-MATE
app.engine('ejs', ejsMate);

//CONFIG JOIN DIRECTORY PATH
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'ejs');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
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
app.use('/', customerRouter);


connDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is Up and Running on PORT: ${PORT}`);
    })
});
