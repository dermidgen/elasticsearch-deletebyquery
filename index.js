'use strict';

var ca = require('elasticsearch/src/lib/client_action').makeFactoryWithModifier(function (spec) {
  return require('elasticsearch/src/lib/utils').merge(spec, {
    params: {
      filterPath: {
        type: 'list',
        name: 'filter_path'
      }
    }
  });
});

/**
 * Perform a [deleteByQuery](http://www.elastic.co/guide/en/elasticsearch/reference/1.6/docs-delete-by-query.html) request
 *
 * @param {Object} params - An object with parameters used to carry out this action
 * @param {String} params.analyzer - The analyzer to use for the query string
 * @param {String} params.consistency - Specific write consistency setting for the operation
 * @param {String} [params.defaultOperator=OR] - The default operator for query string query (AND or OR)
 * @param {String} params.df - The field to use as default where no field prefix is given in the query string
 * @param {Boolean} params.ignoreUnavailable - Whether specified concrete indices should be ignored when unavailable (missing or closed)
 * @param {Boolean} params.allowNoIndices - Whether to ignore if a wildcard indices expression resolves into no concrete indices. (This includes `_all` string or when no indices have been specified)
 * @param {String} [params.expandWildcards=open] - Whether to expand wildcard expression to concrete indices that are open, closed or both.
 * @param {String} [params.replication=sync] - Specific replication type
 * @param {String} params.q - Query in the Lucene query string syntax
 * @param {String} params.routing - Specific routing value
 * @param {Date, Number} params.timeout - Explicit operation timeout
 * @param {String, String[], Boolean} params.index - A comma-separated list of indices to restrict the operation; use `_all` to perform the operation on all indices
 * @param {String, String[], Boolean} params.type - A comma-separated list of types to restrict the operation
 */
function deleteByQuery(Client, config, components) {
  Client.prototype.deleteByQuery = ca({
    params: {
      analyzer: {
        type: 'string'
      },
      consistency: {
        type: 'enum',
        options: [
          'one',
          'quorum',
          'all'
        ]
      },
      defaultOperator: {
        type: 'enum',
        'default': 'OR',
        options: [
          'AND',
          'OR'
        ],
        name: 'default_operator'
      },
      df: {
        type: 'string'
      },
      ignoreUnavailable: {
        type: 'boolean',
        name: 'ignore_unavailable'
      },
      allowNoIndices: {
        type: 'boolean',
        name: 'allow_no_indices'
      },
      expandWildcards: {
        type: 'enum',
        'default': 'open',
        options: [
          'open',
          'closed',
          'none',
          'all'
        ],
        name: 'expand_wildcards'
      },
      replication: {
        type: 'enum',
        'default': 'sync',
        options: [
          'sync',
          'async'
        ]
      },
      q: {
        type: 'string'
      },
      routing: {
        type: 'string'
      },
      timeout: {
        type: 'time'
      }
    },
    urls: [
      {
        fmt: '/<%=index%>/<%=type%>/_query',
        req: {
          index: {
            type: 'list'
          },
          type: {
            type: 'list'
          }
        }
      },
      {
        fmt: '/<%=index%>/_query',
        req: {
          index: {
            type: 'list'
          }
        }
      }
    ],
    method: 'DELETE'
  });
}

module.exports = deleteByQuery;
