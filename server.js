var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto = require('crypto');
var bodyparser=require('body-parser');
var session=require('express-session');

var app = express();
var config={
user:"rimathivanan",
database:"rimathivanan",
host:"db.imad.hasura-app.io",
port:"5432",
password:process.env.DB_PASSWORD
};
app.use({
    secret:"SomeRandaomSecretVale",
    cookie:{maxAge:1000*60*60*24*30}
    
}
    )
app.use(bodyparser.json());
app.use(morgan('combined'));
    function createTemplate(data)
    {
        var title=data.title;
        var heading=data.heading;
        var date=data.date;
        var content=data.content;
        
    var htmltemplate=`<html>
<head>
    <title>
          ${title}
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
     <link href="/ui/style.css" rel="stylesheet" />
   
</head>
<body>
    
    <div class="container">
    <div> 
    <a href="/">Home</a>
    </div>
    <hr/>
    <h3>
          ${heading} 
    </h3>
    
    <div>
        
    ${date.toDateString()}
    
    </div>
    
    <div>
        ${content}
        
    </div>
    </div>
</body>
</html>`;

return htmltemplate;
}

    

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt)
{
   var hashed=crypto.pbkdf2Sync(input,salt,100000, 512, 'sha512')
   
   return ["pbkdf2","1000",salt,hashed.toString('hex')].join('$');
}


app.get('/hash/:input',function(req,res)
{
    var hashedString=hash(req.params.input,"this-is-some-random-string");
    res.send(hashedString);
});
var pool=new Pool(config);
app.post('/create-user',function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
   var salt= crypto.randomBytes(128).toString("hex");
   var dbString=hash(password,salt)
   
   pool.query('insert into "user" (username,password) values ($1,$2)',[username,dbString],function(err ,result)
   {
       
       if(err)
{
res.status(500).send(err.toString());
}
else
{
res.send("The User has been created succesfully:"+username);
}
       
       
   });
    
});



app.post('/login',function(req,res)
{
    var username=req.body.username;
    var password=req.body.password;
      pool.query('select * from "user" where username=$1',[username],function(err ,result)
   {
       
       if(err)
{
res.status(500).send(err.toString());
}
else
{
    if(result.rows.length===0)
    {
        res.send(403).send("User name or password is invalid");
    }
    else
    {
        var dbString=result.rows[0].password;
        var salt=dbString.split('$')[2];
        var hashPassword=hash(password,salt);
        if(hashPassword===dbString)
        {
        //Set the Session
        req.session.auth={userId:result.rows[0].id};
        res.send("credential is correct");
        }
        else
        {
   res.send(403).send("User name or password is invalid");
        }
}
}
       
       
   });
    
});


app.get("/check-login",function(req,res){

if(req.session && req.session.auth && req.session.auth.userID)
{
res.send("You are logged in : "+req.session.auth.userId.toString());
}
else
{
res.send("You are not Login");
}
});

app.get('/test',function(req,res){
//make a select request
//return response with the results
pool.query("SELECT * FROM Test",function(err,result)
{
if(err)
{
res.status(500).send(err.toString());
}
else
{
res.send(JSON.stringify(result));
}
});
});



var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
  res.send(counter.toString());
});

app.get('/articles/:articleName', function (req, res) 
{
 

pool.query("SELECT * FROM article WHERE title=$1",[req.params.articleName] , function(err,result)
{

if(err)
{
res.status(500).send(err.toString());
}
else
{
if(result.rows.length===0){
res.status(404).send("Ariticle not found");
}
else
{
var articleData=result.rows[0];
res.send(createTemplate(articleData));
}
}
});
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
