var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    tinylr = require('tiny-lr')(),
    coffee = require('gulp-coffee');

gulp.task('coffee', function() {
  gulp.src('./*.coffee')
    .pipe(coffee({bare: true})
//           .on('error', gutil.log)
         )
    .pipe(gulp.dest('./public/'))
});

gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  app.listen(4000);
});

gulp.task('styles', function() {
  return sass('sass/', { style: 'expanded' })
     .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('*.coffee', ['coffee'])
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('css/*.css', notifyLiveReload);
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
