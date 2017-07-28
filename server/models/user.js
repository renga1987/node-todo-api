var mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
var _ = require('lodash');

//We are creating schema since we need to access custom methods like getAuthenticationToken
var UserSchema  = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    trim:true,
    minlength:1,
    unique:true,
    validate:{
      validator : validator.isEmail,
      message : '{VALUE} is not valid email'
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true
    },
    token:{
      type:String,
      required:true
    }
  }]
});

//What excatly is sent back when a mongosse model is converted to a JSON value.
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['_id','email']);
};

//This is how we add methods to our schema.
//This is a resuable method . Hence we have added separately.
UserSchema.methods.generateAuthToken = function(){
  //This will help to access the documents. In case the current doc
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
  user.tokens.push({
    access,token
  });
  // Usually when there is a return inside the promise we chain another promise.
  //Here we return the promise since we are going to handle in server.js
  return user.save().then(()=>{
    return token;
  });
};


var User = mongoose.model('User',UserSchema);

module.exports = {User};
