'use strict';

const debug = require('debug')('http');
const r = require('got');
const qs = require('querystring');
const urlJoin = require('url-join');

/**
 * Create new WordPress REST API client.<br>
 * :blue_book: Documentation: https://developer.wordpress.org/rest-api/reference/
 * @class
 */
class WordPressClient {
  /**
   * @constructor
   * @param {String} url Url of WordPress installation.
   */
  constructor(url) {
    this._baseUrl = urlJoin(url, '/wp-json/wp/v2/');
  }

  async _fetchCollection(name, { pageSize = 10, offset = 0, ...options } = {}) {
    const query = qs.stringify({
      ...options,
      per_page: pageSize,
      offset
    });
    const url = urlJoin(this._baseUrl, name, `/?${query}`);
    debug('url:', url);
    const { headers, body = [] } = await r.get(url, { json: true });
    const total = parseInt(headers['x-wp-total'], 10);
    const totalPages = parseInt(headers['x-wp-totalpages'], 10);
    const items = body.map(it => processItem(it));
    return { total, totalPages, pageSize, items };
  }

  async _countItems(name, options = {}) {
    const query = qs.stringify(options);
    const url = urlJoin(this._baseUrl, name, `/?${query}`);
    debug('url:', url);
    const { headers } = await r.head(url);
    return parseInt(headers['x-wp-total'], 10);
  }

  async _fetchItem(id, collection) {
    const url = urlJoin(this._baseUrl, collection, id.toString());
    debug('url:', url);
    const { body: item } = await r.get(url, { json: true });
    return processItem(item);
  }

  /**
   * List posts from target site.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments).
   * @param {Number} [options.pageSize=10] Maximum number of items to be returned in result set.
   * @returns {Promise<Response<Post>>} Paginated listing of posts.
   */
  fetchPosts(options) {
    return this._fetchCollection('posts', options);
  }

  /**
   * Retrieve single post from target site.
   * @param {Number} id Unique identifier for the object.
   * @returns {Promise<Post>} `Post` with requested `id`.
   */
  fetchPost(id) {
    return this._fetchItem(id, 'posts');
  }

  /**
   * Count all available posts.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments).
   * @returns {Number} Total number of available posts.
   */
  countPosts(options) {
    return this._countItems('posts', options);
  }

  /**
   * List pages from target site.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/pages/#arguments).
   * @param {Number} [options.pageSize=10] Maximum number of items to be returned in result set.
   * @returns {Promise<Response<Page>>} Paginated listing of pages.
   */
  fetchPages(options) {
    return this._fetchCollection('pages', options);
  }

  /**
   * Retrieve single page from target site.
   * @param {Number} id Unique identifier for the object
   * @returns {Promise<Page>} `Page` with requested `id`.
   */
  fetchPage(id) {
    return this._fetchItem(id, 'pages');
  }

  /**
   * Count all available pages.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/pages/#arguments).
   * @returns {Number} Total number of available pages.
   */
  countPages(options) {
    return this._countPages('posts', options);
  }
}

module.exports = WordPressClient;

function processItem(item) {
  return {
    id: item.id,
    createdAt: item.date,
    modifiedAt: item.modified,
    link: item.link,
    title: item.title.rendered,
    excerpt: item.excerpt.rendered,
    content: item.content.rendered
  };
}

/** @typedef {Item} Page */
/** @typedef {Item} Post */

/**
 * @typedef {Object} Response
 * @property {Number} total Total number of available items.
 * @property {Number} totalPages Total number of pages.
 * @property {Number} pageSize Maximum number of items returned in result set.
 * @property {Array<T>} items Items returned in current result set.
 * @template T
 */

/**
 * @package
 * @typedef {Object} Item
 * @property {Number} id Unique identifier for the object.
 * @property {String} createdAt Item creation date.
 * @property {String} modifiedAt Last modification date.
 * @property {String} link Url of an item.
 * @property {String} title Item's title in html format.
 * @property {String} excerpt Item's excerpt in html format.
 * @property {String} content Item's content in html format.
 */
