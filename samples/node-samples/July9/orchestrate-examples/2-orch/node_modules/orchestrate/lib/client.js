// Copyright 2013 Bowery Software, LLC
/**
 * @fileoverview Orchestrate API Client.
 */


// Module Dependencies.
var request = require('request')
var url = require('url')
var Q = require('kew')
var assert = require('assert')
var SearchBuilder = require('./search')
var parseLinks = require('parse-link-header')
var GraphBuilder = require('./graph')
var EventBuilder = require('./event')
var pjson = require('../package.json')


/**
 * Creates an instance of Client which can be used to access
 * the Orchestrate API.
 *
 * @constructor
 * @param {string} token
 */
function Client (token) {
  assert(token, 'API key required.')
  if (!(this instanceof Client)) {
    return new Client(token)
  }

  /**
   * HTTP content-type.
   * @type {string}
   */
  this.contentType = 'application/json'

  /**
   * API token used for HTTP Authentication.
   * @type {string}
   * @protected
   */
  this._token = token

  /**
   * Identifies the orchestrate.js client as the UserAgent to Orchestrate Service.
   * @type {string}
   * @protected
   */
  this._userAgent = 'orchestrate.js/' + pjson.version + ' (Bowery.io; node.js client)'
}


/**
 * Api endpoint.
 * @enum {string}
 */
Client.ApiEndPoint = 'api.orchestrate.io'


/**
 * Api version
 * @enum {string}
 */
Client.ApiVersion = 'v0'


/**
 * Get data from collection by key-value.
 * @param {string} collection
 * @param {string} key
 * @return {Promise}
 */
Client.prototype.get = function (collection, key) {
  assert(collection && key, 'Collection and key required.')
  return this._get(this.generateApiUrl([collection, key]))
}


/**
 * Get list of data from collection.
 * @param {string} collection
 * @param {object} params Listing params (startKey,afterKey,beforeKey,endKey)
 * @param {string} startKey
 * @param {string} endKey
 * @return {Promise}
 */
Client.prototype.list = function (collection, params) {
  assert(collection, 'Collection required.')
  if (typeof params == 'number') { //deprecated, prefer passing map params.
    params = {limit:params}
  }
  return this._get(this.generateApiUrl([collection], params))
}


/**
 * Put data in collection by key-value
 * @param {string} collection
 * @param {string} key
 * @param {Object} data
 * @param {string|boolean}
 * @return {Promise}
 */
Client.prototype.put = function (collection, key, data, match) {
  assert(collection && key && data, 'Collection, key, and JSON object required.')
  var header = {}
  if (typeof match == 'string') header['If-Match'] = this._quote(match)
  else if (typeof match == 'boolean' && match === false) header['If-None-Match'] = '"*"'
  return this._put(this.generateApiUrl([collection, key]), data, header)
}


/**
 * Remove data from collection by key-value.
 * @param {string} collection
 * @param {string} key
 * @param {boolean} purge
 * @return {Promise}
 */
Client.prototype.remove = function (collection, key, purge) {
  assert(collection && key, 'Collection and key required.')
  return this._del(this.generateApiUrl([collection, key], {purge: purge}))
}


/**
 * Search collection by key.
 * @param {string} collection
 * @param {string} query
 * @return {Promise}
 */
Client.prototype.search = function (collection, query) {
  assert(collection && query, 'Collection and query required.')
  return this._get(this.generateApiUrl([collection], {query: query}))
}


/**
 * Check if key is valid.
 * @return {Promise}
 */
Client.prototype.ping = function () {
  return this._head(this.generateApiUrl())
}


/**
 * Delete a collection.
 * @param {string} collection
 * @return {Promise}
 */
Client.prototype.deleteCollection = function (collection) {
  assert(collection, 'Collection required.')
  return this._del(this.generateApiUrl([collection]) + '?force=true')
}


/**
 * Create new search builder.
 * @return {SearchBuilder}
 */
