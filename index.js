var express = require("express");
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser);

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "clouddb",
    port: "3306",
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

//host: 127.0.0.1

app.get('/', (req, res) => {
    res.send("Ratings Service");
});

app.get('/ratings', (req, res) => {
    var movieId = req.query.movieid;
    if (movieId!==null) {
        con.connect(function(err) {
            con.query(`SELECT * FROM test.ratings WHERE movieId = '` + movieId + `'`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send(result);
            });    
        });
    } else {
        res.status(500).json({"error":"Something went wrong. Check your input."});
    }
});


app.post('/ratings', function(req, res){
    var rating = req.body.rating;
    var movieid = req.body.movieid;
    var userid = req.body.userid;

    if (movieid !== null && rating !== null && userid !== null) {
        con.connect(function(err) {
            con.query('INSERT INTO test.ratings (userId, movieId, rating) VALUES (' + userid + ',' + movieid + ',' + rating +')', function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send(result);
            });
        });
    } else {
        res.status(500).json({"error":"Something went wrong. Check your input."});
    }

    res.send("test");
}); 

app.listen(8080, () => {
    console.log("Server running on port 8080");
});