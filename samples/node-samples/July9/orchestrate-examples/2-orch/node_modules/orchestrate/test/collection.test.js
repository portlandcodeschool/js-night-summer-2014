// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test collection methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../')(token)

var users = {
  steve: {
    "name": "Steve Kaliski",
    "email": "sjkaliski@gmail.com",
    "location": "New York",
    "type": "paid",
    "gender": "male"
  }
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io/')
  .get('/v0/users?query=new%20york')
  .reply(200, {
    "results": [
      {
        "path": {
          "collection": "users",
          "key": "sjkaliski@gmail.com",
          "ref": "0eb6642ca3efde45"
        },
        "value": {
          "name": "Steve Kaliski",
          "email": "sjkaliski@gmail.com",
          "location": "New York",
          "type": "paid",
          "gender": "male"
        },
        "score": 0.10848885029554367
      }
    ],
    "count": 1,
    "max_score": 0.10848885029554367
  })
  .delete('/v0/users?force=true')
  .reply(204)
  .head('/v0')
  .reply(200)

suite('Collection', function () {
  test('Get value by query', function (done) {
    db.search('users', 'new york')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(res.body.results[0].value, users.steve)
      done()
    })
  })

  test('Delete collection', function (done) {
    db.deleteCollection('users')
    .then(function (res) {
      assert.equal(204, res.statusCode)
      done()
    })
  })

  test('Check if key is valid', function (done) {
    db.ping()
    .then(function (res) {
      assert.equal(200, res.statusCode)
      done()
    })
  })
})
