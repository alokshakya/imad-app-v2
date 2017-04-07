var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var config = {
  host: 'db.imad.hasura-app.io',
  port: '5432',
  user: 'alokshakya',
  database: 'alokshakya',
  password: process.env.DB_PASSWORD
  
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);
app.get('/test-db', function(req, res){
    // database functioning cheking
    pool.query("SELECT * FROM testing", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});
function hash(input, salt){
    //512 is the key length of hashed value.
    var hashed= crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    //return hashed.toString('hex'); returns only string
    return["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function(req,res){
    var salt ='this-is-random-salt';
    var hashedString = hash(req.params.input,salt);
    res.send(hashedString);
});

//create user function
//
/*
use this command to check post method using curl commands
 curl -XPOST -H 'Content-Type:application/json' --data '{"username":"alokshakya","password":"alokshakya"}' http://alokshakya.imad.hasura-app.io/create-user
*/
//
app.post('/create-user', function(req,res){
    // fetch user name and password from body
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt); // creating hash value from password
    pool.query('INSERT INTO "user" (username, password) VALUES ($1,$2)',[username, dbString], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send("user succesfully created :"+username);
        }
    });
    
});
// getting articles information with no SQL injection
app.get('/articles/:articleName', function(req, res){
    // database functioning cheking
    pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/stylepost.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'stylepost.css'));
});
app.get('/ui/post.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'post.js'));
});
app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/post', function(req, res){
    //res.sendFile(path.join(_dirname, 'ui', 'post.html'));
   // res.send('post will be served here');
    res.sendFile(path.join(__dirname, 'ui', 'post.html'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
