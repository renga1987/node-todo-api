var  mongoose = require('./../server/db/mongoose').mongoose;
var Todo = require('./../server/models/todo').Todo;

var id = '596b3b8080964d1ab8d7c08e';
//Returns an array
Todo.find({
  _id:id
}).then((todos)=>{
  console.log(todos);
});

//Returns the first matched doc
Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log(todo);
});

//Prefreeable to use if we want to query by ID.
Todo.findById({
  _id:id
}).then((todo)=>{
  console.log(todo);
});
