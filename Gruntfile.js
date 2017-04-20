module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


  concat: {
    options: {
      separator: '\n//CONCATTED FILES HERE!!!!!\n'
    },
    dist: {
      src: ['./public/client/*.js'],
      dest: './public/dist/index.js'
    }
  },

  uglify:{
    options:{mangle:false},
    my_target:{
      files:{ './public/dist/index.js' : './public/dist/index.js',
      './public/lib/backbone.min.js' : './public/lib/backbone.js',
      './public/lib/jquery.min.js' : './public/lib/jquery.js',
      './public/lib/underscore.min.js' : './public/lib/underscore.js',
      './public/lib/handlebars.min.js' : './public/lib/handlebars.js'
      }
    }
  },       


    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    gitpush: {
      task: {
         options: {
           remote: 'live',
           branch: 'master',
           cwd: './'
         }
       }
    },



    eslint: {
      target: [
        // Add list of files to lint here
      ]
    },

    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './public/dist/style.min.css': ['./public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  grunt.registerTask('server-prod', function (target) {
    grunt.task.run([ 'test', 'build',  'gpush']);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest', 'eslint'
  ]);


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('gpush', function(n){
    grunt.task.run(['gitpush']);
  });

  grunt.registerTask('build', function(n){
    grunt.task.run(['concat', 'uglify', 'cssmin']);
  });

  grunt.registerTask('deploy', [
  ]);


};
