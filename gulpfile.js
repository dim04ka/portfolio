require("babel-register");
const gulp = require('gulp');
const img = require('gulp-image');
const pug = require('gulp-pug');
const font = require('gulp-font');
const browserSync = require('browser-sync');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const reload = browserSync.reload;
const babel = require('gulp-babel');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


gulp.task('js', () => {
  return gulp.src([`./src/js/*.js`])
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(gulp.dest(`./app/js`))
});


gulp.task('sass', function(){
  gulp.src('./src/styles/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./app/styles/'))
});


gulp.task('img', function(){
  gulp.src('./src/img/*')
    .pipe(img()) 
    .pipe(gulp.dest('./app/img/'))
});


gulp.task('pug', function() {
  return gulp.src('./src/pages/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./app/'))
});

gulp.task('font', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('./app/fonts/'))
});

gulp.task('watch', function(){
  gulp.watch('./src/fonts/**/*', ['font']);
  gulp.watch('./src/pages/**/*.pug', ['pug']);
  gulp.watch('./src/img/*', ['img']);
  gulp.watch('./src/styles/**.scss', ['sass']);
  gulp.watch("./app/**.html").on("change", browserSync.reload);
gulp.watch('./app/js/**/*.js').on("change", browserSync.reload);
gulp.watch("./app/css/**.css").on("change", browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'img', 'font', 'pug', 'browserSync', 'watch'], function () {
});

gulp.task('browserSync', function () {
  browserSync({
      server: {
          baseDir: './app/'
      },
  });
});



