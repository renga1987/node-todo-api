var express = require('express');
var bodyParser = require('body-parser');

//var mongoose = require('./db/mongoose').mongoose;
var {mongoose} = require('./db/mongoose'); //Same as above
var {Todo} =require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();
app.use(bodyParser.json()); // Parse the input json from client to JS object and set to request.

app.post('/todos',(req,res)=>{
//  console.log(req.body);
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });

});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send(todos);
  },(e)=>{
    res.status(400).send(e);
  });
});

//Get By Id 
app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.listen(3000,()=>{
  console.log('App Started on 3000');
});

module.exports = {app};
