var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('compass-importer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');

gulp.task('default', function() {
	runSequence('clean', ['sass','css-libraries', 'js-scripts','js-libraries']);
});

gulp.task('watch', function(){
	gulp.watch('source/sass/**/*.sass', ['sass']);
	gulp.watch('source/js/*.js', ['js-scripts']);
})

gulp.task('clean', function() {
	return del([
		'deploy/css/**/*',
		'deploy/js/**/*'
	]);
});

gulp.task('sass', function() {
	return gulp.src('source/sass/*.sass')
	.pipe(sass({importer: compass}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('deploy/css'));
});

gulp.task('css-libraries', function() {
	return gulp.src(['source/css/**/*.css'])
	.pipe(concat('libraries.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest('deploy/css'));
});

gulp.task('js-scripts', function() {
	return gulp.src('source/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('deploy/js'));
});

gulp.task('js-libraries', function() {
	return gulp.src(['source/js/libs/jquery-1.11.0.min.js',
					'source/js/libs/modernizr-2.7.1.min.js',
					'source/js/libs/FileSaver.js'])
	.pipe(concat('libraries.js'))
	.pipe(uglify())
	.pipe(gulp.dest('deploy/js'));
});