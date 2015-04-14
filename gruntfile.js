module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: 'src/templates/layouts/',
        partials: 'src/templates/partials/**/*.hbs'
      },
      posts: {
        files: [{
          cwd: 'src/content/',
          dest: 'dist/',
          expand: true,
          src: ['**/*.hbs', '**/*.md', '!_pages/**/*.hbs']
        }, {
          cwd: 'src/content/_pages/',
          dest: 'dist/',
          expand: true,
          src: '**/*.hbs'
        }]
      }
    },

    htmlhint: {
      html: {
        options: {
          'tag-pair': true
        },
        src: ['dist/**/*.html']
      },
    },

    copy: {
      // copy only necessary files from bower packages to lib folder
      bower: {
        files: [
          { dest: 'src/lib/normalize.css', src: 'bower_components/normalize.css/normalize.css', nonull: true},
          { dest: 'src/lib/jquery.js', src: 'bower_components/jquery/dist/jquery.js', nonull: true},
          { dest: 'src/lib/modernizr.js', src: 'bower_components/modernizr/modernizr.js', nonull: true}
        ],
      },
      // copy static files from src to dist
      dist: {
        files: [
          { dest: 'dist/docs/', cwd: 'src/docs/', src: '**/*.*', expand: true},
          { dest: 'dist/', cwd: 'src/_root/', src: '*.*', expand: true}
        ]
      }
    },

    jshint: {
      all: ['gruntfile.js', 'src/js/*.js']
    },

    concat: {
      // combine all js libs, plugins and custom code
      scripts: {
        files: {
          'dist/js/production.js': ['src/lib/*.js', 'src/js/plugins.js', 'src/js/main.js']
        }
      },
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
        },
        src: 'dist/js/production.js',
        dest: 'dist/js/production.min.js'
      }
    },

    scsslint: {
      all: ['src/css/**/*.scss', '!src/lib/*.scss'],
      options: {
        colorizeOutput: true,
        force: true // to report scss-lint errors but not fail the task
      },
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {
          'src/css/main.css': 'src/css/main.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        // map: true // no map from sass, creating map when cssmin runs
      },
      dist: {
        src: 'src/css/main.css'
      },
    },

    csslint: {
      prod: {
        src: ['src/css/main.css']
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: {
          'dist/css/production.min.css': ['src/lib/*.css', 'src/css/main.css']
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{jpg,gif,svg}'], // not running on pngs, using pngmin instead
          dest: 'dist/images/'
        }]
      }
    },

    pngmin: {
      compile: {
        options: {
          ext: '.png'
        },
        files: [{
          src: ['src/images/**/*.png'],
          dest: 'dist/images/'
        }]
      }
    },

    connect: {
      dev: {
        options: {
          port: 8080,
          base: 'dist/'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['newer:jshint', 'concat:scripts', 'uglify']
      },
      css: {
        files: ['src/css/**/*.scss'],
        tasks: ['newer:scsslint', 'sass', 'autoprefixer', 'csslint', 'cssmin']
      },
      html: {
        files: ['src/content/**/*.hbs', 'src/content/**/*.md', 'src/templates/**/*.hbs'],
        tasks: ['assemble', 'htmlhint']
      },
      imgs: {
        files: ['src/images/**/*.{png,jpg,gif,svg}'],
        tasks: ['newer:imagemin', 'newer:pngmin']
      }
    },

    clean: {
      dist: ['dist/'],
      lib: ['src/lib/**/*'], // remove all bower files copied to lib folder
    },
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-scss-lint');

  /* grunt tasks */
  grunt.registerTask('css', ['scsslint', 'sass', 'autoprefixer', 'csslint', 'cssmin']);
  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('html', ['assemble', 'htmlhint']);
  grunt.registerTask('imgs', ['imagemin', 'pngmin']);

  grunt.registerTask('default', ['clean', 'copy:bower', 'css', 'js', 'html', 'imgs', 'copy:dist']);
  grunt.registerTask('dev', ['connect', 'watch']);

};