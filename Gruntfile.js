'use strict';

module.exports = function (grunt) {

	grunt.initConfig ({
		css: {
			input: 'assets/styles/master.scss',
			output: 'public/styles/master.min.css'
		},
		js: {
			input: 'assets/scripts/*.js',
			output: 'public/scripts/master.min.js'
		},
		pkg: grunt.file.readJSON('package.json'),
		tag: {
			banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * <%= pkg.repository.url %>\n' +
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
				' * @version <%= pkg.version %>\n' +
				' * <%= pkg.copyright %> <%= pkg.license %> licensed.\n' +
				' */\n'
		},
		sass: {
			options: {
				banner: '<%= tag.banner %>'
			},
			dev: {
				files: {
					'<%= css.output %>': '<%= css.input %>'
				},
				options: {
					style: 'expanded'
				}
			},
			dist: {
				files: {
					'<%= css.output %>': '<%= css.input %>'
				},
				options: {
					style: 'compressed'
				}
			}
		},
		jshint: {
			files: '<%= js.input %>',
			options: {
				jshintrc: '.jshintrc'
			}
		},
		concat: {
			options: {
				seperator: ';',
				stripBanners: true,
				nonull: true,
				banner: '<%= tag.banner %>'
			},
			dev: {
				files: {
					'<%= js.output %>': '<%= js.input %>'
				}
			}
		},
		uglify: {
			options: {
				banner: "<%= tag.banner %>",
				wrap: true
			},
			dist: {
				files: {
					'<%= js.output %>': ['<%= js.output %>']
				}
			}
		},
		watch: {
			css: {
				files: '<%= css.input %>',
				tasks: ['sass:dev']
			},
			scripts: {
				files: '<%= js.input %>',
				tasks: ['jshint', 'concat:dev']
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('default', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'sass:dist',
		'jshint',
		'uglify'
	]);

};