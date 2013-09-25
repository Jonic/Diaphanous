module.exports = (grunt) ->
	grunt.initConfig {
		css:
			input: 'assets/styles/diaphanous.scss'
			output: 'public/styles/diaphanous.min.css'

		js:
			input: 'assets/scripts/*.js'
			output: 'public/scripts/diaphanous.min.js'

		pkg: grunt.file.readJSON 'package.json'

		tag:
			banner: '/*!\n' +
				' * <%= pkg.name %>\n' +
				' * <%= pkg.repository.url %>\n' +
				' * @author <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
				' * @version <%= pkg.version %>\n' +
				' * <%= pkg.copyright %> <%= pkg.license %> licensed.\n' +
				' */\n'



		sass:
			options:
				banner: '<%= tag.banner %>'
				noCache: true
			dev:
				files:
					'<%= css.output %>': '<%= css.input %>'
				options:
					style: 'expanded'
			dist:
				files:
					'<%= css.output %>': '<%= css.input %>'
				options:
					style: 'compressed'



		jshint:
			files: '<%= js.input %>'
			options:
				jshintrc: '.jshintrc'

		concat:
			options:
				seperator: ';'
				stripBanners: true
				nonull: true
				banner: '<%= tag.banner %>'
			dev:
				files:
					'<%= js.output %>': '<%= js.input %>'

		uglify:
			options:
				banner: "<%= tag.banner %>"
				wrap: true
			dist:
				files:
					'<%= js.output %>': ['<%= js.output %>']



		watch:
			css:
				files: '<%= css.input %>'
				tasks: ['sass:dev']
			scripts:
				files: '<%= js.input %>'
				tasks: ['jshint', 'concat:dev']

	}



	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-jshint'
	grunt.loadNpmTasks 'grunt-contrib-sass'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'

	grunt.registerTask 'default', [
		'sass:dev',
		'jshint',
		'concat:dev',
		'watch'
	]

	grunt.registerTask 'build', [
		'sass:dist',
		'jshint',
		'uglify'
	]

	return
