// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test search methods.
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
  .get('/v0/users?query=new%20york&limit=5&offset=2')
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
  .get('/v0/users?query=new%20york&offset=0')
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

suite('Search', function () {
  test('Get value by query', function (done) {
    db.newSearchBuilder()
    .collection('users')
    .limit(5)
    .offset(2)
    .query('new york')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(res.body.results[0].value, users.steve)
      done()
    })
  })

  test('Get value by query with offset 0', function (done) {
    db.newSearchBuilder()
    .collection('users')
    .offset(0)
    .query('new york')
    .then(function (res) {
      assert.equal(200, res.statusCode)
      assert.deepEqual(res.body.results[0].value, users.steve)
      done()
    })
  })
})
