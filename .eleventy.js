const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { DateTime } = require("luxon");
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function(eleventyConfig) {

  // Load nav plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  

  // Drafts, see also _data/eleventyDataSchema.js
  eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
    if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });


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
  // Currently used to pass-through PDF files. 
  eleventyConfig.addPassthroughCopy("src/_assets/");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // which file extensions to process
    extensions: "html",

    // Add any other Image utility options here:
    // optional, output image formats
    formats: ["jpeg"],
    // formats: ["auto"],

    // optional, output image widths
    widths: ['auto', 1088, 2240],


    // optional, attributes assigned on <img> override these values.
    defaultAttributes: {
      // This one was frustrating. See: https://blog.sebin-nyshkim.net/posts/responsive-self-hosted-images-for-your-eleventy-blog/#fn1
      sizes: "100vw",
      loading: "lazy",
      decoding: "async",
    },
  });

    eleventyConfig.addPlugin(feedPlugin, {
    type: "atom", // or "rss", "json"
    outputPath: "/feed.xml",
    collection: {
      name: "posts", // iterate over `collections.posts`
      limit: 10,     // 0 means no limit
    },
    metadata: {
      language: "en",
      title: "Michael Champlin's Journal",
      subtitle: "thoughts, photographs, clippings, etc.",
      base: "https://champl.in",
      author: {
        name: "Michael Champlin",
        email: "", // Optional
      }
    }
  });

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
