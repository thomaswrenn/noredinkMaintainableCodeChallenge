module.exports = function(grunt) {

    var options = {
        port: 8080
    };

    grunt.initConfig({
        options: options,
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: options.port,
                    base: '.'
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= options.port %>/'
            }
        },
        watch: {
          css: {
            files: '**/*.styl',
            tasks: ['stylus'],
            options: {
                livereload: 35729,
            },
          },
          js: {
            files: ['./src/js/**/*.jsx', './src/js/**/*.js'],
            tasks: ['webpack'],
            options: {
                livereload: 35729,
            },
          },
          html: {
            files: '**/*.html',
            options: {
                livereload: 35729
            }
          }
        },
        stylus: {
            compile: {
                compress: false,
                files: {
                  './dest/css/main.css': './src/css/main.styl'
                }
            }
        },
        webpack: {
            'page.index': {
                entry: "./src/js/index/page.index.jsx",
                output: {
                    path: "./dest/js/",
                    filename: "page.index.bundle.js",
                },
                module: {
                    loaders: [
                        { test: /\.jsx?$/, loader: "babel" }
                    ]
                },
                failOnError: true
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['webpack', 'stylus', 'connect', 'open', 'watch']);
};
