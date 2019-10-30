// Dependencias Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const extReplace = require('gulp-ext-replace');

gulp.task('css', () => {
  return gulp.src('./src/sass/core.scss')
    .pipe(sass())
    .pipe(concat('landstorm-stylesheet.css'))
    .pipe(gulp.dest('./css/'))
});

gulp.task('minify-css', () => {
    return gulp.src('./css/*.css')
      .pipe(cleanCSS())
      .pipe(extReplace('.min.css'))
      .pipe(gulp.dest('./css/'))
});

gulp.task('js', () => {
    return gulp.src('./src/libraries/*.js')
      .pipe(concat('landstorm-script.js'))
      .pipe(gulp.dest('./js/'))
});

gulp.task('minify-js', () => {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(extReplace('.min.js'))
    .pipe(gulp.dest('./js/'))
});