module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: ['index.js']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/unit/**/*.js']
      }
    },

    watch: {
      files: ['index.js', 'test/**/*.js'],
      tasks: ['jshint', 'mochaTest'],
      options: {
        spawn: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['test', 'watch']);

};