const express = require('express');
const path = require('path');
const http = require('http');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();


//Database Connection and others
const db = require('./database/connection');

const superAdRouter = require('./routes/superadminlogreg');
const renderSupAdPages = require('./routes/rendersupadpages');
const userRouter = require('./routes/userlogreg');
const renderUserPages = require('./routes/renderuserpages');


const accountManaging = require('./routes/superadminaccmng');
const productManaging = require('./routes/userprodmng');

//set views file and set view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(express.static(path.join(__dirname, 'public' )));

app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 60000}
        }));

//routesp
app.use(renderSupAdPages);
app.use(superAdRouter);

app.use(renderUserPages);
app.use(userRouter);

app.use(accountManaging);
app.use(productManaging);

//Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`DB Server is connected through port ${PORT}`);
});