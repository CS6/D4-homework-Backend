
import config from '../src/config';
import { connectToMongo,connectedMongo } from '../src/databases/MongoConnection';
import { fakeDcardUser, fakeDcardALLUser } from './index';
import UserModel from '../src/models/User';
import supertest, { Request, SuperTest, Test } from 'supertest';
import mongoose = require("mongoose");
import * as chai from 'chai';
import UserController from '../src/controller/user.controller';
import app from '../src/index';

// console.log(fakeDcardALLUser());
// console.log(fakeDcardUser());


// const setmore = async() => {
//   console.log("go")
//   await connectToMongo();
//   await UserModel.create(fakeDcardALLUser());
//   return "user"
// }
// setmore();


// const uri = `mongodb://${config.mongodb}:27017/test-Dcard-01`;

const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
};



const Schema = mongoose.Schema;
const expect = chai.expect;

const testSchema = new Schema({
  name: { type: String, required: true }
});
//Create a new collection called 'Name'
const Name = mongoose.model('Name', testSchema);
let data: {
  age: number; name: string; gender: string; school: { 代碼: string; 學校名稱: string; "公/私立": string; 縣市名稱: string; 地址: string; 電話: string; 網址: string; 體系別: string; } | { 代碼: number; 學校名稱: string; "公/私立": string; 縣市名稱: string; 地址: string; 電話: string; 網址: string; 體系別: string; }; dept: { 學系: string; }; talent: { ID: string; Hobby: string; Category: string; }; hobby: { ID: string; Hobby: string; Category: string; }[]; club: string; lovedCountry: string; trouble: string; wantToTry: string; exchange: { ID: string; Hobby: string; Category: string; }[]; avatar: string; //Look up the 'Mike' object previously saved.
}[] | undefined = undefined;
describe('Database Tests', function () {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  // before(function (done) {
  //   connectToMongo();
  //   data = fakeDcardALLUser();
  //   return done();
  // });
  // describe('Test Database', function () {
  //   it('New name saved to test database', async ()=> {
  //     console.log(fakeDcardALLUser().length)
  //     await fakeDcardALLUser().map(index=>{
  //        UserModel.create();
  //     })
  //     console.log(fakeDcardALLUser())

  //   });
  it('New name savsssed to test database',function (done) {
    console.log(fakeDcardALLUser().length)

    supertest(app).post('/api/user/setmore')
    .send(fakeDcardALLUser())
    .expect(200)
    // .expect(404)
    .end((err) => {
      // if (err) return done(err);
      console.log("err");

      done();
    });
    })

  // it('Dont save incorrect format to database', function (done) {
  //   UserController.CreateUser(fakeDcardALLUser());
  //   done();
  // });
  // it('Should retrieve data from test database', function (done) {
  //   //Look up the 'Mike' object previously saved.
  //   UserModel.find({ name: fakeDcardALLUser()[0].name }, (err, name) => {
  //     if (err) { throw err; }
  //     if (name.length === 0) { throw new Error('No data!'); }
  //     done();
  //   });
  // });
  after(function (done) {
    // connectedMongo();
    // return done();
    mongoose.disconnect(function(){
      mongoose.connection.close();
      // return done();
    });
    return done();
    // mongoose.connection.db.dropDatabase(function(){
    //   mongoose.connection.close(done);
    // });
  });
});
//After all tests are finished drop database and close connection



