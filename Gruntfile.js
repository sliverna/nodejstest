module.exports=function(grunt){

	grunt.initConfig({

		pkg:grunt.file.readJSON('package.json'),

		clean:{
			build:{
				build: ["test/*", "release/*"],
				release: ["test/*", "release/*"]
			}
		},
		concat:{
			
			js:{
				src:['src/js/*.js'],
				dest:'release/app.js'
			},
			css:{
				src:['src/css/*.css'],
				dest:'release/page.css'
			}
			
		},
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*!<%pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%>*/\n'

			},
			build:{
				src:'src/**/*.js',
				dest:'release/js/<%=pkg.name%>-<%=pkg.version%>.js.min.js'

			}
		},

		jshint:{
			build:['Gruntfile.js','src/*.js'],
			options:{
				jshintrc:'.jshintrc'
			}
		},
		csslint:{
			build:['src/css/*.css'],
			options:{
				csslintrc:'.csslintrc'
			}
		},
		watch:{
			bulid:{
				files:['src/*.js','src/*.css'],
				tasks:['jshint','uglify'],
				options:{spawn:false}
			}
		},
		cssmin: {
		  bulid: {
		    files: [{
		      expand: true,
		      cwd: 'src/',
		      src: ['**/*.css'],
		      dest: 'release/',
		      ext: '.min.css'
		    }]
		  }
		},
		imagemin:{
			dynamic:{
				files: [{
		        expand: true,                  // Enable dynamic expansion 
		        cwd: 'src/',                   // Src matches are relative to this path 
		        src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match 
		        dest: 'release/'                  // Destination path prefix 
		      }]
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-concat');


	grunt.registerTask('default',['clean']);
	grunt.registerTask('concat',['concat','watch']);
	grunt.registerTask('check',['jshint','csslint']);
	grunt.registerTask('min',['uglify','cssmin','imagemin'])


};