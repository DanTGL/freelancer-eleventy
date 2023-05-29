// Don’t forget to `npm install sass`!
const sass = require("sass");
const path = require("node:path");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTemplateFormats("scss", "pug");
  
  // Creates the extension for use
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css", // optional, default: "html"

    // `compile` is called once per .scss file in the input directory
    compile: async function(inputContent, inputPath) {
        let parsed = path.parse(inputPath);
        if(parsed.name.startsWith("_")) {
            return;
          }
      let result = sass.compileString(inputContent, {
        loadPaths: [
            parsed.dir || ".",
            this.config.dir.includes,
            "./node_modules",
        ]
      });

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    }
  });

  return {
    dir: {
      // ⚠️ This value is relative to your input directory.
      input: "./site"
    }
  }
};