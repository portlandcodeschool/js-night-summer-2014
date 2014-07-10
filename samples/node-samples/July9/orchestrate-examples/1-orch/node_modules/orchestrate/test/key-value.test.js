// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Key-Value methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../')(token)

// Mock data.
var users = {
  steve: {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  },
  david: {
    "name": "David Byrd",
    "email": "byrd@bowery.io",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  }
}

var listResponse = {
  "count": 1,
  "next": "/v0/users?limit=2&afterKey=002",
  "results": [{value: users.steve}]
}

var page2Response = {
  "count": 1,
  "results": [{value: users.david}]
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io/')
  .get('/v0/users/sjkaliski%40gmail.com')
  .reply(200, users.steve)
  .get('/v0/users')
  .reply(200, listResponse, {'Link':'</v0/users?limit=2&afterKey=002>; rel="next"'})
  .put('/v0/users/byrd%40bowery.io')
  .reply(201)
  .put('/v0/users/byrd%40bowery.io')
  .reply(201)
  .delete('/v0/users/byrd%40bowery.io')
  .reply(204)
  .delete('/v0/users/byrd%40bowery.io?purge=true')
  .reply(204)
  .get('/v0/users?afterKey=002')
  .reply(200, page2Response)

suite('Key-Value', function () {
  test('Get value by key', function (done) {
    db.get('users', 'sjkaliski@gmail.com')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, res.body)
      done()
    })
  })

  test('Get list of values by collection name', function (done) {
    db.list('users')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.steve, res.body.results[0].value)
      assert.equal(true, typeof res.links.next.get == 'function')
      done()
    })
  })

  test('Store value at key', function (done) {
    db.put('users', 'byrd@bowery.io', users.david)
    .then(function (res) {
      assert.equal(201, res.statusCode)
      done()
    })
  })

  test('Store value at key with conditional', function (done) {
    db.put('users', 'byrd@bowery.io', users.david, false)
    .then(function (res) {
      assert.equal(201, res.statusCode)
      done()
    })
  })

  test('Remove value by key', function (done) {
    db.remove('users', 'byrd@bowery.io')
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })

  test('Remove value by key and purge', function (done) {
    db.remove('users', 'byrd@bowery.io', true)
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })

  test('Request collection items afterKey', function (done) {
    db.list('users', {afterKey:'002'})
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(users.david, res.body.results[0].value)
      done()
    })
  })
})
