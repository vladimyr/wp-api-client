'use strict';

const debug = require('debug')('http');
const html2text = require('html2plaintext');
const r = require('got');
const qs = require('querystring');
const urlJoin = require('url-join');

const lazy = getter => ({ enumerable: true, get: getter });
const normalize = url => url.replace(/\/$/, '');

/**
 * Create new WordPress REST API client.<br>
 * :blue_book: Documentation: https://developer.wordpress.org/rest-api/reference/
 * @class
 */
class WordPressClient {
  /**
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
    const items = body.map(it => Object.defineProperties({
      id: it.id,
      createdAt: it.date,
      modifiedAt: it.modified,
      link: normalize(it.link)
    }, parseItem(it)));
    return { total, totalPages, pageSize, items };
  }

  async _fetchItem(id, collection) {
    const url = urlJoin(this._baseUrl, collection, id);
    debug('url:', url);
    const { body: item = {} } = await r.get(url, { json: true });
    return Object.defineProperties({
      id: item.id,
      createdAt: item.date,
      modifiedAt: item.modified,
      link: normalize(item.link)
    }, parseItem(item));
  }

  /**
   * List posts from target site.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments).
   * @param {Number} [options.pageSize=10] Maximum number of items to be returned in result set.
   * @returns {Promise<Response>} _Paginated listing of posts._
   */
  fetchPosts(options) {
    return this._fetchCollection('posts', options);
  }

  /**
   * Retrieve single post from target site.
   * @param {Number} id Unique identifier for the object.
   * @returns {Promise<Item>} _Post properties in form of an `Item`._
   */
  fetchPost(id) {
    return this._fetchItem(id, 'posts');
  }

  /**
   * List pages from target site.
   * @param {Object?} options Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/pages/#arguments).
   * @param {Number} [options.pageSize=10] Maximum number of items to be returned in result set.
   * @returns {Promise<Response>} _Paginated listing of pages._
   */
  fetchPages(options) {
    return this._fetchCollection('pages', options);
  }

  /**
   * Retrieve single page from target site.
   * @param {Number} id Unique identifier for the object
   * @returns {Promise<Item>} _Page properties in form of an `Item`._
   */
  fetchPage(id) {
    return this._fetchItem(id, 'pages');
  }
}

module.exports = WordPressClient;

function parseItem({ title, content, excerpt } = {}) {
  return {
    title: lazy(() => html2text(title.rendered)),
    content: lazy(() => html2text(content.rendered)),
    excerpt: lazy(() => html2text(excerpt.rendered))
  };
}

/**
 * @typedef {Object} Item
 * @property {Number} id Unique identifier for the object.
 * @property {String} createdAt Item creation date.
 * @property {String} modifiedAt Last modification date.
 * @property {String} link Url of an item.
 * @property {String} title Item's title in plaintext format.
 * @property {String} excerpt Item's excerpt in plaintext format.
 * @property {String} content Item's content in plaintext format.
 */

/**
 * @typedef {Object} Response
 * @property {Number} total Total number of available items.
 * @property {Number} totalPages Total number of pages.
 * @property {Number} pageSize Maximum number of items returned in result set.
 * @property {Array<Item>} items Items returned in current result set.
 */
