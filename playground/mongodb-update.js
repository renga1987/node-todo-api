// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

 //findOneAndUpdate

 db.collection('Todos').findOneAndUpdate({
   //filer
   _id:new ObjectID('595cd48131004f60648b3185')
 },{
   //field that needs to be updated
   $set:{
     completed:true
   }
 },{
   //returns the updated document when set to false
   returnOriginal:false
 }).then((result)=>{
   console.log(result);
 });

//Challenge - Use $inc
 db.collection('Todos').findOneAndUpdate({
   //filer
   _id:new ObjectID('595cd48131004f60648b3185')
 },{
   //field that needs to be updated
   $set:{name:'Renga'},
   $inc:{age:1} // increments age by 1
 },{
   //returns the updated document when set to false
   returnOriginal:false
 }).then((result)=>{
   console.log(result);
 });
  // db.close();
});
