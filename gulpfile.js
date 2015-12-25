var gulp = require('gulp');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

/**
 * Run jasmine tests
 */
gulp.task('test', shell.task('karma start karma.conf.js'));

/**
 * Run a single run jasmine test
 */
gulp.task('testSingle', shell.task('karma start karma.conf.js  --single-run'));

/**
 * Concatenate js files.
 */
gulp.task('components', function() {
	return gulp.src(['./app/components/**/*.js', '!./app/components/**/*test.js'])
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./app/dist/'));
});