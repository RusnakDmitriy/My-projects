"use strict";
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    bs = require('browser-sync').create(),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');

gulp.task('default', ['browsersync', 'watch']);

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css'))
        .pipe(bs.reload({stream: true}));
});

gulp.task('script', function () {
   return gulp.src('app/js/script.js')
        .pipe(rename({suffix: '.min'}))
        /*.pipe(uglify().on('error', function(e){
            console.log(e);
         }))*/
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('browsersync', function () {
    bs.init({
        server: "./",
        port: 8080
    });
});

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/js/script.js', ['script']);
    bs.watch('index.html').on('change', bs.reload);
});