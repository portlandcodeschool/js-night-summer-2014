// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Test Search methods.
 */


// Module Dependencies.
var assert = require('assert')
var nock = require('nock')
var token = 'sample_token'
var db = require('../')(token)

var movies = {
  superbad: {
    "title": "Superbad",
    "year": 2007
  }
}

var friends = {
  david: {
    "name": "David Byrd",
    "age": 20
  }
}

// Override http requests.
var fakeOrchestrate = nock('https://api.orchestrate.io')
  .get('/v0/users/sjkaliski%40gmail.com/relations/likes')
  .reply(200, {
    "results": [
      {
        "path": {
          "collection": "movies",
          "key": "Superbad",
          "ref": "56e22c26346f9015"
        },
        "value": {
          "title": "Superbad",
           "year": 2007
        }
      }
    ],
    "count": 1
  })
  .get('/v0/users/sjkaliski%40gmail.com/relations/friends/friends')
  .reply(200, {
    "results": [
      {
        "path": {
          "collection": "friends",
          "key": "david@bowery.io",
          "ref": "56e22c26346f9016"
        },
        "value": {
          "name": "David Byrd",
          "age": 20
        }
      }
    ],
    "count": 1
  })
  .put('/v0/users/sjkaliski%40gmail.com/relation/likes/movies/Superbad')
  .reply(204)
  .delete('/v0/users/sjkaliski%40gmail.com/relation/likes/movies/Superbad?purge=true')
  .reply(204)

suite('Graph', function () {
  test('Get graph relationship', function (done) {
    db.newGraphReader()
    .get()
    .from('users', 'sjkaliski@gmail.com')
    .related('likes')
    .then(function (res) {
      assert.deepEqual(res.body.results[0].value, movies.superbad)
      done()
    })
  })

  test('Get distant graph relationship', function (done) {
    db.newGraphReader()
    .get()
    .from('users', 'sjkaliski@gmail.com')
    .related('friends', 'friends')
    .then(function (res) {
      assert.deepEqual(res.body.results[0].value, friends.david)
      done()
    })
  })

  test('Create graph relationship', function (done) {
    db.newGraphBuilder()
    .create()
    .from('users', 'sjkaliski@gmail.com')
    .related('likes')
    .to('movies', 'Superbad')
    .then(function (res) {
      assert.equal(res.statusCode, 204)
      done()
    })
  })

  test('Delete a graph relationship', function (done) {
    db.newGraphBuilder()
    .remove()
    .from('users', 'sjkaliski@gmail.com')
    .related('likes')
    .to('movies', 'Superbad')
    .then(function (res) {
      assert.equal(res.statusCode, 204)
      done()
    })
  })
})
