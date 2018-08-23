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
                sourcemap: 'none',
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineNumbers: true,
                    update: true
                },
                files: {
                    'docs/main.css': 'src/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                'docs/main.css': 'src/main.scss'
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['sass:dist']);
    grunt.registerTask('dev', ['sass:dev']);
};