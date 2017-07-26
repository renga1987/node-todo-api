const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id:10
};

var token = jwt.sign(data,'123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);

/*

This below logic is called Json Web Token (JWT) for which we have a npm module.

var message = 'I am Renga';
var hash = SHA256(message).toString();

console.log('Message : '+message);
console.log('hash : '+hash);

var data={
  id : 4 //User Id
};

//This is the token we send to client
var token = {
  data,
  hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
}

//Hack -> Clint trying to manipulate the data
//He does not know abt the somesecret since it is set in the server side.
//token.data.id=5;
//token.hash=SHA256(JSON.stringify(token.data)).toString();

//We verfiy the token sent by client
var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();
if(resultHash=== token.hash){
  console.log('Data was not Changed');
}else{
  console.log('Data Changed');
}

*/
