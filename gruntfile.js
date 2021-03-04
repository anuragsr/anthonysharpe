module.exports = grunt => {
  grunt.initConfig({
    // Watches for changes and runs tasks
    // Livereload is setup for the 35729 port by default
    watch: {
      options: {
        interval: 1000,
        dateFormat: function(time) {
          // grunt.log.writeln('Completed in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Ready.'["blue"].bold);
        },
      },
      sass: {
        files: ["**/*.scss",  "!node_modules/*.*"],
        tasks: ["sass:dev"]
      },
      php: {
        files: ["**/*.php",  "!node_modules/*.*"],
        options: { livereload: true }
      },
      js: {
        files: ["**/*.js",  "!node_modules/*.*"],
        options: { livereload: true }
      },
      css: {
        files: ["**/*.css",  "!node_modules/*.*"],
        options: { livereload: true }
      },
      img: {
        files: ["**/*.jpg", "**/*.jpeg", "**/*.png", "!node_modules/*.*"],
        options: { livereload: true }
      }
    },
    // Sass object
    sass: {
      dev: {
        files: {
          "css/common.css"  : "scss/common.scss",
          "css/header.css"  : "scss/header.scss",
          "css/home.css"    : "scss/home.scss",
          "css/work.css"   : "scss/work.scss",
          "css/contact.css" : "scss/contact.scss",
          "css/footer.css"  : "scss/footer.scss",
        },
        options: {
          style: "expanded",
          livereload: false
        }
      }
    }
  });

  // Default task
  grunt.registerTask("default", ["watch"]);

  // Load up tasks
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
}