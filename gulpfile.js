var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

gulp.task('styles', function() {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./dist/styles'));

  return sass('./src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('browserify', function() {
  return browserify('./src/scripts/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('views', function() {
  gulp.src('./src/views/**/*.html')
    .pipe(gulp.dest('./dist/views'));
})

gulp.task('default', ['browserify', 'views', 'styles' , 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['browserify']);

  gulp.watch('./src/**/*.html', ['views']);
});