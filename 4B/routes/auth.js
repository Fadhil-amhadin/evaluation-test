const dbConnection = require("../connection/db");
const router = require("express").Router();
const fs = require('fs');

//get method
router.get('/login', (req, res) => (res.render('login', {title: 'Login Page', isLogin: req.session.isLogin})));
router.get('/register', (req, res) => (res.render('register', {title: 'Register page', isLogin: req.session.isLogin})));
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
});

//post method
//login
router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const query = 'SELECT id, email, username, password FROM user_tb WHERE email= ? AND password = ?';

    if (email == '' || password == ''){
        req.session.message = {
            type: 'danger',
            message: 'Please fill the input!'
        }
        res.redirect('/login');
        return;
    }
    dbConnection.getConnection((err, conn) =>{
        if(err) throw err;

        conn.query(query, [email, password], (err, result) =>{
            if(err) throw err;

            if(result.length === 0){
                req.session.message = {
                    type: 'danger',
                    message: 'email or password is incorrect!'
                }
                return res.redirect('/login');
            }else{
                req.session.message = {
                    type: 'success',
                    message: 'You are login'
                }
                fs.writeFile('userId.txt', result[0].id.toString(), err => {
                  if(err) throw err;
                })
                req.session.isLogin = true;
                req.session.user = {
                    id: result[0].id,
                    email: result[0].email
                };
                console.log(req.session.user.id);
 
                return res.redirect('/');
            }
        })
        conn.release();
    })
})

//registration
router.post('/register', function (req, res) {
    const {email, username, password, passwordConfirm } = req.body;
  
    const query = "INSERT INTO user_tb (email, username, password) VALUES (?,?,?)";
  
    if (email == "" || username == "" || password == "" || passwordConfirm == "") {
      req.session.message = {
        type: "danger",
        message: "Please fulfill input",
      };
      res.redirect('/register');
      return;
    }
    if (password !== passwordConfirm){
      req.session.message = {
        type: "danger",
        message: "Please confirm your password!",
      };
      res.redirect('/register')
      return
    }
  
    dbConnection.getConnection((err, conn) => {
      if (err) throw err;
  
      conn.query(query, [email, username, password], (err, results) => {
        if (err) throw err;
  
        req.session.message = {
          type: "success",
          message: "register successfull",
        };
        res.redirect("/login");
      });
      conn.release();
    });
  });

module.exports = router;