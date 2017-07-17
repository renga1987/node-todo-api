var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://mongouser:mongopassword@ds161742.mlab.com:61742/node-todo-api');
module.exports = {mongoose}
