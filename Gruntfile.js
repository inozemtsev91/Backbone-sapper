var path = require('path');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jade: {
      development: {
        options: {
          compileDebug: false,
          client: true,
          pretty: true,
          processName: function(filename) {
            return path.basename(filename, '.jade');
          }
        },
        files: [{
          cwd: "tpl",
          src: "*.jade",
          dest: "build",
          expand: true,
          ext: ".jade.js"
        }]
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('default', ['jade']);

};