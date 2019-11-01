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
const sourcemaps = require('gulp-sourcemaps');
const jsonData = require('./package.json');


gulp.task('sass', () => {
  return gulp.src(['./src/sass/base/*.scss', './src/sass/browser/*.scss', './src/sass/library/*.scss'])
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./src/css/'))
});

gulp.task('css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(concat('landstorm-cdn-stylesheet.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`./v${jsonData.version}/`))
});

gulp.task('css-min', () => {
  return gulp.src([`./v${jsonData.version}/*.css`, `!./v${jsonData.version}/*.min.css`])
      .pipe(cleanCSS())
      .pipe(extReplace('.min.css'))
      .pipe(gulp.dest(`./v${jsonData.version}/`))
});

gulp.task('css-clean', () => {
  return gulp.src('./src/css/*', { read: false })
    .pipe(clean());
});

gulp.task('js', () => {
  return gulp.src(['./src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('landstorm-cdn-script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(`./v${jsonData.version}/`))
});

gulp.task('js-min', () => {
  return gulp.src([`./v${jsonData.version}/*.js`, `!./v${jsonData.version}/*.min.js`])
    .pipe(uglify())
    .pipe(extReplace('.min.js'))
    .pipe(gulp.dest(`./v${jsonData.version}/`))
});

gulp.task('dist-clean', () => {
  return gulp.src(`./v${jsonData.version}/*`, { read: false })
    .pipe(clean());
});

gulp.task('css-build', gulp.series(['css-clean', 'sass', 'css', 'css-min']))
gulp.task('js-build', gulp.series(['js', 'js-min']))
gulp.task('build', gulp.series(['dist-clean', 'css-build', 'js-build']))