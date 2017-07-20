const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

//var mongoose = require('./db/mongoose').mongoose;
var {mongoose} = require('./db/mongoose'); //Same as above
var {Todo} =require('./models/todo');
var {User} = require('./models/user');
var {ObjectID} = require('mongodb');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // Parse the input json from client to JS object and set to request.

//insert
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

//Update
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  //This is done to ensure that only certain properties are updated
  //The use cannot update the completedat. We have to take care of it.
  //So to avoid junk properties we use the pick method of lodash.
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  //Update completedAt only if completed is true
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt=new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }

  Todo.findByIdAndUpdate(id,
  //Similar to mongodb update
  {
    $set:body
  },{
    new : true //Returns the updated object
  }).then((todo)=>{
    if(!todo){
        return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

})

app.listen(port,()=>{
  console.log(`App Started on ${port}`);
});

module.exports = {app};
