# [elasticsearch](https://github.com/elastic/elasticsearch-js)-deletebyquery

> Elasticsearch-js client extension for the [Delete-by-query](https://www.elastic.co/guide/en/elasticsearch/plugins/2.0/plugins-delete-by-query.html) plugin.

This module provides the `deleteByQuery` method which was removed from the core API in ES 2.0.0. For those with the [Delete-by-query](https://www.elastic.co/guide/en/elasticsearch/plugins/2.0/plugins-delete-by-query.html) installed, this will bring back that feature to your Elasticsearch-js client.

## Setup

Install the package.

```
npm install --save elasticsearch-deletebyquery
```

Then extend the Elasticsearch API by including this plugin.

```js
'use strict';

const hosts = ['127.0.0.1'];
const apiVersion = '2.x';
const elasticsearch = require('elasticsearch');
const deleteByQuery = require('elasticsearch-deletebyquery');

const client = new elasticsearch.Client({
  hosts, apiVersion,
  plugins: [ deleteByQuery ]
});
```

## Example

Deleting documents with a simple query
```js
client.deleteByQuery({
  index: 'myindex',
  q: 'test'
}, function (error, response) {
  // ...
});
```

Deleting documents using the Query DSL
```js
client.deleteByQuery({
  index: 'posts',
  body: {
    query: {
      term: { published: false }
    }
  }
}, function (error, response) {
  // ...
});
```
