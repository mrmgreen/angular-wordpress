var gulp = require('gulp');
var shell = require('gulp-shell');

/**
 * Run jasmine tests
 */
gulp.task('test', shell.task('karma start karma.conf.js'));

/**
 * Run a single run jasmine test
 */
gulp.task('testSingle', shell.task('karma start karma.conf.js  --single-run'));