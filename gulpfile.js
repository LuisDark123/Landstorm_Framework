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
  return gulp.src('./src/css/*.css')
    .pipe(concat('landstorm-cdn-stylesheet.css'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('css-min', () => {
    return gulp.src(['./dist/*.css', '!./dist/*.min.css'])
      .pipe(cleanCSS())
      .pipe(extReplace('.min.css'))
      .pipe(gulp.dest('./dist/'))
});

gulp.task('js', () => {
  return gulp.src('./src/js/*.js')
    .pipe(concat('landstorm-cdn-script.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('js-min', () => {
  return gulp.src(['./dist/*.js', '!./dist/*.min.js'])
    .pipe(uglify())
    .pipe(extReplace('.min.js'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', () => {
  return gulp.src(['./src/sass/base/*.scss', './src/sass/browser/*.scss', './src/sass/library/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/css/'))
});