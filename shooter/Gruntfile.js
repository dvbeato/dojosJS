module.exports = function (grunt) { 
  
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      }
    },
    connect: {
      server: {
        options: {
          host:'localhost',
          port: 9001,
          index:'index.html'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      }
      // ,karma: {
      //   files: ['scripts/**/*.js', 'test/**/*.js'],
      //   tasks: ['karma:unit:run'] 
      // }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', ['connect', 'watch']);

}