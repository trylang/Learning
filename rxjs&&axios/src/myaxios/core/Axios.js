var utils = require('../utils');
var mergeConfig = require('./mergeConfig');
var InterceptorManager = require('./InterceptorManager');

/**
 * create a new instance of Axios
 *
 * @param {Object} instanceConfig
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    // request: new InterceptorManager(),
    // response: new InterceptorManager()
  };
}

/**
 * Dsipatch a request
 *
 * @param {Object} config merged with this.defaults, the config specific for this request
 */
Axios.prototype.request = function request(config) {

};

Axios.prototype.getUrl = function getUrl(config){};

// provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }))
  }
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
});

module.exports = Axios;

