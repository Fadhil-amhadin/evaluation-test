const fs = require('fs');
const http = require('http');
const express = require('express');
const flash = require("express-flash");
const session = require('express-session');
const dbConnection = require('./connection/db');

const port = 3000;
const app = express();

const detailRoute = require('./routes/detail');
const authRoute = require('./routes/auth');
const CUDRoute = require('./routes/CUD');

//set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

//session
app.use(
    session({
      cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true,
      },
      store: new session.MemoryStore(),
      saveUninitialized: true,
      resave: false,
      secret: 'secretValue',
    })
  );

// use flash for sending message
app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.get('/', (req, res) => {
    dbConnection.getConnection((err, conn) => {
        const query = 'SELECT * FROM collections_tb WHERE user_id=?';

        fs.readFile('userId.txt', 'utf-8', (err, user) => {
            conn.query(query, user, (err, results) => {
                if (err) throw err;

                res.render('index', {title: 'Homepage', items: results, isLogin: req.session.isLogin})
            })
        })
        conn.release();
    })
})

app.use('/', detailRoute);
app.use('/', authRoute);
app.use('/', CUDRoute);

const server = http.createServer(app);
server.listen(port, () =>{
    console.log(`server running on port: ${port}`);
});