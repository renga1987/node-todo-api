var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://mongouser:mongopassword@ds161742.mlab.com:61742/node-todo-api');
module.exports = {mongoose}
