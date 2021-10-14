const { query } = require('../connection/db');
const dbConnection = require('../connection/db');
const router = require('express').Router();

router.get('/detail/:id', (req, res) => {
    const query = 'SELECT collections_tb.name, task_tb.id, task_tb.name AS taskName, task_tb.is_done FROM collections_tb LEFT JOIN task_tb ON collections_tb.id = task_tb.collectiion_id WHERE collections_tb.id=?;';
    dbConnection.getConnection((err, conn) => {
        if(err) throw err;

        conn.query(query, [req.params.id], (err, results) => {
            if(err) throw err;

            res.render('detail', {title: 'detail page', items: results, parId: req.params.id});
        })
        conn.release();
    })
})

router.post('detail/:name', (req, res) => {
    const query = 'DELETE FROM task_tb WHERE id=?';

    const {id} = req.body;
    console.log(req.body)
    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [id], (err, results) => {
            if (err) throw err;

            res.redirect(`./${req.params.id}`);
        })
        conn.release();
    }) 
})

router.post('/detail/:id', (req, res) => {
    const query = 'UPDATE task_tb SET is_done=1 WHERE id=?';
    const {id} = req.body;
    dbConnection.getConnection((err, conn) => {
        if (err) throw err;

        conn.query(query, [id], (err, results) => {
            if (err) throw err;

            res.redirect(`./${req.params.id}`);
        })
        conn.release();
    })
})

module.exports = router;