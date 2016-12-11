var gulp = require('gulp');

var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

gulp.task('scripts-minify', ['scripts-annotate'], function () {
  return gulp.src('dist/angular-image-croppie.js')
    .pipe(uglify())
    .pipe(rename('angular-image-croppie.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts-annotate', function () {
  return gulp.src('angular-image-croppie.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['scripts-minify']);

gulp.task('styles-copy', function() {
  return gulp.src('angular-image-croppie.css')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles-minify', function() {
  return gulp.src('angular-image-croppie.css')
    .pipe(cleanCSS())
    .pipe(rename('angular-image.croppie.min.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['styles-copy', 'styles-minify']);

gulp.task('default', ['styles', 'scripts']);

