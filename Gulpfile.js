var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tinylr = require('tiny-lr')(),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade');


gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('coffee', function() {
  gulp.src('./*.coffee')
    .pipe(coffee({bare: true})
//           .on('error', gutil.log)
         )
    .pipe(gulp.dest('./public/js/'))
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname+'/public'));
  app.listen(4000);
});

gulp.task('styles', function() {
  return sass('./', { style: 'expanded' })
//      .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./*.scss', ['styles']);
  gulp.watch('*.coffee', ['coffee']);
  gulp.watch('*.jade', ['templates']);
  gulp.watch('./public/**', notifyLiveReload);
//   gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('livereload', function() {
  tinylr.listen(4002); //instead of default 35729
});
function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
};


gulp.task('default', ['styles', 'express', 'livereload', 'watch'], function() {

});
