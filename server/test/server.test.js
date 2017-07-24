var expect = require('expect');
var request = require('supertest');

const {app}=require('./../server');
const {Todo}= require('./../models/todo');
var {ObjectID} = require('mongodb');

const todos = [{
  _id:new ObjectID(),
  text:'First Test Todo'
},{
  _id:new ObjectID(),
  text:'Second test todo'
}];

//This will be called before the test runs.
//Todo.remove will remove all records in the db.
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
      var text = 'Test Todo Text';
      request(app)
        .post('/todos')
        .send({text:text})
        .expect(200)
        .expect((res)=>{
          expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
          if(err){
            return done(err);
          }
          //Check from DB if there s only one record
          Todo.find({text}).then((todos)=>{
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e)=>{
              done(e);
          });
        })
  });

  it('should not create a todo for bad request',(done)=>{
      request(app)
        .post('/todos')
        .send({text:''})
        .expect(400)
        .end((err,res)=>{
          if(err){
            return done(err);
          }
        //Check from DB if there s no record
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(2);
          done();
        }).catch((e)=>{
            done(e);
        });
        });
  });
});

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
          expect(res.body.length).toBe(2);
        })
        .end(done);
  });

describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect(()=>{

        })
  });
});

});
