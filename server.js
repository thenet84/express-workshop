var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello girls!');
})

app.get('/chocolate', function(req, res){
  res.send('MM chocolates');
})

app.get('/node', function(req, res){
  res.send('NodeJS rocks!');
})

app.get('/girls', function(req, res){
  res.send('My first Nodegirls workshop!');
})


app.listen(3000, function(){
  console.log('Server is listening on port 3000. Ready to accept requests!');
})