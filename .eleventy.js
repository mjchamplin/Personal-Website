module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: './src',
      output: './build'
    }
  }
  eleventyConfig.setServerOptions({
    watch: ["build/**/*.css"],
  });
};
