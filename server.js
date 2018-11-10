var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(formidable());

app.get('/get-posts', function(req, res){
  res.sendFile(__dirname + '/data/posts.json');
})

app.get('/posts/:postId', function(req, res){
  fs.readFile(__dirname + '/data/posts.json', function(error, file){
    var parsedFile = JSON.parse(file);
    res.send(parsedFile[req.params.postId]);
  })
})

app.post('/create-post', function(req, res){
  fs.readFile(__dirname + '/data/posts.json', function(error, file){
    var parsedFile = JSON.parse(file);
    parsedFile[Date.now()] = req.fields.blogpost;
    console.log(parsedFile);
    
    var fileToSave = JSON.stringify(parsedFile);
    fs.writeFile(__dirname + '/data/posts.json', fileToSave, function(error){
      console.log(error);
    })
  });
})

app.listen(3000, function(){
  console.log('Server is listening on port 3000. Ready to accept requests!');
})