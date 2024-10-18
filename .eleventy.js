const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");


module.exports = function(eleventyConfig) {

  // Load plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for(let item of collection) {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  
  // Exclude specific tags (specifically to exclude them from the list of tags on /tags/* pages )
  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  // Filters from https://github.com/11ty/eleventy-base-blog
    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
      // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
      return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
      // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
      return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
      if(!Array.isArray(array) || array.length === 0) {
        return [];
      }
      if( n < 0 ) {
        return array.slice(n);
      }

      return array.slice(0, n);
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
      return Math.min.apply(null, numbers);
    });

    // Return the keys used in an object
    eleventyConfig.addFilter("getKeys", target => {
      return Object.keys(target);
    });

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
      return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
    });



  // Register dates to be used in templates (/journal)
    
    // Human-readable date
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    // Semantic date for <time> compatibility 
    eleventyConfig.addFilter("shortDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_SHORT);
    });

  // Find and copy any unprocessed files, maintaining directory structure.
  // Currently this catches images, pdfs, etc. 
  // ToDo: Replace with image processing
  eleventyConfig.addPassthroughCopy("src/_assets/");

  // Set input and output directories for Eleventy
  return {
    dir: {
      input: './src',
      output: './build'
    }
  };

  
  eleventyConfig.setServerOptions({
    watch: ["build/_assets/css/*.css"],
  });

};
