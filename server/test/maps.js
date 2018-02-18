'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');


const server = require('../app');
const Maps = require("../models/maps");

const should = chai.should();
chai.use(chaiHTTP);

describe('maps', function(){
  Maps.collection.drop();

  beforeEach(function(done){
    let map = new Maps({
      title: 'trans studio bandung',
      lat: -6.7637493,
      lng: 107.274849
    });
    map.save(function(err){
      done();
    })
  })

  afterEach(function(done){
    Maps.collection.drop();
    done()
  })

  it('Should list ALL Data on /maps GET', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.property('_id');
      res.body[0].should.have.property('title');
      res.body[0].should.have.property('lat');
      res.body[0].should.have.property('lng');
      res.body[0].title.should.equal('trans studio bandung');
      res.body[0].lat.should.equal(-6.7637493);
      res.body[0].lng.should.equal(107.274849);
      done();
    })
  })
  it('should add a SINGLE data on /maps POST', function(done){
    chai.request(server)
    .post('/api/maps')
    .send({'title': 'trans studio bandung', 'latitude': -6.7637493, 'longitude':107.274849})
    .end(function(err, res){
      console.log(res.body);
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('success');
      res.body.should.have.property('message');
      res.body.should.have.property('data');
      res.body.success.should.equal(true);
      res.body.message.should.equal('data have been added');
      res.body.data.should.have.property('_id');
      res.body.data.should.have.property('title');
      res.body.data.should.have.property('lat');
      res.body.data.should.have.property('lng');
      res.body.data.title.should.equal('trans studio bandung');
      res.body.data.lat.should.be.a('number');
      res.body.data.lat.should.equal(-6.7637493);
      res.body.data.lng.should.be.a('number');
      res.body.data.lng.should.equal(107.274849);
      done();
    })
  })

  it('should update a SINGLE data on /maps/<id> PUT', function(done){
    chai.request(server)
    .get('/api/maps')
    .end(function(err, res){
      chai.request(server)
      .put(`/api/maps/${res.body[0]._id}`)
      .send({'title': 'trans studio bandung','latitude':res.body[0].lat, 'longitude':res.body[0].lng})
      .end(function(err, response){
        console.log(response.body);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('success');
        response.body.should.have.property('message');
        response.body.should.have.property('data');
        response.body.success.should.equal(true);
        response.body.message.should.equal('data have been updated');
        response.body.data.should.have.property('_id');
        response.body.data.should.have.property('title')
        response.body.data.should.have.property('lat')
        response.body.data.should.have.property('lng')
        response.body.data.title.should.equal('trans studio bandung');
        response.body.data.lat.should.be.a('number');
        response.body.data.lat.should.equal(-6.7637493);
        response.body.data.lng.should.be.a('number');
        response.body.data.lng.should.equal(107.274849);
        done();
      })
    })
  })




 })
