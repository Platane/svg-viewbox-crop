const getConfig = env => {
  const plugins = [];

  const presets = [
    "@emotion/babel-preset-css-prop",

    "@babel/preset-typescript",

    "@babel/preset-react"
  ];

  if (env === "test") {
    plugins.push("@babel/plugin-transform-modules-commonjs");
  }

  return { plugins, presets };
};

module.exports = api => getConfig(api.env());

module.exports.getConfig = getConfig;
