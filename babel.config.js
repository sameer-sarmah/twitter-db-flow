module.exports = function(api) {
    api.cache(false);
  const presets = ["mobx", "@babel/env", "@babel/react"];
  const plugins = [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ['@babel/plugin-proposal-optional-chaining'],
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import"
    
  ];

  return {
    presets,
    plugins
  };
};
