module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // jsHint
        // Run jsHint syntax checking on all necessary .js files
        jshint: {
            all: ['Gruntfile.js',
            'server/app/**/*.js', 'server/controllers/**/*.js',
            'server/views/**/*.js', 'server/server.js'],
            dev: ['server/app/**/*.js'],
            test: ['spec/**/*.js', '!spec/coverage/**']
        },

        // clean
        clean: {
            build: ['build'],
            dev: {
                src: ['build/app.js', 'build/<%= pkg.name%>.css', 'build/<%= pkg.name %>.js']
            },
            coverage: {
                src: ['spec/coverage/']
            },
            coverageIstrument: 'spec/coverage/instrument/',
            prod: ['dist']
        },

        // Concat
        // Concatenate all of the .js files into a single file.
        concat: {
            'build/<%= pkg.name %>.js' : ['build/vendor.js', 'build/app.js']
        },

        // Copy
        // In dev mode, copy the files from the build directory to
        // the destination that they must reside so that our front-end app
        // can see them and our server can serve them.
        copy: {
            dev: {
                files: [{
                    src: 'build/<%= pkg.name %>.js',
                    dest: 'public/js/<%= pkg.name %>.js'

                }, {
                    src: 'build/<%= pkg.name %>.css',
                    dest: 'public/css/<%= pkg.name%.css>'
                }]
            },
            views: {
                src: 'server/**/*',
                dest: 'spec/coverage/instrument/'
            },
            tests: {
                src: 'spec/**/*',
                dest: 'spec/coverage/instrument/'
            },
        },

        // nodemon
        // The same as watch, except for the server related .js files
        // Whenever a node.js file is changed on the server, restart
        // the server so the latest versjion is running
        nodemon: {
            dev: {
                options: {
                    file: 'server/server.js',
                    nodeArgs: ['--debug'],
                    whatchedFolders: ['controllers', 'app'],
                    env: {
                        PORT: '3300'
                    }
                }
            }
        },

        // shell
        // A simple command line excecution. Launch the mongod server:
        shell: {
            mongodb: {
                command: 'mongod',
                options: {
                    async: true
                }
            }
        },

        // concurrent
        // Ensure that we can execute a number of "blocking" tasks
        // asynchronously at the same time
        concurrent: {
            dev: {
                tasks: ['nodemon:dev', 'shell:mongodb'],
                options: {
                    logConcurrentOutput: true
                }
            },
        },

        // test server with simplemocha
        mochaTest: {
            options: {
                globals: ['expect', 'sinon'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            },
            server: {
                src: ['spec/spechelper.js',
                '<%= grunt.option("testBasePath") %>' + '**/*.js']
            }
        },

        // istanbul start - code coverage settings

        instrument: {
            files: 'server/**/*.js',
            options: {
                lazy: true,
                basePath: 'spec/coverage/instrument/'
            }
        },


        storeCoverage: {
            options: {
                dir: 'spec/coverage/reports'
            }
        },


        makeReport: {
            src: 'spec/coverage/reports/*.json',
            options: {
                type: 'lcov',
                dir: 'spec/coverage/reports',
                print: 'detail'
            }
        },

        // end - code coverage settings

        // test for coverage thresholds
        coverage: {
            default: {
                options: {
                    thresholds: {
                        'statements': 90,
                        'branches': 90,
                        'lines': 90,
                        'functions': 90
                    },
                    dir: 'coverage',
                    root: 'spec'
                }
            }
        }
    });

    // register tasks
    // init:dev
    grunt.registerTask('init:dev', ['clean']);
    // build:dev
    grunt.registerTask('build:dev', ['clean:dev', 'jshint:dev', 'concat',
    'copy:dev']);
    // build:prod
    grunt.registerTask('build:prod', ['clean:dev',
    'jshint:dev', 'concat', 'copy:dev']);
    // server
    grunt.registerTask('server', ['build:dev', 'concurrent:dev']);

    // test
    grunt.registerTask('test', ['jshint', 'clean:coverage', 'copy:tests',
    'copy:views', 'setTestDir', 'instrument',
    'mochaTest:server',
    'storeCoverage', 'makeReport', 'clean:coverageIstrument']);

    grunt.registerTask('setTestDir', function () {
        grunt.option('testBasePath', 'spec/coverage/instrument/');
    });
};
