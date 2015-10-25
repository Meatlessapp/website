/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html'],
      },
      js: {
        files: ['src/scripts/**/*.js'],
        tasks: ['jshint'],
      },
      sass: {
        options: {
          livereload: false
        },
        files: ['src/styles/scss/*.scss'],
        tasks: ['sass'],
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'src/styles/scss',
          src: ['*.scss'],
          dest: 'src/styles/css',
          ext: '.css'
        }]
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'src',
          keepalive: true
        }
      }
    },
    'gh-pages': {
      options: {
        base: 'out'
      },
      src: ['**']
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '*.html',
              'styles/css/*.css',
              'styles/images/**/**.*',
              'bower_components/**/**.*'
            ],
            dest: 'out/'
          }
        ],
      },
    },
    clean: ["out/"]
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('deploy', [
    'clean',
    'sass',
    'copy',
    'gh-pages'
  ]);

  grunt.registerTask('serve', [
    'sass',
    'connect',
    'watch'
  ]);

};