Client.prototype.newSearchBuilder = function () {
  return new SearchBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * Create new graph builder.
 * @return {GraphBuilder}
 */
Client.prototype.newGraphBuilder = function () {
  return new GraphBuilder()
    .setWrite(true)
    .setDelegate(this)
}


/**
 * Create new graph reader.
 * @return {GraphBuilder}
 */
Client.prototype.newGraphReader = function () {
  return new GraphBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * Create new event builder.
 * @return {EventBuilder}
 */
Client.prototype.newEventBuilder = function () {
  return new EventBuilder()
    .setWrite(true)
    .setDelegate(this)
}


/**
 * Create new event reader.
 * @return {EventBuilder}
 */
Client.prototype.newEventReader = function () {
  return new EventBuilder()
    .setWrite(false)
    .setDelegate(this)
}


/**
 * GET request with authentication.
 * @param {string} url
 * @return {Promise}
 * @protected
 */
Client.prototype._get = function (url) {
  return this._request('GET', url)
}


/**
 * PUT request with authentication.
 * @param {string} url
 * @param {Object} data
 * @param {Object} header
 * @return {Promise}
 * @protected
 */
Client.prototype._put = function (url, data, header) {
  return this._request('PUT', url, data, header)
}


/**
 * DELETE request with authentication.
 * @param {string} url
 * @return {Promise}
 * @protected
 */
Client.prototype._del = function (url) {
  return this._request('DELETE', url)
}


/**
 * HEAD request with authentication.
 * @param {string} url
 * @return {Promise}
 * @protected
 */
Client.prototype._head = function (url) {
  return this._request('HEAD', url)
}


/**
 * Makes a request to the Orchestrate api.  The request will be set up with all
 * the necessary headers (eg auth, content type, user agent, etc).
 *
 * @param {string} method The HTTP method for the request
 * @param {string} url The full endpoint url (including query portion).
 * @param {Object} data (optional) The body of the request (will be converted to json).
 * @param {Object} header (optional) Any additional headers to go along with the request.
 * @return {Promise}
 * @protected
 */
Client.prototype._request = function (method, url, data, headers) {
  var defer = Q.defer()
  headers = headers || {}
  headers['Content-Type'] = this.contentType
  headers['User-Agent'] = this._userAgent

  request({
    method: method,
    url : url,
    auth: {user: this._token},
    headers: headers,
    json: data
  }, defer.makeNodeResolver())

  return defer.promise
  .then(this._validateResponse.bind(this))
  .then(this._parseLinks.bind(this))
}


/**
 * Quote the provided string if not already quoted.
 * @param {string} str
 * @return {string}
 * @protected
 */
Client.prototype._quote = function (str) {
  return str.charAt(0) == '"' ? str : '"' + str + '"'
}


/**
 * Ensure valid response.
 * @param {Request} req
 * @return {(Request|Promise)}
 */
Client.prototype._validateResponse = function (res) {
  if (res.body) {
    try {
      res.body = JSON.parse(res.body)
    } catch (e) {}
  }

  if (!~[200, 201, 204].indexOf(res.statusCode))
    throw res

  return res
}


/**
 * Parses all links from the "Link" http response header. The parsed links
 * are made available on the result as result.links.  Each link is an object
 * with the following properties:
 * url - The url for the link (may be relative)
 * rel - The link header's "rel" value (the logical link 'name'),
 * paramName* - Any url query parameters are available directly on the link
 * get() - Function to fetch the link, returns a promise.
 * @param {Object} res The response to parse the 'Link' header from
 * @param {Object} res The respons (so this function can be chained in
 *         promise calls).
 */
Client.prototype._parseLinks = function (res) {
  res.links = parseLinks(res.headers['link'])
  if (res.links) {
    for (var rel in res.links) {
      var link = res.links[rel]
      link.get = function (linkUrl) {
        return this._get('https://' + Client.ApiEndPoint + linkUrl)
      }.bind(this, link.url)
    }
  }
  return res
}


/**
 * Generates and formats api url.
 * @param {Array.<string>} path
 * @param {Object} query
 * @return {string}
 */
Client.prototype.generateApiUrl = function (path, query) {
  var href = Client.ApiEndPoint
  var pathname = ''

  if (!path) path = []

  for (var i = 0; i < path.length; i++)
    pathname += '/' + encodeURIComponent(path[i])

  // Remove undefined key-value pairs.
  if (query)
    Object.keys(query).forEach(function (key) {
      if (query[key] == undefined)
        delete query[key]
    })

  return url.format({
    protocol: 'https:',
    host: Client.ApiEndPoint + '/' + Client.ApiVersion,
    pathname: pathname,
    query: query
  })
}


// Module exports.
module.exports = Client
