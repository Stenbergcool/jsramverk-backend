/* global it describe */
process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
const database = require("../models/dbmong.js")

chai.should();

chai.use(chaiHttp);


describe('Database', () => {
  it('findAll result is not empty and is an array',async function(){
    const result = await database.findAll();
    assert.isNotEmpty(result);
    assert.isArray(result, 'It is an array!');
  });


  it('insertOne should return acknowledged=True  and result not empty ',async function(){
    const result = await database.insertOne({Rubrik: "Tjolahopp", Text: "tjenare manne"});
    assert.isNotEmpty(result)
    assert.equal(result.acknowledged, true);
  });

  it('updateOne should return acknowledged=True and result not empty and Updated match input ',async function(){
    const result = await database.updateOne([ "63218a0c7ec746004bb6db2a","tjenare manne"]);
    assert.isNotEmpty(result)
    assert.equal(result.acknowledged, true);
    const resultTwo = await database.findAll();
    assert.equal(resultTwo[0].Text, "tjenare manne")
  });
  it('updateOne with bad input should not effect any data in db ',async function(){
    const result = await database.updateOne(1);
    assert.equal(result.modifiedCount, 0);
  });

});

describe('Server', () => {
  describe('GET /', () => {
    it('Tests artiklart GET', async function() {
      const res = await chai.request(server)
          .get('/artiklar')
          .send();
      assert.equal(res.status, 200);
      assert.isObject(res.body)
      assert.notEqual(0, res.body.data)
    });
  })

  describe('POST /', () => {
    it('Tests artiklart POST with right input, expect status:201', async function() {
      let artikel = {
        Rubrik: "TestRubriken",
        Text: "TestTextTestText"
      }
      const res = await chai.request(server)
          .post('/artiklar')
          .send(artikel);
      assert.equal(res.status, 201);
      assert.isObject(res.body)
      assert.notEqual(0, res.body.data)
    });
    it('Tests artiklar POST with wrong input, expect status:400', async function() {
      let artikel = {
        Text: "TestTextTestText"
      }
      const res = await chai.request(server)
          .post('/artiklar')
          .send(artikel);
      assert.equal(res.status, 400);
      assert.isObject(res.body)
      assert.notEqual(0, res.body.data)
    });
  });

  describe('PUT /', () => {
    it('Tests artiklar PUT expects status:201', async function() {
      let artikel = {
        _id: "63218a0c7ec746004bb6db2a",
        Text: "TestTextTestText"
      }
      const res = await chai.request(server)
          .put('/artiklar')
          .send(artikel);
      assert.equal(res.status, 201);
      assert.isObject(res.body)
      assert.notEqual(0, res.body.data)
    });
    it('Tests artiklar PUT expects status:400', async function() {
      let artikel = {
        Text: "TestTextTestText"
      }
      const res = await chai.request(server)
          .put('/artiklar')
          .send(artikel);
      assert.equal(res.status, 400);
      assert.isObject(res.body)
      assert.notEqual(0, res.body.data)
    });
  })

});