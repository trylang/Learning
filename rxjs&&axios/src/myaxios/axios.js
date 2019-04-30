var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * 创建一个Axios实例
 * @param {Object} defaultConfig 
 * @return {Axios}
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  console.log('context', context, defaultConfig);
  var instance = bind(Axios.prototype.request, context);
  console.log('instance', instance);

  // copy axios.prototype to instance  将axios.prototype复制到实例
  utils.extend(instance, Axios.prototype, context);

  // copy context to instance 将上下文复制到实例
  utils.extend(instance, context);

  return instance;

}

// Create the default instance to be exported 创建要导出的默认实例
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance 公开Axios类以允许类继承
axios.Axios = Axios;

// Factory for creating new instance 用于创建新实例的工厂
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}

axios.all = function all(promises) {
  return Promise.all(promises);
}

module.exports = axios;

// Allow use of default import syntax in TypeScript 允许在TypeScript中使用默认导入语法
module.exports.default = axios;