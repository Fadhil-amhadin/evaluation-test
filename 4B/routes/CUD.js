const dbConnection = require('../connection/db');
const router = require('express').Router();
const fs = require('fs');

router.post('/add', (req, res) => {
    const {name} = req.body;
    const query = 'INSERT INTO collections_tb (name, user_id) VALUES (?,?)';

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        fs.readFile('userId.txt', 'utf-8', (err, user) => {
            conn.query(query, [name, user], (err, results) => {
                if(err) throw err;
            });
        });
        res.redirect('/');
        conn.release();
    })
})

router.post('/addTask', (req, res) => {
    const {name, collections} = req.body;
    const query = 'INSERT INTO task_tb (name, is_done, collectiion_id) VALUES (?,?,?)';
    
    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [name, 0, collections], (err, results) => {
            if(err) throw err;

        })
        res.redirect('back');
    })
})

router.get('/add', (req, res) => {
    res.render('add', {title: 'add page'});
})

router.get('/addTask', (req, res) => {
    const query = 'SELECT * FROM collections_tb WHERE user_id=?';

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        fs.readFile('userId.txt', 'utf-8', (err, user) => {
            conn.query(query, [user], (err, results) => {
                if(err) throw err;

                res.render('addTask', {title: 'add page', id: req.params.id, items: results});
            })
        })
    })
})

router.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM tb_stuff WHERE id=?';
    dbConnection.getConnection((err, conn) => {
        if(err) throw err;

        conn.query(query, [req.params.id], (err, results) => {
            if (err) throw err;

            res.render('edit', {title: 'edit page', items: results, isLogin: req.session.isLogin})
        })
        conn.release();
    })
})

router.get('done', (req, res) => {
    const query = 'UPDATE task_tb SET is_done = 1 WHERE id=?';
    console.log('jj');
    const {id} = req.body;
    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [id], (err, results) => {
            if (err) throw err;
        })
        res.redirect('/')
        conn.release();
    })
})

router.post('/delete/:id', (req, res) => {
    const query ='DELETE FROM collections_tb WHERE id=?';

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [req.params.id], (err, results) => {
            if(err) throw err;
        })
        res.redirect('/');
    })
})

router.post('/deleteTask/:id', (req, res) => {
    const query ='DELETE FROM task_tb WHERE id=?';
    const {id, parId} = req.body;

    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [id], (err, results) => {
            if(err) throw err;

        })
        res.redirect(`../detail/${parId}`);
    })
})

router.get('/deleteTask/:1d', (req, res) => {
    res.render('deleteTask', {title: 'delete page'});
})

module.exports = router;