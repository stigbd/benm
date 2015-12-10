module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // bower
        bower: {
            install: {
                options: {
                    targetDir: 'client/requires',
                    layout: 'byComponent'
                }
            }
        },

        // clean
        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js', 'build/<%= pkg.name%>.css', 'build/<%= pkg.name %>.js']
            },
            prod: ['dist']
        },

        // browserify
        browserify: {
            vendor: {
                src: ['client/requires/**/*.js'],
                dest: 'build/vendor.js',
                options: {
                    shim: {
                        jquery: {
                            path: 'client/requires/jquery/js/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'client/requires/underscore/js/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'client/requires/backbone/js/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                underscore: 'underscore'
                            }
                        },
                        'backbone.marionette': {
                            path: 'client/requires/backbone.marionette/js/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
                            }
                        }
                    }
                }
            },
            app: {
                files: {
                    'build/app.js': ['client/src/main.js']
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            },
            test: {
                files: {
                    'build/tests.js': [
                        'client/spec/**.*.test.js'
                    ]
                },
                options: {
                    transform: ['hbsfy'],
                    external: ['jquery', 'underscore', 'backbone', 'backbone.marionette']
                }
            }
        },

        // LESS
        less: {

        },

        // Concat
        concat: {

        },

        // Copy
        copy: {

        },

        // cssmin
        cssmin: {

        },

        // uglify
        uglify: {

        },

        // watch
        watch: {

        },

        // nodemon
        nodemon: {

        },

        // shell
        shell: {

        },

        // concurrent
        concurrent: {

        },

        //karma
        karma: {

        },

        // jsHint
        jshint: {

        }
    });

    // register tasks
    // init:dev
    grunt.registerTask('init:dev', ['clean', 'bower', 'browserify:vendor']);
    // build:dev
    grunt.registerTask('build:dev', ['clean:dev', 'browserify:app',
    'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'copy:dev']);
    // build:prod
    grunt.registerTask('build:prod', ['clean:dev', 'browserify:app',
    'browserify:test', 'jshint:dev', 'less:transpile', 'concat', 'copy:dev']);
    // server
    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);
    // test:client
    grunt.registerTask('test:client', ['karma:test']);
    // tdd
    grunt.registerTask('tdd', ['karma:watcher:start', 'concurrent:test']);
};
