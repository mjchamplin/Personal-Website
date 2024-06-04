const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  return {
    dir: {
      input: './src',
      output: './build'
    }
  };
  eleventyConfig.setServerOptions({
    watch: ["build/**/*.css"],
  });
};