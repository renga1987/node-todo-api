var env = process.env.NODE_ENV || 'development';
console.log('env ***'+env);

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI="mongodb://localhost:27017/TodoApp";
}else if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI="mongodb://localhost:27017/TodoAppTest";
}else if(env === 'production'){
  process.env.MONGODB_URI="mongodb://mongouser:mongopassword@ds161742.mlab.com:61742/node-todo-api";
}
