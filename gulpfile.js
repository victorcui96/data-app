var gulp = require('gulp');
var sass = require('gulp-sass');
// Packacge for renaming files
var rename = require("gulp-rename");
// Package for autoprefixing sass
var autoprefixer = require('gulp-autoprefixer');
// Task that compiles SASS files . Run it in the command line by typing gulp styles
gulp.task('sass', function() {
	//Find all '.scss' files
    gulp.src('sass/**/*.scss')
    	//Run Sass on those files
        .pipe(sass({
        	  outputStyle: 'compressed'
	        }).on('error', sass.logError))
        .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false   
			}))
        .pipe(rename(function(path){
        	path.extname = ".min.css"
        }))
        //Write resulting CSS in output folder
        .pipe(gulp.dest('./css/'));
});
//Default task. To use, simply type %gulp in terminal
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['sass']);
});