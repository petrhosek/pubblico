module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-stylus');
  // Grunt configuration
  grunt.initConfig({
    jade: {
      html: {
        src: ['views/**/*.jade'],
        dest: ['views'],
        options: {
          client: false
        }
      }
    },
    manifest: {
      dest: ''
    },
    lint: {
      src: ['models/**/*.js', 'public/**/*.js', 'routes/**/*.js', '*.js'],
      public: 'public/**/*.js',
      grunt: 'grunt.js',
      tests: 'test/**/*.js'
    },
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        strict: false,
        eqnull: true,
        es5: true,
        evil: true,
        sub: true
      },
      globals: {},
      grunt: {
        options: {node: true},
        globals: {task: true, config: true, file: true, log: true, template: true}
      },
      public: {
        options: {browser: true},
        globals: {angular: true, jquery: true}
      },
      src: {
        options: {node: true}
      }
      test: {
        options: {angular: true, jquery: true},
        globals: {module: true, test: true, ok: true, equal: true, deepEqual: true}
      }
    },
    stylus: {
      compile: {
        options: {
          'include css': true
        },
        files: {
          'public/stylesheets/app.css': 'views/stylesheets/app.styl'
        }
      }
    }
  });
  grunt.registerTask('default', 'lint');

  // Generate mock data from API Blueprint
  grunt.registerTask('apiary2js', 'Generate JavaScript version of API Blueprint file.', function() {
    var parser = require('apiary-blueprint-parser');
    var content = grunt.file.read('apiary.apib');
    var blueprint = parser.parse(content);
    var json = JSON.stringify(blueprint.sections, null, 2);
    grunt.file.write('test/e2e/mocks.js', "var mocks = " + json);
  });

  // Alias the `test` task to run `testacular` instead
  grunt.registerTask('test', 'Run the Testacular test driver', function() {
    var done = this.async();
    require('child_process').exec('testacular start --single-run', function(err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
};
