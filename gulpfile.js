var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function() {
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('./dist/styles'));

  return sass('./src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('linting', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format());
});

gulp.task('browserify', function() {
  return browserify('./src/scripts/app.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('views', function() {
  gulp.src('./src/views/**/*.html')
    .pipe(gulp.dest('./dist/views'));
})

gulp.task('default', ['linting', 'browserify', 'views', 'styles', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['linting', 'browserify']);

  gulp.watch('./src/styles/**/*.scss', ['styles'])

  gulp.watch('./src/**/*.html', ['views']);
});