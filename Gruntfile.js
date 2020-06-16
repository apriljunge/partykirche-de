const sass = require('node-sass');

module.exports = function config (grunt) {
    'use strict';

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['src/*.scss'],
                tasks: ['dev']
            },
        },
        sass: {
            options: {
                implementation: sass,
                sourcemap: 'none',
            },
            dev: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
                    'docs/main.css': 'src/main.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'docs/main.css': 'src/main.scss'
                }
            }
        }
    });
    
    require('load-grunt-tasks')(grunt);
    
    grunt.registerTask('default', ['sass:dist']);
    grunt.registerTask('dev', ['sass:dev']);
};