module.exports = function (grunt) {
	grunt.initConfig({
		project: {
			paths: {
				css: {
					dev: 'assets/styles',
					dist: 'public/styles'
				},
				js: {
					dev: 'assets/scripts',
					dist: 'public/scripts'
				}
			},

			input: {
				css: '<%= project.paths.css.dev %>/diaphanous.scss',
				js: '<%= project.paths.js.dev %>/*.js'
			},

			output: {
				css: {
					dev: '<%= project.paths.css.dist %>/diaphanous.css',
					dist: '<%= project.paths.css.dist %>/diaphanous.min.css'
				},
				js: {
					dev: '<%= project.paths.js.dist %>/diaphanous.js',
					dist: '<%= project.paths.js.dist %>/diaphanous.min.js'
				}
			}
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
				banner: '<%= tag.banner %>',
				noCache: true
			},
			dev: {
				files: {
					'<%= project.output.css.dev %>': '<%= project.input.css %>'
				},
				options: {
					style: 'expanded'
				}
			},
			dist: {
				files: {
					'<%= project.output.css.dist %>': '<%= project.input.css %>'
				},
				options: {
					style: 'compressed'
				}
			}
		},

		cssmin: {
			css: {
				src: '<%= project.output.css.dev %>',
				dest: '<%= project.output.css.dist %>'
			}
		},



		jshint: {
			files: '<%= project.input.js %>',
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
					'<%= project.output.js.dev %>': '<%= project.input.js %>'
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
					'<%= project.output.js.dist %>': ['<%= project.output.js.dev %>']
				}
			}
		},



		watch: {
			css: {
				files: '<%= project.input.css %>',
				tasks: ['sass:dev']
			},
			scripts: {
				files: '<%= project.input.js %>',
				tasks: ['concat', 'jshint']
			}
		}

	});



	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'watch'
	]);

	grunt.registerTask('build', [
		'sass:dist',
		'jshint',
		'uglify',
		'cssmin'
	]);
};