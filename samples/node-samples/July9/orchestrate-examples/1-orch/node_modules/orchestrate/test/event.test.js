// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Event methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../')(token)

var updates = [
  {
    "timestamp": 1369832019085,
    "value": {
      "text": "Hello World!"
    }
  }
]

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io')
  .get('/v0/users/sjkaliski%40gmail.com/events/update')
  .reply(200, {
    "results": [
      {
        "timestamp": 1369832019085,
        "value": {
          "text": "Hello World!"
        }
      }
    ],
    "count": 1
  })
  .put('/v0/users/sjkaliski%40gmail.com/events/update')
  .reply(201)

suite('Event', function () {
  test('Get event', function (done) {
    db.newEventReader()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .then(function (res) {
      assert.deepEqual(res.body.results[0], updates[0])
      done()
    })
  })

  test('Create event', function (done) {
    db.newEventBuilder()
    .from('users', 'sjkaliski@gmail.com')
    .type('update')
    .data({
      "text": "Orchestrate is awesome!"
    })
    .then(function (res) {
      assert.equal(res.statusCode, 201)
      done()
    })
  })
})
