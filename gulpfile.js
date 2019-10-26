// Dependencias Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const purgecss = require('gulp-purgecss');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const extReplace = require('gulp-ext-replace');

gulp.task('css', () => {
  return gulp.src('./landstorm/sass/core.scss')
    .pipe(sass())
    .pipe(gulp.dest('./landstorm/css/'))
});

gulp.task('js', () => {
    return gulp.src('./landstorm/js/core.js')
      .pipe(uglify())
      .pipe(concat('core.min.js'))
      .pipe(gulp.dest('./landstorm/js/'))
});