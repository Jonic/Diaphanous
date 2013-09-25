module.exports = function (grunt) {
	grunt.initConfig({
		project: {
			css: {
				input: 'assets/styles/diaphanous.scss',
				output: 'public/styles/diaphanous.min.css'
			},

			js: {
				input: 'assets/scripts/*.js',
				output: 'public/scripts/diaphanous.min.js'
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
					'<%= project.output.css %>': '<%= project.input.css %>'
				},
				options: {
					style: 'expanded'
				}
			},
			dist: {
				files: {
					'<%= project.output.css %>': '<%= project.input.css %>'
				},
				options: {
					style: 'compressed'
				}
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
					'<%= project.output.js %>': '<%= project.input.js %>'
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
					'<%= project.output.js %>': ['<%= project.output.js %>']
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
		'uglify'
	]);
};