// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Search builder.
 */


// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')

/**
 * @constructor
 */
function SearchBuilder () {}


require('util').inherits(SearchBuilder, Builder)


/**
 * Set collection.
 * @param {string} collection
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.collection = function (collection) {
  assert(collection, 'Collection required.')
  this._collection = collection
  return this
}


/**
 * Set limit.
 * @param {number} limit
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.limit = function (limit) {
  assert(limit, 'Limit required.')
  this._limit = limit
  return this
}


/**
 * Set offset.
 * @param {number} offset
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.offset = function (offset) {
  assert.equal(typeof offset, 'number', 'Offset required.')
  this._offset = offset
  return this
}


/**
 * Set query.
 * @param {string} query
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.query = function (query) {
  assert(query, 'Query required.')
  this._query = query
  return this._execute('get')
}


/**
 * Execute search.
 * @return {Object}
 * @protected
 */
SearchBuilder.prototype._execute = function (method) {
  assert(this._collection && this._query, 'Collection and query required.')
  var pathArgs = [this._collection]
  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs, {
    query: this._query,
    limit: this._limit,
    offset: this._offset
  })
  
  return this.getDelegate()['_' + method](url)
}


// Module Exports.
module.exports = SearchBuilder
