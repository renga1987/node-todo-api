var  mongoose = require('./../server/db/mongoose').mongoose;
var Todo = require('./../server/models/todo').Todo;

var id = '5964962a34cd32fd29c69c9b';

//Removes all elements
Todo.remove({}).then((result)=>{
  console.log(result);
});

//Removes and returns the record
Todo.findOneAndRemove({
  _id:id
}).then((todo)=>{
  console.log(todo);
});

//Same as findOneAndRemove except we can directly give the id
Todo.findByIdAndRemove('5964962a34cd32fd29c69c9b').then((todo)=>{
  console.log(todo);
});
