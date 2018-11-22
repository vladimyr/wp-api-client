# wp-api-client [![build status](https://badgen.net/travis/vladimyr/wp-api-client/master)](https://travis-ci.com/vladimyr/wp-api-client) [![install size](https://badgen.net/packagephobia/install/wp-api-client)](https://packagephobia.now.sh/result?p=wp-api-client) [![npm package version](https://badgen.net/npm/v/wp-api-client)](https://npm.im/wp-api-client) [![github license](https://badgen.net/github/license/vladimyr/wp-api-client)](https://github.com/vladimyr/wp-api-client/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/cyan)](https://github.com/Flet/semistandard)

> WordPress API client for node

## Installation

    $ npm i wp-api-client

## Usage

```js
const WordPressClient = require('wp-api-client');

// Create API client for WordPress blog
const client = new WordPressClient('https://wordpress.org/news');

// Fetch latest post
client.fetchPosts()
  .then(({ items }) => {
    const { title, link } = items[0];
    console.log(`"${title}": ${link}`);
  });
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [WordPressClient](#wordpressclient)
    -   [Parameters](#parameters)
    -   [fetchPosts](#fetchposts)
        -   [Parameters](#parameters-1)
    -   [fetchPost](#fetchpost)
        -   [Parameters](#parameters-2)
    -   [countPosts](#countposts)
        -   [Parameters](#parameters-3)
    -   [fetchPages](#fetchpages)
        -   [Parameters](#parameters-4)
    -   [fetchPage](#fetchpage)
        -   [Parameters](#parameters-5)
    -   [countPages](#countpages)
        -   [Parameters](#parameters-6)
-   [Item](#item)
    -   [Properties](#properties)
-   [Response](#response)
    -   [Properties](#properties-1)

### WordPressClient

Create new WordPress REST API client.<br>
:blue_book: Documentation: <https://developer.wordpress.org/rest-api/reference/>

#### Parameters

-   `url` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Url of WordPress installation.

#### fetchPosts

List posts from target site.

##### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments).
    -   `options.pageSize` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum number of items to be returned in result set. (optional, default `10`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Response](#response)>** _Paginated listing of posts._

#### fetchPost

Retrieve single post from target site.

##### Parameters

-   `id` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Unique identifier for the object.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Item](#item)>** _Post properties in form of an `Item`._

#### countPosts

Count all available posts.

##### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/posts/#arguments).

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** _Total number of available posts._

#### fetchPages

List pages from target site.

##### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/pages/#arguments).
    -   `options.pageSize` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum number of items to be returned in result set. (optional, default `10`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Response](#response)>** _Paginated listing of pages._

#### fetchPage

Retrieve single page from target site.

##### Parameters

-   `id` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Unique identifier for the object

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Item](#item)>** _Page properties in form of an `Item`._

#### countPages

Count all available pages.

##### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)?** Endpoint [arguments](https://developer.wordpress.org/rest-api/reference/pages/#arguments).

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** _Total number of available pages._

### Item

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `id` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Unique identifier for the object.
-   `createdAt` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Item creation date.
-   `modifiedAt` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Last modification date.
-   `link` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Url of an item.
-   `title` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Item's title in html format.
-   `excerpt` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Item's excerpt in html format.
-   `content` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Item's content in html format.

### Response

Type: [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)

#### Properties

-   `total` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Total number of available items.
-   `totalPages` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Total number of pages.
-   `pageSize` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum number of items returned in result set.
-   `items` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Item](#item)>** Items returned in current result set.
