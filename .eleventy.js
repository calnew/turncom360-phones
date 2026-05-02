/**
 * Eleventy config for TurnCom360 Plug & Play Phone Systems microsite.
 *
 * Responsibilities:
 * - Pretty permalinks, Nunjucks as default template engine
 * - Passthrough copy for assets (images, icons, JS, robots.txt, _headers)
 * - Production HTML minification
 * - Date filters
 * - Navigation plugin
 */

const { DateTime } = require("luxon");
const htmlmin = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

  /* ============ Plugins ============ */
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  /* ============ Passthrough copy ============ */
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/_headers": "_headers" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "favicon.ico" });

  /* ============ Watch targets ============ */
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  /* ============ Filters ============ */
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM d, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addFilter("absoluteUrl", (url, base) => {
    try {
      return new URL(url, base).toString();
    } catch (e) {
      return url;
    }
  });

  /* ============ Production HTML minification ============
     Keeps HTML comments (they contain TODO notes for content-editor).
     Set removeComments: false intentionally.
  ============ */
  if (process.env.ELEVENTY_RUN_MODE === "build") {
    eleventyConfig.addTransform("htmlmin", async function(content) {
      if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
        return await htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: false,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true
        });
      }
      return content;
    });
  }

  /* ============ Directory structure ============ */
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
