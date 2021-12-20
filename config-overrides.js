// config-overrides.js
const rewireReactHotLoader = require("react-app-rewire-hot-loader");

module.exports = function(config, env) {
  config = rewireReactHotLoader(config, env);
  config.resolve.alias = {
    ...config.resolve.alias,
    "react-dom": "@hot-loader/react-dom"
  };
  return config;
};
