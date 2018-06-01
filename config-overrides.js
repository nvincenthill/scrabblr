const { injectBabelPlugin } = require("react-app-rewired");

module.exports = function override(config, env) {
  config = injectBabelPlugin("transform-decorators-legacy", config);

  return config;
};