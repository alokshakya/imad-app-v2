var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');
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
app.use(session({
    secret:'someRandomSecretValue',
    Cookie: { maxAge: 1000*60*60*24*30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog', 'index.html'));
});
app.get('/img/fb.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog', 'fb.png'));
});
app.get('/img/twit.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog', 'twit.png'));
});
app.get('/img/insta.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog', 'insta.png'));
});
app.get('/img/app.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js', 'app.js'));
});
app.get('/js/ng-infinite-scroll.min.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js', 'ng-infinite-scroll.min.js'));
});
app.get('/js/controllers/MainController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'MainController.js'));
});
app.get('/js/controllers/NextPageController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'NextPageController.js'));
});
app.get('/js/controllers/createUserCtrl.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'createuserCtrl.js'));
});
app.get('/js/controllers/createArticleController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'createArticleController.js'));
});
app.get('/js/controllers/createCommentController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'createCommentController.js'));
});
app.get('/js/controllers/ArticleController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'ArticleController.js'));
});
app.get('/js/controllers/CommentController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'CommentController.js'));
});
app.get('/js/controllers/loginController.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/controllers', 'loginController.js'));
});
app.get('/js/directives/articleInfo.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/directives', 'articleInfo.js'));
});
app.get('/js/directives/commentInfo.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/js/directives', 'commentInfo.js'));
});
app.get('/blog/views/articleInfo.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/views', 'articleInfo.html'));
});
app.get('/blog/views/commentInfo.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/views', 'commentInfo.html'));
});
app.get('/css/articleDisplay.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog/css', 'articleDisplay.css'));
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
function isLogged(req){
    if(req.session && req.session.auth && req.session.auth.userId){
        return true;
        //res.send('You are logged in and your user id is : '+req.session.auth.userId.toString());//userId is int so convert  it to string
    }
    else{
        return false;
       // res.send('You are not logged in ');
    }
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
// login the user
/*
check login using command
curl -XPOST -H 'Content-Type:application/json' --data '{"username":"alokshakya","password":"alokshakya"}' http://alokshakya.imad.hasura-app.io/login
*/
app.post('/login', function(req,res){
    // fetch user name and password from body
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" WHERE username=$1',[username], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows===0)
            {
                res.status(403).send("username does not exists");
            }
            else{
                //Match the password
                var dbString=result.rows[0].password;//value of password column of first row of result
                var salt=dbString.split('$')[2];//now create hash using salt value
                var hashedPassword=hash(password,salt);
                if(hashedPassword==dbString){
                    // set the session before sending response
                    req.session.auth = { userId: result.rows[0].id };
                    // set a cookie with the session id which is  randomly generated by itself
                    // internally on the server side it maps the session id to an object
                    // this object contains value called auth and auth contains userId {auth:{usserId}}
                    // so this information is maintained on server side
                    res.send("user succesfully logged :"+username);
                }
                else{
                    res.status(503).send("password does not matches");
                }
                
            }
            
        }
    });
    
});
// checking login
app.get('/check-login', function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        
        res.send('You are logged in and your user id is : '+req.session.auth.userId.toString());//userId is int so convert  it to string
    }
    else{
        res.send('You are not logged in ');
    }
});
app.get('/checklogin', function(req,res){
    if(req.session && req.session.auth && req.session.auth.userId){
        res.send(true);//userId is int so convert  it to string
    }
    else{
        res.send(false);
    }
});
// implement logout function
app.get('/logout', function(req,res){
    //remove the auth object
    delete req.session.auth;
    res.send('logged out');
});
// getting articles information with no SQL injection
app.get('/articles/:article_id', function(req, res){
    // database functioning cheking
    var start=req.params.article_id;
    var end = parseInt(start)+3;
    console.log('start id :'+start);
    console.log('end id :'+end);
    pool.query("SELECT * FROM articles WHERE id>=$1 AND id<$2",[start,end], function(err, result){
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
app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'blog', 'favicon.ico'));
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
// starting apis for blog app
app.post('/createUser', function(req,res){
    // fetch user name and password from body
    var name=req.body.name;
    var password=req.body.password;
    var email = req.body.email;
    console.log(name);
    console.log(password);
    console.log(email);
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt); // creating hash value from password
    pool.query('INSERT INTO users (name, password,email) VALUES ($1,$2,$3)',[name, dbString, email], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            var data={message: 'user created successfully'};
            res.send(data);
        }
    });
    
});
app.post('/loginuser', function(req,res){
    // fetch user name and password from body
    var name=req.body.name;
    var password=req.body.password;
    var data=null;
    pool.query('SELECT * FROM "users" WHERE name=$1',[name], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows===0)
            {
                data={message: 'username does not exist'};
                res.status(403).send(data);
            }
            else{
                //Match the password
                var dbString=result.rows[0].password;//value of password column of first row of result
                var salt=dbString.split('$')[2];//now create hash using salt value
                var hashedPassword=hash(password,salt);
                if(hashedPassword==dbString){
                    // set the session before sending response
                    req.session.auth = { userId: result.rows[0].id,name:result.rows[0].name };
                    // set a cookie with the session id which is  randomly generated by itself
                    // internally on the server side it maps the session id to an object
                    // this object contains value called auth and auth contains userId {auth:{usserId}}
                    // so this information is maintained on server side
                    data={message:'user logged successfully'};
                    res.send(data);
                }
                else{
                    data={message:'password does not match'};
                    res.status(503).send(data);
                }
                
            }
            
        }
    });
    
});
app.post('/createArticle', function(req,res){
    // fetch user name and password from body
    
    if(isLogged(req)){
    var user_id=req.session.auth.userId;
    var user_name = req.session.auth.name;
    var title=req.body.title;
    var category = req.body.category;
    var content = req.body.content;
    var likes = 0;
    console.log(user_id);
    console.log(title);
    console.log(category);
    
    pool.query('INSERT INTO articles (user_id, title, category, content, likes, user_name) VALUES ($1,$2,$3, $4,$5,$6)',[user_id, title, category, content, likes, user_name], function(err,result){
        if(err){
            var data={message: 'error on database side'};
            res.status(500).send(err.toString());
        }
        else{
            var data={};
            data={message: 'Article created successfully'};
            res.send(data);
        }
    });
        
    }
    else{
        var data={};
        data={message: 'You are not logged in'};
        res.send(data);
    }
    
});
app.post('/createComment', function(req,res){
    // fetch user name and password from body
    
    if(isLogged(req)){
    var user_id=req.session.auth.userId;
    var user_name = req.session.auth.name;
    var article_id=req.body.article_id;
    var comment = req.body.comment;
    var likes = 0;
    console.log(user_id);
    console.log(article_id);
    console.log(comment);
    
    pool.query('INSERT INTO "comments" (user_id, article_id, comment, likes, user_name) VALUES ($1,$2,$3, $4, $5)',[user_id, article_id, comment, likes, user_name], function(err,result){
        if(err){
            var data={message: 'error on database side'};
            res.status(500).send(err.toString());
        }
        else{
            pool.query("SELECT * FROM comments WHERE article_id=$1 AND user_id=$2",[article_id,user_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
            
        }
    });
        
    }
    else{
        var data={};
        data={message: 'You are not logged in'};
        res.send(data);
    }
    
});
app.get('/articles', function(req, res){
    // database functioning cheking
    pool.query("SELECT * FROM articles", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});
app.post('/comments', function(req, res){
    // database functioning cheking
    var article_id=req.body.article_id;
    pool.query("SELECT * FROM comments WHERE article_id=$1",[article_id], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
