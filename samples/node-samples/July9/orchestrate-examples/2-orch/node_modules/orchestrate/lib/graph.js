// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Graph relation builder.
 */


// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')


/**
 * @constructor
 */
function GraphBuilder () {}


require('util').inherits(GraphBuilder, Builder)


/**
 * Get a relationship.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.get = function () {
  this._method = 'get'
  return this
}


/**
 * Create new relationship.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.create = function () {
  this._method = 'put'
  return this
}


/**
 * Delete a relationship.
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.remove = function () {
  this._method = 'del'
  return this
}


/**
 * Set graph origin.
 * @param {string} collection
 * @param {string} key
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.from = function (collection, key) {
  assert(collection && key, 'Collection and key required.')
  this.collection = collection
  this.key = key
  return this
}


/**
 * Set graph relation.
 * @param {string} kind
 * @return {GraphBuilder}
 */
GraphBuilder.prototype.related = function (kind) {
  assert(kind, 'Kind of relation required.')

  this.kind = Array.prototype.slice.call(arguments, 0)

  if (!this.write) return this._execute(this._method)
  return this
}


/**
 * Set graph destination.
 * @param {string} toCollection
 * @param {string} toKey
 * @return {Object}
 */
GraphBuilder.prototype.to = function (toCollection, toKey) {
  assert(toCollection && toKey, 'toCollection and toKey required.')
  this.toCollection = toCollection
  this.toKey = toKey
  return this._execute(this._method)
}


/**
 * Execute graph read/write.
 * @param {string} method
 * @return {Object}
 * @protected
 */
GraphBuilder.prototype._execute = function (method) {
  var relation = this.write ? 'relation' : 'relations'
  var pathArgs = []
  pathArgs.push(this.collection)
  pathArgs.push(this.key)
  pathArgs.push(relation)
  pathArgs = pathArgs.concat(this.kind)
  pathArgs.push(this.toCollection)
  pathArgs.push(this.toKey)
  pathArgs = pathArgs.filter(function (i) {
    return i != undefined
  })

  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs)

  var query = ''
  if (this._method == 'del') query = '?purge=true'
  return this.getDelegate()['_' + this._method](url + query)
}


// Module Exports.
module.exports = GraphBuilder
