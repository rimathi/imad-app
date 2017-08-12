var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
var articles=
{
'article-One':{
    title:'Article one  Mathivanan',
    heading:'Article one',
    date:'Aug 10,2016',
    content:`<p> This a my first article. This a my first article 
     This a my first article 
      This a my first article </p>
      <p> This a my first article. This a my first article 
     This a my first article 
      This a my first article </p>
      <p> This a my first article. This a my first article 
     This a my first article 
      This a my first article </p>`
         
    },
    'article-Two':{
    title:'Article Two | Mathivanan',
    heading:'Article Two',
    date:'Aug 10,2016',
    content:`<p> This a my Second article. This a my Second article 
     This a my Second article 
      This a my Second article </p>
      <p> This a my Second article. This a my Second article 
     This a my Second article 
      This a my Second article </p>
      <p> This a my Second article. This a my Second article 
     This a my Second article 
      This a my Second article </p>`
         
    },
    
    'article-Three':{
    title:'Article Third | Mathivanan',
    heading:'Article Third',
    date:'Aug 10,2016',
    content:`<p> This a my Third article. This a my Third article 
     This a my Third article 
      This a my Third article </p>
      <p> This a my Third article. This a my Third article 
     This a my Third article 
      This a my Third article </p>
      <p> This a my Third article. This a my third article 
     This a my third article 
      This a my third article </p>`
         
    }
    
    };
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
        
    ${date}
    
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
app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
