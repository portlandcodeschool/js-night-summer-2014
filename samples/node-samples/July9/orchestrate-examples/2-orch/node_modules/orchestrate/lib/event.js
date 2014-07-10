// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Event builder.
 */


// Module Dependencies.
var assert = require('assert')
var Builder = require('./builder')

/**
 * @constructor
 */
function EventBuilder () {}


require('util').inherits(EventBuilder, Builder)


/**
 * Set event origin.
 * @param {string} collection
 * @param {string} key
 * @return {EventBuilder}
 */
EventBuilder.prototype.from = function (collection, key) {
  assert(collection && key, 'Collection and key required.')
  this.collection = collection
  this.key = key
  return this
}


/**
 * Set event type.
 * @param {string} type
 * @return {EventBuilder}
 */
EventBuilder.prototype.type = function (type) {
  assert(type, 'Type required.')
  this.type = type
  if (!this.write) return this._execute('get')
  return this
}


/**
 * Set time range start.
 * @param {number} time
 * @return {EventBuilder}
 */
EventBuilder.prototype.start = function (time) {
  assert(!this.write, 'Invalid operation.')
  assert(time && typeof time == 'number', 'Time required (number).')
  this.startTime = time
  return this
}


/**
 * Set time range end.
 * @param {number} time
 * @return {EventBuilder}
 */
EventBuilder.prototype.end = function (time) {
  assert(!this.write, 'Invalid operation.')
  assert(time && typeof time == 'number', 'Time required (number).')
  this.endTime = time
  return this
}


/**
 * Set event timestamp.
 * @param {Object} time
 * @return {EventBuilder}
 */
EventBuilder.prototype.time = function (time) {
  assert(this.write, 'Invalid operation.')
  assert(time && typeof time == 'number', 'Time required (number).')
  this.timestamp = time
  return this
}


/**
 * Set event data.
 * @param {Object} data
 * @return {EventBuilder}
 */
EventBuilder.prototype.data = function (data) {
  assert(data, 'Data required.')
  this.data = data
  return this._execute('put')
}


/**
 * Execute event read/write.
 * @param {string} method
 * @return {Object}
 * @protected
 */
EventBuilder.prototype._execute = function (method) {
  var query = {}, pathArgs = [this.collection, this.key, 'events', this.type]
  if (this.startTime) query['start'] = this.startTime
  if (this.endTime) query['end'] = this.endTime
  if (this.timestamp) query['timestamp'] = this.timestamp
  var url = this.getDelegate() && this.getDelegate().generateApiUrl(pathArgs, query)
  return this.getDelegate()['_' + method](url, this.data)
}


// Module Exports.
module.exports = EventBuilder
