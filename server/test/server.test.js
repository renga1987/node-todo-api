var expect = require('expect');
var request = require('supertest');

const {app}=require('./../server');
const {Todo}= require('./../models/todo');

//This will be called before the test runs.
//Todo.remove will remove all records in the db.
beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    done();
  })
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
          Todo.find().then((todos)=>{
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
          expect(todos.length).toBe(0);
          done();
        }).catch((e)=>{
            done(e);
        });
        });

  });

});
