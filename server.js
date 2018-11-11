const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const mustache = require('mustache-express');
const fs = require('fs');

const app = express();

app.use(express.static('data'));
app.use(express.static('public'));
app.use(formidable());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/get-posts', function(req, res){
  res.sendFile(__dirname + '/data/posts.json');
})

app.get('/posts/:postId', function(req, res){
  fs.readFile(__dirname + '/data/posts.json', function(error, file){
    var parsedFile = JSON.parse(file);
    res.render('post', {'post' : parsedFile[req.params.postId].post});
  })
})

app.post('/create-post', function(req, res){
  fs.readFile(__dirname + '/data/posts.json', function(error, file){
    const parsedFile = JSON.parse(file);
    const timeStamp = Date.now();
    const newPost = {
      timeStamp : {
        'title': req.fields.blogtitle, 
        'post': req.fields.blogpost
      }
    };
    console.log(parsedFile);
    
    const fileToSave = JSON.stringify({...parsedFile, newPost});
    fs.writeFile(__dirname + '/data/posts.json', fileToSave, function(error){
      if(error)console.log(error);
      res.send(newPost);
    })
  });
})

app.listen(3000, function(){
  console.log('Server is listening on port 3000. Ready to accept requests!');
})