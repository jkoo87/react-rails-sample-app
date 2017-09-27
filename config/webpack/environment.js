const { environment } = require("@rails/webpacker");

// https://github.com/rails/webpacker/blob/master/docs/webpack.md#overriding-loader-options-in-webpack-3-for-css-modules-etc
const merge = require("webpack-merge");

// We use [folder] instead [name] here to force components organization style
// where every component that uses CSS modules should be placed in ComponentName
// folder and its .jsx file should be named as index.jsx.
// This will give us class names like ComponentName__cssClass__[hash] which
// makes it easy to find component corresponding to CSS class.
const myCssLoaderOptions = {
  modules: true,
  sourceMap: true,
  localIdentName: "[folder]__[local]___[hash:base64:5]"
};

const CSSLoader = environment.loaders
  .get("style")
  .use.find(el => el.loader === "css-loader");

CSSLoader.options = merge(CSSLoader.options, myCssLoaderOptions);

module.exports = environment;
