module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
coffee: {
  dev: {
    src: './front/coffee/*.coffee',
    dest: './public/javascripts/scripts.js'
  }
},
watch: {
  javascript: {
    files: './front/coffee/*.coffee',
    tasks: 'coffee:dev'
  },
  compass: {
    files: './front/scss/*.scss',
    tasks: 'compass:dev'
  }
},
compass: {                  // Task
  dist: {                   // Target
    options: {              // Target options
      sassDir: './front/scss',
      cssDir: './public/styles/',
      environment: 'production'
    }
  },
  dev: {                    // Another target
    options: {
      sassDir: './front/scss',
      cssDir: './public/styles'
    }
  }
}
});
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');
  grunt.registerTask('default', ['coffee:dev', 'compass:dev']);
};
