module.exports = function (grunt) { 
  
  grunt.initConfig({
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
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('server', ['connect', 'watch']);

}