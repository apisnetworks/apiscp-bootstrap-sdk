/*!
 * Bootstrap's Gruntfile
 * https://getbootstrap.com
 * Copyright 2013-2017 The Bootstrap Authors
 * CopyrLicensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

var APNSCP_PATH = process.env['APNSCP_PATH'] || "/usr/local/apnscp",
	THEME_PATH = process.env['APNSCP_THEME_PATH'] || (APNSCP_PATH + "/public/css/themes"),
	THEME = process.env['THEME'] || "apnscp";

module.exports = function (grunt) {
    'use strict'

    // Force use of Unix newlines
    grunt.util.linefeed = '\n'

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    }

    const path = require('path')
    const inliner = require('sass-inline-svg');
    const sass = require('node-sass');
    const Fiber = require('fibers');

    // Project configuration.
    var config = {
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
            ' */\n',

        // Task configuration.
        clean: {
            dist: 'dist',
        },

        // CSS build configuration
        copy: {
            css: {
                expand: true,
                cwd: 'dist/css/',
                src: [
                    '*'
                ],
                dest: APNSCP_PATH + '/public/css/themes'
            }
        },

        watch: {
            sass: {
                files: ['scss/**/*.scss', 'scss/**/*.svg'],
                tasks: ['sass-compile', 'copy:css']
            },
        },

        exec: {
            'clean-css': {
                command: 'cleancss --skip-advanced --source-map --output dist/css/' + THEME + '.min.css dist/css/' + THEME + '.css'
            },
            postcss: {
                command: 'npm run postcss'
            },
            'scss-clean': {
                command: "cleancss --skip-advanced --source-map --output dist/css/" + THEME + ".min.css dist/css/" + THEME + ".css"
            },
            'scss-lint': {
                command: 'npm run scss-lint'
            },
            uglify: {
                command: 'npm run uglify'
            },
        },

        compress: {
            main: {
                options: {
                    archive: 'apnscp-' + THEME + '-<%= pkg.version %>-dist.zip',
                    mode: 'zip',
                    level: 9,
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['**'],
                        dest: 'apnscp-' + THEME + '-<%= pkg.version %>-dist'
                    }
                ]
            }
        },

        sass: {
            dist: {
                options: {
                    functions: {
                        "svg": inliner('scss/apnscp/media', {optimize: true, encodingFormat: "uri"})
                    },
                    implementation: sass,
                    sourceMap: true,
                    fiber: Fiber,
                    precision: 6,
                    outputStyle: "expanded"
                },
                files: {}
            },
        }
    };
    config.sass.dist.files["dist/css/" + THEME + ".css"] = "scss/themes/" + THEME + ".scss";
    grunt.initConfig(config)

    require('jit-grunt')(grunt)
    require('time-grunt')(grunt)

    grunt.registerTask('test-scss', ['exec:scss-lint'])
    grunt.registerTask('sass-compile', ['sass', 'copy:css'])
    grunt.registerTask('dist-css', ['sass-compile', 'exec:postcss', 'exec:clean-css', 'copy:css'])

    // Full distribution task.
    grunt.registerTask('dist', ['clean:dist', 'dist-css'])

    grunt.registerTask('default', ['dist']);
    grunt.registerTask('prep-release', ['dist', 'compress'])
}
